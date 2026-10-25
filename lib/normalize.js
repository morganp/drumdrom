'use strict';

const { order, resolveKit } = require('./kit');
const { symbols, scan } = require('./wave');

// Turns a validated source object into the normalised model (docs/spec.md).
function normalize(src) {
  const time = src.time || [4, 4];
  const spb = src.steps_per_beat || 4;
  const stepsPerBar = time[0] * spb;
  const known = resolveKit(src.kit);

  const lanes = new Map();
  function lane(id, nameOverride, pitch) {
    if (!lanes.has(id)) {
      const k = known[id];
      lanes.set(id, {
        id,
        name: nameOverride || k.name,
        gm: k.gm === undefined ? null : k.gm,
        staff: pitch === undefined ? k.staff : pitch,
        head: k.head,
        hits: []
      });
    }
    return lanes.get(id);
  }

  function makeHit(step, sym, laneId) {
    const hit = {
      step,
      bar: Math.floor(step / stepsPerBar),
      step_in_bar: step % stepsPerBar,
      accent: sym.accent
    };
    // every ho hit is open unless it is a flam
    const articulation = sym.articulation || (laneId === 'ho' ? 'open' : null);
    if (articulation) hit.articulation = articulation;
    return hit;
  }

  let totalSteps = 0;
  const derived = [];
  src.lanes.forEach(l => {
    const target = lane(l.id, l.name, l.pitch);
    const { steps } = scan(l.wave);
    totalSteps = steps.length;
    steps.forEach(({ char }, step) => {
      const sym = symbols[char];
      if (!sym) return;
      if (char === 'O' && l.id === 'hh') {
        derived.push({ step, sym });
      } else {
        target.hits.push(makeHit(step, sym, l.id));
      }
    });
  });

  // O on hh becomes a hit on ho unless ho already has an explicit hit there
  derived.forEach(({ step, sym }) => {
    const ho = lane('ho');
    if (!ho.hits.some(h => h.step === step)) ho.hits.push(makeHit(step, sym, 'ho'));
  });

  const rank = id => order.indexOf(id) < 0 ? order.length : order.indexOf(id);
  const sorted = Array.from(lanes.values())
    .map((l, i) => ({ l, i }))
    .sort((a, b) => rank(a.l.id) - rank(b.l.id) || a.i - b.i)
    .map(x => x.l);
  sorted.forEach(l => l.hits.sort((a, b) => a.step - b.step));

  return {
    format: 'drumdrom',
    version: 1,
    name: src.name || '',
    subtitle: src.subtitle || '',
    tempo: src.tempo === undefined ? null : src.tempo,
    time: [time[0], time[1]],
    steps_per_beat: spb,
    steps_per_bar: stepsPerBar,
    bars: totalSteps / stepsPerBar,
    lanes: sorted,
    config: { ...(src.config || {}) }
  };
}

module.exports = normalize;
