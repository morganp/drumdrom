# Todo

## Web release (dist branch)
Goal: use drumdrom on any web page without cloning the repo. Copy fretdrom's release model: CI builds the bundles and force-pushes `dist/` to an orphan `dist` branch on every push to `main` and every `v*` tag, so pages can load `drumdrom.min.js` straight from GitHub. Reference: fretdrom `.github/workflows/deploy-dist.yml` (`peaceiris/actions-gh-pages@v4`, `publish_branch: dist`, `force_orphan: true`).

- [ ] Add `.github/workflows/deploy-dist.yml`: checkout, Node 20, `npm ci`, `npm run build`, publish `./dist` to the `dist` branch (later `build-editor` once the web editor exists)
- [ ] Stop committing `dist/` on `main`; keep it git-ignored like fretdrom (check it is not tracked today)
- [ ] Decide the schema-free browser bundle first: the ajv build is about 207 KB and uses `new Function`, which breaks under strict CSP. The dist bundle should render without validation, with `validate` in the Node build
- [ ] Serve path: pick jsDelivr `cdn.jsdelivr.net/gh/morganp/drumdrom@dist/drumdrom.min.js` (or a `v*` pinned ref) and test it from a plain HTML page
- [ ] README "HTML pages" section with the script tag and a `drumdrom.render` snippet
- [ ] `examples/index.html` loads the `dist` bundle by URL, as a check that the hosted bundle works
- [ ] Publish to npm so unpkg works too (decide with fretdrom, which also points at unpkg)
- [ ] Version-pinned builds: tags build to the `dist` branch only; consider a `dist-v0.1.0` style path for immutable links
- [ ] GitHub Pages for the editor and examples once built

## Web editor (next)
Browser app to author drum patterns and see the lane chart update live. Modelled on fretdrom's `editor/` (static `editor/index.html` plus `editor/js/`, built by `npm run build-editor`, published by a CI workflow).

- [ ] Decide bundle: schema-free browser build (the ajv bundle is about 207 KB and needs `new Function`, so it breaks under strict CSP)
- [ ] Scaffold `editor/index.html`, `editor/js/`, `build-editor` script, deploy workflow
- [ ] Text pane (JSON5) with live SVG preview and parse errors shown at line and column
- [ ] Step grid editing: click a cell to place and cycle x, X, o, O, f, rest per lane
- [ ] Lane add, remove and reorder; kit picker; time signature, steps per beat and tempo fields
- [ ] Skin picker (default, dark)
- [ ] Load examples, import and export `.drumdrom` JSON5, copy and download SVG
- [ ] Undo and redo
- [ ] Optional audio preview (Web Audio) once the Metronome samples are reusable

## Docs images stay current
`npm run docs` already renders `docs/images` from the fixtures, but nothing forces it to run.

- [ ] CI step: `npm run docs && git diff --exit-code docs/images test/snapshots`, so a stale image fails the build
- [ ] Add "run `npm run docs` and `npm run update-snapshots`, commit the result" to the release steps in `CONTRIBUTING.md`
- [ ] Fail `scripts/render-fixtures.js` on a README or `docs/` image reference that no fixture produces

## Other roadmap
- [ ] Percussion staff renderer
- [ ] MIDI export (General MIDI channel 10)
- [ ] ASCII drum tab import and export
- [ ] MusicXML (unpitched), LilyPond `drummode`, Hydrogen export
- [ ] Sections, repeats and tempo changes
- [ ] Triplet and swing grids
- [ ] Roll, buzz and drag
- [ ] Swift package for the Metronome app
- [ ] Verify unconfirmed GM numbers (t1 50, t2 47, t3 43, rs 40)
- [ ] Dotted tempo for compound meters (6/8 felt in two)
- [ ] Custom lane ordering
