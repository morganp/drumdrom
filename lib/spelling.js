'use strict';

const { DrumDromError } = require('./errors');

// Rhythm spelling for the staff renderer, after the Metronome app
// (RhythmSpelling.swift). One beat at a time: sounding steps become notes as
// long as the beat grid and the next hit allow, and only the silence a note
// cannot absorb is written as rests. Nothing crosses a beat line.

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

module.exports = { checkGrid, spell, beamRuns, beatsPerGroup, valueOf, levelsOf };
