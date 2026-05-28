'use strict';
/**
 * @module muiflib/types
 */

const { lockns } = require('../lib/ns.cjs').create(module, exports);

exports.is = require('./types/is.cjs');
exports.Tuple = require('../lib/tuple.cjs').Tuple;
exports.Result = require('./types/result.cjs').Result;

/**
 * @typedef {'string' | 'number' | 'boolean' | 'bigint' | 'symbol' | 'undefined' | 'function' | 'object'} TypeName
 */ exports.typeOf = /** @param {unknown} value @returns {TypeName} */ (value) => typeof value;

/**
 * @typedef {TypeName | 'null' | 'array' | 'tuple'} ExtendedTypeName
 */ exports.extendedTypeOf = /** @param {unknown} value @returns {ExtendedTypeName} */ (value) => {
  const type = typeof value;
  if (type !== 'object') return type;
  if (exports.is.isArray(value)) return 'array';
  if (exports.is.isNull(value)) return 'null';
  if (exports.is.isTuple(value)) return 'tuple';
  return type;
};

lockns();
