'use strict';
/**
 * @module muif/beans/__bindings
 */

const {lockns} = require('../../lib/ns.cjs').create(module, exports);

// Bean bindings.

// Math
const bmath = require('./bindings/math.cjs');
exports.add = bmath.add;
exports.sub = bmath.sub;
exports.mul = bmath.mul;
exports.div = bmath.div;
// Operators
const bopr = require('./bindings/operators.cjs');
exports.equals = bopr.equals;
exports.notEquals = bopr.notEquals;
exports.lsEquals = bopr.lsEquals;
exports.lsNotEquals = bopr.lsNotEquals;
exports.gt = bopr.gt;
exports.gtoe = bopr.gtoe;
exports.lt = bopr.lt;
exports.ltoe = bopr.ltoe;
exports.bNot = bopr.bNot;
exports.bAnd = bopr.bAnd;
exports.bOr = bopr.bOr;
// Logic
const bwhen = require('./bindings/when.cjs');
exports.when = bwhen.when;

lockns();
