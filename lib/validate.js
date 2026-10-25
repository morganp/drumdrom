'use strict';

const json5 = require('json5');
const Ajv2020 = require('ajv/dist/2020');
const schema = require('../schema/drumdrom.schema.json');
const { errorInfo } = require('./errors');
const { kit, order, resolveKit } = require('./kit');
const { symbols, reserved, scan } = require('./wave');
const buildLocator = require('./locate');
const allSkins = require('./all-skins');

const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true });
const checkSchema = ajv.compile(schema);

function pathString(parts) {
  return parts.reduce((s, p) => typeof p === 'number' ? s + '[' + p + ']' : (s ? s + '.' + p : p), '');
}

function ajvToIssue(e) {
  const parts = e.instancePath.split('/').slice(1)
    .map(p => p.replace(/~1/g, '/').replace(/~0/g, '~'))
    .map(p => /^\d+$/.test(p) ? Number(p) : p);
  const p = e.params;
  let message = e.message;
  let wantKey = false;
  if (e.keyword === 'required') {
    message = "missing required key '" + p.missingProperty + "'";
  } else if (e.keyword === 'additionalProperties') {
    parts.push(p.additionalProperty);
    message = "unknown key '" + p.additionalProperty + "'";
    wantKey = true;
  } else if (e.keyword === 'propertyNames') {
    parts.push(p.propertyName);
    message = "invalid id '" + p.propertyName + "': use lowercase letters, digits and underscore, starting with a letter, up to 16 characters";
    wantKey = true;
  } else if (e.keyword === 'const') {
    message = 'must be ' + JSON.stringify(p.allowedValue);
  } else if (e.keyword === 'enum') {
    message = 'must be one of ' + p.allowedValues.map(v => JSON.stringify(v)).join(', ');
  } else if (e.keyword === 'false schema') {
    message = 'this key is not allowed here';
    wantKey = true;
  }
  return { code: 'E_SCHEMA', message, parts, wantKey };
}

