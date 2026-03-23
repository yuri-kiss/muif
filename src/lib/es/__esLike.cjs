'use strict';
/**
 * @module muiflib/es/__esLike
 */

exports.global = require('./globalThis.cjs');
exports.console = require('./console.cjs');
exports.Object = require('./Object.cjs');
exports.Array = require('./Array.cjs');
exports.Symbol = require('./Symbol.cjs');
exports.JSON = require('./JSON.cjs');

const lnullj = require('../lnullj.cjs');
const defineBadExports = (obj, title, exportList) => {
  for (let i = 0; i < exportList.length; ++i) {
    Object.defineProperty(obj, exportList[i], {
      enumerable: true,
      configurable: false,
      get: ((name) => {
        throw new ReferenceError(`Cannot get unimplemented "${name}" property on MUIF ${title} polyfill.`);
      }).bind(lnullj.NULL, exportList[i]),
      set: ((name) => {
        throw new ReferenceError(`Cannot set unimplemented "${name}" property on MUIF ${title} polyfill.`);
      }).bind(lnullj.NULL, exportList[i]),
    });
  }
};

exports.defineBadExports = defineBadExports;
