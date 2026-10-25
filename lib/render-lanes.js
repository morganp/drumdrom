'use strict';

const rd = n => Math.round(n * 100) / 100;

// onml does not escape text content
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const UNIT_LETTER = { 1: 'w', 2: 'h', 4: 'q', 8: 'e', 16: 's', 32: 't' };

// Step labels for one bar: 1 e & a for four steps per beat, plain step
// numbers when there is no standard counting syllable set.
function countLabels(beats, spb) {
  const syllables = { 1: [], 2: ['&'], 3: ['&', 'a'], 4: ['e', '&', 'a'] }[spb];
  const out = [];
  for (let b = 0; b < beats; b++) {
    for (let s = 0; s < spb; s++) {
      if (!syllables) out.push(String(b * spb + s + 1));
      else out.push(s === 0 ? String(b + 1) : syllables[s - 1]);
    }
  }
  return out;
}

function timeLabel(model) {
  let s = model.time[0] + '/' + model.time[1];
  if (model.tempo !== null) s += '  ' + UNIT_LETTER[model.time[1]] + ' = ' + model.tempo;
  return s;
}

function describe(model) {
  const bars = model.bars + (model.bars === 1 ? ' bar' : ' bars');
  const names = model.lanes.map(l => l.name).join(', ');
  return 'Drum pattern in ' + model.time[0] + '/' + model.time[1] + ', ' + bars + ', lanes: ' + names + '.';
}

// One note head, centred on (cx, cy). Returns a list of onml nodes.
function head(kind, cx, cy, r, color, skin) {
  const sw = { 'stroke-width': skin.mark_stroke, 'stroke-linecap': 'round' };
  if (kind === 'x' || kind === 'x_open') {
    const d = r * 0.85;
    const nodes = [
      ['path', { d: 'M' + rd(cx - d) + ',' + rd(cy - d) + 'L' + rd(cx + d) + ',' + rd(cy + d) +
        'M' + rd(cx - d) + ',' + rd(cy + d) + 'L' + rd(cx + d) + ',' + rd(cy - d),
      stroke: color, fill: 'none', ...sw }]
    ];
    if (kind === 'x_open') {
      nodes.push(['circle', { cx: rd(cx), cy: rd(cy), r: rd(r * 1.3), fill: 'none', stroke: color, 'stroke-width': rd(skin.mark_stroke * 0.75) }]);
    }
    return nodes;
  }
  if (kind === 'diamond') {
    const pts = [[cx, cy - r * 1.15], [cx + r * 1.15, cy], [cx, cy + r * 1.15], [cx - r * 1.15, cy]];
    return [['polygon', { points: pts.map(p => rd(p[0]) + ',' + rd(p[1])).join(' '), fill: color }]];
  }
  return [['circle', { cx: rd(cx), cy: rd(cy), r: rd(r), fill: color }]];
}

function mark(lane, hit, cx, cy, skin) {
  const isAccent = hit.accent === 'accent';
  const isGhost = hit.accent === 'ghost';
  const scale = isAccent ? skin.accent_scale : isGhost ? skin.ghost_scale : 1;
  const r = skin.mark_r * scale;
  const color = isAccent ? skin.accent_color : isGhost ? skin.ghost_color : skin.mark_color;
  const nodes = [];
  if (hit.articulation === 'flam') {
    const gr = skin.mark_r * skin.flam_scale;
    const gk = lane.head === 'x_open' ? 'x' : lane.head;
    nodes.push(...head(gk, cx - r - gr - 1.5, cy, gr, color, { ...skin, mark_stroke: skin.mark_stroke * 0.7 }));
  }
  nodes.push(...head(lane.head, cx, cy, r, color, skin));
  if (isAccent) {
    const top = cy - r - 6.5;
    nodes.push(['path', {
      d: 'M' + rd(cx - 4) + ',' + rd(top) + 'L' + rd(cx + 4) + ',' + rd(top + 2.75) + 'L' + rd(cx - 4) + ',' + rd(top + 5.5),
      fill: 'none', stroke: color, 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }]);
  }
  if (isGhost) {
    const off = r + 3.5;
    const p = (x, dir) => 'M' + rd(x + dir * 2) + ',' + rd(cy - 5) + 'Q' + rd(x - dir * 2) + ',' + rd(cy) + ' ' + rd(x + dir * 2) + ',' + rd(cy + 5);
    nodes.push(['path', { d: p(cx - off, 1), fill: 'none', stroke: color, 'stroke-width': 1.2, 'stroke-linecap': 'round' }]);
    nodes.push(['path', { d: p(cx + off, -1), fill: 'none', stroke: color, 'stroke-width': 1.2, 'stroke-linecap': 'round' }]);
  }
  return nodes;
}

