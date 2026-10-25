'use strict';

const glyphs = require('./glyphs');
const { rd, esc, describe, header, tempoText } = require('./common');
const { checkGrid, spell, beamRuns, beatsPerGroup } = require('./spelling');

// Percussion staff, after the Metronome app (NotationDrawing.swift): five
// lines, hands as one voice with stems up and feet (bass drum, pedal hat) as a
// second voice with stems down. Everything is laid out in staff spaces and
// scaled by skin.staff_space; the y origin is the top staff line.

const GLYPH_ORDER = Object.keys(glyphs);

// Smallest stem, measured from the nearest head to the outer beam edge, and the
// extra room each further beam level needs (beam thickness plus gap)
const STEM_MIN = 3;
const BEAM_PITCH = 0.75;
const BEAM_STUB = 1;

// Beam height when nothing pushes it further out
const HANDS_BEAM = -3.5;
const FEET_BEAM = 7;

const GHOST_SCALE = 0.85;
const SOFT_HAT_SCALE = 0.8;
const GRACE_SCALE = 0.6;

const isFeet = lane => lane.staff <= 1;
const isHat = lane => lane.id === 'hh' || lane.id === 'ho' || lane.id === 'hp';

// Y of a staff position in staff spaces: 0 is the bottom line, 8 the top line.
const yOf = pos => 4 - pos / 2;

function noteGlyph(lane, value) {
  if (lane.head === 'x' || lane.head === 'x_open') return 'noteheadXBlack';
  if (lane.head === 'diamond') return 'noteheadDiamondBlack';
  return value <= 2 ? 'noteheadHalf' : 'noteheadBlack';
}

function restGlyph(value) {
  if (value >= 32) return 'rest32nd';
  if (value >= 16) return 'rest16th';
  if (value >= 8) return 'rest8th';
  if (value >= 4) return 'restQuarter';
  return value >= 2 ? 'restHalf' : 'restWhole';
}

function flagGlyph(levels, up) {
  return 'flag' + ['8th', '16th', '32nd'][Math.min(levels, 3) - 1] + (up ? 'Up' : 'Down');
}

