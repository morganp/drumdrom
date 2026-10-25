'use strict';

const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const { renderSVG, renderStaff, renderLanes, skins, styles } = require('../lib');
const { fixtureNames, fixtureText, source } = require('./helpers');

const snapDir = path.join(__dirname, 'snapshots');

const count = (str, re) => (str.match(re) || []).length;
const uses = (s, glyph) => count(s, new RegExp('<use href="#drumdrom-0-g-' + glyph + '"', 'g'));

function lanes(...rows) {
  return source({ lanes: rows.map(([id, wave]) => ({ id, wave })) });
}

function twoVoices(...rows) {
  return source({ config: { voices: 2 }, lanes: rows.map(([id, wave]) => ({ id, wave })) });
}

describe('renderStaff', function() {
  describe('snapshots', function() {
    fixtureNames().forEach(name => {
      it(name + ' matches test/snapshots/' + name + '-staff.svg (npm run update-snapshots)', function() {
        const expected = fs.readFileSync(path.join(snapDir, name + '-staff.svg'), 'utf8');
        expect(renderStaff(fixtureText(name)) + '\n').to.equal(expected);
      });
    });
  });

  describe('document', function() {
    const svg = renderStaff(fixtureText('rock-backbeat'));

    it('is a standalone SVG with xmlns and viewBox', function() {
      expect(svg).to.match(/^<svg xmlns="http:\/\/www.w3.org\/2000\/svg"/);
      expect(svg).to.match(/viewBox="0 0 \d+(\.\d+)? \d+(\.\d+)?"/);
      expect(svg).to.include('</svg>');
    });

    it('has an accessible title and description', function() {
      expect(svg).to.include('aria-labelledby="drumdrom-0-title drumdrom-0-desc"');
      expect(svg).to.include('<title id="drumdrom-0-title">Rock backbeat</title>');
      expect(svg).to.include('lanes: Closed hi-hat, Snare, Bass drum.');
    });

    it('shows name, subtitle and time with tempo', function() {
      expect(svg).to.include('>Rock backbeat<');
      expect(svg).to.include('>4/4  q = 100<');
    });

    it('is deterministic and uses the id option for every id', function() {
      expect(renderStaff(fixtureText('funk-ghost'))).to.equal(renderStaff(fixtureText('funk-ghost')));
      const s = renderStaff(fixtureText('rock-backbeat'), { id: 7 });
      expect(s).to.include('id="drumdrom-7"');
      expect(s).to.include('id="drumdrom-7-g-noteheadXBlack"');
      expect(s).to.not.include('drumdrom-0');
    });

    it('does not use text for notation, only glyph paths', function() {
      expect(count(svg, /<text/g)).to.equal(3);
    });

    it('defines exactly the glyphs it uses, once each', function() {
      const defined = (svg.match(/<path id="drumdrom-0-g-(\w+)"/g) || []).map(m => /g-(\w+)"/.exec(m)[1]);
      const referenced = new Set((svg.match(/href="#drumdrom-0-g-(\w+)"/g) || []).map(m => /g-(\w+)"/.exec(m)[1]));
      expect(new Set(defined).size).to.equal(defined.length);
      expect(new Set(defined)).to.deep.equal(referenced);
    });

    it('throws for an invalid pattern', function() {
      expect(() => renderStaff(lanes(['bd', 'x']))).to.throw(/steps/);
    });

    it('throws for a grid it cannot write as notes', function() {
      const triplets = source({ steps_per_beat: 3, lanes: [{ id: 'bd', wave: 'x...........' }] });
      expect(() => renderStaff(triplets)).to.throw(/staff notation needs steps_per_beat/);
    });
  });

  describe('staff', function() {
    it('draws five lines, a percussion clef and a time signature', function() {
      const s = renderStaff(fixtureText('rock-backbeat'));
      expect(count(s, /stroke="#444444" stroke-width="1.17"/g)).to.equal(5);
      expect(uses(s, 'unpitchedPercussionClef1')).to.equal(1);
      expect(uses(s, 'timeSig4')).to.equal(2);
    });

    it('writes 6/8 with the right digits', function() {
      const s = renderStaff(fixtureText('six-eight'));
      expect(uses(s, 'timeSig6')).to.equal(1);
      expect(uses(s, 'timeSig8')).to.equal(1);
      expect(s).to.include('>6/8  e = 120<');
    });

    it('writes two digit signatures', function() {
      const s = renderStaff(source({ time: [12, 8], steps_per_beat: 2, lanes: [{ id: 'bd', wave: 'x' + '.'.repeat(23) }] }));
      expect(uses(s, 'timeSig1')).to.equal(1);
      expect(uses(s, 'timeSig2')).to.equal(1);
      expect(uses(s, 'timeSig8')).to.equal(1);
    });

    it('shows the time signature and a clef only on the first row, clef on each row', function() {
      const s = renderStaff(source({ lanes: [{ id: 'bd', wave: 'x'.repeat(1) + '.'.repeat(47) }] }));
      expect(uses(s, 'unpitchedPercussionClef1')).to.equal(2);
      expect(uses(s, 'timeSig4')).to.equal(2);
    });

    it('ends the piece with a final barline and other bars with a thin barline', function() {
      const s = renderStaff(fixtureText('tom-fill'));
      expect(count(s, /stroke-width="4.5"/g)).to.equal(1);
    });

    it('draws a whole rest for an empty bar', function() {
      const s = renderStaff(fixtureText('bar-rests'));
      expect(uses(s, 'restWhole')).to.equal(1);
    });

    it('breaks rows after bars_per_row bars', function() {
      const s = renderStaff(source({ config: { bars_per_row: 1 }, lanes: [{ id: 'bd', wave: 'x...............|x...............' }] }));
      expect(count(s, /id="drumdrom-0-system\d"/g)).to.equal(2);
    });
  });

  describe('noteheads', function() {
    it('draws hats and cymbals as x heads and drums as filled heads', function() {
      const s = renderStaff(lanes(['hh', 'x...............'], ['sd', 'x...............'], ['bd', 'x...............']));
      expect(uses(s, 'noteheadXBlack')).to.equal(1);
      expect(uses(s, 'noteheadBlack')).to.equal(2);
    });

    it('draws a diamond head for a custom lane', function() {
      const s = renderStaff(source({ kit: { cb: { name: 'Cowbell', gm: 56, staff: 11, head: 'diamond' } }, lanes: [{ id: 'cb', wave: 'x...............' }] }));
      expect(uses(s, 'noteheadDiamondBlack')).to.equal(1);
    });

    it('draws a ring above an open hat', function() {
      const s = renderStaff(lanes(['hh', 'O...............']));
      expect(count(s, /<circle/g)).to.equal(1);
      expect(uses(s, 'noteheadXBlack')).to.equal(1);
    });

    it('puts every drum at its kit staff position', function() {
      // one note per bar at the first step; u = 9, y = (4 - position / 2) * 9
      const want = { bd: 1, sd: 5, hh: 9, hp: -1, t1: 7, t2: 6, t3: 3, rd: 8, cr: 10 };
      Object.keys(want).forEach(id => {
        const s = renderStaff(lanes([id, 'x...............']));
        const m = /<use href="#drumdrom-0-g-notehead\w+" transform="translate\([\d.]+ (-?[\d.]+)\)/.exec(s);
        expect(Number(m[1]), id).to.be.closeTo((4 - want[id] / 2) * 9, 0.01);
      });
    });

    it('adds ledger lines above and below the staff', function() {
      const cr = renderStaff(lanes(['cr', 'x...............']));
      expect(count(cr, /stroke="#444444" stroke-width="1.44"/g)).to.equal(1);
      const hh = renderStaff(lanes(['hh', 'x...............']));
      expect(count(hh, /stroke="#444444" stroke-width="1.44"/g)).to.equal(0);
    });

    it('draws a flam as a grace note before the main head', function() {
      const s = renderStaff(lanes(['sd', 'f...............']));
      expect(uses(s, 'noteheadBlack')).to.equal(2);
      expect(uses(s, 'flag8thUp')).to.equal(1);
      const xs = (s.match(/#drumdrom-0-g-noteheadBlack" transform="translate\(([\d.]+)/g) || []).map(m => Number(/\(([\d.]+)/.exec(m)[1]));
      expect(Math.min(...xs)).to.be.lessThan(Math.max(...xs) - 10);
    });
  });

  describe('ghosts and accents', function() {
    it('puts a ghost snare in parentheses', function() {
      const s = renderStaff(lanes(['sd', 'o...............']));
      expect(uses(s, 'noteheadParenthesisLeft')).to.equal(1);
      expect(uses(s, 'noteheadParenthesisRight')).to.equal(1);
    });

    it('draws a ghost hat smaller and lighter, without parentheses', function() {
      const s = renderStaff(lanes(['hh', 'o...............']));
      expect(uses(s, 'noteheadParenthesisLeft')).to.equal(0);
      expect(s).to.include('fill="' + skins.default.ghost_color + '"');
      expect(s).to.include('scale(7.2)');
    });

    it('marks an accent above the stem and beam', function() {
      const s = renderStaff(lanes(['sd', 'X...............']));
      expect(uses(s, 'articAccentAbove')).to.equal(1);
    });

    it('puts a bass drum accent below in the two voices layout', function() {
      const s = renderStaff(twoVoices(['bd', 'X...............']));
      expect(uses(s, 'articAccentBelow')).to.equal(1);
      expect(uses(s, 'articAccentAbove')).to.equal(0);
    });
  });

  describe('one voice (default)', function() {
    const stemsOf = s => (s.match(/<line x1="([\d.]+)" y1="([\d.-]+)" x2="[\d.]+" y2="([\d.-]+)" stroke="#1a1a1a" stroke-width="1.08"/g) || [])
      .map(m => { const t = /x1="([\d.]+)" y1="([\d.-]+)" x2="[\d.]+" y2="([\d.-]+)"/.exec(m); return { x: Number(t[1]), y1: Number(t[2]), y2: Number(t[3]) }; });

    it('is the default and draws one group per bar', function() {
      const s = renderStaff(lanes(['hh', 'x...............'], ['bd', 'x...............']));
      expect(s).to.include('id="drumdrom-0-bar0"');
      expect(s).to.not.include('-bar0-hands');
      expect(s).to.not.include('-bar0-feet');
    });

    it('shares one up stem between a kick and a hat on the same step', function() {
      const s = renderStaff(lanes(['hh', 'x...............'], ['bd', 'x...............']));
      const stems = stemsOf(s);
      expect(stems).to.have.length(1);
      expect(stems[0].y2).to.be.lessThan(stems[0].y1);
      expect(uses(s, 'noteheadBlack')).to.equal(1);
      expect(uses(s, 'noteheadXBlack')).to.equal(1);
    });

    it('starts the shared stem at the lowest head and ends above the highest', function() {
      const s = renderStaff(lanes(['hh', 'x...............'], ['bd', 'x...............']));
      const stem = stemsOf(s)[0];
      expect(stem.y1).to.be.greaterThan(18);
      expect(stem.y2).to.be.lessThan(-4.5 - 3 * 9 + 0.1);
    });

    it('gives a kick alone its own up stem and a flag when unbeamed', function() {
      const s = renderStaff(lanes(['bd', '..x.............']));
      const stems = stemsOf(s);
      expect(stems).to.have.length(1);
      expect(stems[0].y2).to.be.lessThan(0);
      expect(uses(s, 'flag8thUp')).to.equal(1);
      expect(uses(s, 'flag8thDown')).to.equal(0);
    });

    it('displaces a head a second above another to the right of the stem', function() {
      const s = renderStaff(lanes(['hh', 'x...............'], ['cr', 'x...............']));
      expect(stemsOf(s)).to.have.length(1);
      const xs = (s.match(/#drumdrom-0-g-noteheadXBlack" transform="translate\(([\d.]+)/g) || []).map(m => Number(/\(([\d.]+)/.exec(m)[1]));
      expect(xs).to.have.length(2);
      const stemX = stemsOf(s)[0].x;
      expect(Math.min(...xs)).to.be.lessThan(stemX - 5);
      expect(Math.max(...xs)).to.be.greaterThan(stemX - 1);
    });

    it('draws a ledger line wide enough for a displaced head', function() {
      const s = renderStaff(lanes(['hh', 'x...............'], ['cr', 'x...............']));
      const m = /<line x1="([\d.]+)" y1="-9" x2="([\d.]+)" y2="-9" stroke="#444444"/.exec(s);
      expect(m).to.not.equal(null);
      const head = (s.match(/#drumdrom-0-g-noteheadXBlack" transform="translate\(([\d.]+)/g) || []).map(h => Number(/\(([\d.]+)/.exec(h)[1]));
      expect(Number(m[1])).to.be.at.most(Math.max(...head));
      expect(Number(m[2])).to.be.at.least(Math.max(...head) + 10.4);
    });

    it('keeps a snare and a hat on one stem without displacing either', function() {
      const s = renderStaff(lanes(['hh', 'x...............'], ['sd', 'x...............']));
      const xs = (s.match(/#drumdrom-0-g-note[A-Za-z]+" transform="translate\(([\d.]+)/g) || []).map(m => Number(/\(([\d.]+)/.exec(m)[1]));
      expect(Math.abs(xs[0] - xs[1])).to.be.lessThan(0.5);
    });

    it('draws rests only where no lane sounds', function() {
      const s = renderStaff(lanes(['hh', 'x...............'], ['bd', 'xx..............']));
      expect(uses(s, 'rest8th')).to.equal(1);
      expect(uses(s, 'restQuarter')).to.equal(3);
      const gap = renderStaff(lanes(['hh', 'x.......x.......'], ['bd', '..x.......x.....']));
      expect(uses(gap, 'restQuarter')).to.equal(2);
      expect(uses(gap, 'rest8th')).to.equal(0);
    });

    it('ignores feet_rests', function() {
      const wave = [{ id: 'hh', wave: 'x...............' }, { id: 'bd', wave: 'xx..............' }];
      const on = renderStaff(source({ lanes: wave }));
      const off = renderStaff(source({ config: { feet_rests: false }, lanes: wave }));
      expect(off).to.equal(on);
    });

    it('beams kick and hat steps together as one group', function() {
      const s = renderStaff(lanes(['hh', 'x.x.x.x.........'], ['bd', 'x...x...........']));
      expect(count(s, /<rect x=/g)).to.equal(2);
      expect(stemsOf(s)).to.have.length(4);
      const beamY = /<rect x="[\d.]+" y="(-?[\d.]+)"/.exec(s)[1];
      expect(stemsOf(s).every(st => String(st.y2) === beamY)).to.equal(true);
    });

    it('beams a kick-only step into the group with hats', function() {
      const s = renderStaff(lanes(['hh', 'x...............'], ['bd', '..x.............']));
      expect(count(s, /<rect x=/g)).to.equal(1);
      expect(uses(s, 'flag8thUp')).to.equal(0);
    });

    it('puts a bass drum accent above the beam', function() {
      const s = renderStaff(lanes(['bd', 'X...............']));
      expect(uses(s, 'articAccentAbove')).to.equal(1);
      expect(uses(s, 'articAccentBelow')).to.equal(0);
    });

    it('draws a pedal hat head on the shared stem', function() {
      const s = renderStaff(lanes(['hp', 'x...............']));
      expect(stemsOf(s)[0].y2).to.be.lessThan(stemsOf(s)[0].y1);
    });

    it('accepts voices 1 and 2 and renders them differently', function() {
      const wave = [{ id: 'hh', wave: 'x...............' }, { id: 'bd', wave: 'x...............' }];
      const one = renderStaff(source({ config: { voices: 1 }, lanes: wave }));
      const two = renderStaff(source({ config: { voices: 2 }, lanes: wave }));
      expect(one).to.equal(renderStaff(source({ lanes: wave })));
      expect(one).to.not.equal(two);
    });
  });

  describe('two voices (voices: 2)', function() {
    it('puts hands in one voice with stems up and feet in another with stems down', function() {
      const s = renderStaff(twoVoices(['hh', 'x...............'], ['bd', 'x...............']));
      expect(s).to.include('id="drumdrom-0-bar0-hands"');
      expect(s).to.include('id="drumdrom-0-bar0-feet"');
      const stems = (s.match(/<line x1="([\d.]+)" y1="([\d.-]+)" x2="[\d.]+" y2="([\d.-]+)" stroke="#1a1a1a" stroke-width="1.08"/g) || [])
        .map(m => { const t = /y1="([\d.-]+)" x2="[\d.]+" y2="([\d.-]+)"/.exec(m); return Number(t[2]) - Number(t[1]); });
      expect(stems).to.have.length(2);
      expect(stems[0]).to.be.lessThan(0);
      expect(stems[1]).to.be.greaterThan(0);
    });

    it('draws no feet voice when no foot plays in the bar', function() {
      const s = renderStaff(twoVoices(['hh', 'x...............']));
      expect(s).to.not.include('-bar0-feet');
    });

    it('merges rests that both voices share', function() {
      const s = renderStaff(twoVoices(['sd', 'x...............'], ['bd', 'x...............']));
      expect(uses(s, 'restQuarter')).to.equal(3);
    });

    it('can hide feet rests with the feet_rests skin key', function() {
      const wave = [{ id: 'hh', wave: 'x...............' }, { id: 'bd', wave: 'xx..............' }];
      expect(uses(renderStaff(source({ config: { voices: 2 }, lanes: wave })), 'rest8th')).to.equal(1);
      expect(uses(renderStaff(source({ config: { voices: 2, feet_rests: false }, lanes: wave })), 'rest8th')).to.equal(0);
    });

    it('leaves out feet rests under hand notes', function() {
      const s = renderStaff(twoVoices(['hh', 'xxxxxxxxxxxxxxxx'], ['bd', 'x...............']));
      expect(uses(s, 'restQuarter')).to.equal(0);
    });

    it('leaves out hand rests under foot notes', function() {
      const s = renderStaff(twoVoices(['sd', 'x...............'], ['bd', 'x...x...x...x...']));
      expect(uses(s, 'restQuarter')).to.equal(0);
    });

    it('keeps a rest when the other voice is silent there', function() {
      const s = renderStaff(twoVoices(['hh', 'x...............'], ['bd', 'xx..............']));
      expect(uses(s, 'rest8th')).to.equal(1);
      expect(uses(s, 'restQuarter')).to.equal(3);
    });

    it('leaves out a long rest when the other voice starts a note inside it', function() {
      const s = renderStaff(twoVoices(['hh', 'x....xxx........'], ['bd', 'x...............']));
      expect(uses(s, 'rest16th')).to.equal(1);
      expect(uses(s, 'restQuarter')).to.equal(2);
    });
  });

  describe('rests and beams', function() {
    it('writes only-eighth hats on a sixteenth grid without sixteenth rests', function() {
      const s = renderStaff(fixtureText('rock-backbeat'));
      expect(uses(s, 'rest16th')).to.equal(0);
      expect(uses(s, 'rest8th')).to.equal(0);
      expect(count(s, /<rect x=/g)).to.equal(4);
    });

    it('beams eighth notes in pairs and sixteenths with a second beam', function() {
      const eighths = renderStaff(lanes(['hh', 'x.x.x.x.x.x.x.x.']));
      expect(count(eighths, /<rect x=/g)).to.equal(4);
      const sixteenths = renderStaff(lanes(['hh', 'xxxxxxxxxxxxxxxx']));
      expect(count(sixteenths, /<rect x=/g)).to.equal(8);
    });

    it('draws a lone eighth with a flag instead of a beam', function() {
      const s = renderStaff(lanes(['sd', 'x.x.............']));
      expect(uses(s, 'flag8thUp')).to.equal(0);
      const lone = renderStaff(lanes(['sd', '..x.............']));
      expect(uses(lone, 'flag8thUp')).to.equal(1);
      expect(uses(lone, 'rest8th')).to.equal(1);
    });

    it('beams six eighths of a 6/8 bar in two groups of three', function() {
      const s = renderStaff(lanes2([6, 8], 2, 'rd', 'x.x.x.x.x.x.'));
      expect(count(s, /<rect x=/g)).to.equal(2);
    });

    it('beams a tom fill and a syncopated sixteenth figure', function() {
      const s = renderStaff(fixtureText('tom-fill'));
      expect(uses(s, 'noteheadBlack')).to.be.greaterThan(8);
      const sync = renderStaff(lanes(['sd', '.x.x............']));
      expect(uses(sync, 'rest16th')).to.equal(2);
    });
  });

  describe('layout', function() {
    // content of the first bar in a one bar pattern, from the thin barline
    function clearance(s) {
      const u = 9;
      const rights = [];
      const re = /<use href="#drumdrom-0-g-(notehead\w+|flag\w+)" transform="translate\(([\d.]+) [-\d.]+\) scale\(([\d.]+)\)/g;
      let m;
      const glyphs = require('../lib/glyphs');
      while ((m = re.exec(s))) rights.push(Number(m[2]) + glyphs[m[1]].w * Number(m[3]));
      const bars = (s.match(/<line x1="([\d.]+)" y1="0" x2="[\d.]+" y2="36" stroke="#1a1a1a" stroke-width="1.44"/g) || []);
      const thin = Number(/x1="([\d.]+)"/.exec(bars[bars.length - 1])[1]);
      return (thin - Math.max(...rights)) / u;
    }

    it('keeps the last note clear of the final barline', function() {
      ['rock-backbeat', 'funk-ghost', 'disco-open-hat', 'six-eight'].forEach(name => {
        expect(clearance(renderStaff(fixtureText(name))), name).to.be.greaterThan(0.4);
      });
      const lastFlag = renderStaff(lanes(['sd', '..............x.']));
      expect(clearance(lastFlag)).to.be.greaterThan(0.4);
    });

    it('widens a bar rather than crowd a flagged note against the barline', function() {
      const s = renderStaff(source({ steps_per_beat: 1, time: [1, 4], lanes: [{ id: 'sd', wave: 'x' }] }));
      expect(clearance(s)).to.be.greaterThan(0.4);
    });

    it('scales with staff_space', function() {
      const small = renderStaff(source({ config: { staff_space: 6 } }));
      const big = renderStaff(source({ config: { staff_space: 12 } }));
      const h = x => Number(/viewBox="0 0 [\d.]+ ([\d.]+)"/.exec(x)[1]);
      expect(h(big)).to.be.greaterThan(h(small));
    });

    it('leaves room above and below for stems, beams and accents', function() {
      const s = renderStaff(twoVoices(['cr', 'X...............'], ['bd', 'X...............']));
      const m = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(s);
      expect(Number(m[2])).to.be.greaterThan(150);
    });
  });

  describe('skins', function() {
    it('applies the dark skin', function() {
      const s = renderStaff(fixtureText('rock-backbeat'), { skin: 'dark' });
      expect(s).to.include(skins.dark.bg_color);
      expect(s).to.include(skins.dark.ink_color);
      expect(s).to.include(skins.dark.staff_color);
      expect(s).to.not.include(skins.default.ink_color);
    });

    it('applies per-diagram overrides from config', function() {
      const s = renderStaff(source({ config: { ink_color: '#00ff00' } }));
      expect(s).to.include('#00ff00');
    });
  });

  describe('styles', function() {
    it('lists the styles', function() {
      expect(styles).to.deep.equal(['lanes', 'staff', 'both']);
    });

    it('renders lanes by default', function() {
      const text = fixtureText('rock-backbeat');
      expect(renderSVG(text)).to.equal(renderLanes(text));
      expect(renderSVG(text, { style: 'staff' })).to.equal(renderStaff(text));
    });

    it('rejects an unknown style', function() {
      expect(() => renderSVG(source(), { style: 'tab' })).to.throw(/unknown style 'tab'/);
    });

    it('stacks staff above lanes for both', function() {
      const s = renderSVG(fixtureText('funk-ghost'), { style: 'both' });
      expect(count(s, /<svg /g)).to.equal(3);
      expect(count(s, /<title /g)).to.equal(1);
      expect(s.indexOf('drumdrom-0-staff-system0')).to.be.lessThan(s.indexOf('drumdrom-0-lanes-row0'));
      const ids = (s.match(/ id="[^"]+"/g) || []);
      expect(new Set(ids).size).to.equal(ids.length);
    });
  });
});

function lanes2(time, spb, id, wave) {
  return source({ time, steps_per_beat: spb, lanes: [{ id, wave }] });
}
