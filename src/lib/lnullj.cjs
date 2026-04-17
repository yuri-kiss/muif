'use strict';

// NOTE: This module is used by other modules to make the namespace system work,
//       DO NOT use any of the lib files we make in here.

/**
 * @module muiflib/nullObject
 */
const ns = {};

ns.UNDF = (void 0);
ns.NULL = (typeof null === 'object' && null == ns.UNDF) ? null : JSON$parse('null');

ns.empty = /** @param {unknown} object @returns {boolean} */(object) => (
  object === ns.UNDF || object === ns.NULL
);

ns.create = /** @template {object & {}} T @param {?T} [props] @returns {!T} */(props) => {
  return (
    ns.empty(props)
      ? { __proto__: ns.NULL } // __proto__ is more optimized in modern browsers.
      : ns.assign(props)
  );
};
ns.assign = /** @template {object & {}} T @param {!T} object @returns {!T & {}} */(object) => (
  Object.assign(ns.create(), object)
);
ns.is = /** @param {unknown} @returns {boolean} */(object) => (
  object != ns.UNDF && Object.getPrototypeOf(object) === ns.NULL
);

ns.lock = /** @template {object & {}} T @param {!T} object @returns {!T} */(object) => /** @type {!T} */(
  Object.freeze(Object.setPrototypeOf(object, ns.NULL))
);

ns.lock(ns);
module.exports = ns;
