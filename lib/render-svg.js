'use strict';

const onml = require('onml');
const parse = require('./parse');
const renderLanes = require('./render-lanes');
const renderStaff = require('./render-staff');
const stack = require('./stack');
const resolveSkin = require('./resolve-skin');
const allSkins = require('./all-skins');

function isModel(x) {
  return !!x && typeof x === 'object' && typeof x.steps_per_bar === 'number' && Array.isArray(x.lanes);
}

const STYLES = ['lanes', 'staff', 'both'];

// Source text, source object or normalised model -> onml tree.
// options: { id, skin, style, config } (skin and config override the file's
// config; style is 'lanes' (default), 'staff' or 'both')
function renderTree(input, options) {
  const opts = options || {};
  const style = opts.style || 'lanes';
  if (!STYLES.includes(style)) throw new Error("unknown style '" + style + "'; use one of " + STYLES.join(', '));
  const model = isModel(input) ? input : parse(input);
  const cfg = { ...model.config, ...(opts.config || {}) };
  if (opts.skin) cfg.skin = opts.skin;
  const skin = resolveSkin(cfg, allSkins);
  if (style === 'staff') return renderStaff(opts.id, model, skin);
  if (style === 'lanes') return renderLanes(opts.id, model, skin);
  const id = opts.id === null || opts.id === undefined ? 0 : opts.id;
  return stack(id, model, skin, renderStaff(id + '-staff', model, skin), renderLanes(id + '-lanes', model, skin, { header: false }));
}

function renderSVG(input, options) {
  return onml.s(renderTree(input, options));
}

module.exports = { renderTree, renderSVG, STYLES };
