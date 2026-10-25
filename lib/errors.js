'use strict';

class DrumDromError extends Error {
  constructor(code, message, location) {
    super(message);
    const loc = location || {};
    this.name = 'DrumDromError';
    this.code = code;
    this.path = loc.path === undefined ? '' : loc.path;
    if (loc.line !== undefined) this.line = loc.line;
    if (loc.column !== undefined) this.column = loc.column;
    if (loc.index !== undefined) this.index = loc.index;
  }
}

// Plain-object form used in validate() results
function errorInfo(code, message, location) {
  const e = new DrumDromError(code, message, location);
  const out = { code: e.code, message: e.message, path: e.path };
  if (e.line !== undefined) out.line = e.line;
  if (e.column !== undefined) out.column = e.column;
  if (e.index !== undefined) out.index = e.index;
  return out;
}

// One line rendering used by the CLI: path (line L, column C): message [code]
function formatError(info) {
  let head = info.path || '';
  if (info.line !== undefined) {
    const at = 'line ' + info.line + ', column ' + info.column;
    head = head ? head + ' (' + at + ')' : at;
  }
  return (head ? head + ': ' : '') + info.message + ' [' + info.code + ']';
}

module.exports = { DrumDromError, errorInfo, formatError };
