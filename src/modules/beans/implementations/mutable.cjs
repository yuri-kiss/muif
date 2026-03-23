'use strict';
/**
 * @module muif/beans/mutable
 */

const {lockns} = require('../../../lib/ns.cjs').create(module, exports);

const {InstanceBean, BeanSecret, constructInstanceBean} = require('../instance.cjs');

/**
 * Bean that is mutable.
 *
 * @template BeanTypeValue
 *
 * @extends {InstanceBean<BeanTypeValue, MutableBean<BeanTypeValue>>}
 *
 * @public
 */
class MutableBean extends InstanceBean {
  /**
   * @param {BeanTypeValue} [value] The bean value.
   */
  constructor(value) {
    super(value, arguments.length > 0);
  }

  /**
   * Clones this bean.
   *
   * @param {boolean} [_makeMutable] Ignored because mutable beans are always mutable.
   * @param {boolean} [_ignoreImmutability] Ignored because mutable beans don't respect immutability.
   * @returns {InstanceType<typeof this>} New bean instance.
   *
   * @override
   * @protected
   */
  _IDNUOYWBF_clone(_makeMutable, _ignoreImmutability) {
    return constructInstanceBean(
      MutableBean,
      /** @type {BeanValueType} */(this.getValue()),
      this.hasValue(),
    );
  }

  /**
   * Alias of `mutableClone`.
   *
   * @returns {BeanType<BeanTypeValue>} Cloned bean.
   *
   * @override
   * @public
   */
  clone() {
    return this.mutableClone();
  }
  /**
   * Clones this bean.
   *
   * @returns {BeanType<BeanTypeValue>} Cloned bean.
   *
   * @override
   * @public
   */
  mutableClone() {
    return this._IDNUOYWBF_clone(true, true);
  }

  /**
   * Clear this beans value.
   *
   * @returns {this} The current bean.
   *
   * @override
   * @public
   */
  clearValue() {
    const oldValue = this.getValue();
    this[BeanSecret].hasValue = false;
    this[BeanSecret].value = (void 0);
    this._IDNUOYWBF_dispatchChange(this, oldValue);
    return this;
  }
  /**
   * Sets this beans value.
   *
   * @param {BeanTypeValue} nextValue The new value of this bean.
   * @returns {this} The current bean.
   *
   * @override
   * @public
   */
  setValue(nextValue) {
    const oldValue = this.getValue();
    this[BeanSecret].hasValue = true;
    this[BeanSecret].value = nextValue;
    this._IDNUOYWBF_dispatchChange(this, oldValue);
    return this;
  }
}

exports.MutableBean = MutableBean;

lockns();
