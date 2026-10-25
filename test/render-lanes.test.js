'use strict';

const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const { renderSVG, parse, skins } = require('../lib');
const { fixtureNames, fixtureText, source } = require('./helpers');

const snapDir = path.join(__dirname, 'snapshots');

function count(str, re) {
  return (str.match(re) || []).length;
}

function lanes(...rows) {
  return source({ lanes: rows.map(([id, wave]) => ({ id, wave })) });
}

describe('renderSVG', function() {
  describe('snapshots', function() {
    fixtureNames().forEach(name => {
      it(name + ' matches test/snapshots/' + name + '.svg (npm run update-snapshots)', function() {
        const expected = fs.readFileSync(path.join(snapDir, name + '.svg'), 'utf8');
        expect(renderSVG(fixtureText(name)) + '\n').to.equal(expected);
      });
    });

    it('has a snapshot for every fixture and no extras', function() {
      const snaps = fs.readdirSync(snapDir).filter(f => f.endsWith('.svg')).map(f => f.replace('.svg', ''));
      expect(snaps.sort()).to.deep.equal(fixtureNames());
    });
  });

  describe('document', function() {
    const svg = renderSVG(fixtureText('rock-backbeat'));

    it('is a standalone SVG with xmlns and viewBox', function() {
      expect(svg).to.match(/^<svg xmlns="http:\/\/www.w3.org\/2000\/svg"/);
      expect(svg).to.match(/viewBox="0 0 \d+(\.\d+)? \d+(\.\d+)?"/);
      expect(svg).to.include('</svg>');
    });

    it('has an accessible title and description', function() {
      expect(svg).to.include('role="img"');
      expect(svg).to.include('aria-labelledby="drumdrom-0-title drumdrom-0-desc"');
      expect(svg).to.include('<title id="drumdrom-0-title">Rock backbeat</title>');
      expect(svg).to.match(/<desc id="drumdrom-0-desc">Drum pattern in 4\/4, 1 bar, lanes: Closed hi-hat, Snare, Bass drum\.<\/desc>/);
    });

    it('shows name, subtitle and time with tempo', function() {
      expect(svg).to.include('>Rock backbeat<');
      expect(svg).to.include('Eighth-note hats');
      expect(svg).to.include('>4/4  q = 100<');
    });

    it('omits the tempo when absent', function() {
      const s = renderSVG(source({ name: 'x' }));
      expect(s).to.include('>4/4<');
      expect(s).to.not.include(' = ');
    });

    it('uses the denominator unit in the tempo label', function() {
      expect(renderSVG(source({ time: [6, 8], steps_per_beat: 2, tempo: 90, lanes: [{ id: 'bd', wave: 'x...........' }] }))).to.include('6/8  e = 90');
    });

    it('is deterministic', function() {
      expect(renderSVG(fixtureText('funk-ghost'))).to.equal(renderSVG(fixtureText('funk-ghost')));
    });

    it('uses stable ids derived from the id option', function() {
      const s = renderSVG(fixtureText('rock-backbeat'), { id: 7 });
      expect(s).to.include('id="drumdrom-7"');
      expect(s).to.include('id="drumdrom-7-row0-sd"');
    });

    it('escapes text', function() {
      const s = renderSVG(source({ name: 'Kick & <snare>' }));
      expect(s).to.include('Kick &amp; &lt;snare&gt;');
    });

    it('accepts source text, a source object or a model', function() {
      const text = fixtureText('rock-backbeat');
      expect(renderSVG(parse(text))).to.equal(renderSVG(text));
      expect(renderSVG(require('json5').parse(text))).to.equal(renderSVG(text));
    });

    it('throws for an invalid pattern', function() {
      expect(() => renderSVG(lanes(['bd', 'x']))).to.throw(/steps/);
    });
  });

  describe('layout', function() {
    it('draws one lane label per lane in kit order', function() {
      const s = renderSVG(lanes(['bd', 'x...............'], ['cr', 'x...............'], ['sd', 'x...............']));
      const order = ['>Crash<', '>Snare<', '>Bass drum<'].map(t => s.indexOf(t));
      expect(order.every(i => i > 0)).to.equal(true);
      expect(order).to.deep.equal(order.slice().sort((a, b) => a - b));
    });

    it('counts 1 e & a for four steps per beat', function() {
      const s = renderSVG(lanes(['bd', 'x...............']));
      expect(count(s, />e</g)).to.equal(4);
      expect(count(s, />a</g)).to.equal(4);
      expect(count(s, />&amp;</g)).to.equal(4);
      ['>1<', '>2<', '>3<', '>4<'].forEach(t => expect(s).to.include(t));
    });

    it('counts 1 & for two steps per beat', function() {
      const s = renderSVG(source({ steps_per_beat: 2, lanes: [{ id: 'bd', wave: 'x.......' }] }));
      expect(count(s, />&amp;</g)).to.equal(4);
      expect(s).to.not.include('>e<');
    });

    it('counts 1 for one step per beat', function() {
      const s = renderSVG(source({ steps_per_beat: 1, lanes: [{ id: 'bd', wave: 'x...' }] }));
      expect(s).to.not.include('&amp;');
    });

    it('counts 1 & a for three steps per beat', function() {
      const s = renderSVG(source({ steps_per_beat: 3, lanes: [{ id: 'bd', wave: 'x...........' }] }));
      expect(count(s, />a</g)).to.equal(4);
      expect(s).to.not.include('>e<');
    });

    it('uses plain step numbers for other steps per beat', function() {
      const s = renderSVG(source({ steps_per_beat: 5, lanes: [{ id: 'bd', wave: 'x' + '.'.repeat(19) }] }));
      expect(s).to.include('>20<');
      expect(s).to.not.include('>e<');
    });

    it('draws bar lines thicker than beat lines', function() {
      const s = renderSVG(fixtureText('tom-fill'));
      expect(count(s, /stroke-width="2"/g)).to.equal(3 + 0 + count(s, /<path[^>]*stroke-width="2"/g));
      expect(count(s, /<line[^>]*stroke="#333333" stroke-width="2"/g)).to.equal(3);
      expect(count(s, /<line[^>]*stroke="#bdbdbd"/g)).to.equal(6);
    });

    it('wraps bars into rows with bars_per_row', function() {
      const wave = 'x...............'.repeat(4);
      const wrapped = renderSVG(source({ config: { bars_per_row: 2 }, lanes: [{ id: 'bd', wave }] }));
      expect(count(wrapped, /id="drumdrom-0-row\d"/g)).to.equal(2);
      const single = renderSVG(source({ config: { bars_per_row: 4 }, lanes: [{ id: 'bd', wave }] }));
      expect(count(single, /id="drumdrom-0-row\d"/g)).to.equal(1);
      const width = s => Number(/width="([\d.]+)"/.exec(s)[1]);
      expect(width(single)).to.be.greaterThan(width(wrapped));
    });

    it('defaults to two bars per row', function() {
      const s = renderSVG(source({ lanes: [{ id: 'bd', wave: 'x...............'.repeat(3) }] }));
      expect(count(s, /id="drumdrom-0-row\d"/g)).to.equal(2);
    });

    it('aligns marks with the grid', function() {
      // bd on step 2 of a one-bar pattern: x0 = 16 + 104, cell 24 => centre 120 + 2.5 * 24
      const s = renderSVG(lanes(['bd', '..x.............']));
      expect(s).to.include('<circle cx="180"');
    });

    it('places a mark in the second bar of a row', function() {
      const s = renderSVG(source({ lanes: [{ id: 'bd', wave: '................x...............' }] }));
      expect(s).to.include('<circle cx="' + (120 + 16.5 * 24) + '"');
    });
  });

  describe('marks', function() {
    const circles = s => count(s, /<circle/g);

    it('draws a normal hit as a filled circle', function() {
      const s = renderSVG(lanes(['sd', 'x...............']));
      expect(circles(s)).to.equal(1);
      expect(s).to.include('r="6" fill="#222222"');
    });

    it('draws a cross for hat and cymbal heads', function() {
      const s = renderSVG(lanes(['hh', 'x...............']));
      expect(circles(s)).to.equal(0);
      expect(s).to.include('M');
      expect(count(s, /<path[^>]*stroke="#222222"/g)).to.equal(1);
    });

    it('draws an accent larger, in the accent colour, with a chevron', function() {
      const s = renderSVG(lanes(['sd', 'X...............']));
      expect(s).to.include('r="7.8" fill="#d9381e"');
      expect(count(s, /<path/g)).to.equal(1);
    });

    it('draws a ghost smaller with parentheses', function() {
      const s = renderSVG(lanes(['sd', 'o...............']));
      expect(s).to.include('r="4.5" fill="#8a8a8a"');
      expect(count(s, /<path/g)).to.equal(2);
    });

    it('draws an open hat as a cross with a ring', function() {
      const s = renderSVG(lanes(['ho', 'x...............']));
      expect(count(s, /<circle[^>]*fill="none"/g)).to.equal(1);
      expect(count(s, /<path/g)).to.equal(1);
    });

    it('draws O on hh as an open hat mark on its own lane', function() {
      const s = renderSVG(lanes(['hh', 'O...............']));
      expect(s).to.include('>Open hi-hat<');
      expect(count(s, /<circle[^>]*fill="none"/g)).to.equal(1);
    });

    it('draws a flam as a grace mark before the main mark', function() {
      const s = renderSVG(lanes(['sd', 'f...............']));
      expect(circles(s)).to.equal(2);
      const [grace, main] = (s.match(/<circle cx="[\d.]+"/g) || []).map(m => Number(/"([\d.]+)"/.exec(m)[1]));
      expect(grace).to.be.lessThan(main);
    });

    it('draws a diamond head for a custom lane', function() {
      const s = renderSVG(source({ kit: { cb: { name: 'Cowbell', gm: 56, staff: 11, head: 'diamond' } }, lanes: [{ id: 'cb', wave: 'x...............' }] }));
      expect(s).to.include('<polygon');
    });

    it('distinguishes normal, accent, ghost and open marks', function() {
      const marks = ['x', 'X', 'o'].map(c => renderSVG(lanes(['sd', c + '...............'])).match(/<circle[^>]*>/)[0]);
      expect(new Set(marks).size).to.equal(3);
    });
  });

  describe('skins', function() {
    it('ships default and dark', function() {
      expect(skins).to.have.all.keys('default', 'dark');
    });

    it('applies the dark skin', function() {
      const s = renderSVG(fixtureText('rock-backbeat'), { skin: 'dark' });
      expect(s).to.include(skins.dark.bg_color);
      expect(s).to.not.include(skins.default.bg_color);
    });

    it('applies the skin named in config', function() {
      expect(renderSVG(source({ config: { skin: 'dark' } }))).to.include(skins.dark.bg_color);
    });

    it('lets the skin option override config', function() {
      expect(renderSVG(source({ config: { skin: 'dark' } }), { skin: 'default' })).to.include(skins.default.bg_color);
    });

    it('applies per-diagram overrides from config', function() {
      const s = renderSVG(source({ config: { accent_color: '#00ff00', mark_r: 8 } }));
      expect(s).to.include('r="8"');
    });

    it('has the same keys in every skin', function() {
      Object.keys(skins).forEach(n => {
        expect(Object.keys(skins[n]).sort(), n).to.deep.equal(Object.keys(skins.default).sort());
      });
    });
  });
});
