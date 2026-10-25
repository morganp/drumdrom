# Todo

## Percussion staff renderer (done in 0.2.0)
Engraved drum notation as SVG, matching what the Metronome app draws (Metronome/Views/NotationDrawing.swift). The v0.1.0 lane chart is only the WaveDrom-style view; this is the notation view and should be the headline image in the README.

- [x] Port rhythm spelling from the app (`RhythmSpelling.swift`): longest aligned note value per beat, minimal rests, beam runs, no needless 16th rests
- [x] Staff layout: five lines, percussion clef, time signature, barlines, centring and clearance so a barline never touches the last note
- [x] Noteheads from the kit staff positions (bd 1, sd 5, hh 9 ...): x for hats, open-hat circle, filled heads, stems up for hands and down for feet, beams, flags, rests
- [x] Voices: hands up, feet down, as in the app
- [x] Accent (>) and ghost notes in parentheses (smaller, as in the app), flam grace note
- [x] Engraving quality: use real music glyphs (SMuFL, Bravura is OFL) as inline SVG paths rather than drawn shapes; check licence and size
- [x] Skins: default and dark, shared with the lane renderer
- [x] CLI `render --style staff|lanes`, API `renderStaff`, fixtures and snapshots for both
- [x] Replace the README images with staff output, keep one lane chart as the secondary view
- [x] One voice layout (0.3.0): all stems up, one shared stem per step, `config.voices: 2` keeps the two voice layout
- [x] Short stems for unbeamed notes in the one voice layout (0.3.1, `stem_length_lone`)
- [ ] Use the same renderer in the web editor preview
- [ ] Triplet and swing grids (the staff renderer rejects steps_per_beat other than 1, 2, 4, 8 with E_STAFF_GRID)
- [ ] Decide when `staff` becomes the default `--style`
- [ ] Dotted notes and ties across beats, merged rests in compound meters (6/8 writes eighth rests per beat)
- [ ] Open hat as a circled x head option (`noteheadCircleX`) and half notehead for 2/2 and 1/1

## Web release (dist branch)
Goal: use drumdrom on any web page without cloning the repo. Copy fretdrom's release model: CI builds the bundles and force-pushes `dist/` to an orphan `dist` branch on every push to `main` and every `v*` tag, so pages can load `drumdrom.min.js` straight from GitHub. Reference: fretdrom `.github/workflows/deploy-dist.yml` (`peaceiris/actions-gh-pages@v4`, `publish_branch: dist`, `force_orphan: true`).

- [x] `.github/workflows/deploy-dist.yml`: lint, test, build, publish `./dist` to the `dist` branch on push to `main` and `v*` tags (add `build-editor` once the web editor exists). No npm publish
- [x] `dist/` is git-ignored and untracked
- [ ] Decide the schema-free browser bundle first: the ajv build is about 207 KB and uses `new Function`, which breaks under strict CSP. The dist bundle should render without validation, with `validate` in the Node build
- [ ] Serve path: pick jsDelivr `cdn.jsdelivr.net/gh/morganp/drumdrom@dist/drumdrom.min.js` (or a `v*` pinned ref) and test it from a plain HTML page
- [ ] README "HTML pages" section with the script tag and a `drumdrom.render` snippet
- [ ] `examples/index.html` loads the `dist` bundle by URL, as a check that the hosted bundle works
- [ ] npm publish stays manual (`npm publish` by hand, no workflow) until the format settles; decide with fretdrom, which also points at unpkg
- [x] Release tags also create an immutable `dist-vX.Y.Z` tag pointing at that build
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

- [x] CI job `docs-current` runs `npm run docs` and `update-snapshots`, then `git diff --exit-code`
- [ ] Add "run `npm run docs` and `npm run update-snapshots`, commit the result" to the release steps in `CONTRIBUTING.md`
- [ ] Fail `scripts/render-fixtures.js` on a README or `docs/` image reference that no fixture produces

## Other roadmap
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
