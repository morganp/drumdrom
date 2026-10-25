# DrumDrom format specification, version 1

Status: version 1, shipped with drumdrom 0.1.0. This document is authoritative. The JSON Schema in `schema/drumdrom.schema.json` and the validator in `lib/validate.js` implement it, and the tests extract every fenced example below and check it, so the examples cannot drift from the code.

Words such as MUST and MUST NOT are used in the sense of RFC 2119.

## 1. Overview

A DrumDrom file describes a drum pattern as text: a time signature, a step grid and one string of characters per kit lane (a "wave"), in the spirit of WaveDrom. The renderers turn the pattern into diagrams. The model carries General MIDI note numbers and staff positions, which the percussion staff renderer (section 13) and the planned exports (section 12) use.

## 2. File format

- A file is a JSON5 document (https://json5.org). The top level value MUST be an object.
- The extensions `.drumdrom` and `.json5` are both accepted. Content, not extension, decides.
- Keys are snake_case. Unknown keys are errors, so typos are caught instead of ignored.
- Text is UTF-8.

Minimal file:

```json5 drumdrom
{
  format: 'drumdrom',
  version: 1,
  lanes: [
    { id: 'sd', wave: '....x.......x...' },
    { id: 'bd', wave: 'x.......x.......' }
  ]
}
```

## 3. Top level keys

| Key | Type | Required | Default | Meaning |
| --- | --- | --- | --- | --- |
| `format` | string | yes | | Always `"drumdrom"`. |
| `version` | integer | yes | | Format version. Always `1` in this specification. |
| `name` | string | no | `""` | Title. |
| `subtitle` | string | no | `""` | Second title line. |
| `tempo` | number | no | none | Beats per minute, 20 to 400 inclusive (section 3.1). |
| `time` | `[beats, unit]` | no | `[4, 4]` | Time signature. `beats` is an integer 1 to 32, `unit` is one of 1, 2, 4, 8, 16, 32. |
| `steps_per_beat` | integer | no | `4` | Grid resolution, 1 to 12. |
| `kit` | object | no | `{}` | Kit overrides and custom lanes (section 6). |
| `lanes` | array | yes | | One object per kit lane (section 4). At least one. |
| `config` | object | no | `{}` | Skin and layout overrides (section 8). |
| `sections` | | reserved | | Reserved for a later version. Version 1 files MUST NOT use it. Validators reject it with the message that it is reserved for a future version. |

### 3.1 Beats, steps and bars

A beat is one unit of the time signature denominator. In 4/4 a beat is a quarter note, in 6/8 a beat is an eighth note. `tempo` counts these beats per minute, and the tempo label on a chart names the unit (`q = 100` for quarter notes, `e = 120` for eighth notes).

A step is `1 / steps_per_beat` of a beat. A bar has `steps_per_bar = beats * steps_per_beat` steps.

| time | steps_per_beat | steps_per_bar | step length |
| --- | --- | --- | --- |
| 4/4 | 4 | 16 | sixteenth note |
| 4/4 | 2 | 8 | eighth note |
| 3/4 | 4 | 12 | sixteenth note |
| 6/8 | 2 | 12 | sixteenth note (beats are eighth notes) |
| 6/8 | 1 | 6 | eighth note |

Triplet and swing grids are not part of version 1.

## 4. Lanes

A lane object has these keys:

| Key | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string | yes | A lane id from the default kit (section 5) or declared in `kit`. Lowercase letter first, then lowercase letters, digits or `_`, 16 characters at most. |
| `wave` | string | yes | One character per step (section 4.1). |
| `name` | string | no | Overrides the lane display name for this file. |
| `staff` | integer | no | Overrides the staff position (half-spaces above the bottom line, section 5) for this lane. |

Lane ids MUST be unique within a file. All lanes MUST have the same number of steps. The order of lanes in a file does not matter: the normalised model and the renderers use the conventional kit order of section 5, with custom lanes last in file order.

### 4.1 Wave alphabet

A wave is a string with one ASCII character per step.

| Char | Meaning | Status |
| --- | --- | --- |
| `.` | rest | v1 |
| `-` | rest (same as `.`) | v1 |
| `x` | normal hit | v1 |
| `X` | accented hit | v1 |
| `o` | ghost note (soft hit) | v1 |
| `O` | open hi-hat, only on lane `hh` or `ho` | v1 |
| `f` | flam: a grace note just before the main hit | v1 |
| `r` | roll | reserved |
| `b` | buzz | reserved |
| `d` | drag | reserved |
| `^` | choke | reserved |
| `1` to `9` | velocity digits | reserved |
| `\|` | bar separator (section 4.2) | v1 |

A v1 validator MUST reject every other character, including spaces, with an error that names the lane id and the character index (0 based, counted in the wave string as written, separators included). Reserved characters are rejected with a message saying they are reserved for a future version. All bad characters in a wave are reported, not only the first.

Rules for `O`:

- `O` is valid on lane `hh` and on lane `ho`, and nowhere else.
- On `hh`, the normaliser moves the hit to lane `ho` at the same step. `ho` is created if the file did not declare it. The `hh` lane keeps its other hits.
- On `ho`, `O` is the same as `x`.
- `hh` and `ho` may both have a hit on the same step in different lanes. If `O` on `hh` and an explicit hit on `ho` land on the same step, the explicit `ho` hit wins and no duplicate is created.

```json5 drumdrom
{
  format: 'drumdrom',
  version: 1,
  name: 'Open hat on the off-beats',
  lanes: [
    { id: 'hh', wave: 'x.O.x.O.x.O.x.O.' },
    { id: 'sd', wave: '....X.......X...' },
    { id: 'bd', wave: 'x...x...x...x...' }
  ]
}
```

### 4.2 Bars and the bar separator

`|` is a readability aid and does not count as a step.

- If a wave contains no `|`, its length MUST be a multiple of `steps_per_bar`. Several bars are allowed.
- If a wave contains any `|`, every bar segment between separators MUST have exactly `steps_per_bar` steps. One leading and one trailing separator are allowed. An empty segment between two separators is an error.
- All lanes MUST have equal step length once the separators are removed. The error names the lane and both lengths.

```json5 drumdrom
{
  format: 'drumdrom',
  version: 1,
  name: 'Two bars with separators',
  lanes: [
    { id: 'hh', wave: '|x.x.x.x.x.x.x.x.|x.x.x.x.x.x.x.x.|' },
    { id: 'sd', wave: '|....x.......x...|....x.....x.x...|' },
    { id: 'bd', wave: '|x.......x.......|x.....x.x.......|' }
  ]
}
```

The same two bars without separators are valid too, because 32 is a multiple of 16:

```json5 drumdrom
{
  format: 'drumdrom',
  version: 1,
  lanes: [
    { id: 'sd', wave: '....x.......x.......x.....x.x...' },
    { id: 'bd', wave: 'x.......x.......x.....x.x.......' }
  ]
}
```

Examples of invalid waves:

```json5 drumdrom-invalid
{
  // expect: E_BAR_LENGTH
  format: 'drumdrom',
  version: 1,
  lanes: [{ id: 'bd', wave: 'x...x...x...x...|x...' }]
}
```

```json5 drumdrom-invalid
{
  // expect: E_LANE_LENGTH
  format: 'drumdrom',
  version: 1,
  lanes: [
    { id: 'bd', wave: 'x...............' },
    { id: 'sd', wave: 'x...............x...............' }
  ]
}
```

```json5 drumdrom-invalid
{
  // expect: E_RESERVED_CHAR
  format: 'drumdrom',
  version: 1,
  lanes: [{ id: 'sd', wave: 'r...............' }]
}
```

## 5. Default kit

Lane ids, in the conventional top to bottom chart order. `gm` is the General MIDI percussion note number (MIDI channel 10). `staff` is the percussion staff position in half-spaces above the bottom staff line (0 is the bottom line, 1 the first space, 2 the second line, and so on, negative is below the staff). The positions match the Metronome app, see section 10.

| id | Name | GM note | Staff | Head |
| --- | --- | --- | --- | --- |
| `cr` | Crash | 49 | 10 | `x` |
| `rd` | Ride | 51 | 8 | `x` |
| `hh` | Closed hi-hat | 42 | 9 | `x` |
| `ho` | Open hi-hat | 46 | 9 | `x_open` |
| `hp` | Pedal hi-hat | 44 | -1 | `x` |
| `sd` | Snare | 38 | 5 | `normal` |
| `rs` | Rimshot | 40 | 5 | `normal` |
| `cs` | Cross stick | 37 | 5 | `x` |
| `t1` | Hi tom | 50 | 7 | `normal` |
| `t2` | Lo tom | 47 | 6 | `normal` |
| `t3` | Floor tom | 43 | 3 | `normal` |
| `bd` | Bass drum | 36 | 1 | `normal` |

Heads: `normal` (filled oval), `x` (cross), `x_open` (cross with a circle, open hi-hat), `diamond`.

Notes on the General MIDI mapping (General MIDI Level 1 percussion map, notes 35 to 81):

- 36 is "Bass Drum 1", 38 "Acoustic Snare", 42 "Closed Hi-Hat", 44 "Pedal Hi-Hat", 46 "Open Hi-Hat", 49 "Crash Cymbal 1", 50 "High Tom", 51 "Ride Cymbal 1". These are certain.
- `cs` Cross stick is GM 37 "Side Stick". GM has no separate "cross stick" name, side stick is the standard equivalent.
- `rs` Rimshot has no General MIDI note of its own. DrumDrom maps it to 40, "Electric Snare", which many drum kits treat as the second, harder or rimmed snare sound. If you want a rimshot to play the acoustic snare, give `rs` a different `gm` in the file `kit` map (for example `kit: { rs: { gm: 38 } }`). This is a convention choice, not part of General MIDI, and may be revisited.
- `t1` Hi tom is 50 "High Tom". `t2` Lo tom is 47 "Low-Mid Tom". `t3` Floor tom is 43 "High Floor Tom" (41 is "Low Floor Tom"). GM numbers its toms 41, 43, 45, 47, 48, 50 from low to high, and a five-piece kit has no single canonical choice. The numbers above were written from knowledge of the General MIDI Level 1 specification and not checked against a copy of it. Uncertainty is highest for the toms and for `rs`.

The staff positions are visual placement for the percussion staff renderer (section 13), not a statement about any notation standard.

## 6. The kit map

The optional top level `kit` object overrides default lanes or declares new ones. Each key is a lane id, each value an object with these optional keys:

| Key | Type | Meaning |
| --- | --- | --- |
| `name` | string | Display name. |
| `gm` | integer 0 to 127 | MIDI note number. |
| `staff` | integer -6 to 14 | Staff position in half-spaces. |
| `head` | `normal`, `x`, `x_open`, `diamond` | Note head. Default `normal` for new ids. |

For an id that exists in the default kit, the given keys replace the defaults. For a new id, `name`, `gm` and `staff` are required. A new id MUST match `^[a-z][a-z0-9_]{0,15}$`.

```json5 drumdrom
{
  format: 'drumdrom',
  version: 1,
  name: 'Cowbell',
  kit: {
    cb: { name: 'Cowbell', gm: 56, staff: 11, head: 'diamond' },
    sd: { name: 'Snare (piccolo)' }
  },
  lanes: [
    { id: 'cb', wave: 'x...x...x...x.x.' },
    { id: 'sd', wave: '....x.......x...' },
    { id: 'bd', wave: 'x.......x.......' }
  ]
}
```

Using a lane id that is in neither the default kit nor `kit` is an error.

```json5 drumdrom-invalid
{
  // expect: E_UNKNOWN_LANE
  format: 'drumdrom',
  version: 1,
  lanes: [{ id: 'cb', wave: 'x...............' }]
}
```

## 7. Normalised model

`parse(source)` returns the model below, and `drumdrom json` prints it. Key order is fixed, so output can be diffed.

```json
{
  "format": "drumdrom",
  "version": 1,
  "name": "Rock backbeat",
  "subtitle": "",
  "tempo": 100,
  "time": [4, 4],
  "steps_per_beat": 4,
  "steps_per_bar": 16,
  "bars": 1,
  "lanes": [
    {
      "id": "sd",
      "name": "Snare",
      "gm": 38,
      "staff": 5,
      "head": "normal",
      "hits": [
        { "step": 4, "bar": 0, "step_in_bar": 4, "accent": "normal" }
      ]
    }
  ],
  "config": {}
}
```

| Key | Meaning |
| --- | --- |
| `name`, `subtitle` | Strings, empty when absent. |
| `tempo` | Number, or `null` when absent. |
| `time` | `[beats, unit]`, default applied. |
| `steps_per_beat`, `steps_per_bar` | Integers, default applied. |
| `bars` | Number of bars, `steps / steps_per_bar`. |
| `lanes` | Lanes in conventional kit order (section 5), custom lanes after in file order. Lanes with no hits are kept. |
| `lanes[].id`, `name`, `gm`, `staff`, `head` | Resolved from the default kit, the `kit` map and the lane's own `name` and `staff`. |
| `lanes[].hits` | Sorted by `step`. |
| `hits[].step` | Zero based step index across the whole pattern. |
| `hits[].bar` | Zero based bar index. |
| `hits[].step_in_bar` | Zero based step within the bar. |
| `hits[].accent` | `"normal"` (`x`, `f`, `O`), `"accent"` (`X`) or `"ghost"` (`o`). |
| `hits[].articulation` | Only present when set: `"flam"` for `f`, `"open"` for every hit on lane `ho` that is not a flam. |
| `config` | The file's `config` object, copied, `{}` when absent. This key is an addition to the minimal model so that a model alone is enough to render. |

Rests produce no hit.

## 8. Config

`config` holds the skin name, layout options and per-diagram skin overrides:

| Key | Type | Meaning |
| --- | --- | --- |
| `skin` | string | Skin name: `default` or `dark`. An unknown name is an error. |
| `bars_per_row` | integer 1 to 16 | Bars drawn per row of the lane chart or the staff. Default 2. |
| `voices` | 1 or 2 | Staff renderer only. 1 (default) writes every note in one voice with all stems up and one stem per step. 2 writes hands up and feet down as two voices. See section 13. |
| any skin key | number, string, boolean | Overrides that key of the skin for this diagram, for example `accent_color`. See `skins.md`. |

The `skin` option of `renderSVG` and the `-s` option of the CLI take precedence over `config.skin`.

## 9. Validation

Validation has two layers that together enforce this specification:

1. The JSON Schema `schema/drumdrom.schema.json` (JSON Schema 2020-12) checks structure, types, ranges and unknown keys. It deliberately does not check the wave alphabet, bar lengths or kit lookups, which need context.
2. Semantic rules in `lib/validate.js`: the wave alphabet and reserved characters, bar separators and lengths, equal lane lengths, lane ids against the kit, duplicate lanes, `O` placement, new kit ids having name, gm and staff, `sections`, `version` and `skin`.

`validate(input)` returns `{ ok, errors }` and collects every error. Each error is:

| Field | Meaning |
| --- | --- |
| `code` | Stable code, see below. |
| `message` | Human readable. |
| `path` | Location in the document, for example `lanes[1].wave`. Empty for syntax errors. |
| `line`, `column` | 1 based position in the source text, present when the input was text. For a wave error they point at the offending character. |
| `index` | For wave errors, the 0 based character index inside the wave string. |

`parse(source)` throws a `DrumDromError` for the first problem, with the same fields. All problems are on `err.errors`.

| Code | Meaning |
| --- | --- |
| `E_SYNTAX` | Not valid JSON5. |
| `E_SCHEMA` | A structural problem found by the schema: wrong type, range, enum, missing or unknown key. |
| `E_FORMAT` | `format` is not `"drumdrom"`. |
| `E_VERSION` | `version` is an integer other than 1. |
| `E_RESERVED_KEY` | `sections` used. |
| `E_UNKNOWN_LANE` | Lane id in neither the default kit nor `kit`. |
| `E_DUPLICATE_LANE` | Lane id used twice. |
| `E_KIT` | New kit id missing `name`, `gm` or `staff`. |
| `E_BAD_CHAR` | Character outside the alphabet. |
| `E_RESERVED_CHAR` | Character reserved for a future version. |
| `E_OPEN_HAT_LANE` | `O` on a lane other than `hh` or `ho`. |
| `E_BAR_LENGTH` | A bar segment between separators has the wrong length. |
| `E_WAVE_LENGTH` | Wave without separators is not a multiple of `steps_per_bar`. |
| `E_LANE_LENGTH` | Lanes differ in length. |
| `E_UNKNOWN_SKIN` | `config.skin` names no skin. |

```json5 drumdrom-invalid
{
  // expect: E_RESERVED_KEY
  format: 'drumdrom',
  version: 1,
  sections: [],
  lanes: [{ id: 'bd', wave: 'x...............' }]
}
```

```json5 drumdrom-invalid
{
  // expect: E_SCHEMA
  format: 'drumdrom',
  version: 1,
  tempo: 500,
  lanes: [{ id: 'bd', wave: 'x...............' }]
}
```

```json5 drumdrom-invalid
{
  // expect: E_SCHEMA
  format: 'drumdrom',
  version: 1,
  time: [4, 3],
  lanes: [{ id: 'bd', wave: 'x...............' }]
}
```

## 10. Relation to the Metronome app

The Metronome app stores a drum pattern on a 16th note grid per beat, with hits stored as (lane, accent) where accent is one of ghost, normal or accent. The mapping to DrumDrom:

| Metronome | DrumDrom |
| --- | --- |
| 16th grid, 4 per beat | `steps_per_beat: 4` |
| 4/4 pattern, 16 cells per bar | `time: [4, 4]`, maps one to one |
| ghost | `o` |
| normal | `x` |
| accent | `X` |
| kick row | `bd` |
| snare row | `sd` |
| hi-hat row, closed state | `hh` |
| hi-hat row, open state | `ho`, or `O` written on `hh` |
| pedal hi-hat row | `hp` |
| ride and crash rows | `rd`, `cr` |
| hi tom, lo tom, floor tom rows | `t1`, `t2`, `t3` |

The staff positions of section 5 are the positions the app uses: kick 1, floor tom 3, snare 5, lo tom 6, hi tom 7, ride 8, hats 9, crash 10, pedal hi-hat -1. Because the app's hat row holds either a closed or an open state per step, its two states become the two lanes `hh` and `ho` on export. Importing in the other direction, hits on `hh` and `ho` at the same step collapse to one cell in the app (which one wins is the importer's choice). A planned Swift package will read and write this format for the app.

