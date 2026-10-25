'use strict';

const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { source } = require('./helpers');

const dist = path.join(__dirname, '..', 'dist');

// Runs a built bundle in a context where eval and new Function throw, as under a
// Content-Security-Policy without 'unsafe-eval'. npm test builds dist/ first.
function load(file) {
  const context = vm.createContext({}, { codeGeneration: { strings: false, wasm: false } });
  vm.runInContext(fs.readFileSync(path.join(dist, file), 'utf8'), context, { filename: file });
  return context;
}

['drumdrom.js', 'drumdrom.min.js'].forEach(file => {
  describe('browser bundle ' + file + ' under a strict CSP', function() {
    before(function() {
      if (!fs.existsSync(path.join(dist, file))) {
        this.skip();
      }
    });

    it('is a context where code generation from strings is blocked', function() {
      const context = vm.createContext({}, { codeGeneration: { strings: false, wasm: false } });
      expect(() => vm.runInContext('new Function("return 1")', context)).to.throw(/code generation/i);
      expect(() => vm.runInContext('eval("1")', context)).to.throw(/code generation/i);
    });

    it('contains no new Function or eval', function() {
      const text = fs.readFileSync(path.join(dist, file), 'utf8');
      expect(text).to.not.match(/new Function\(|\beval\(/);
    });

    it('renders lanes, staff and both styles', function() {
      const { DrumDrom } = load(file);
      ['lanes', 'staff', 'both'].forEach(style => {
        const svg = DrumDrom.renderSVG(source({ lanes: [{ id: 'hh', wave: 'x.x.x.x.x.x.x.x.' }, { id: 'bd', wave: 'x...x...x...x...' }] }), { style });
        expect(svg, style).to.match(/^<svg /);
        expect(svg, style).to.include('</svg>');
      });
    });

    it('validates a bad file and reports located errors', function() {
      const { DrumDrom } = load(file);
      const text = "{\n  format: 'drumdrom', version: 1,\n  tempo: 500,\n  lanes: [{ id: 'sd', wave: 'x.z.............' }]\n}";
      const r = DrumDrom.validate(text);
      expect(r.ok).to.equal(false);
      const codes = r.errors.map(e => e.code);
      expect(codes).to.include('E_SCHEMA');
      expect(codes).to.include('E_BAD_CHAR');
      r.errors.forEach(e => expect(e.line, e.code).to.be.a('number'));
    });

    it('validates a good file', function() {
      const { DrumDrom } = load(file);
      expect(DrumDrom.validate(source({}))).to.deep.equal({ ok: true, errors: [] });
    });
  });
});
