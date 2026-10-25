'use strict';

const onml = require('onml');
const parse = require('./parse');
const renderLanes = require('./render-lanes');
const resolveSkin = require('./resolve-skin');
const allSkins = require('./all-skins');

function isModel(x) {
  return !!x && typeof x === 'object' && typeof x.steps_per_bar === 'number' && Array.isArray(x.lanes);
}

// Source text, source object or normalised model -> onml tree.
// options: { id, skin, config } (skin and config override the file's config)
function renderTree(input, options) {
  const opts = options || {};
  const model = isModel(input) ? input : parse(input);
  const cfg = { ...model.config, ...(opts.config || {}) };
  if (opts.skin) cfg.skin = opts.skin;
  return renderLanes(opts.id, model, resolveSkin(cfg, allSkins));
}

function renderSVG(input, options) {
  return onml.s(renderTree(input, options));
}

module.exports = { renderTree, renderSVG };