## 11. Versioning

`version` is the format version, an integer. Version 1 is this document. A reader MUST reject a file whose `version` it does not support (`E_VERSION`). Reserved characters and keys are rejected today instead of ignored, so that files written for a later version never silently lose meaning in an older reader. The package follows Semantic Versioning 2.0.0 separately from the format version.

## 12. Reserved for later

The following are reserved and rejected in version 1:

- `sections` (named sections, repeats, per-section tempo or time changes).
- Wave characters `r` (roll), `b` (buzz), `d` (drag), `^` (choke), and `1` to `9` (velocity digits).

Planned consumers: MIDI export (General MIDI channel 10), ASCII drum tab import and export, MusicXML (unpitched), LilyPond `drummode`, Hydrogen, triplet and swing grids, a web editor, and a Swift package. Groove reuse and templating are out of scope.

## 13. Percussion staff rendering

The renderers do not change the file format. This section records how the staff renderer (`renderStaff`, `drumdrom render --style staff`) reads the model, so that other renderers can agree. The default style stays the lane chart.

**Staff and clef.** Five lines, a percussion clef, the time signature on the first row, a final barline after the last bar. Staff positions are half-spaces above the bottom line: 0 is the bottom line, 8 the top line, 9 the space above it, 10 the first ledger line above, and negative values lie below the staff. A lane's position is `lanes[].staff` of the model. Even positions beyond the staff get ledger lines.

