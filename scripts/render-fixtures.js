'use strict';

// Renders every test fixture to <outdir>/<name>-staff.svg and
// <outdir>/<name>-lanes.svg. Used for docs/images and for the committed
// snapshots in test/snapshots.
const fs = require('fs');
const path = require('path');
const { renderSVG, styles } = require('../lib');

const root = path.join(__dirname, '..');
const outDir = path.resolve(root, process.argv[2] || 'docs/images');
const fixtures = path.join(root, 'test', 'fixtures');

fs.mkdirSync(outDir, { recursive: true });
fs.readdirSync(outDir).filter(f => f.endsWith('.svg')).forEach(f => fs.unlinkSync(path.join(outDir, f)));
fs.readdirSync(fixtures).filter(f => f.endsWith('.json5')).sort().forEach(f => {
  const source = fs.readFileSync(path.join(fixtures, f), 'utf8');
  styles.filter(style => style !== 'both').forEach(style => {
    const file = path.join(outDir, f.replace(/\.json5$/, '-' + style + '.svg'));
    fs.writeFileSync(file, renderSVG(source, { style }) + '\n', 'utf8');
    process.stdout.write('wrote ' + file + '\n');
  });
});
