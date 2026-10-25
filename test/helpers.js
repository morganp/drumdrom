'use strict';

const fs = require('fs');
const path = require('path');

const fixtureDir = path.join(__dirname, 'fixtures');

function fixtureNames() {
  return fs.readdirSync(fixtureDir).filter(f => f.endsWith('.json5')).sort().map(f => f.replace(/\.json5$/, ''));
}

function fixtureText(name) {
  return fs.readFileSync(path.join(fixtureDir, name + '.json5'), 'utf8');
}

// Minimal valid source with overrides
function source(overrides) {
  return { format: 'drumdrom', version: 1, lanes: [{ id: 'bd', wave: 'x...x...x...x...' }], ...overrides };
}

module.exports = { fixtureDir, fixtureNames, fixtureText, source };