**Heads.** `head` selects the notehead: `normal` a filled oval, `x` a cross, `x_open` a cross with a small circle above, `diamond` a diamond. The default kit positions are bd 1, t3 3, sd 5, rs 5, cs 5 (cross), t2 6, t1 7, rd 8, hh 9, ho 9, cr 10 and hp -1.

**Voices.** `config.voices` selects the layout: 1 (the default) or 2. Any other value is `E_SCHEMA`.

**One voice (`voices: 1`).** Every stem points up, as in the Metronome app. All heads that sound at the same step, from any lane, share a single stem. The stem runs from the lowest head to above the highest head by the usual stem length, so the beam clears hi-hat crosses, ghost parentheses and the accent mark. A kick alone on a step has its own up stem from the kick head. The beat is spelled once from the union of all lanes: a step sounds when any lane has a hit there. Notes are beamed by the rules below, so kick and hat steps beam together. The stems of a beamed group end at the shared beam height. An unbeamed note (a lone quarter, a flagged eighth or sixteenth) instead gets a short stem: it ends `stem_length_lone` staff spaces (default 3.5) above the centre of the highest head of the step, longer when its flags need it (`3.5 + 0.75 * (flags - 1)`, so 4.25 for a sixteenth and 5 for a thirty-second) and never lower than the middle line. The flag hangs from the stem end and the accent sits above it. `stem_length_lone` is a skin key (see `skins.md`), and `voices: 2` ignores it. A rest is drawn only where no lane sounds, centred on the staff, which means there are never rests under notes. `feet_rests` has no effect. Heads on neighbouring staff positions at one step (for example crash and hi-hat, positions 10 and 9) cannot share a column, so the upper head is drawn on the right side of the stem next to the lower one, and its ledger line is widened to cover it. Two heads a larger distance apart, such as snare and hi-hat, stay centred on the stem. An accent is drawn above the beam, or above the stem end of an unbeamed note.

