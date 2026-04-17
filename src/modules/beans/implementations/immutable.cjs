'use strict';
/**
 * @module muif/beans/immutable
 */

const { lockns } = require('../../../lib/ns.cjs').create(module, exports);

const { InstanceBean, BeanSecret, constructInstanceBean } = require('../instance.cjs');

/**
 * Bean that is immutable.
 *
 * This clones the bean whenever changes are made.
 *
 * @template BeanTypeValue
 *
 * @extends {InstanceBean<BeanTypeValue, ImmutableBean<BeanTypeValue>>}
 *
 * @public
 */
class ImmutableBean extends InstanceBean {
  constructor(value) {
    super(value, arguments.length > 0);

    this[BeanSecret].immutable = true;
  }

  /**
   * Clones this bean.
   *
   * @param {boolean} [makeMutable] Should we make this bean mutable?
   * @param {boolean} [ignoreImmutability] Ignore immutability related warnings?
   * @returns {InstanceType<typeof this>} New bean instance.
   *
   * @override
   * @protected
   */
  _IDNUOYWBF_clone(makeMutable, ignoreImmutability) {
    const next = constructInstanceBean(ImmutableBean, /** @type {BeanValueType} */ (this.getValue()), this.hasValue());
    if (makeMutable) {
      if (!ignoreImmutability) {
        console.debug('Bean in question:', bean);
        throw new TypeError('Cannot make an immutable bean truely mutable, please use a mutable bean instead.');
      }
      next[BeanSecret].immutable = false;
    }
    return next;
  }

  /**
   * Clear this beans value.
   *
   * @returns {BeanType<BeanTypeValue>} New bean (clone).
   *
   * @override
   * @public
   */
  clearValue() {
    const next = this._IDNUOYWBF_clone(true, true);
    next[BeanSecret].immutable = true;
    next[BeanSecret].hasValue = false;
    next[BeanSecret].value = void 0;
    this._IDNUOYWBF_dispatchChange(next, this.getValue());
    return next;
  }
  /**
   * Sets this beans value.
   *
   * @param {BeanTypeValue} nextValue The new value of this bean.
   * @returns {BeanType<BeanTypeValue>} New bean (clone).
   *
   * @override
   * @public
   */
  setValue(nextValue) {
    const next = this._IDNUOYWBF_clone(true, true);
    next[BeanSecret].immutable = true;
    next[BeanSecret].hasValue = true;
    next[BeanSecret].value = nextValue;
    this._IDNUOYWBF_dispatchChange(next, this.getValue());
    return next;
  }
}

exports.ImmutableBean = ImmutableBean;

lockns();
