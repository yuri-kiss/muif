'use strict';
/**
 * @module muiflib/es
 */

const esLike = require('./es/__esLike.cjs');
const lnullj = require('./lnullj.cjs');

/**
 * @type {typeof esLike}
 */
module.exports = lnullj.assign(esLike);
require('./ns.cjs').create(module, module.exports).lockns();