**Two voices (`voices: 2`).** A lane whose `staff` is 1 or lower (bd, hp) is a foot lane and is written in the lower voice with stems down. All other lanes are hands, written in the upper voice with stems up. Hits of one voice at the same step share a stem. Each voice is spelled separately. A bar in which only one voice sounds is a single voice, and a bar with no hits is one whole rest. Rests that both voices share are merged.

**Rests under notes (two voices).** In a bar with both voices, a rest of either voice is not drawn when the other voice starts a note at any step the rest covers, from its first step up to but not including the step after it ends. A rest of a single step is therefore dropped when the other voice sounds at that step, and a longer rest (at most one beat, since nothing crosses a beat line) is dropped when the other voice sounds at its start or anywhere inside it. A note held over from an earlier step does not count. A rest the other voice does not start a note under is drawn as before, and rests that both voices share are still merged into one. `config.feet_rests: false` additionally hides every remaining rest of the lower voice in a two voice bar. `feet_rests` applies to `voices: 2` only.

**Spelling.** With two voices (`voices: 2`) each beat of each voice is spelled on its own and nothing crosses a beat line, exactly as in 0.3.1; dotted values and ties below do not apply there. With one voice the whole bar is spelled at once from the union of all lanes (a step sounds when any lane has a hit), in the meters listed under "Legal values". The written value of a run of steps follows from the time signature denominator and `steps_per_beat`: in 4/4 with 4 steps per beat a step is a sixteenth, in 6/8 with 2 steps per beat a step is a sixteenth and a beat an eighth. Staff output needs `steps_per_beat` of 1, 2, 4 or 8 with no step shorter than a 32nd; other grids (triplets) fail with `E_STAFF_GRID`.

