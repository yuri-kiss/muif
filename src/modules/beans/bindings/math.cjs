'use strict';
/**
 * @module muif/beans/bindings/math
 */

const {lockns} = require('../../../lib/ns.cjs').create(module, exports);
const {MutableBean} = require('../implementations/mutable.cjs');

/**
 * Bean version of `+`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean>} Bean representing the result.
 *
 * @public
 */
exports.add = (a, b) => {
  const bean = new MutableBean(a.getValue() + b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue + b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(a.getValue() + nextValue);
  });
  return bean;
};

/**
 * Bean version of `-`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean>} Bean representing the result.
 *
 * @public
 */
exports.sub = (a, b) => {
  const bean = new MutableBean(a.getValue() - b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue - b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(a.getValue() - nextValue);
  });
  return bean;
};

/**
 * Bean version of `*`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean>} Bean representing the result.
 *
 * @public
 */
exports.mul = (a, b) => {
  const bean = new MutableBean(a.getValue() * b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue * b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(a.getValue() - nextValue);
  });
  return bean;
};

/**
 * Bean version of `/`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean>} Bean representing the result.
 *
 * @public
 */
exports.div = (a, b) => {
  const bean = new MutableBean(a.getValue() / b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue / b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(a.getValue() / nextValue);
  });
  return bean;
};

lockns();
