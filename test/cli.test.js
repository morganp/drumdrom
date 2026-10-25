'use strict';

const { expect } = require('chai');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { fixtureDir, fixtureNames, fixtureText, source } = require('./helpers');
const pkg = require('../package.json');

const cli = path.join(__dirname, '..', 'bin', 'cli.js');

function run(args, input) {
  return spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8', input: input === undefined ? '' : input });
}

const fixture = name => path.join(fixtureDir, name + '.json5');

describe('cli', function() {
  this.timeout(30000);

  let tmp;
  before(function() {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'drumdrom-'));
  });
  after(function() {
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it('prints help and the version', function() {
    const help = run(['--help']);
    expect(help.status).to.equal(0);
    expect(help.stdout).to.include('drumdrom render');
    expect(help.stdout).to.include('drumdrom validate');
    const v = run(['--version']);
    expect(v.status).to.equal(0);
    expect(v.stdout.trim()).to.equal(pkg.version);
  });

  describe('render', function() {
    fixtureNames().forEach(name => {
      it('renders ' + name, function() {
        const r = run(['render', '-i', fixture(name)]);
        expect(r.status).to.equal(0);
        expect(r.stdout).to.match(/^<svg /);
      });
    });

    it('treats -i without a command as render', function() {
      expect(run(['-i', fixture('rock-backbeat')]).stdout).to.equal(run(['render', '-i', fixture('rock-backbeat')]).stdout);
    });

    it('accepts a bare file name', function() {
      expect(run([fixture('rock-backbeat')]).status).to.equal(0);
    });

    it('writes to a file with -o', function() {
      const out = path.join(tmp, 'out.svg');
      const r = run(['render', '-i', fixture('funk-ghost'), '-o', out]);
      expect(r.status).to.equal(0);
      expect(fs.readFileSync(out, 'utf8')).to.match(/^<svg /);
    });

    it('applies a skin with -s', function() {
      expect(run(['render', '-i', fixture('rock-backbeat'), '-s', 'dark']).stdout).to.include('#1e1f24');
    });

    it('rejects an unknown skin', function() {
      const r = run(['render', '-i', fixture('rock-backbeat'), '-s', 'neon']);
      expect(r.status).to.equal(2);
      expect(r.stderr).to.include('Unknown skin');
    });

    it('renders lanes by default', function() {
      const r = run(['render', '-i', fixture('rock-backbeat')]);
      expect(r.stdout).to.include('Closed hi-hat');
      expect(r.stdout).to.not.include('-g-noteheadXBlack');
      expect(run(['render', '-i', fixture('rock-backbeat'), '--style', 'lanes']).stdout).to.equal(r.stdout);
    });

    it('renders the percussion staff with --style staff', function() {
      const r = run(['render', '-i', fixture('rock-backbeat'), '--style', 'staff']);
      expect(r.status).to.equal(0);
      expect(r.stdout).to.include('-g-noteheadXBlack');
      expect(r.stdout).to.not.include('>Closed hi-hat<');
    });

    it('stacks both styles with --style both', function() {
      const r = run(['render', '-i', fixture('rock-backbeat'), '--style', 'both', '-s', 'dark']);
      expect(r.status).to.equal(0);
      expect(r.stdout).to.include('-g-noteheadXBlack');
      expect(r.stdout).to.include('>Closed hi-hat<');
    });

    it('reports a grid the staff cannot write', function() {
      const r = run(['render', '--style', 'staff', '-i', '-'], JSON.stringify(source({ steps_per_beat: 3, lanes: [{ id: 'bd', wave: 'x...........' }] })));
      expect(r.status).to.equal(1);
      expect(r.stderr).to.include('E_STAFF_GRID');
    });

    it('rejects an unknown style', function() {
      const r = run(['render', '-i', fixture('rock-backbeat'), '--style', 'tab']);
      expect(r.status).to.equal(2);
      expect(r.stderr).to.include("Unknown style 'tab'");
    });

    it('accepts the .drumdrom extension', function() {
      const f = path.join(tmp, 'a.drumdrom');
      fs.writeFileSync(f, fixtureText('rock-backbeat'));
      expect(run(['render', '-i', f]).status).to.equal(0);
    });

    it('reads stdin with -i -', function() {
      const r = run(['render', '-i', '-'], fixtureText('rock-backbeat'));
      expect(r.status).to.equal(0);
      expect(r.stdout).to.match(/^<svg /);
    });

    it('reads piped stdin without -i', function() {
      expect(run(['render'], fixtureText('rock-backbeat')).status).to.equal(0);
    });

    it('exits 1 with located errors for an invalid file', function() {
      const f = path.join(tmp, 'bad.json5');
      fs.writeFileSync(f, JSON.stringify(source({ lanes: [{ id: 'sd', wave: 'x..z............' }] }), null, 2));
      const r = run(['render', '-i', f]);
      expect(r.status).to.equal(1);
      expect(r.stderr).to.include('bad.json5');
      expect(r.stderr).to.match(/lanes\[0\]\.wave \(line \d+, column \d+\)/);
      expect(r.stderr).to.include('E_BAD_CHAR');
      expect(r.stdout).to.equal('');
    });

    it('exits 1 for a missing file', function() {
      const r = run(['render', '-i', path.join(tmp, 'nope.json5')]);
      expect(r.status).to.equal(1);
      expect(r.stderr).to.include('Error reading');
    });

    it('exits 2 for an unknown option', function() {
      expect(run(['--bogus']).status).to.equal(2);
    });
  });

  describe('validate', function() {
    it('reports ok for valid files', function() {
      const r = run(['validate', fixture('rock-backbeat'), fixture('tom-fill')]);
      expect(r.status).to.equal(0);
      expect(r.stdout).to.include('rock-backbeat.json5: ok');
      expect(r.stdout).to.include('tom-fill.json5: ok');
    });

    it('prints every error and exits 1', function() {
      const f = path.join(tmp, 'many.json5');
      fs.writeFileSync(f, "{\n  format: 'drumdrom',\n  version: 1,\n  tempo: 5,\n  sections: [],\n  lanes: [{ id: 'sd', wave: 'z.z.............' }]\n}\n");
      const r = run(['validate', f]);
      expect(r.status).to.equal(1);
      expect(r.stderr.trim().split('\n')).to.have.length(4);
      expect(r.stderr).to.include('(line 4, column 10)');
    });

    it('checks every file and fails if any is bad', function() {
      const f = path.join(tmp, 'syntax.json5');
      fs.writeFileSync(f, '{ lanes: ');
      const r = run(['validate', fixture('rock-backbeat'), f]);
      expect(r.status).to.equal(1);
      expect(r.stdout).to.include('rock-backbeat.json5: ok');
      expect(r.stderr).to.include('E_SYNTAX');
    });

    it('validates stdin', function() {
      expect(run(['validate', '-'], fixtureText('rock-backbeat')).status).to.equal(0);
      expect(run(['validate'], '{').status).to.equal(1);
    });
  });

  describe('json', function() {
    it('prints the normalised model', function() {
      const r = run(['json', '-i', fixture('disco-open-hat')]);
      expect(r.status).to.equal(0);
      const model = JSON.parse(r.stdout);
      expect(model.format).to.equal('drumdrom');
      expect(model.lanes.map(l => l.id)).to.deep.equal(['hh', 'ho', 'sd', 'bd']);
      expect(model.steps_per_bar).to.equal(16);
    });

    it('fails on invalid input', function() {
      expect(run(['json'], '{').status).to.equal(1);
    });
  });
});
