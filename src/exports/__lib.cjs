'use strict';
/**
 * @module muiflib
 */

var muif = {}; // THIS IS A STUB TO FIX BUILD ERRORS.

const { lockns } = require('../lib/ns.cjs').create(module, exports);

exports.ns = require('../lib/ns.cjs');
exports.lnullj = require('../lib/lnullj.cjs');

// NOTE: This only exists for compatibility and to make backporting projects from the library to this library easier.
exports.closure = () => require(muif.process_env_NOGOOG ? './__no_goog.cjs' : './__goog.cjs');

lockns();