// Semantic rules that JSON Schema cannot express. Every issue is
// { code, message, parts, wantKey?, index? }.
function semantic(data, issues) {
  const add = (code, message, parts, extra) => issues.push({ code, message, parts, ...extra });

  if ('sections' in data) {
    add('E_RESERVED_KEY', "'sections' is reserved for a future version and must not be used in version 1 files", ['sections'], { wantKey: true });
  }
  if (data.format !== undefined && data.format !== 'drumdrom') {
    add('E_FORMAT', "format must be 'drumdrom'", ['format']);
  }
  if (Number.isInteger(data.version) && data.version !== 1) {
    add('E_VERSION', 'unsupported version ' + data.version + ': this validator supports version 1', ['version']);
  }
  if (data.config && typeof data.config === 'object' && typeof data.config.skin === 'string' && !allSkins[data.config.skin]) {
    add('E_UNKNOWN_SKIN', "unknown skin '" + data.config.skin + "'; available: " + Object.keys(allSkins).join(', '), ['config', 'skin']);
  }

  const custom = data.kit && typeof data.kit === 'object' && !Array.isArray(data.kit) ? data.kit : {};
  Object.keys(custom).forEach(id => {
    const entry = custom[id];
    if (!kit[id] && entry && typeof entry === 'object') {
      const missing = ['name', 'gm', 'staff'].filter(k => entry[k] === undefined);
      if (missing.length) {
        add('E_KIT', "kit lane '" + id + "' is not in the default kit, so it needs " + missing.join(', '), ['kit', id], { wantKey: true });
      }
    }
  });
  const known = resolveKit(custom);

  // an invalid time or steps_per_beat is reported by the schema; bar length
  // checks are skipped rather than guessed
  const beats = data.time === undefined ? 4 : Array.isArray(data.time) ? data.time[0] : null;
  const spb = data.steps_per_beat === undefined ? 4 : data.steps_per_beat;
  const perBar = Number.isInteger(beats) && beats >= 1 && Number.isInteger(spb) && spb >= 1 ? beats * spb : null;

  if (!Array.isArray(data.lanes)) return;
  const seen = {};
  const lengths = [];
  data.lanes.forEach((lane, i) => {
    if (!lane || typeof lane !== 'object') return;
    const id = lane.id;
    if (typeof id === 'string' && /^[a-z][a-z0-9_]{0,15}$/.test(id)) {
      if (!known[id]) {
        add('E_UNKNOWN_LANE', "unknown lane id '" + id + "'; use one of " + order.join(', ') + ' or declare it in kit', ['lanes', i, 'id']);
      }
      if (seen[id] !== undefined) {
        add('E_DUPLICATE_LANE', "lane id '" + id + "' is already used by lanes[" + seen[id] + ']', ['lanes', i, 'id']);
      } else {
        seen[id] = i;
      }
    }
    if (typeof lane.wave !== 'string' || lane.wave === '') return;
    const wp = ['lanes', i, 'wave'];
    const label = typeof id === 'string' ? "lane '" + id + "'" : 'lane ' + i;
    const { steps, segments, hasBars } = scan(lane.wave);
    steps.forEach(({ char, index }) => {
      if (Object.prototype.hasOwnProperty.call(symbols, char)) {
        if (char === 'O' && id !== 'hh' && id !== 'ho') {
          add('E_OPEN_HAT_LANE', label + ": 'O' (open hi-hat) is only valid on lanes hh and ho at index " + index, wp, { index });
        }
      } else if (Object.prototype.hasOwnProperty.call(reserved, char)) {
        add('E_RESERVED_CHAR', label + ": character '" + char + "' at index " + index + ' (' + reserved[char] + ') is reserved for a future version', wp, { index });
      } else {
        add('E_BAD_CHAR', label + ": unknown character '" + char + "' at index " + index + " in wave (allowed: . - x X o O f and '|')", wp, { index });
      }
    });
    let lengthOk = true;
    if (perBar === null) {
      lengthOk = false;
    } else if (hasBars) {
      segments.forEach(seg => {
        if (seg.steps !== perBar) {
          lengthOk = false;
          add('E_BAR_LENGTH', label + ': bar starting at index ' + seg.start + ' has ' + seg.steps + ' steps, expected ' + perBar + ' (' + beats + ' beats x ' + spb + ' steps per beat)', wp, { index: seg.start });
        }
      });
    } else if (steps.length % perBar !== 0) {
      lengthOk = false;
      add('E_WAVE_LENGTH', label + ' has ' + steps.length + ' steps, which is not a multiple of ' + perBar + ' steps per bar (' + beats + ' beats x ' + spb + ' steps per beat)', wp);
    }
    if (lengthOk) lengths.push({ label, path: wp, steps: steps.length });
  });
  if (lengths.length > 1) {
    const first = lengths[0];
    lengths.slice(1).forEach(l => {
      if (l.steps !== first.steps) {
        add('E_LANE_LENGTH', l.label + ' has ' + l.steps + ' steps but ' + first.label + ' has ' + first.steps + ' steps: all lanes must have the same length', l.path);
      }
    });
  }
}

// Returns { data, errors }; errors carry line and column when the input was text
function check(input) {
  let data = input;
  let locate = null;
  if (typeof input === 'string') {
    try {
      data = json5.parse(input);
    } catch (e) {
      return { data: null, errors: [errorInfo('E_SYNTAX', e.message, { path: '', line: e.lineNumber, column: e.columnNumber })] };
    }
    locate = buildLocator(input);
  }
  const issues = [];
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    issues.push({ code: 'E_SCHEMA', message: 'a drumdrom file must be an object', parts: [] });
  } else {
    const sem = [];
    semantic(data, sem);
    const taken = new Set(sem.map(s => pathString(s.parts)));
    if (!checkSchema(data)) {
      checkSchema.errors.map(ajvToIssue).forEach(s => {
        if (!taken.has(pathString(s.parts))) issues.push(s);
      });
    }
    issues.push(...sem);
  }
  const errors = issues.map(s => {
    const loc = { path: pathString(s.parts), index: s.index };
    if (s.line !== undefined) {
      loc.line = s.line;
      loc.column = s.column;
    } else if (locate) {
      Object.assign(loc, locate(s.parts, s.wantKey, s.index));
    }
    return errorInfo(s.code, s.message, loc);
  });
  return { data, errors };
}

function validate(input) {
  const { errors } = check(input);
  return { ok: errors.length === 0, errors };
}

module.exports = { validate, check };
