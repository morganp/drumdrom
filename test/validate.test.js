'use strict';

const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020');
const { validate } = require('../lib');
const { formatError } = require('../lib/errors');
const { fixtureNames, fixtureText, source } = require('./helpers');

const schema = require('../schema/drumdrom.schema.json');

describe('validate', function() {
  it('returns ok for every fixture', function() {
    fixtureNames().forEach(n => {
      expect(validate(fixtureText(n))).to.deep.equal({ ok: true, errors: [] });
    });
  });

  it('collects all errors instead of stopping at the first', function() {
    const r = validate(source({
      tempo: 500,
      sections: [],
      lanes: [
        { id: 'sd', wave: 'x.z.............' },
        { id: 'zz', wave: 'x...............' },
        { id: 'bd', wave: 'x...x' }
      ]
    }));
    expect(r.ok).to.equal(false);
    expect(r.errors.map(e => e.code).sort()).to.deep.equal(
      ['E_BAD_CHAR', 'E_RESERVED_KEY', 'E_SCHEMA', 'E_UNKNOWN_LANE', 'E_WAVE_LENGTH']);
  });

  it('reports every bad character in a wave', function() {
    const r = validate(source({ lanes: [{ id: 'sd', wave: 'z.z.r...........' }] }));
    expect(r.errors.map(e => [e.code, e.index])).to.deep.equal([['E_BAD_CHAR', 0], ['E_BAD_CHAR', 2], ['E_RESERVED_CHAR', 4]]);
  });

  it('rejects the old lane key pitch as an unknown key and accepts staff', function() {
    const text = [
      '{',
      "  format: 'drumdrom', version: 1,",
      '  lanes: [',
      "    { id: 'sd', wave: 'x...............', pitch: 6 }",
      '  ]',
      '}'
    ].join('\n');
    const r = validate(text);
    expect(r.ok).to.equal(false);
    expect(r.errors[0]).to.include({ code: 'E_SCHEMA', path: 'lanes[0].pitch', line: 4, column: 43 });
    expect(r.errors[0].message).to.equal("unknown key 'pitch'");
    expect(validate(source({ lanes: [{ id: 'sd', wave: 'x...............', staff: 6 }] })).ok).to.equal(true);
  });

  it('accepts config.voices 1 and 2 and rejects anything else', function() {
    expect(validate(source({ config: { voices: 1 } })).ok).to.equal(true);
    expect(validate(source({ config: { voices: 2 } })).ok).to.equal(true);
    [3, 0, '1'].forEach(v => {
      const r = validate(source({ config: { voices: v } }));
      expect(r.ok).to.equal(false);
      expect(r.errors[0]).to.include({ code: 'E_SCHEMA', path: 'config.voices' });
    });
  });

  it('gives each error a code, message and path', function() {
    validate(source({ time: [4, 3], lanes: [{ id: 'bd', wave: 'q' }] })).errors.forEach(e => {
      expect(e.code).to.be.a('string');
      expect(e.message).to.be.a('string');
      expect(e.path).to.be.a('string');
    });
  });

  it('does not double report a path', function() {
    const r = validate(source({ format: 'x' }));
    expect(r.errors).to.have.length(1);
  });

  it('reports a non-object document', function() {
    expect(validate('[1, 2]').errors[0].code).to.equal('E_SCHEMA');
    expect(validate(42).ok).to.equal(false);
  });

  it('reports JSON5 syntax errors with line and column', function() {
    const r = validate('{ format: ');
    expect(r.ok).to.equal(false);
    expect(r.errors[0]).to.include({ code: 'E_SYNTAX', path: '' });
    expect(r.errors[0].line).to.equal(1);
    expect(r.errors[0].column).to.be.a('number');
  });

  describe('locations in source text', function() {
    const text = [
      '{',
      '  // comment with "quotes" and { braces',
      '  format: "drumdrom", version: 1,',
      '  tempo: 999,',
      '  sections: [],',
      '  lanes: [',
      "    { id: 'bd', wave: 'x...x...x...x...' },",
      "    { id: 'sd', wave: 'x..z............' },",
      '  ],',
      '}'
    ].join('\n');
    const errors = validate(text).errors;
    const byCode = c => errors.find(e => e.code === c);

    it('points at a value', function() {
      expect(byCode('E_SCHEMA')).to.include({ path: 'tempo', line: 4, column: 10 });
    });

    it('points at the key for reserved keys', function() {
      expect(byCode('E_RESERVED_KEY')).to.include({ line: 5, column: 3 });
    });

    it('points at the character inside a wave', function() {
      // wave string starts at column 24 on line 8: quote at 23, index 3 is column 27
      expect(byCode('E_BAD_CHAR')).to.include({ path: 'lanes[1].wave', line: 8, index: 3 });
      expect(byCode('E_BAD_CHAR').column).to.equal(text.split('\n')[7].indexOf("'x..z") + 1 + 1 + 3);
    });

    it('formats errors for the terminal', function() {
      expect(formatError(byCode('E_BAD_CHAR'))).to.match(/^lanes\[1\]\.wave \(line 8, column \d+\): .* \[E_BAD_CHAR\]$/);
    });
  });

  describe('JSON Schema', function() {
    const ajv = new Ajv2020({ strict: true, allowUnionTypes: true });
    const check = ajv.compile(schema);

    it('is a valid 2020-12 schema', function() {
      expect(schema.$schema).to.equal('https://json-schema.org/draft/2020-12/schema');
    });

    it('accepts every fixture', function() {
      const json5 = require('json5');
      fixtureNames().forEach(n => {
        expect(check(json5.parse(fixtureText(n))), n).to.equal(true);
      });
    });

    it('rejects sections', function() {
      expect(check(source({ sections: [] }))).to.equal(false);
    });

    it('rejects out of range structural values', function() {
      expect(check(source({ tempo: 10 }))).to.equal(false);
      expect(check(source({ time: [4, 5] }))).to.equal(false);
      expect(check(source({ steps_per_beat: 13 }))).to.equal(false);
      expect(check(source({ version: 2 }))).to.equal(false);
    });

    it('requires format, version and lanes', function() {
      ['format', 'version', 'lanes'].forEach(k => {
        const s = source();
        delete s[k];
        expect(check(s), k).to.equal(false);
      });
    });

    it('is shipped in the package files', function() {
      const pkg = require('../package.json');
      expect(pkg.files).to.include('schema/');
      expect(fs.existsSync(path.join(__dirname, '..', 'schema', 'drumdrom.schema.json'))).to.equal(true);
    });
  });
});
