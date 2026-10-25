'use strict';

const pkg = require('../package.json');
const parse = require('./parse');
const normalize = require('./normalize');
const { validate } = require('./validate');
const { renderSVG, renderTree } = require('./render-svg');
const { DrumDromError } = require('./errors');
const kit = require('./kit');
const allSkins = require('./all-skins');

module.exports = {
  version: pkg.version,
  parse,
  validate,
  normalize,
  renderSVG,
  renderTree,
  DrumDromError,
  kit: kit.kit,
  kitOrder: kit.order,
  skins: allSkins
};
