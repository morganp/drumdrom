'use strict';

const { DrumDromError } = require('./errors');
const { check } = require('./validate');
const normalize = require('./normalize');

// JSON5 text or an object -> validated, normalised model. Throws DrumDromError
// for the first problem; err.errors lists every problem.
function parse(source) {
  const { data, errors } = check(source);
  if (errors.length) {
    const first = errors[0];
    const err = new DrumDromError(first.code, first.message, first);
    err.errors = errors;
    throw err;
  }
  return normalize(data);
}

module.exports = parse;