function renderStaff(id, model, skin) {
  const prefix = 'drumdrom-' + (id === null || id === undefined ? 0 : id);
  const u = skin.staff_space;
  const beats = model.time[0];
  const unit = model.time[1];
  const spb = model.steps_per_beat;
  checkGrid(spb, unit);
  const groupSize = beatsPerGroup(beats, unit);
  const ink = skin.ink_color;
  const stemW = skin.stem_w * u;

  const used = new Set();
  const g = name => glyphs[name];

  // A glyph at (x, y) staff-space origin scaled by k, in pixels
  function use(name, x, y, k, fill) {
    used.add(name);
    return ['use', {
      href: '#' + prefix + '-g-' + name,
      transform: 'translate(' + rd(x) + ' ' + rd(y) + ') scale(' + rd(u * (k || 1)) + ')',
      fill: fill || ink
    }];
  }

  function line(x1, y1, x2, y2, w, color) {
    return ['line', { x1: rd(x1), y1: rd(y1), x2: rd(x2), y2: rd(y2), stroke: color, 'stroke-width': rd(w) }];
  }

  function rect(x1, y1, x2, y2, color) {
    return ['rect', { x: rd(x1), y: rd(y1), width: rd(x2 - x1), height: rd(y2 - y1), fill: color }];
  }

  // Vertical extent of everything drawn in a row, for sizing and centring
  let top = 0;
  let bottom = 0;
  const touch = (...ys) => ys.forEach(y => { top = Math.min(top, y); bottom = Math.max(bottom, y); });

  // Notes of one voice in one bar, with beam groups resolved. byStep maps a
  // step in the bar to the hits of both voices.
  function voiceEvents(byStep, feet) {
    const out = [];
    for (let b = 0; b < beats; b++) {
      const sounding = [];
      for (let s = 0; s < spb; s++) sounding.push((byStep[b * spb + s] || []).some(h => isFeet(h.lane) === feet));
      out.push(spell(sounding, unit).map(e => ({ ...e, beat: b, step: b * spb + e.slot, voice: feet ? 'feet' : 'hands' })));
    }
    return out;
  }

  // Layout of one note: head positions (staff spaces relative to the slot) and where its stem sits
  function layoutNote(ev, entries, cx) {
    const up = ev.voice === 'hands';
    const heads = entries.filter(h => isFeet(h.lane) !== up).map(h => {
      const ghost = h.hit.accent === 'ghost';
      const soft = ghost && isHat(h.lane);
      const paren = ghost && !soft;
      const k = paren ? GHOST_SCALE : soft ? SOFT_HAT_SCALE : 1;
      const name = noteGlyph(h.lane, ev.value);
      return {
        lane: h.lane, hit: h.hit, name, k, paren, soft,
        pos: h.lane.staff, cy: yOf(h.lane.staff) * u,
        half: g(name).w * k * u / 2, dx: 0
      };
    }).sort((a, b) => a.pos - b.pos);
    // seconds in the stem up voice: the upper head goes to the right of the stem
    if (up) {
      heads.forEach((h, i) => {
        if (i > 0 && h.pos - heads[i - 1].pos === 1 && heads[i - 1].dx === 0) h.dx = h.half * 2 - stemW;
      });
    }
    const plain = heads.filter(h => h.dx === 0);
    const stemX = up
      ? cx + Math.max(...plain.map(h => h.half)) - stemW / 2
      : cx - Math.max(...plain.map(h => h.half)) + stemW / 2;
    const ys = heads.map(h => h.cy);
    return { ev, up, heads, cx, stemX, high: Math.min(...ys), low: Math.max(...ys) };
  }

  // One bar. Returns drawn nodes, the bar width and what the row needs.
  function drawBar(barIndex, x0) {
    const byStep = [];
    model.lanes.forEach(lane => lane.hits.forEach(hit => {
      if (hit.bar !== barIndex) return;
      if (!byStep[hit.step_in_bar]) byStep[hit.step_in_bar] = [];
      byStep[hit.step_in_bar].push({ lane, hit });
    }));

    // spacing follows the finest grid actually used, spelling uses the full grid
    let fine = 1;
    byStep.forEach((hits, s) => {
      if (!hits) return;
      let p = spb;
      while (p > 1 && (s % spb) % p !== 0) p /= 2;
      fine = Math.max(fine, spb / p);
    });
    const beatW = Math.max(skin.beat_min_w, fine * skin.slot_w) * u;
    const flamFirst = (byStep[0] || []).some(h => h.hit.articulation === 'flam');
    const lead = (flamFirst ? skin.lead_flam : skin.lead_in) * u;
    const xAt = step => x0 + lead + step / spb * beatW;

    const voices = ['hands', 'feet'].map(v => voiceEvents(byStep, v === 'feet'));
    const hasNotes = voices.map(v => v.some(beat => beat.some(e => e.type === 'note')));
    const twoVoices = hasNotes[0] && hasNotes[1];
    const nodes = [];
    let right = 0;

    if (!hasNotes[0] && !hasNotes[1]) {
      const w = lead + beats * beatW;
      const r = g('restWhole');
      nodes.push(use('restWhole', x0 + w / 2 - (r.box[0] + r.box[2]) / 2 * u, u, 1));
      touch(0, 2 * u);
      return { nodes, width: w, right: 0 };
    }

    // rests drawn at the same time in both voices with the same value merge into one
    const restKey = e => e.step + ':' + e.steps;
    const handRests = new Set();
    voices[0].forEach(beat => beat.forEach(e => { if (e.type === 'rest') handRests.add(restKey(e)); }));
    const merged = new Set();
    voices[1].forEach(beat => beat.forEach(e => { if (e.type === 'rest' && handRests.has(restKey(e))) merged.add(restKey(e)); }));

    const out = [];
    voices.forEach((perBeat, vi) => {
      if (!hasNotes[vi]) return;
      const up = vi === 0;
      const otherNotes = voices[1 - vi].flat().filter(e => e.type === 'note').map(e => e.step);
      const notes = [];
      const rests = [];
      perBeat.forEach(beat => beat.forEach(ev => {
        const cx = xAt(ev.step);
        if (ev.type === 'note') notes.push(layoutNote(ev, byStep[ev.step], cx));
        else rests.push({ ev, cx });
      }));

      // stems and beams shared by the whole bar and voice, so heights line up
      const noteOf = new Map(notes.map(n => [n.ev, n]));
      const groups = [];
      for (let b = 0; b < beats; b += groupSize) {
        const events = [];
        for (let k = b; k < Math.min(beats, b + groupSize); k++) events.push(...perBeat[k]);
        groups.push(events);
      }
      const runs = [];
      groups.forEach(events => beamRuns(events).forEach(r => runs.push(r)));
      const beamed = new Set();
      runs.forEach(r => r.forEach(e => beamed.add(e)));
      let maxLevels = 1;
      notes.forEach(n => { maxLevels = Math.max(maxLevels, n.ev.levels); });
      const need = (STEM_MIN + BEAM_PITCH * (maxLevels - 1)) * u;
      let beamY = up ? HANDS_BEAM * u : FEET_BEAM * u;
      notes.forEach(n => {
        if (n.ev.value < 2) return;
        beamY = up ? Math.min(beamY, n.high - need) : Math.max(beamY, n.low + need);
      });

      const color = skin.ink_color;
      const vnodes = [];

      notes.forEach(n => {
        const { ev, cx } = n;
        const stemless = ev.value < 2;
        // ledger lines, as wide as the heads that need them
        const ledgers = new Map();
        n.heads.forEach(h => {
          const wanted = [];
          for (let p = 10; p <= h.pos; p += 2) wanted.push(p);
          for (let p = -2; p >= h.pos; p -= 2) wanted.push(p);
          wanted.forEach(p => {
            const span = ledgers.get(p) || [Infinity, -Infinity];
            ledgers.set(p, [Math.min(span[0], cx + h.dx - h.half - 0.4 * u), Math.max(span[1], cx + h.dx + h.half + 0.4 * u)]);
          });
        });
        ledgers.forEach((span, p) => {
          vnodes.push(line(span[0], yOf(p) * u, span[1], yOf(p) * u, skin.ledger_w * u, skin.staff_color));
          touch(yOf(p) * u);
        });

        n.heads.forEach(h => {
          const fill = h.soft ? skin.ghost_color : color;
          const hx = cx + h.dx - h.half;
          vnodes.push(use(h.name, hx, h.cy, h.k, fill));
          touch(h.cy - 0.6 * u, h.cy + 0.6 * u);
          right = Math.max(right, hx + h.half * 2 - x0);
          if (h.lane.head === 'x_open') {
            const cyc = h.cy - 0.95 * u * h.k;
            vnodes.push(['circle', { cx: rd(cx + h.dx), cy: rd(cyc), r: rd(0.3 * u * h.k), fill: 'none', stroke: fill, 'stroke-width': rd(skin.open_w * u) }]);
          }
          if (h.paren) {
            const inner = Math.max(h.half, Math.abs(n.stemX - cx) + stemW / 2) + 0.1 * u;
            const pk = 0.9;
            const left = g('noteheadParenthesisLeft');
            const rightP = g('noteheadParenthesisRight');
            vnodes.push(use('noteheadParenthesisLeft', cx - inner - left.box[2] * pk * u, h.cy, pk, color));
            vnodes.push(use('noteheadParenthesisRight', cx + inner - rightP.box[0] * pk * u, h.cy, pk, color));
            right = Math.max(right, cx + inner + rightP.box[2] * pk * u - x0);
          }
          if (h.hit.articulation === 'flam') {
            const gh = g(h.name);
            const gk = GRACE_SCALE;
            const gx = cx - 1.9 * u;
            vnodes.push(use(h.name, gx - gh.w * gk * u / 2, h.cy, gk, color));
            const sx = gx + gh.w * gk * u / 2 - stemW / 2;
            const sTop = h.cy - 2.5 * u;
            vnodes.push(line(sx, h.cy + gh.up[1] * gk * u, sx, sTop, stemW, color));
            vnodes.push(use('flag8thUp', sx - stemW / 2, sTop, gk, color));
            vnodes.push(line(sx - 0.7 * u, sTop + 1.2 * u, sx + 0.9 * u, sTop + 0.25 * u, 0.1 * u, color));
            touch(sTop);
          }
        });

        if (!stemless) {
          const baseHead = up ? n.heads.find(h => h.cy === n.low) : n.heads.find(h => h.cy === n.high);
          const anchor = up ? g(baseHead.name).up[1] : g(baseHead.name).down[1];
          const y0 = baseHead.cy + anchor * baseHead.k * u;
          vnodes.push(line(n.stemX, y0, n.stemX, beamY, stemW, color));
          touch(beamY);
          if (ev.levels > 0 && !beamed.has(ev)) {
            vnodes.push(use(flagGlyph(ev.levels, up), n.stemX - stemW / 2, beamY, 1, color));
            right = Math.max(right, n.stemX + 1.2 * u - x0);
          }
          right = Math.max(right, n.stemX + stemW / 2 - x0);
        }
        if (n.heads.some(h => h.hit.accent === 'accent')) {
          const a = g(up ? 'articAccentAbove' : 'articAccentBelow');
          const ay = up ? beamY - 0.55 * u : beamY + 0.55 * u;
          vnodes.push(use(up ? 'articAccentAbove' : 'articAccentBelow', cx - a.w * u / 2, ay, 1, color));
          touch(up ? ay - 1.0 * u : ay + 1.0 * u);
        }
      });

      // beams
      runs.forEach(run => {
        const stems = run.map(e => ({ x: noteOf.get(e).stemX, levels: e.levels }));
        const levelRect = (level, xa, xb) => {
          const y = up ? beamY + level * BEAM_PITCH * u : beamY - skin.beam_w * u - level * BEAM_PITCH * u;
          vnodes.push(rect(xa - stemW / 2, y, xb + stemW / 2, y + skin.beam_w * u, color));
        };
        levelRect(0, stems[0].x, stems[stems.length - 1].x);
        const deepest = Math.max(...stems.map(s => s.levels));
        for (let level = 1; level < deepest; level++) {
          let i = 0;
          while (i < stems.length) {
            if (stems[i].levels <= level) { i++; continue; }
            let j = i;
            while (j + 1 < stems.length && stems[j + 1].levels > level) j++;
            if (j > i) levelRect(level, stems[i].x, stems[j].x);
            else if (i === 0) levelRect(level, stems[i].x, stems[i].x + BEAM_STUB * u);
            else levelRect(level, stems[i].x - BEAM_STUB * u, stems[i].x);
            i = j + 1;
          }
        }
      });

      // rests
      rests.forEach(r => {
        const merge = merged.has(restKey(r.ev));
        if (merge && !up) return;
        if (!up && !skin.feet_rests && twoVoices) return;
        if (otherNotes.some(s => s >= r.ev.step && s < r.ev.step + r.ev.steps)) return;
        const y = merge || !twoVoices ? 2 * u : up ? 1 * u : 3.7 * u;
        const name = restGlyph(r.ev.value);
        const box = g(name).box;
        vnodes.push(use(name, r.cx - (box[0] + box[2]) / 2 * u, y, 1, color));
        touch(y + box[1] * u, y + box[3] * u);
      });

      out.push(['g', { id: prefix + '-bar' + barIndex + (up ? '-hands' : '-feet') }, ...vnodes]);
    });
    nodes.push(...out);

    const natural = lead + beats * beatW;
    return { nodes, width: Math.max(natural, right + skin.bar_clear * u), right };
  }

  // Rows
  const perRow = Math.max(1, Math.min(Math.floor(skin.bars_per_row) || 1, model.bars));
  const rowCount = Math.ceil(model.bars / perRow);
  const rows = [];
  const clef = g('unpitchedPercussionClef1');
  const digits = n => String(n).split('').map(c => 'timeSig' + c);
  const digitsW = n => digits(n).reduce((sum, d) => sum + g(d).w, 0) * u;

  for (let r = 0; r < rowCount; r++) {
    top = 0;
    bottom = 4 * u;
    const first = r * perRow;
    const n = Math.min(perRow, model.bars - first);
    const staff = [];
    let x = 0;
    staff.push(line(0, 0, 0, 4 * u, skin.barline_w * u, skin.ink_color));
    x += 1.0 * u;
    staff.push(use('unpitchedPercussionClef1', x, 2 * u, 1));
    x += clef.w * u + 1.2 * u;
    if (r === 0) {
      const w = Math.max(digitsW(beats), digitsW(unit));
      [[beats, 1], [unit, 3]].forEach(([value, row]) => {
        let dx = x + (w - digitsW(value)) / 2;
        digits(value).forEach(d => {
          staff.push(use(d, dx, row * u, 1));
          dx += g(d).w * u;
        });
      });
      x += w + 1.0 * u;
    }
    const bars = [];
    for (let b = 0; b < n; b++) {
      const bar = drawBar(first + b, x);
      bars.push(...bar.nodes);
      x += bar.width;
      const last = first + b === model.bars - 1;
      if (last) {
        const thin = x - (skin.final_barline_w + 0.4 + skin.barline_w / 2) * u;
        staff.push(line(thin, 0, thin, 4 * u, skin.barline_w * u, skin.ink_color));
        staff.push(line(x - skin.final_barline_w * u / 2, 0, x - skin.final_barline_w * u / 2, 4 * u, skin.final_barline_w * u, skin.ink_color));
      } else {
        staff.push(line(x, 0, x, 4 * u, skin.barline_w * u, skin.ink_color));
      }
    }
    const lines = [];
    for (let i = 0; i < 5; i++) lines.push(line(0, i * u, x, i * u, skin.staff_line_w * u, skin.staff_color));
    rows.push({ width: x, top, bottom, nodes: [['g', { id: prefix + '-row' + r + '-staff' }, ...lines, ...staff], ['g', { id: prefix + '-row' + r }, ...bars]] });
  }

  const head = header(model, skin);
  const maxRow = Math.max(...rows.map(r => r.width));
  const width = Math.max(rd(skin.margin_left + maxRow + skin.margin_right), 320);
  const shift = skin.margin_left + (width - skin.margin_left - skin.margin_right - maxRow) / 2;
  let y = head.y;
  const rowNodes = rows.map((row, r) => {
    const oy = y - row.top;
    y += row.bottom - row.top + skin.row_gap;
    return ['g', { id: prefix + '-system' + r, transform: 'translate(' + rd(shift) + ' ' + rd(oy) + ')' }, ...row.nodes];
  });
  const height = rd(y - skin.row_gap + skin.margin_bottom);

  const defs = GLYPH_ORDER.filter(name => used.has(name)).map(name => ['path', { id: prefix + '-g-' + name, d: glyphs[name].d }]);
  const tid = prefix + '-title';
  const did = prefix + '-desc';
  return ['svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    id: prefix,
    width, height,
    viewBox: '0 0 ' + width + ' ' + height,
    role: 'img',
    'aria-labelledby': tid + ' ' + did,
    'font-family': skin.font_family
  },
  ['title', { id: tid }, esc(model.name || 'Drum pattern')],
  ['desc', { id: did }, esc(describe(model))],
  ['defs', ...defs],
  ['rect', { width: '100%', height: '100%', fill: skin.bg_color }],
  ['g', { id: prefix + '-header' }, ...head.nodes, tempoText(model, skin, width, head.tempoY)],
  ...rowNodes
  ];
}

module.exports = renderStaff;
