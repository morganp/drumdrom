'use strict';

// Maps a path (array of keys and indexes) in JSON5 source text to a line and
// column. The text has already been accepted by json5, so this scanner only
// has to walk the structure and note where each value and key starts.

function buildLocator(text) {
  const values = new Map();
  const keys = new Map();
  let i = 0;

  function skip() {
    for (;;) {
      const c = text[i];
      if (c === undefined) return;
      if (/\s/.test(c) || c === '\ufeff') {
        i++;
      } else if (c === '/' && text[i + 1] === '/') {
        while (i < text.length && text[i] !== '\n') i++;
      } else if (c === '/' && text[i + 1] === '*') {
        const end = text.indexOf('*/', i + 2);
        i = end < 0 ? text.length : end + 2;
      } else {
        return;
      }
    }
  }

  function readString() {
    const q = text[i++];
    while (i < text.length && text[i] !== q) i += text[i] === '\\' ? 2 : 1;
    i++;
  }

  function readKey() {
    const c = text[i];
    if (c === '"' || c === "'") {
      const start = i;
      readString();
      return text.slice(start + 1, i - 1);
    }
    const m = /^[^\s:/]+/.exec(text.slice(i));
    i += m ? m[0].length : 1;
    return m ? m[0] : '';
  }

  function value(path) {
    skip();
    values.set(path.join('\u0000'), i);
    const c = text[i];
    if (c === '{') {
      i++;
      for (;;) {
        skip();
        if (text[i] === '}' || i >= text.length) { i++; return; }
        const at = i;
        const k = readKey();
        keys.set(path.concat(k).join('\u0000'), at);
        skip();
        i++; // colon
        value(path.concat(k));
        skip();
        if (text[i] === ',') i++;
      }
    } else if (c === '[') {
      i++;
      for (let n = 0; ; n++) {
        skip();
        if (text[i] === ']' || i >= text.length) { i++; return; }
        value(path.concat(n));
        skip();
        if (text[i] === ',') i++;
      }
    } else if (c === '"' || c === "'") {
      readString();
    } else {
      while (i < text.length && !/[\s,\]}]/.test(text[i]) &&
        !(text[i] === '/' && (text[i + 1] === '/' || text[i + 1] === '*'))) i++;
    }
  }

  value([]);

  function position(offset) {
    const before = text.slice(0, offset);
    const line = before.split('\n').length;
    return { line, column: offset - before.lastIndexOf('\n') };
  }

  // wantKey: point at the key rather than the value. index: character offset
  // inside a string value (the opening quote is skipped).
  return function locate(path, wantKey, index) {
    const id = path.join('\u0000');
    let offset = wantKey && keys.has(id) ? keys.get(id) : values.get(id);
    if (offset === undefined) {
      const parent = path.slice(0, -1).join('\u0000');
      offset = keys.has(id) ? keys.get(id) : values.get(parent);
    }
    if (offset === undefined) return {};
    if (index !== undefined && !wantKey) offset += 1 + index;
    return position(offset);
  };
}

module.exports = buildLocator;
