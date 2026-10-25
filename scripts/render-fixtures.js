'use strict';

// Renders every test fixture to <outdir>/<name>.svg. Used for docs/images and
// for the committed snapshots in test/snapshots.
const fs = require('fs');
const path = require('path');
const { renderSVG } = require('../lib');

const root = path.join(__dirname, '..');
const outDir = path.resolve(root, process.argv[2] || 'docs/images');
const fixtures = path.join(root, 'test', 'fixtures');

fs.mkdirSync(outDir, { recursive: true });
fs.readdirSync(fixtures).filter(f => f.endsWith('.json5')).sort().forEach(f => {
  const svg = renderSVG(fs.readFileSync(path.join(fixtures, f), 'utf8'));
  fs.writeFileSync(path.join(outDir, f.replace(/\.json5$/, '.svg')), svg + '\n', 'utf8');
  process.stdout.write('wrote ' + path.join(outDir, f.replace(/\.json5$/, '.svg')) + '\n');
});
