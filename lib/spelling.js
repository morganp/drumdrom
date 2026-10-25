'use strict';

const { DrumDromError } = require('./errors');

// Rhythm spelling for the staff renderer, after the Metronome app
// (RhythmSpelling.swift). spell() does one beat at a time: sounding steps become
// notes as long as the beat grid and the next hit allow, and only the silence a
// note cannot absorb is written as rests. Nothing crosses a beat line.
// spellBar() spells a whole bar of one voice and adds dotted values and ties
// (docs/spec.md section 13); spell() is still used for other meters and for the
// two voice layout.

// The staff renderer needs every step to be a power of two fraction of a
// written note: steps_per_beat 1, 2, 4 or 8, and nothing shorter than a 32nd.
function checkGrid(spb, unit) {
  if ((spb & (spb - 1)) !== 0 || unit * spb > 32) {
    throw new DrumDromError('E_STAFF_GRID',
      'staff notation needs steps_per_beat 1, 2, 4 or 8 with steps no shorter than a 32nd note (got ' + spb + ' steps per beat in x/' + unit + ')');
  }
}

// Largest power of two that starts at `cell` on the beat grid and fits in
// `available` steps, never longer than the beat.
function longest(cell, available, spb) {
  let w = spb;
  while (w > 1 && (cell % w !== 0 || w > available)) w /= 2;
  return w;
}

// Written value of an event of `steps` steps: 4 is a quarter, 8 an eighth, and so on.
function valueOf(steps, spb, unit) {
  return unit * spb / steps;
}

// Number of beams (or flags) of a written value: none for a quarter or longer.
function levelsOf(value) {
  return value >= 8 ? Math.log2(value) - 2 : 0;
}

// Events covering one beat of sounding.length steps, in order, without gap or
// overlap: { type: 'note' | 'rest', slot, steps, value, levels }.
function spell(sounding, unit) {
  const spb = sounding.length;
  const events = [];
  const add = (type, slot, steps) => {
    const value = valueOf(steps, spb, unit || 4);
    events.push({ type, slot, steps, value, levels: type === 'note' ? levelsOf(value) : 0 });
  };
  let cell = 0;
  while (cell < spb) {
    let next = cell + 1;
    while (next < spb && !sounding[next]) next++;
    if (sounding[cell]) {
      const w = longest(cell, next - cell, spb);
      add('note', cell, w);
      cell += w;
    } else {
      while (cell < next) {
        const w = longest(cell, next - cell, spb);
        add('rest', cell, w);
        cell += w;
      }
    }
  }
  return events;
}

// Whole bar spelling. Meters it knows: simple time (x/4 with 2, 3 or 4 beats)
// and compound time (x/8 with a multiple of three beats, three beats a group).
function meterKind(beats, unit) {
  if (unit === 8 && beats % 3 === 0) return 'compound';
  if (unit === 4 && beats >= 2 && beats <= 4) return 'simple';
  return 'beat';
}

// Dotted values (in steps) that may start at step p in simple time: a dotted
// eighth on a beat, a dotted quarter on a multiple of two beats, both ending
// inside the bar. In 4/4 that keeps everything off the half bar line.
function dottedAt(p, spb, total) {
  const out = [];
  if (spb % 2 === 0 && p % (2 * spb) === 0 && p + 1.5 * spb <= total) out.push(1.5 * spb);
  if (spb % 4 === 0 && p % spb === 0) out.push(0.75 * spb);
  return out;
}

// Longest legal value starting at p that fits in `room` steps. `long` allows
// the values only sustained notes use: the half note in simple time.
function longestLegal(kind, p, room, spb, total, long) {
  let best = longest(p, room, spb);
  if (kind === 'compound') {
    const group = 3 * spb;
    if (p % group === 0) {
      if (room >= group) best = group;
      else if (room >= 2 * spb) best = Math.max(best, 2 * spb);
    }
  } else {
    dottedAt(p, spb, total).forEach(len => { if (len <= room) best = Math.max(best, len); });
    if (long && p % (2 * spb) === 0 && p + 2 * spb <= total && room >= 2 * spb) best = Math.max(best, 2 * spb);
  }
  return best;
}

