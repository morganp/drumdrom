#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const drumdrom = require('../lib');
const { formatError } = require('../lib/errors');

const USAGE = `Usage:
  drumdrom render [-i <file|->] [-o <out.svg>] [-s <skin>]
  drumdrom [-i <file|->] [-o <out.svg>] [-s <skin>]     (shorthand for render)
  drumdrom validate <file|->...
  drumdrom json [-i <file|->]

Input is read from stdin when -i is - or when no input is given and stdin is piped.
Options:
  -i, --input    input .drumdrom or .json5 file
  -o, --output   write to a file instead of stdout
  -s, --skin     skin name (${Object.keys(drumdrom.skins).join(', ')})
  -h, --help     show this help
  -v, --version  show the version
`;

function fail(message, code) {
  process.stderr.write(message + '\n');
  process.exit(code === undefined ? 1 : code);
}

function readInput(file) {
  try {
    if (file === '-' || file === null) return fs.readFileSync(0, 'utf8');
    return fs.readFileSync(path.resolve(file), 'utf8');
  } catch (e) {
    return fail('Error reading ' + (file === null ? 'stdin' : file) + ': ' + e.message);
  }
}

function parseArgs(args) {
  const opts = { command: null, input: null, output: null, skin: null, files: [] };
  const takes = { '--input': 'input', '-i': 'input', '--output': 'output', '-o': 'output', '--skin': 'skin', '-s': 'skin' };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--help' || a === '-h') {
      process.stdout.write(USAGE);
      process.exit(0);
    } else if (a === '--version' || a === '-v') {
      process.stdout.write(drumdrom.version + '\n');
      process.exit(0);
    } else if (takes[a]) {
      if (args[i + 1] === undefined) fail('Missing value for ' + a + '\n' + USAGE, 2);
      opts[takes[a]] = args[++i];
    } else if (a === '-' || !a.startsWith('-')) {
      if (opts.command === null && ['render', 'validate', 'json'].includes(a)) opts.command = a;
      else opts.files.push(a);
    } else {
      fail('Unknown option ' + a + '\n' + USAGE, 2);
    }
  }
  return opts;
}

function sourceFor(opts) {
  const file = opts.input !== null ? opts.input : opts.files[0] !== undefined ? opts.files[0] : null;
  if (file === null && process.stdin.isTTY) fail(USAGE, 2);
  return { file, text: readInput(file) };
}

function parseOrFail(file, text) {
  try {
    return drumdrom.parse(text);
  } catch (e) {
    if (!e.errors) throw e;
    e.errors.forEach(x => process.stderr.write((file === null || file === '-' ? '<stdin>' : file) + ': ' + formatError(x) + '\n'));
    return process.exit(1);
  }
}

function write(opts, text) {
  if (opts.output) {
    fs.writeFileSync(path.resolve(opts.output), text, 'utf8');
    process.stdout.write('Written to ' + opts.output + '\n');
  } else {
    process.stdout.write(text);
  }
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const command = opts.command || 'render';

  if (command === 'validate') {
    const files = opts.files.length ? opts.files : opts.input !== null ? [opts.input] : [null];
    if (files[0] === null && process.stdin.isTTY) fail(USAGE, 2);
    let bad = 0;
    files.forEach(file => {
      const { errors } = drumdrom.validate(readInput(file));
      const name = file === null || file === '-' ? '<stdin>' : file;
      if (errors.length) {
        bad++;
        errors.forEach(x => process.stderr.write(name + ': ' + formatError(x) + '\n'));
      } else {
        process.stdout.write(name + ': ok\n');
      }
    });
    process.exit(bad ? 1 : 0);
  }

  const { file, text } = sourceFor(opts);
  const model = parseOrFail(file, text);
  if (command === 'json') {
    write(opts, JSON.stringify(model, null, 2) + '\n');
  } else {
    if (opts.skin && !drumdrom.skins[opts.skin]) {
      fail("Unknown skin '" + opts.skin + "'; available: " + Object.keys(drumdrom.skins).join(', '), 2);
    }
    write(opts, drumdrom.renderSVG(model, { skin: opts.skin || undefined }) + '\n');
  }
}

main();
