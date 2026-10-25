'use strict';

// Start from the named skin (or the default), then layer any other config keys
// on top as per-diagram overrides.
function resolveSkin(cfg, skins) {
  const config = cfg || {};
  const chosen = skins[config.skin] || skins.default;
  const { skin: _skinName, ...overrides } = config;
  return Object.keys(overrides).length ? { ...chosen, ...overrides } : chosen;
}

module.exports = resolveSkin;
