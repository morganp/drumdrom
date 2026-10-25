'use strict';

// Browser entry point, bundled as the global DrumDrom
const api = require('./index');
const processAll = require('./process-all');
const renderElement = require('./render-element');

module.exports = { ...api, processAll, renderElement };
