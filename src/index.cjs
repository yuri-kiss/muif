'use strict';

const muif = (module.exports = require('./exports/__index.cjs'));

Object.defineProperty(globalThis, 'muif', { writable: false, configurable: true, enumerable: false, value: muif });