function text(x, y, size, fill, str, extra) {
  return ['text', { x: rd(x), y: rd(y), 'font-size': size, fill, ...extra }, esc(str)];
}

function renderLanes(id, model, skin) {
  const prefix = 'drumdrom-' + (id === null || id === undefined ? 0 : id);
  const perBar = model.steps_per_bar;
  const spb = model.steps_per_beat;
  const beats = model.time[0];
  const perRow = Math.max(1, Math.min(Math.floor(skin.bars_per_row) || 1, model.bars));
  const rowCount = Math.ceil(model.bars / perRow);
  const gridW = perRow * perBar * skin.cell_w;
  const x0 = skin.margin_left + skin.label_w;
  const lanesH = model.lanes.length * skin.row_h;
  const rowH = skin.count_h + lanesH;
  const labels = countLabels(beats, spb);

  // header: title, subtitle, time and tempo
  let y = skin.margin_top;
  const header = [];
  if (model.name) {
    y += skin.title_size;
    header.push(text(skin.margin_left, y, skin.title_size, skin.title_color, model.name, { 'font-weight': 'bold' }));
  }
  if (model.subtitle) {
    y += skin.subtitle_size + 4;
    header.push(text(skin.margin_left, y, skin.subtitle_size, skin.subtitle_color, model.subtitle));
  }
  const tempoY = model.name ? skin.margin_top + skin.title_size : skin.margin_top + skin.tempo_size;
  if (!model.name && !model.subtitle) y = tempoY;
  y += skin.title_gap;

  const width = Math.max(rd(x0 + gridW + skin.margin_right), 240);
  header.push(text(width - skin.margin_right, tempoY, skin.tempo_size, skin.subtitle_color, timeLabel(model),
    { 'text-anchor': 'end' }));

  const rows = [];
  for (let r = 0; r < rowCount; r++) {
    const firstBar = r * perRow;
    const nBars = Math.min(perRow, model.bars - firstBar);
    const w = nBars * perBar * skin.cell_w;
    const top = y + skin.count_h;
    const g = [];

    // lane rules
    for (let i = 0; i <= model.lanes.length; i++) {
      const ly = top + i * skin.row_h;
      g.push(['line', { x1: x0, y1: rd(ly), x2: rd(x0 + w), y2: rd(ly), stroke: skin.grid_color, 'stroke-width': skin.grid_width }]);
    }
    // beat lines, then bar lines
    for (let b = 0; b < nBars; b++) {
      for (let k = 1; k < beats; k++) {
        const bx = x0 + (b * perBar + k * spb) * skin.cell_w;
        g.push(['line', { x1: rd(bx), y1: rd(top), x2: rd(bx), y2: rd(top + lanesH), stroke: skin.beat_color, 'stroke-width': skin.beat_width }]);
      }
    }
    for (let b = 0; b <= nBars; b++) {
      const bx = x0 + b * perBar * skin.cell_w;
      g.push(['line', { x1: rd(bx), y1: rd(top - 4), x2: rd(bx), y2: rd(top + lanesH), stroke: skin.bar_color, 'stroke-width': skin.bar_width }]);
    }
    // counting
    for (let b = 0; b < nBars; b++) {
      labels.forEach((lab, s) => {
        const isBeat = s % spb === 0;
        g.push(text(x0 + (b * perBar + s + 0.5) * skin.cell_w, y + skin.count_h - 8, skin.count_size,
          isBeat ? skin.count_beat_color : skin.count_color, lab,
          { 'text-anchor': 'middle', 'font-weight': isBeat ? 'bold' : 'normal' }));
      });
    }
    // labels and marks
    model.lanes.forEach((lane, i) => {
      const cy = top + (i + 0.5) * skin.row_h;
      g.push(text(x0 - 10, cy + skin.label_size * 0.35, skin.label_size, skin.label_color, lane.name, { 'text-anchor': 'end' }));
      const marks = [];
      lane.hits.forEach(hit => {
        if (hit.bar < firstBar || hit.bar >= firstBar + nBars) return;
        const col = (hit.bar - firstBar) * perBar + hit.step_in_bar;
        marks.push(...mark(lane, hit, x0 + (col + 0.5) * skin.cell_w, cy, skin));
      });
      g.push(['g', { id: prefix + '-row' + r + '-' + lane.id }, ...marks]);
    });

    rows.push(['g', { id: prefix + '-row' + r }, ...g]);
    y += rowH + skin.row_gap;
  }
  const height = rd(y - skin.row_gap + skin.margin_bottom);

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
  ['rect', { width: '100%', height: '100%', fill: skin.bg_color }],
  ['g', { id: prefix + '-header' }, ...header],
  ...rows
  ];
}

module.exports = renderLanes;
