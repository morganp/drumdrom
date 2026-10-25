'use strict';

const pkg = require('../package.json');
const parse = require('./parse');
const normalize = require('./normalize');
const { validate } = require('./validate');
const { renderSVG, renderTree, STYLES } = require('./render-svg');
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
  renderStaff: (input, options) => renderSVG(input, { ...options, style: 'staff' }),
  renderLanes: (input, options) => renderSVG(input, { ...options, style: 'lanes' }),
  styles: STYLES,
  DrumDromError,
  kit: kit.kit,
  kitOrder: kit.order,
  skins: allSkins
};
