'use strict';

const muif = module.exports = require('./exports/__index.cjs');

Object.defineProperty(globalThis, 'muif', {
  get: () => muif,
  set: () => false,
  configurable: false,
  enumerable: false,
});
