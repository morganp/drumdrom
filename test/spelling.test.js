'use strict';

const { expect } = require('chai');
const { spell, beamRuns, checkGrid, beatsPerGroup } = require('../lib/spelling');

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
});