**Durations (one voice).** An onset is a step where any lane has a hit. The gap of an onset is the number of steps to the next onset, or to the end of the bar when none follows (a trailing note). Every step of the bar belongs to exactly one written note or rest, so notes never overlap and a note never runs past the next onset or the barline. A note is written as one of the legal values below. The written value does not simply fill the gap: a drum hit is a short sound, so

1. A note is as long as the longest legal value that fits the gap and is no longer than one beat (a quarter in x/4, a dotted quarter in compound time), with one exception: a legal dotted value that is exactly as long as the gap, with a next onset to end it, is used. The rest of the gap is silence and is written as rests. A kick on beat 1 followed by nothing until beat 4 is a quarter note and rests, not a dotted half; a kick on beat 1 with the next hit on the "and" of 2 (gap 6 steps) is a dotted quarter.
2. A trailing note is never dotted in x/4 (it is a plain value no longer than a beat), and in compound time it is at most one dotted quarter.
3. A note whose heads include a sustained lane (open hat `ho`, crash `cr`, ride `rd`; fixed by lane id) and that is followed by another onset in the bar fills the gap to that onset when one legal value, including the half note, has exactly the length of the gap. When no single value fits and the gap is longer than one beat, the gap is written as a chain of at most three legal values joined by ties, taking the longest legal value first. In every other case it is written under rule 1. Ties are never used for other lanes, which are written with rests, and never across a barline (a sustained note at the end of a bar stops there; ties into the next bar are not supported).

