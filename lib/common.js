'use strict';

// Helpers shared by the lane and staff renderers.

const rd = n => Math.round(n * 100) / 100;

// onml does not escape text content
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const UNIT_LETTER = { 1: 'w', 2: 'h', 4: 'q', 8: 'e', 16: 's', 32: 't' };

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

function text(x, y, size, fill, str, extra) {
  return ['text', { x: rd(x), y: rd(y), 'font-size': size, fill, ...extra }, esc(str)];
}

// Title and subtitle nodes. Returns where the content starts (y) and the
// baseline for the time and tempo label, which the caller places once the width
// is known.
function header(model, skin) {
  let y = skin.margin_top;
  const nodes = [];
  if (model.name) {
    y += skin.title_size;
    nodes.push(text(skin.margin_left, y, skin.title_size, skin.title_color, model.name, { 'font-weight': 'bold' }));
  }
  if (model.subtitle) {
    y += skin.subtitle_size + 4;
    nodes.push(text(skin.margin_left, y, skin.subtitle_size, skin.subtitle_color, model.subtitle));
  }
  const tempoY = model.name ? skin.margin_top + skin.title_size : skin.margin_top + skin.tempo_size;
  if (!model.name && !model.subtitle) y = tempoY;
  y += skin.title_gap;
  return { nodes, y, tempoY };
}

function tempoText(model, skin, width, tempoY) {
  return text(width - skin.margin_right, tempoY, skin.tempo_size, skin.subtitle_color, timeLabel(model), { 'text-anchor': 'end' });
}

module.exports = { rd, esc, text, timeLabel, describe, header, tempoText };
