'use strict';

// Default kit. staff is in half-spaces above the bottom staff line; gm is the
// General MIDI percussion note number (channel 10).
const kit = {
  cr: { name: 'Crash', gm: 49, staff: 10, head: 'x' },
  rd: { name: 'Ride', gm: 51, staff: 8, head: 'x' },
  hh: { name: 'Closed hi-hat', gm: 42, staff: 9, head: 'x' },
  ho: { name: 'Open hi-hat', gm: 46, staff: 9, head: 'x_open' },
  hp: { name: 'Pedal hi-hat', gm: 44, staff: -1, head: 'x' },
  sd: { name: 'Snare', gm: 38, staff: 5, head: 'normal' },
  rs: { name: 'Rimshot', gm: 40, staff: 5, head: 'normal' },
  cs: { name: 'Cross stick', gm: 37, staff: 5, head: 'x' },
  t1: { name: 'Hi tom', gm: 50, staff: 7, head: 'normal' },
  t2: { name: 'Lo tom', gm: 47, staff: 6, head: 'normal' },
  t3: { name: 'Floor tom', gm: 43, staff: 3, head: 'normal' },
  bd: { name: 'Bass drum', gm: 36, staff: 1, head: 'normal' }
};

// Conventional top to bottom order on a chart; custom lanes follow
const order = Object.keys(kit);

// Default kit merged with the file's kit map (overrides and new lane ids)
function resolveKit(custom) {
  const out = {};
  Object.keys(kit).forEach(id => { out[id] = { ...kit[id] }; });
  Object.keys(custom || {}).forEach(id => {
    out[id] = { head: 'normal', ...out[id], ...custom[id] };
  });
  return out;
}

module.exports = { kit, order, resolveKit };