**Legal values (one voice).** A value is a power of two number of steps (plain) or 1.5 times a power of two (dotted, one dot, never two). A plain note or rest starts on a multiple of its own length and is no longer than one beat. In addition:

- Simple time, denominator 4 and 2, 3 or 4 beats. A dotted eighth (3 sixteenths when a step is a sixteenth) may start on a beat. A dotted quarter may start on beat 1 or beat 3 (beat 1 only in 2/4 and 3/4, where beat 3 would run past the barline) and must end within the bar. In 4/4 the half bar line is the start of beat 3: no note and no rest crosses it, so a dotted quarter starts on beat 1 or 3 only and a half note, which is only written for a sustained lane (rule 3), starts on beat 1 or 3 only. A dotted half is not written. Dotted values are not made from a value shorter than an eighth. Rests follow the plain values and the dotted rest rule below, never a half or whole rest inside a bar; consecutive quarter rests stay quarter rests.
- Compound time, denominator 8 and a beat count that is a multiple of 3 (3/8, 6/8, 9/8, 12/8). Three beats form a group, which is one dotted quarter: a full dotted quarter note or rest starts on every group, and a plain quarter (two beats) may start on a group start. Nothing else crosses a beat line; notes and rests inside a group are plain values per beat. A silent group is one dotted quarter rest, and any run of silence from a group start that covers the whole group is written as the dotted quarter rest first.
- Other meters (5/4, 7/8, 2/2, and so on): each beat is spelled on its own with plain values, as in 0.3.1.

