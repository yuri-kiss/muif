'use strict';
/**
 * @module muif/beans/bindings/math
 */

const {lockns} = require('../../../lib/ns.cjs').create(module, exports);
const {MutableBean} = require('../implementations/mutable.cjs');

/**
 * Bean version of `? :`.
 *
 * @template BTA, BTB, BTC
 *
 * @param {MutableBean<BTA>} a Condition.
 * @param {MutableBean<BTB>} b Left operand.
 * @param {MutableBean<BTC>} c Right operand.
 * @returns {MutableBean<BTA | BTB>} Bean representing the result.
 *
 * @public
 */
exports.when = (a, b, c) => {
  const bean = new MutableBean(a.getValue() ? b.getValue() : c.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue ? b.getValue() : c.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(a.getValue() ? nextValue : c.getValue());
  });
  c.addListener(({ nextValue }) => {
    bean.setValue(a.getValue() ? b.getValue() : nextValue);
  });
  return bean;
};

lockns();
