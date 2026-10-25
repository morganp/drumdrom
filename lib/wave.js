'use strict';

// Wave alphabet. Each symbol maps to a hit description, or null for a rest.
const symbols = {
  '.': null,
  '-': null,
  x: { accent: 'normal' },
  X: { accent: 'accent' },
  o: { accent: 'ghost' },
  O: { accent: 'normal', articulation: 'open' },
  f: { accent: 'normal', articulation: 'flam' }
};

const reserved = {
  r: 'roll',
  b: 'buzz',
  d: 'drag',
  '^': 'choke'
};
'123456789'.split('').forEach(c => { reserved[c] = 'velocity digit'; });

const BAR = '|';

// Splits a wave into bar segments by '|' and returns the step characters with
// their offsets in the original string. Leading and trailing separators are
// cosmetic.
function scan(wave) {
  const steps = [];
  const segments = [];
  let current = 0;
  let segStart = 0;
  for (let i = 0; i < wave.length; i++) {
    if (wave[i] === BAR) {
      segments.push({ start: segStart, steps: current });
      current = 0;
      segStart = i + 1;
    } else {
      steps.push({ char: wave[i], index: i });
      current++;
    }
  }
  segments.push({ start: segStart, steps: current });
  const hasBars = wave.indexOf(BAR) >= 0;
  if (hasBars) {
    if (segments[0].steps === 0 && segments.length > 1) segments.shift();
    if (segments[segments.length - 1].steps === 0 && segments.length > 1) segments.pop();
  }
  return { steps, segments, hasBars };
}

module.exports = { symbols, reserved, scan, BAR };
