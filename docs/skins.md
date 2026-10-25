# Skins

A skin is a flat object of colours and metrics, in `skins/`. Two ship with drumdrom: `default` and `dark`. Select one with `config: { skin: 'dark' }` in a file, `renderSVG(source, { skin: 'dark' })`, or `drumdrom render -s dark`.

Any skin key can be overridden for a single diagram by putting it in `config`:

```json5 drumdrom
{
  format: 'drumdrom',
  version: 1,
  config: { skin: 'dark', accent_color: '#ffcc00', cell_w: 28, bars_per_row: 1 },
  lanes: [
    { id: 'sd', wave: '....X.......X...' },
    { id: 'bd', wave: 'x.......x.......' }
  ]
}
```

## Keys

Colours:

| Key | Used for |
| --- | --- |
| `bg_color` | background |
| `text_color` | fallback text |
| `title_color`, `subtitle_color` | title, subtitle and time/tempo label |
| `label_color` | lane labels |
| `count_color`, `count_beat_color` | step counting, off-beat and beat |
| `grid_color` | lane rules |
| `beat_color` | beat lines |
| `bar_color` | bar lines |
| `mark_color`, `accent_color`, `ghost_color` | normal, accent and ghost marks |

Metrics (pixels):

| Key | Meaning |
| --- | --- |
| `font_family` | font stack |
| `title_size`, `subtitle_size`, `tempo_size`, `label_size`, `count_size` | font sizes |
| `cell_w` | width of one step |
| `row_h` | height of one lane |
| `label_w` | width reserved for lane labels |
| `count_h` | height of the counting row |
| `mark_r` | radius of a normal mark |
| `accent_scale`, `ghost_scale`, `flam_scale` | mark size factors |
| `mark_stroke` | stroke width of cross heads |
| `grid_width`, `beat_width`, `bar_width` | line widths |
| `margin_left`, `margin_right`, `margin_top`, `margin_bottom` | outer margins |
| `title_gap`, `row_gap` | vertical gaps |
| `bars_per_row` | bars per chart row, default 2 |

A custom skin used from code is a plain object passed through `config` keys, or a new file in `skins/` added to `lib/all-skins.js`.
