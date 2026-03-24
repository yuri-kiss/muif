'use strict';
/**
 * @module muif/math/constants
 */

const {lockns} = require('../../lib/ns.cjs').create(module, exports);

exports.PI2 = Math.PI / 2;
exports.PI = Math.PI;
exports.TAU = Math.PI * 2;
exports.E = Math.E;

exports.DEG2RAD = Math.PI / 180;
exports.RAD2DEG = 180 / Math.PI;

lockns();
