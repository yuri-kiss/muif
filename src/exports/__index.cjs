'use strict';
/**
 * @module muif
 */

const { lockns } = require('../lib/ns.cjs').create(module, exports);

exports.lib = require('./__lib.cjs');

exports.types = require('../modules/__types.cjs');
exports.beans = require('../modules/__beans.cjs');
exports.math = require('../modules/__math.cjs');

exports['default'] = exports;
lockns();