**Dotted rests (one voice).** A dotted rest uses the same start rules as a dotted note and is written only when its length is exactly the silence up to the next onset or the end of the bar (x/4), or whenever a whole group is silent (compound time). Otherwise silence is written as the largest plain rests that start on a multiple of their own length, none longer than one beat.

**Augmentation dots.** A dotted note or rest has a single dot. Dots after a note are drawn in the space to the right of the heads, one per head position and all in one column; a head on a line (even staff positions, including ledger lines) has its dot in the space above it, or below it if that space already holds the dot of another head of the chord. Dots after a rest sit in the space above the middle line. The stem of a dotted note is drawn as usual and the dot is beyond it.

**Ties.** A tie joins a head to the head of the same lane at the next note of a chain. Only heads of sustained lanes are tied; other heads at that onset are written on the first note of the chain only, and the later notes carry just the tied heads. Stems are up in this layout, so ties are drawn below the heads, as a filled lens shaped curve from just after the first head (after its dot, if it has one) to just before the second. The curve thickness is the skin key `tie_w` (staff spaces). An accent, ghost parentheses or a flam belong to the first note only.

**Beams.** Adjacent notes that are shorter than a quarter are beamed within a beat, and within a group of three beats when the denominator is 8 and the beat count is a multiple of three (6/8, 9/8, 12/8). A rest or a quarter note ends a beam. A second beam joins neighbouring sixteenths, and a sixteenth next to a longer note (a dotted eighth and a sixteenth, an eighth and two sixteenths) gets a short stub on the side of its neighbour, a broken beam. A dotted note beams like its undotted value, and the dot does not break the beam. A lone note shorter than a quarter gets a flag. Beams are flat, and one beam height is shared by a whole voice in a bar. With one voice the beam group is computed from the union of all lanes.

**Marks.** An accent (`X`) is a `>` above the beam for hands and below it for feet (above the beam, or the stem end of an unbeamed note, for every note when `voices` is 1). A ghost (`o`) is parenthesised and a little smaller, except on the hi-hat lanes (hh, ho, hp), where it is smaller and lighter without parentheses. A flam (`f`) is a slashed grace note before the main head. Spacing is proportional to time and follows the finest grid actually used in the bar, and a bar is widened if needed so that a barline never touches the last note.
