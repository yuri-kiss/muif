'use strict';

// NOTE: This module is used by other modules to make the namespace system work,
//       DO NOT use any of the lib files we make in here besides "lnullj" and "es/globalThis".

/**
 * @module muiflib/ns
 */
const ns = {};

const lnullj = require('./lnullj.cjs');
const global = require('./es/globalThis.cjs');

/** @import T_es from './__es.cjs' */

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
    global: global, // Re-export of the global scope for ease of use.

    // Re-export some basics to make life easier.
    lnullj: lnullj,
    // Lazilly loaded to prevent circular dependancies.
    /**
     * @type {typeof T_es}
     * @returns {typeof T_es}
     */
    get es() {
      return require('./__es.cjs');
    },
  };
};

lnullj.lock(ns);
module.exports = ns;
