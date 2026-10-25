# Todo

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
