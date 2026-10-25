'use strict';

const { rd, esc, describe } = require('./common');

// Stacks two rendered diagrams (onml svg trees) into one document, the first
// above the second. Used for the 'both' style.
function stack(id, model, skin, first, second) {
  const prefix = 'drumdrom-' + id;
  const size = t => ({ w: t[1].width, h: t[1].height });
  const a = size(first);
  const b = size(second);
  const width = Math.max(a.w, b.w);
  const height = rd(a.h + b.h);
  const nest = (t, y) => {
    const { xmlns: _x, role: _r, 'aria-labelledby': _l, 'font-family': _f, ...attrs } = t[1];
    const rest = t.slice(2).filter(n => n[0] !== 'title' && n[0] !== 'desc');
    return ['svg', { ...attrs, x: 0, y: rd(y), 'font-family': skin.font_family }, ...rest];
  };
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
  nest(first, 0),
  nest(second, a.h)
  ];
}

module.exports = stack;
