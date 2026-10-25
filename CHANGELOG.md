# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project follows [Semantic Versioning 2.0.0](https://semver.org).

## [Unreleased]

### Roadmap

- Web editor (next)
- Percussion staff renderer
- MIDI export (General MIDI channel 10)
- ASCII drum tab import and export
- MusicXML (unpitched), LilyPond `drummode` and Hydrogen export
- Sections, repeats and tempo changes
- Triplet and swing grids
- Roll, buzz and drag
- Swift package for the Metronome app

## [0.1.0] - 2026-10-25

### Added

- Format specification, version 1 (`docs/spec.md`) with a JSON Schema 2020-12 (`schema/drumdrom.schema.json`).
- Parser and validator: `parse`, `validate`, `normalize` with all errors collected, error codes, paths, line and column.
- SVG lane chart renderer with `default` and `dark` skins, bar and beat lines, step counting, accent, ghost, open hat and flam marks.
- CLI: `render`, `validate`, `json`, stdin support.
- Browser bundle with global `DrumDrom` and `processAll()` for `<script type="drumdrom">`.
- Tests with JSON5 fixtures, committed SVG snapshots and a test that checks every example in the docs.
- GitHub Actions CI running lint and tests on Node 20 and 22.
