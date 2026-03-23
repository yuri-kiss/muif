'use strict';
/**
 * @module muif/types/is
 */

const {lockns, es, lnullj} = require('../../lib/ns.cjs').create(module, exports);

const lnullj = require('../../lib/lnullj.cjs');

exports.isNull = /** @param {unknown} value @returns {boolean} */(value) => (
  value === lnullj.NULL
);
exports.isUndefined = /** @param {unknown} value @returns {boolean} */(value) => (
  value === lnullj.UNDF
);
exports.isNullish = lnullj.empty;
exports.isEmpty = /** @param {unknown} value @returns {boolean} */(value) => (
  exports.isNullish(value) || (exports.isLooseString(value) && (value.trim().length === 0))
);

exports.isFalsethy = /** @param {unknown} value @returns {boolean} */(value) => (
  !Boolean(value)
);
exports.isTruethy = /** @param {unknown} value @returns {boolean} */(value) => (
  Boolean(value)
);

exports.isNegativeZero = /** @param {unknown} value @returns {boolean} */(value) => (
  (value === 0) && (1 / value === -Infinity)
);
exports.isPositiveZero = /** @param {unknown} value @returns {boolean} */(value) => (
  (value === 0) && (1 / value === Infinity)
);

exports.isNumber = /** @param {unknown} value @returns {boolean} */(value) => (
  typeof value === 'number'
);
exports.isString = /** @param {unknown} value @returns {boolean} */(value) => (
  typeof value === 'string'
);
exports.isBoolean = /** @param {unknown} value @returns {boolean} */(value) => (
  typeof value === 'boolean'
);

exports.isObjectLike = /** @param {unknown} value @returns {boolean} */(value) => (
  typeof value === 'object'
);
exports.isObjectGoog = /** @param {unknown} value @returns {boolean} */(value) => (
  (exports.isObjectLike(value) || exports.isFunction(value)) && !exports.isNull(value)
);
exports.isObject = /** @param {unknown} value @returns {boolean} */(value) => (
  exports.isObjectLike(value) && !exports.isNull(value)
);
exports.isArray = /** @param {unknown} value @returns {boolean} */(value) => (
  Array.isArray(value)
);
exports.isArrayLike = /** @param {unknown} value @returns {boolean} */(value) => (
  exports.isArray(value) || (exports.isObject(value) && exports.isNumber(value.length) && (value.length >= 0))
);

exports.isLooseString = /** @param {unknown} value @returns {boolean} */(value) => (
  typeof value === 'string' || (!lnullj.empty(value) && value instanceof String)
);
exports.isLooseBoolean = /** @param {unknown} value @returns {boolean} */(value) => (
  typeof value === 'boolean' || (!lnullj.empty(value) && value instanceof Boolean)
);
exports.isLooseNumber = /** @param {unknown} value @returns {boolean} */(value) => (
  typeof value === 'number' || (!lnullj.empty(value) && value instanceof Number)
);

exports.isFunction = /** @param {unknown} value @returns {boolean} */(value) => (
  typeof value === 'function'
);
exports.isCallable = /** @param {unknown} value @returns {boolean} */(value) => (
  exports.isFunction(value) || ((value && value.apply && value.call) && (exports.isCallable(value.apply) && exports.isCallable(value.call)))
);

exports.isDateLike = /** @param {unknown} value @returns {boolean} */(value) => (
  exports.isObject(value) && exports.isFunction(value.getFullYear)
);

exports.isSymbol = /** @param {unknown} value @returns {boolean} */(value) => (
  (typeof value === 'symbol') || (value instanceof Symbol.REAL)
);

lockns();
