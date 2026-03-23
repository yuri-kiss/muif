'use strict';
/**
 * @module muif/beans/bindings/operators
 */

const {lockns} = require('../../../lib/ns.cjs').create(module, exports);
const {MutableBean} = require('../implementations/mutable.cjs');

/**
 * Bean version of `===`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean>} Bean representing the result.
 *
 * @public
 */
exports.equals = (a, b) => {
  const bean = new MutableBean(a.getValue() === b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue === b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(nextValue === a.getValue());
  });
  return bean;
};

/**
 * Bean version of `!==`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean>} Bean representing the result.
 *
 * @public
 */
exports.notEquals = (a, b) => {
  const bean = new MutableBean(a.getValue() !== b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue !== b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(nextValue !== a.getValue());
  });
  return bean;
};

/**
 * Bean version of `>`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean>} Bean representing the result.
 *
 * @public
 */
exports.gt = (a, b) => {
  const bean = new MutableBean(a.getValue() > b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue > b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(a.getValue() > nextValue);
  });
  return bean;
};

/**
 * Bean version of `<`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean>} Bean representing the result.
 *
 * @public
 */
exports.lt = (a, b) => {
  const bean = new MutableBean(a.getValue() < b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue < b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(a.getValue() < nextValue);
  });
  return bean;
};

/**
 * Bean version of `>=`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean>} Bean representing the result.
 *
 * @public
 */
exports.gtoe = (a, b) => {
  const bean = new MutableBean(a.getValue() >= b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue >= b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(a.getValue() >= nextValue);
  });
  return bean;
};

/**
 * Bean version of `<=`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean>} Bean representing the result.
 *
 * @public
 */
exports.ltoe = (a, b) => {
  const bean = new MutableBean(a.getValue() <= b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue <= b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(a.getValue() <= nextValue);
  });
  return bean;
};

/**
 * Bean version of `==`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean>} Bean representing the result.
 *
 * @public
 */
exports.lsEquals = (a, b) => {
  const bean = new MutableBean(a.getValue() == b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue == b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(nextValue == a.getValue());
  });
  return bean;
};

/**
 * Bean version of `!=`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean>} Bean representing the result.
 *
 * @public
 */
exports.lsNotEquals = (a, b) => {
  const bean = new MutableBean(a.getValue() != b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue != b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(nextValue != a.getValue());
  });
  return bean;
};

/**
 * Bean version of `&&`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean | BTA | BTB>} Bean representing the result.
 *
 * @public
 */
exports.bAnd = (a, b) => {
  const bean = new MutableBean(a.getValue() && b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue && b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(a.getValue() && nextValue);
  });
  return bean;
};

/**
 * Bean version of `||`.
 *
 * @template BTA, BTB
 *
 * @param {MutableBean<BTA>} a Left operand.
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean | BTA | BTB>} Bean representing the result.
 *
 * @public
 */
exports.bOr = (a, b) => {
  const bean = new MutableBean(a.getValue() || b.getValue());
  a.addListener(({ nextValue }) => {
    bean.setValue(nextValue || b.getValue());
  });
  b.addListener(({ nextValue }) => {
    bean.setValue(a.getValue() || nextValue);
  });
  return bean;
};

/**
 * Bean version of `!`.
 *
 * @template BTB
 *
 * @param {MutableBean<BTB>} b Right operand.
 * @returns {MutableBean<boolean>} Bean representing the result.
 *
 * @public
 */
exports.bNot = (b) => {
  const bean = new MutableBean(!b.getValue());
  b.addListener(({ nextValue }) => {
    bean.setValue(!nextValue);
  });
  return bean;
};

lockns();
