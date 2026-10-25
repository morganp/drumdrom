'use strict';

const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const { validate, parse } = require('../lib');

// Every ```json5 drumdrom block in the docs must be a valid pattern and every
// ```json5 drumdrom-invalid block must be rejected.
const files = ['docs/spec.md', 'README.md', 'docs/skins.md'];

function blocks(file) {
  const text = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const out = [];
  const re = /^```json5 (drumdrom-invalid|drumdrom)[ \t]*\n([\s\S]*?)^```/gm;
  let m;
  while ((m = re.exec(text))) {
    out.push({ kind: m[1], body: m[2], line: text.slice(0, m.index).split('\n').length });
  }
  return out;
}

describe('documentation examples', function() {
  files.forEach(file => {
    const found = blocks(file);
    found.forEach(b => {
      it(file + ' line ' + b.line + ' (' + b.kind + ')', function() {
        const r = validate(b.body);
        if (b.kind === 'drumdrom') {
          expect(r.errors, JSON.stringify(r.errors)).to.deep.equal([]);
          expect(() => parse(b.body)).to.not.throw();
        } else {
          expect(r.ok).to.equal(false);
          const want = /\/\/ expect: (E_[A-Z_]+)/.exec(b.body);
          if (want) expect(r.errors.map(e => e.code)).to.include(want[1]);
        }
      });
    });
  });

  it('the spec has valid and invalid examples', function() {
    const kinds = blocks('docs/spec.md').map(b => b.kind);
    expect(kinds).to.include('drumdrom');
    expect(kinds).to.include('drumdrom-invalid');
  });

  it('the README has at least one example', function() {
    expect(blocks('README.md').length).to.be.greaterThan(0);
  });
});
