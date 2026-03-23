'use strict';
/**
 * @module muif/beans
 */

const {lockns, lnullj} = require('../lib/ns.cjs').create(module, exports);

/**
 * Internal bean exports.
 *
 * @internal
 * @ignore
 */
exports._ = lnullj.assign({
  BeanSecret: require('./beans/virtual.cjs').BeanSecret,
  VirtualBean: require('./beans/virtual.cjs').VirtualBean,
});

exports.MutableBean = require('./beans/implementations/mutable.cjs').MutableBean;
exports.ImmutableBean = require('./beans/implementations/immutable.cjs').ImmutableBean;
exports.ReadOnlyBean = require('./beans/implementations/readonly.cjs').ReadOnlyBean;

// Alias MutableBean as the default bean.
exports.Bean = exports.MutableBean;

// Bindings
exports.Bindings = require('./beans/__bindings.cjs');

lockns();