// Steps of a plain note that follows a hit whose gap is `gap`: no longer than
// a beat, except a dotted value that is exactly the gap up to the next hit.
function plainNote(kind, p, gap, trailing, spb, total) {
  if (kind === 'compound') return longestLegal(kind, p, gap, spb, total, false);
  let best = longest(p, gap, spb);
  if (!trailing) dottedAt(p, spb, total).forEach(len => { if (len === gap) best = Math.max(best, len); });
  return best;
}

// Steps of a rest at p with `room` steps of silence: a dotted rest only when
// it is exactly the silence in simple time, a whole group in compound time.
function restLen(kind, p, room, spb, total) {
  if (kind === 'compound') return longestLegal(kind, p, room, spb, total, false);
  let best = longest(p, room, spb);
  dottedAt(p, spb, total).forEach(len => { if (len === room) best = Math.max(best, len); });
  return best;
}

const MAX_TIED = 3;

// Events covering one bar of one voice, without gap or overlap: { type, step,
// beat, steps, value, dots, levels } plus, for notes of a tie chain, tie_next,
// tie_prev and from (the step of the hit the chain starts at). sounding and
// sustained are arrays over the steps of the bar; a step of a sustained lane
// may be tied over to the next hit.
function spellBar(sounding, sustained, beats, spb, unit) {
  const total = beats * spb;
  const kind = meterKind(beats, unit || 4);
  if (kind === 'beat') {
    const out = [];
    for (let b = 0; b < beats; b++) {
      spell(sounding.slice(b * spb, (b + 1) * spb), unit).forEach(e => out.push({ ...e, dots: 0, beat: b, step: b * spb + e.slot }));
    }
    return out;
  }
  const beatLen = kind === 'compound' ? 3 * spb : spb;
  const events = [];
  const add = (type, step, len, extra) => {
    const dots = (len & (len - 1)) === 0 ? 0 : 1;
    const value = valueOf(dots ? len * 2 / 3 : len, spb, unit || 4);
    events.push({ type, step, beat: Math.floor(step / spb), steps: len, value, dots, levels: type === 'note' ? levelsOf(value) : 0, ...extra });
  };
  let p = 0;
  while (p < total) {
    let next = p + 1;
    while (next < total && !sounding[next]) next++;
    const gap = next - p;
    if (!sounding[p]) {
      const len = restLen(kind, p, gap, spb, total);
      add('rest', p, len);
      p += len;
      continue;
    }
    const trailing = next === total;
    if (sustained && sustained[p] && !trailing) {
      const chain = [];
      for (let at = p; at < next;) {
        const len = longestLegal(kind, at, next - at, spb, total, true);
        chain.push(len);
        at += len;
      }
      if (chain.length === 1 || (gap > beatLen && chain.length <= MAX_TIED)) {
        let at = p;
        chain.forEach((len, i) => {
          add('note', at, len, chain.length > 1 ? { tie_prev: i > 0, tie_next: i < chain.length - 1, from: p } : {});
          at += len;
        });
        p = next;
        continue;
      }
    }
    const len = plainNote(kind, p, gap, trailing, spb, total);
    add('note', p, len);
    p += len;
  }
  return events;
}

// Runs of two or more adjacent notes that carry a beam. A rest or a note
// without a beam (a quarter) ends a run.
function beamRuns(events) {
  const runs = [];
  let current = [];
  events.forEach(e => {
    if (e.type === 'note' && e.levels > 0) {
      current.push(e);
    } else {
      if (current.length > 1) runs.push(current);
      current = [];
    }
  });
  if (current.length > 1) runs.push(current);
  return runs;
}

// Beats that share beams: groups of three eighth-note beats in compound meters
// (6/8, 9/8, 12/8), otherwise one beat each.
function beatsPerGroup(beats, unit) {
  return unit === 8 && beats % 3 === 0 ? 3 : 1;
}

module.exports = { checkGrid, spell, spellBar, beamRuns, beatsPerGroup, valueOf, levelsOf };
