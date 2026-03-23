'use strict';
/**
 * @module muiflib/es/Symbol
 */

const {lockns, global} = require('../ns.cjs').create(module, exports);

const Symbol$for = require('core-js-pure/es/symbol/for');

exports.for = Symbol$for;
exports.REAL = global.Symbol;

lockns();
