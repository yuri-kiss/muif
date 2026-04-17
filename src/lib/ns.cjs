'use strict';

// NOTE: This module is used by other modules to make the namespace system work,
//       DO NOT use any of the lib files we make in here besides "lnullj".

/**
 * @module muiflib/ns
 */
const ns = {};

const lnullj = require('./lnullj.cjs');

/**
 * @typedef {!(object & { exports: unknown })} INamespaceHandle_module
 */
/**
 * @typedef {Object} INamespaceHandle
 * @property {() => void} lockns
 * @property {!(Window & typeof globalThis)} global
 *
 * @property {typeof lnullj} lnullj
 * @property {typeof T_es} es
 */;

ns.create = /** @param {INamespaceHandle_module} modul3 @returns {INamespaceHandle} */(modul3, export$) => {
  modul3.exports = export$;
  return {
    lockns: () => {
      if (modul3.__locked) return;
      modul3.__locked = true;
      modul3.exports = lnullj.lock(export$);
    },
    global: globalThis, // Re-export of the global scope for ease of use.

    // Re-export some basics to make life easier.
    lnullj: lnullj,
  };
};

lnullj.lock(ns);
module.exports = ns;
