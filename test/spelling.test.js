'use strict';

const { expect } = require('chai');
const { spell, spellBar, beamRuns, checkGrid, beatsPerGroup } = require('../lib/spelling');

// 'x' sounds, '.' is silence; the string is one beat. Result like "n8 n8" or "r16 n16 r8".
function spelled(beat, unit) {
  return spell(beat.split('').map(c => c === 'x'), unit).map(e => e.type[0] + e.value).join(' ');
}

describe('rhythm spelling', function() {
  it('writes a lone hit on the beat as a quarter note', function() {
    expect(spelled('x...')).to.equal('n4');
  });

  it('writes a silent beat as one quarter rest', function() {
    expect(spelled('....')).to.equal('r4');
  });

  it('writes only-eighth hats on a sixteenth grid with no sixteenth rests', function() {
    expect(spelled('x.x.')).to.equal('n8 n8');
  });

  it('writes four hits as sixteenths', function() {
    expect(spelled('xxxx')).to.equal('n16 n16 n16 n16');
  });

  it('keeps an eighth followed by two sixteenths', function() {
    expect(spelled('x.xx')).to.equal('n8 n16 n16');
  });

  describe('syncopation', function() {
    it('spells the off-beat eighth with an eighth rest first', function() {
      expect(spelled('..x.')).to.equal('r8 n8');
    });

    it('spells the "e" with a sixteenth rest and a sixteenth note', function() {
      expect(spelled('.x..')).to.equal('r16 n16 r8');
    });

    it('spells the "a" with the largest aligned rests before it', function() {
      expect(spelled('...x')).to.equal('r8 r16 n16');
    });

    it('lets a note absorb the silence up to the next hit when aligned', function() {
      expect(spelled('x..x')).to.equal('n8 r16 n16');
    });
  });

  describe('ghost notes', function() {
    it('spells a ghost like any other hit between sounding steps', function() {
      // snare on 16ths 2 and 4 around a backbeat: .o.o
      expect(spelled('.x.x')).to.equal('r16 n16 r16 n16');
    });
  });

  describe('6/8', function() {
    it('spells an eighth beat of two steps as an eighth note', function() {
      expect(spelled('x.', 8)).to.equal('n8');
      expect(spelled('xx', 8)).to.equal('n16 n16');
      expect(spelled('..', 8)).to.equal('r8');
    });

    it('beams groups of three eighth beats in compound meters', function() {
      expect(beatsPerGroup(6, 8)).to.equal(3);
      expect(beatsPerGroup(9, 8)).to.equal(3);
      expect(beatsPerGroup(4, 4)).to.equal(1);
      expect(beatsPerGroup(5, 8)).to.equal(1);
    });
  });

  describe('tom fill', function() {
    it('spells a sixteenth run on a beat as four notes', function() {
      const events = spell([true, true, true, true]);
      expect(events.map(e => e.slot)).to.deep.equal([0, 1, 2, 3]);
      expect(events.every(e => e.levels === 2)).to.equal(true);
    });

    it('covers each beat with no gap and no overlap', function() {
      ['xxxx', 'x.xx', '.xx.', 'x...', '.x.x', '....', 'xx..', '..xx'].forEach(b => {
        const total = spell(b.split('').map(c => c === 'x')).reduce((sum, e) => sum + e.steps, 0);
        expect(total, b).to.equal(4);
      });
    });
  });

  describe('beam runs', function() {
    const run = beat => beamRuns(spell(beat.split('').map(c => c === 'x'))).map(r => r.map(e => e.slot));

    it('beams adjacent eighths', function() {
      expect(run('x.x.')).to.deep.equal([[0, 2]]);
    });

    it('does not beam a quarter note or a lone note', function() {
      expect(run('x...')).to.deep.equal([]);
      expect(run('..x.')).to.deep.equal([]);
    });

    it('ends a run at a rest', function() {
      expect(run('xx.x')).to.deep.equal([[0, 1]]);
    });
  });

  describe('grid check', function() {
    it('accepts steps per beat 1, 2, 4 and 8', function() {
      [[1, 4], [2, 4], [4, 4], [8, 4], [2, 8]].forEach(([spb, unit]) => expect(() => checkGrid(spb, unit)).to.not.throw());
    });

    it('rejects triplet grids and steps shorter than a 32nd', function() {
      expect(() => checkGrid(3, 4)).to.throw(/staff notation/);
      expect(() => checkGrid(8, 8)).to.throw(/staff notation/);
    });
  });

  describe('bar spelling', function() {
    // 'x' sounds, 'O' sounds on a sustained lane, '.' is silence; the string is one bar.
    // Result like "n8. n16 r4": a dot after a value, ~ after a note tied to the next.
    function events(str, beats, spb, unit) {
      const cells = str.split('');
      return spellBar(cells.map(c => c !== '.'), cells.map(c => c === 'O'), beats, spb, unit);
    }
    function bar(str, beats, spb, unit) {
      return events(str, beats, spb, unit).map(e => e.type[0] + e.value + '.'.repeat(e.dots) + (e.tie_next ? '~' : '')).join(' ');
    }
    const four = str => bar(str, 4, 4, 4);
    const six = str => bar(str, 6, 2, 8);

    it('spells a beat like spell does when no dotted value or tie is possible', function() {
      ['x...', 'x.x.', 'xxxx', 'x.xx', '.x.x', '.x..', '..x.', 'xx..', '..xx', '.xx.', '....'].forEach(b => {
        const first = spellBar((b + 'x...x...x...').split('').map(c => c === 'x'), null, 4, 4, 4).filter(e => e.beat === 0);
        const legacy = spell(b.split('').map(c => c === 'x'));
        expect(first.map(e => [e.type, e.step, e.steps]), b).to.deep.equal(legacy.map(e => [e.type, e.slot, e.steps]));
      });
    });

    it('keeps the earlier eighth hat, ghost and tom fill spellings', function() {
      expect(four('x.x.x.x.x.x.x.x.')).to.equal('n8 n8 n8 n8 n8 n8 n8 n8');
      expect(four('.x.x.x.x.x.x.x.x')).to.equal('r16 n16 r16 n16 r16 n16 r16 n16 r16 n16 r16 n16 r16 n16 r16 n16');
      expect(four('xxxx............')).to.equal('n16 n16 n16 n16 r4 r4 r4');
      expect(four('x...x...........')).to.equal('n4 n4 r4 r4');
    });

    it('keeps a kick alone and its rests as a quarter note and quarter rests', function() {
      expect(four('x...............')).to.equal('n4 r4 r4 r4');
      expect(four('....x...........')).to.equal('r4 n4 r4 r4');
      expect(four('................')).to.equal('r4 r4 r4 r4');
    });

    describe('syncopation', function() {
      it('spells the off-beat eighth with an eighth rest first', function() {
        expect(four('..x.x...........')).to.equal('r8 n8 n4 r4 r4');
      });

      it('spells the "e" with a sixteenth rest, a sixteenth note and an eighth rest', function() {
        expect(four('.x..x...........')).to.equal('r16 n16 r8 n4 r4 r4');
      });

      it('spells the "a" with a dotted eighth rest', function() {
        expect(four('...xx...........')).to.equal('r8. n16 n4 r4 r4');
      });
    });

    describe('dotted notes', function() {
      it('writes a dotted eighth and a sixteenth for a hit three steps before the next', function() {
        expect(four('x..xx...x.......')).to.equal('n8. n16 n4 n4 r4');
      });

      it('writes a dotted eighth on any beat', function() {
        expect(four('....x..x........')).to.equal('r4 n8. n16 r4 r4');
      });

      it('writes a dotted quarter from beat 1 to the off-beat of 2', function() {
        expect(four('x.....x.x.......')).to.equal('n4. n8 n4 r4');
      });

      it('writes a dotted quarter from beat 3', function() {
        expect(four('x...x...x.....x.')).to.equal('n4 n4 n4. n8');
      });

      it('does not start a dotted quarter on beat 2 or 4', function() {
        expect(four('x...x.....x.....')).to.equal('n4 n4 r8 n8 r4');
      });

      it('does not dot a gap that is not exactly dotted', function() {
        expect(four('x......x........')).to.equal('n4 r8. n16 r4 r4');
      });

      it('does not dot a trailing note', function() {
        expect(four('x...............')).to.equal('n4 r4 r4 r4');
        expect(four('x.....x.........')).to.equal('n4. n8 r4 r4');
      });

      it('does not dot a half of a bar into the middle', function() {
        expect(four('x...........x...')).to.equal('n4 r4 r4 n4');
      });

      it('writes a dotted quarter in 2/4 and 3/4 only from beat 1', function() {
        expect(bar('x.....x.', 2, 4, 4)).to.equal('n4. n8');
        expect(bar('x.....x.....', 3, 4, 4)).to.equal('n4. n8 r4');
        expect(bar('....x.....x.', 3, 4, 4)).to.equal('r4 n4 r8 n8');
      });

      it('writes a dotted quarter for three eighth steps when a step is an eighth', function() {
        expect(bar('x..x..x.', 4, 2, 4)).to.equal('n4. n8 r4 n4');
      });
    });

    describe('the half bar line', function() {
      it('never lets a note or rest cross the middle of 4/4', function() {
        let seed = 7;
        const rand = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
        for (let i = 0; i < 2000; i++) {
          const str = Array.from({ length: 16 }, () => { const r = rand(); return r < 0.45 ? '.' : r < 0.85 ? 'x' : 'O'; }).join('');
          const evs = events(str, 4, 4, 4);
          let at = 0;
          evs.forEach(e => {
            expect(e.step, str).to.equal(at);
            expect(e.step < 8 && e.step + e.steps > 8, str + ' crosses').to.equal(false);
            expect(str[e.step] !== '.' || e.type === 'rest' || e.tie_prev, str).to.equal(true);
            for (let s = e.step + 1; s < e.step + e.steps; s++) expect(str[s], str + ' absorbs a hit').to.equal('.');
            if (e.tie_next || e.tie_prev) expect(str[e.from], str + ' tie').to.equal('O');
            at += e.steps;
          });
          expect(at, str).to.equal(16);
        }
      });
    });

    describe('ties', function() {
      it('ties an open hat over the beat line when no single value fits', function() {
        expect(four('..O.....x.......')).to.equal('r8 n8~ n4 n4 r4');
      });

      it('ties a quarter and a sixteenth', function() {
        expect(four('O....x..........')).to.equal('n4~ n16 n16 r8 r4 r4');
      });

      it('writes the half note without a tie when a sustained lane fits it', function() {
        expect(four('O.......x.......')).to.equal('n2 n4 r4');
      });

      it('writes a dotted quarter for a sustained lane when it fits', function() {
        expect(four('O.....x.........')).to.equal('n4. n8 r4 r4');
      });

      it('breaks a long hold at the half bar line with a tie', function() {
        expect(four('O...........x...')).to.equal('n2~ n4 n4');
      });

      it('marks the later notes of a chain and where they started', function() {
        const chain = events('..O.....x.......', 4, 4, 4).filter(e => e.type === 'note');
        expect(chain.map(e => [e.step, !!e.tie_prev, !!e.tie_next, e.from])).to.deep.equal([[2, false, true, 2], [4, true, false, 2], [8, false, false, undefined]]);
      });

      it('uses rests, not ties, for a lane that is not sustained', function() {
        expect(four('..x.....x.......')).to.equal('r8 n8 r4 n4 r4');
      });

      it('uses rests when the hold is not longer than a beat', function() {
        expect(four('...O.x..........')).to.equal('r8. n16 r16 n16 r8 r4 r4');
      });

      it('does not tie the final note into the next bar', function() {
        expect(four('...............O')).to.equal('r4 r4 r4 r8. n16');
      });

      it('falls back to rests for a chain of more than three notes', function() {
        expect(four('.O.............x')).to.equal('r16 n16 r8 r4 r4 r8. n16');
      });
    });

    describe('dotted rests', function() {
      it('dots a rest that is exactly the silence before the next hit', function() {
        expect(four('...x............')).to.equal('r8. n16 r4 r4 r4');
        expect(four('........x.....x.')).to.equal('r4 r4 n4. n8');
      });

      it('leaves a bar of rests as quarter rests', function() {
        expect(four('................')).to.equal('r4 r4 r4 r4');
      });

      it('does not dot a rest on beat 2', function() {
        expect(four('x...........x...')).to.equal('n4 r4 r4 n4');
      });
    });

    describe('6/8', function() {
      it('writes a hit on beat 1 then silence as a dotted quarter and a dotted quarter rest', function() {
        expect(six('x...........')).to.equal('n4. r4.');
      });

      it('writes two dotted quarters for hits on the two beats of the bar', function() {
        expect(six('x.....x.....')).to.equal('n4. n4.');
      });

      it('writes a dotted quarter rest before a hit on the second group', function() {
        expect(six('......x.....')).to.equal('r4. n4.');
      });

      it('writes a quarter and an eighth in a group', function() {
        expect(six('x...x.......')).to.equal('n4 n8 r4.');
      });

      it('keeps eighths and sixteenths per beat inside a group', function() {
        expect(six('x.x.x.x.x.x.')).to.equal('n8 n8 n8 n8 n8 n8');
        expect(six('xxx.xx..x...')).to.equal('n16 n16 n8 n16 n16 r8 n8 r8');
      });

      it('ties a sustained note over a group line', function() {
        expect(six('O.......x...')).to.equal('n4.~ n8 n8 r8');
      });

      it('uses rests where a lane is not sustained', function() {
        expect(six('x.......x...')).to.equal('n4. r8 n8 r8');
      });
    });

    describe('other meters', function() {
      it('spells each beat on its own in 5/4, 7/8 and 2/2', function() {
        expect(bar('x..x................', 5, 4, 4)).to.equal('n8 r16 n16 r4 r4 r4 r4');
        expect(bar('x.....x.......', 7, 2, 8)).to.equal('n8 r8 r8 n8 r8 r8 r8');
        expect(bar('x..x............', 2, 8, 2)).to.equal('n8 r16 n16 r4 r2');
      });
    });
  });
});
