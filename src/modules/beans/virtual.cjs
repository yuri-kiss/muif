'use strict';
/**
 * @module muif/beans/virtual
 */

const {lockns, es: { console }} = require('../../lib/ns.cjs').create(module, exports);

/**
 * Super secret internal bean configuration key.
 *
 * @internal
 * @ignore
 */
const BeanSecret = (`MiyoJLikeBeanLibrary._INTERNAL_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_`);

/**
 * Internal bean config object.
 *
 * @template ValueType Type of this beans value.
 *
 * @internal
 * @ignore
 */
class BeanConfig {
  /**
   * Is this bean read-only?
   *
   * @type {boolean}
   *
   * @public
   */
  readOnly = false;
  /**
   * Is this bean immutable.
   *
   * @type {boolean}
   *
   * @public
   */
  immutable = false;

  /**
   * Does this bean have a value?
   *
   * @type {boolean}
   *
   * @public
   */
  hasValue = false;
  /**
   * This beans value.
   *
   * @type {ValueType | undefined}
   *
   * @public
   */
  value = (void 0);
}

/**
 * Reads a beans config object.
 *
 * NOTE: This is only used to fix types.
 *
 * @template BeanValueType
 *
 * @param {{ [BeanSecret]: BeanConfig<infer BeanValueType> }} bean The bean to read.
 * @returns {BeanConfig<BeanValueType>} The internal bean config.
 *
 * @internal
 * @ignore
 */
const ReadSecret = (bean) => /** @type {BeanConfig} */(bean[BeanSecret]);

 /**
  * Main bean, containing the top most abstraction of the Bean API.
  *
  * @virtual
  * @internal
  * @ignore
  */
class VirtualBean {
  /**
   * @template BeanValueType
   */
  constructor() {
    /**
     * Internal bean configuration and state.
     *
     * @type {BeanConfig<BeanValueType>}
     *
     * @protected
     * @ignore
     */
    this[BeanSecret] = new BeanConfig();
  }

  /**
   * Clones this bean.
   *
   * @param {boolean} [_makeMutable] Should we make this bean mutable?
   * @param {boolean} [_ignoreImmutability] Ignore mutability related warnings?
   * @returns {InstanceType<typeof this>} New bean instance.
   *
   * @virtual
   * @protected
   * @ignore
   */
  _IDNUOYWBF_clone(_makeMutable, _ignoreImmutability) {
    console.debug('Bean that tried to be cloned:', this);
    throw new TypeError('VirtualBean is not directly cloneable, it is a Virtual class, the Bean subclass should be implementing it.');
  }

  /**
   * Checks if this bean supports the undocumented "unfreezable bean" API.
   *
   * @returns {boolean} If this bean is unfreezable.
   *
   * @protected
   * @ignore
   */
  _isUnfreezable() {
    return !this.isImmutable();
  }

  /**
   * Checks if this bena is mutable.
   *
   * @returns {boolean} If this bean is mutable.
   *
   * @public
   */
  isMutable() {
    return !this.isReadOnly() && !this.isImmutable();
  }
  /**
   * Checks if this bean is read-only.
   *
   * @returns {boolean} If this bean is read-only.
   *
   * @public
   */
  isReadOnly() {
    return this[BeanSecret].readOnly;
  }
  /**
   * Checks if this bean is immutable.
   *
   * @returns {boolean} If this bean is immutable.
   *
   * @public
   */
  isImmutable() {
    return this[BeanSecret].immutable;
  }
}

exports.BeanSecret = BeanSecret;
exports.ReadSecret = ReadSecret;
exports.VirtualBean = VirtualBean;

lockns();
