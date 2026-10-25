'use strict';

const { expect } = require('chai');
const fs = require('fs');
const json5 = require('json5');
const Ajv2020 = require('ajv/dist/2020');
const standalone = require('../lib/generated/validate-schema');
const { generate, ajvOptions, outFile } = require('../scripts/build-validator');
const { fixtureNames, fixtureText, source } = require('./helpers');

const schema = require('../schema/drumdrom.schema.json');

const invalid = [
  null, 3, 'text', [], {},
  source({ tempo: 500 }),
  source({ tempo: 'fast' }),
  source({ sections: [] }),
  source({ extra: 1 }),
  source({ format: 'other' }),
  source({ version: 2 }),
  source({ time: [4] }),
  source({ time: [4, 4, 4] }),
  source({ time: [0, 4] }),
  source({ time: [4, 3] }),
  source({ steps_per_beat: 0 }),
  source({ steps_per_beat: 1.5 }),
  source({ name: 7 }),
  source({ lanes: [] }),
  source({ lanes: {} }),
  source({ lanes: [{ id: 'bd' }] }),
  source({ lanes: [{ wave: 'x' }] }),
  source({ lanes: [{ id: 'Bad Id', wave: 'x' }] }),
  source({ lanes: [{ id: 'bd', wave: '' }] }),
  source({ lanes: [{ id: 'bd', wave: 'x', staff: 99 }, { id: 'sd', wave: 3, nope: true }] }),
  source({ kit: { 'Bad': {} } }),
  source({ kit: { xx: { name: '', gm: 200, staff: -9, head: 'round', more: 1 } } }),
  source({ config: { voices: 3, bars_per_row: 0, skin: 4, extra: {} } }),
  source({ tempo: 500, sections: [], lanes: [{ id: 'sd', wave: 'x.z' }, { wave: 3 }] })
];

describe('standalone validator', function() {
  const reference = new Ajv2020(ajvOptions).compile(schema);

  it('is current with schema/drumdrom.schema.json (run npm run build-validator)', function() {
    expect(fs.readFileSync(outFile, 'utf8')).to.equal(generate());
  });

  it('contains no code generation from strings', function() {
    const text = fs.readFileSync(outFile, 'utf8');
    expect(text).to.not.match(/new Function\(|\beval\(/);
  });

  it('agrees with a fresh ajv compile on every fixture', function() {
    fixtureNames().forEach(n => {
      const data = json5.parse(fixtureText(n));
      expect(standalone(data), n).to.equal(true);
      expect(reference(data), n).to.equal(true);
    });
  });

  invalid.forEach((data, i) => {
    it('reports the same errors as a fresh ajv compile for invalid input ' + i, function() {
      const got = standalone(data);
      const want = reference(data);
      expect(got).to.equal(want);
      expect(standalone.errors).to.deep.equal(reference.errors);
    });
  });

  it('rejects every invalid input', function() {
    invalid.forEach((d, i) => expect(standalone(d), 'input ' + i).to.equal(false));
  });
});
