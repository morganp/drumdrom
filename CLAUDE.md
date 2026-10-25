# drumdrom

JSON5 to SVG renderer for drum patterns. Sibling of fretdrom, same architecture.

## Layout

- `docs/spec.md`: the authoritative format spec. `schema/drumdrom.schema.json` and `lib/validate.js` implement it. Change the spec first.
- `lib/`: `parse.js`, `validate.js` (schema plus semantic rules), `normalize.js`, `wave.js`, `kit.js`, `locate.js` (path to line and column), `errors.js`, `render-lanes.js`, `render-staff.js` (percussion staff), `spelling.js` (rhythm spelling), `glyphs.js` (generated Bravura outlines, run `scripts/extract-glyphs.js`, never edit), `common.js`, `stack.js`, `render-svg.js`, browser pieces (`process-all.js`, `render-element.js`, `create-element.js`), entry points `index.js` (node) and `drumdrom.js` (browser bundle, global `DrumDrom`).
- `skins/`: flat objects of colours and metrics. Register new ones in `lib/all-skins.js`.
- `bin/cli.js`: hand-rolled CLI (`render`, `validate`, `json`).
- `test/`: mocha and chai. `test/fixtures/*.json5` are rendered in both styles to `docs/images` (`npm run docs`) and to `test/snapshots` (`npm run update-snapshots`), as `<name>-staff.svg` and `<name>-lanes.svg`.

## Commands

- `npm test`, `npm run lint`, `npm run build` (esbuild IIFE into `dist/`, git-ignored).
- After an intended render change: `npm run update-snapshots && npm run docs`.

## Conventions

- CommonJS with `'use strict'`, snake_case keys, kebab-case file names, camelCase functions, semver 0.x.
- Every fenced `json5 drumdrom` block in the docs is tested; `json5 drumdrom-invalid` blocks must fail and may carry `// expect: E_CODE`.
- Output must be deterministic (stable ids, rounded numbers) so snapshots work.
- No em dashes in comments, docs or commit messages. Keep comments sparse.
