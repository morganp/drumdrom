'use strict';

const { expect } = require('chai');
const { parse, DrumDromError } = require('../lib');
const { fixtureNames, fixtureText, source } = require('./helpers');

function lane(model, id) {
  return model.lanes.find(l => l.id === id);
}

function fails(src, code) {
  try {
    parse(src);
  } catch (e) {
    expect(e).to.be.instanceOf(DrumDromError);
    expect(e.code).to.equal(code);
    return e;
  }
  throw new Error('expected parse to throw ' + code);
}

describe('parse', function() {
  describe('fixtures', function() {
    fixtureNames().forEach(name => {
      it('parses ' + name, function() {
        const model = parse(fixtureText(name));
        expect(model.format).to.equal('drumdrom');
        expect(model.version).to.equal(1);
        expect(model.lanes.length).to.be.greaterThan(0);
      });
    });
  });

  describe('normalisation', function() {
    it('applies defaults', function() {
      const m = parse(source());
      expect(m).to.deep.include({ name: '', subtitle: '', tempo: null, steps_per_beat: 4, steps_per_bar: 16, bars: 1 });
      expect(m.time).to.deep.equal([4, 4]);
      expect(m.config).to.deep.equal({});
    });

    it('has deterministic top level key order', function() {
      expect(Object.keys(parse(source()))).to.deep.equal([
        'format', 'version', 'name', 'subtitle', 'tempo', 'time', 'steps_per_beat',
        'steps_per_bar', 'bars', 'lanes', 'config'
      ]);
    });

    it('has deterministic lane and hit key order', function() {
      const m = parse(source({ lanes: [{ id: 'sd', wave: 'f...............' }] }));
      expect(Object.keys(m.lanes[0])).to.deep.equal(['id', 'name', 'gm', 'staff', 'head', 'hits']);
      expect(Object.keys(m.lanes[0].hits[0])).to.deep.equal(['step', 'bar', 'step_in_bar', 'accent', 'articulation']);
    });

    it('fills lane data from the default kit', function() {
      const bd = lane(parse(source()), 'bd');
      expect(bd).to.deep.include({ name: 'Bass drum', gm: 36, staff: 1, head: 'normal' });
    });

    it('maps the wave alphabet', function() {
      const m = parse(source({ lanes: [{ id: 'sd', wave: 'xXof-........f..' }] }));
      const hits = lane(m, 'sd').hits;
      expect(hits.map(h => [h.step, h.accent, h.articulation])).to.deep.equal([
        [0, 'normal', undefined],
        [1, 'accent', undefined],
        [2, 'ghost', undefined],
        [3, 'normal', 'flam'],
        [13, 'normal', 'flam']
      ]);
    });

    it('treats . and - as rests', function() {
      expect(lane(parse(source({ lanes: [{ id: 'bd', wave: '.-.-.-.-.-.-.-.-' }] })), 'bd').hits).to.deep.equal([]);
    });

    it('keeps an empty lane', function() {
      expect(parse(source({ lanes: [{ id: 'bd', wave: '................' }] })).lanes).to.have.length(1);
    });

    it('sorts lanes into kit order and puts custom lanes last', function() {
      const m = parse(source({
        kit: { cb: { name: 'Cowbell', gm: 56, staff: 11 } },
        lanes: [
          { id: 'bd', wave: 'x...............' },
          { id: 'cb', wave: 'x...............' },
          { id: 'cr', wave: 'x...............' },
          { id: 'sd', wave: 'x...............' }
        ]
      }));
      expect(m.lanes.map(l => l.id)).to.deep.equal(['cr', 'sd', 'bd', 'cb']);
    });

    it('lets a lane override name and staff position', function() {
      const m = parse(source({ lanes: [{ id: 'sd', wave: 'x...............', name: 'Piccolo', pitch: 6 }] }));
      expect(lane(m, 'sd')).to.deep.include({ name: 'Piccolo', staff: 6 });
    });

    it('computes bar, step_in_bar and step for multi-bar waves', function() {
      const m = parse(source({ lanes: [{ id: 'bd', wave: 'x...............x.......x.......' }] }));
      expect(m.bars).to.equal(2);
      expect(lane(m, 'bd').hits.map(h => [h.step, h.bar, h.step_in_bar])).to.deep.equal([[0, 0, 0], [16, 1, 0], [24, 1, 8]]);
    });

    it('computes steps_per_bar for other meters', function() {
      const m = parse(source({ time: [6, 8], steps_per_beat: 2, lanes: [{ id: 'bd', wave: 'x...........' }] }));
      expect(m.steps_per_bar).to.equal(12);
      expect(m.time).to.deep.equal([6, 8]);
    });

    it('keeps tempo and config', function() {
      const m = parse(source({ tempo: 97.5, config: { skin: 'dark', bars_per_row: 1 } }));
      expect(m.tempo).to.equal(97.5);
      expect(m.config).to.deep.equal({ skin: 'dark', bars_per_row: 1 });
    });

    it('accepts an object or a string', function() {
      expect(parse(JSON.stringify(source()))).to.deep.equal(parse(source()));
    });

    it('is not mutated by the parser', function() {
      const src = source();
      const copy = JSON.parse(JSON.stringify(src));
      parse(src);
      expect(src).to.deep.equal(copy);
    });
  });

  describe('open hi-hat', function() {
    it('moves O on hh to a hit on ho', function() {
      const m = parse(source({ lanes: [{ id: 'hh', wave: 'x.O.x.O.x.O.x.O.' }] }));
      expect(lane(m, 'hh').hits.map(h => h.step)).to.deep.equal([0, 4, 8, 12]);
      expect(lane(m, 'ho').hits.map(h => h.step)).to.deep.equal([2, 6, 10, 14]);
      expect(lane(m, 'ho')).to.deep.include({ name: 'Open hi-hat', gm: 46, head: 'x_open' });
      expect(lane(m, 'ho').hits[0]).to.deep.include({ accent: 'normal', articulation: 'open' });
    });

    it('orders ho directly after hh', function() {
      const m = parse(source({ lanes: [{ id: 'bd', wave: 'x...............' }, { id: 'hh', wave: 'O...............' }] }));
      expect(m.lanes.map(l => l.id)).to.deep.equal(['hh', 'ho', 'bd']);
    });

    it('allows hh and ho hits on the same step in different lanes', function() {
      const m = parse(source({ lanes: [{ id: 'hh', wave: 'x...............' }, { id: 'ho', wave: 'x...............' }] }));
      expect(lane(m, 'hh').hits).to.have.length(1);
      expect(lane(m, 'ho').hits).to.have.length(1);
    });

    it('lets an explicit ho hit win over O on hh', function() {
      const m = parse(source({ lanes: [{ id: 'hh', wave: 'O...............' }, { id: 'ho', wave: 'X...............' }] }));
      expect(lane(m, 'ho').hits).to.have.length(1);
      expect(lane(m, 'ho').hits[0].accent).to.equal('accent');
    });

    it('marks every ho hit as open', function() {
      const m = parse(source({ lanes: [{ id: 'ho', wave: 'xo..............' }] }));
      expect(lane(m, 'ho').hits.map(h => h.articulation)).to.deep.equal(['open', 'open']);
    });

    it('rejects O on other lanes', function() {
      const e = fails(source({ lanes: [{ id: 'sd', wave: 'O...............' }] }), 'E_OPEN_HAT_LANE');
      expect(e.path).to.equal('lanes[0].wave');
      expect(e.index).to.equal(0);
    });
  });

  describe('bar separators', function() {
    it('ignores | for step counting', function() {
      const a = parse(source({ time: [1, 4], lanes: [{ id: 'bd', wave: 'x...|x...|x...|x...' }] }));
      const b = parse(source({ time: [1, 4], lanes: [{ id: 'bd', wave: 'x...x...x...x...' }] }));
      expect(a).to.deep.equal(b);
    });

    it('accepts leading and trailing separators', function() {
      expect(parse(source({ lanes: [{ id: 'bd', wave: '|x...x...x...x...|' }] })).bars).to.equal(1);
    });

    it('accepts multiple bars with separators', function() {
      expect(parse(source({ lanes: [{ id: 'bd', wave: 'x...x...x...x...|x...............' }] })).bars).to.equal(2);
    });

    it('rejects a bar segment of the wrong length', function() {
      const e = fails(source({ lanes: [{ id: 'bd', wave: 'x...x...x...x...|x...' }] }), 'E_BAR_LENGTH');
      expect(e.path).to.equal('lanes[0].wave');
      expect(e.index).to.equal(17);
      expect(e.message).to.include('4 steps, expected 16');
    });

    it('rejects an empty bar between separators', function() {
      fails(source({ lanes: [{ id: 'bd', wave: 'x...x...x...x...||x...x...x...x...' }] }), 'E_BAR_LENGTH');
    });

    it('requires a multiple of steps_per_bar without separators', function() {
      const e = fails(source({ lanes: [{ id: 'bd', wave: 'x...x...x...x' }] }), 'E_WAVE_LENGTH');
      expect(e.message).to.include('13 steps');
    });

    it('accepts any multiple of steps_per_bar', function() {
      expect(parse(source({ lanes: [{ id: 'bd', wave: '.'.repeat(48) }] })).bars).to.equal(3);
    });
  });

  describe('lane length', function() {
    it('rejects lanes of different length naming both lanes and lengths', function() {
      const e = fails(source({ lanes: [
        { id: 'bd', wave: 'x...............' },
        { id: 'sd', wave: 'x...............x...............' }
      ] }), 'E_LANE_LENGTH');
      expect(e.path).to.equal('lanes[1].wave');
      expect(e.message).to.include("lane 'sd' has 32 steps");
      expect(e.message).to.include("lane 'bd' has 16 steps");
    });
  });

  describe('characters', function() {
    it('rejects unknown characters with lane id and index', function() {
      const e = fails(source({ lanes: [{ id: 'sd', wave: 'x..z............' }] }), 'E_BAD_CHAR');
      expect(e.index).to.equal(3);
      expect(e.message).to.include("lane 'sd'");
      expect(e.message).to.include("'z'");
    });

    it('rejects whitespace', function() {
      fails(source({ lanes: [{ id: 'sd', wave: 'x... x...x...x...' }] }), 'E_BAD_CHAR');
    });

    ['r', 'b', 'd', '^', '1', '5', '9'].forEach(c => {
      it("rejects reserved character '" + c + "' as reserved for a future version", function() {
        const e = fails(source({ lanes: [{ id: 'sd', wave: c + '...............' }] }), 'E_RESERVED_CHAR');
        expect(e.message).to.include('reserved for a future version');
        expect(e.index).to.equal(0);
      });
    });
  });

  describe('header fields', function() {
    it('rejects an unsupported version', function() {
      fails(source({ version: 2 }), 'E_VERSION');
    });

    it('rejects a missing version', function() {
      const s = source();
      delete s.version;
      fails(s, 'E_SCHEMA');
    });

    it('rejects a wrong format', function() {
      fails(source({ format: 'wavedrom' }), 'E_FORMAT');
    });

    [19, 401, 'fast'].forEach(t => {
      it('rejects tempo ' + t, function() {
        fails(source({ tempo: t }), 'E_SCHEMA');
      });
    });

    [20, 400].forEach(t => {
      it('accepts tempo ' + t, function() {
        expect(parse(source({ tempo: t })).tempo).to.equal(t);
      });
    });

    [[4], [4, 4, 4], [0, 4], [4, 3], [4.5, 4], ['4', 4], '4/4'].forEach(t => {
      it('rejects time ' + JSON.stringify(t), function() {
        fails(source({ time: t }), 'E_SCHEMA');
      });
    });

    [0, 13, 2.5, '4'].forEach(n => {
      it('rejects steps_per_beat ' + JSON.stringify(n), function() {
        fails(source({ steps_per_beat: n }), 'E_SCHEMA');
      });
    });

    it('rejects sections as reserved', function() {
      const e = fails(source({ sections: [] }), 'E_RESERVED_KEY');
      expect(e.message).to.include('reserved for a future version');
      expect(e.path).to.equal('sections');
    });

    it('rejects unknown top level keys', function() {
      const e = fails(source({ groove: 'x' }), 'E_SCHEMA');
      expect(e.path).to.equal('groove');
    });

    it('rejects an unknown skin', function() {
      fails(source({ config: { skin: 'neon' } }), 'E_UNKNOWN_SKIN');
    });

    it('rejects empty lanes', function() {
      fails(source({ lanes: [] }), 'E_SCHEMA');
    });
  });

  describe('lanes and kit', function() {
    it('rejects an unknown lane id', function() {
      const e = fails(source({ lanes: [{ id: 'zz', wave: 'x...............' }] }), 'E_UNKNOWN_LANE');
      expect(e.path).to.equal('lanes[0].id');
    });

    it('rejects duplicate lane ids', function() {
      fails(source({ lanes: [{ id: 'bd', wave: 'x...............' }, { id: 'bd', wave: 'x...............' }] }), 'E_DUPLICATE_LANE');
    });

    it('accepts a custom kit lane', function() {
      const m = parse(source({
        kit: { cb: { name: 'Cowbell', gm: 56, staff: 11, head: 'diamond' } },
        lanes: [{ id: 'cb', wave: 'x...............' }]
      }));
      expect(m.lanes[0]).to.deep.include({ id: 'cb', name: 'Cowbell', gm: 56, staff: 11, head: 'diamond' });
    });

    it('defaults a custom head to normal', function() {
      const m = parse(source({ kit: { cb: { name: 'Cowbell', gm: 56, staff: 11 } }, lanes: [{ id: 'cb', wave: 'x...............' }] }));
      expect(m.lanes[0].head).to.equal('normal');
    });

    it('requires name, gm and staff for a new kit id', function() {
      const e = fails(source({ kit: { cb: { name: 'Cowbell' } } }), 'E_KIT');
      expect(e.message).to.include('gm, staff');
    });

    it('lets the kit override a default lane', function() {
      const m = parse(source({ kit: { bd: { name: 'Kick', gm: 35 } }, lanes: [{ id: 'bd', wave: 'x...............' }] }));
      expect(m.lanes[0]).to.deep.include({ name: 'Kick', gm: 35, staff: 1 });
    });

    it('rejects an invalid kit id', function() {
      fails(source({ kit: { 'Cow Bell': { name: 'x', gm: 1, staff: 1 } } }), 'E_SCHEMA');
    });

    it('rejects an invalid head', function() {
      fails(source({ kit: { bd: { head: 'star' } } }), 'E_SCHEMA');
    });
  });

  describe('syntax errors', function() {
    it('reports line and column from JSON5', function() {
      const e = fails('{\n  format: "drumdrom",\n  version: 1,\n  lanes: [ { id: "bd" wave: "x" } ]\n}', 'E_SYNTAX');
      expect(e.line).to.equal(4);
      expect(e.column).to.be.a('number');
    });
  });

  describe('error object', function() {
    it('lists all errors on err.errors', function() {
      const e = fails(source({ tempo: 1, steps_per_beat: 0 }), 'E_SCHEMA');
      expect(e.errors.length).to.equal(2);
    });
  });
});
