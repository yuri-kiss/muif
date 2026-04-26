'use strict';
/**
 * @module muif/beans/instance
 */

const { lockns } = require('../../lib/ns.cjs').create(module, exports);

const { VirtualBean, BeanSecret } = require('./virtual.cjs');

/**
 * Extended event listener options.
 *
 * @typedef {EventListenerOptions} EventListenerOptionsPlus
 *
 * @property {boolean} [passive] Is this event passive (will never call preventDefault)?
 * @property {boolean} [once] Should this event listener be removed after its been recieved once?
 *
 * @internal
 * @ignore
 */
/**
 * Event listener passed event object.
 *
 * @template BeanType
 * @template BeanTypeValue
 *
 * @typedef {Object} EventListenerCallbackEvent
 *
 * @property {BeanType} nextBean The next bean.
 * @property {BeanType} oldBean The old bean.
 *
 * @property {BeanTypeValue | undefined} nextValue The next value for this beann.
 * @property {BeanTypeValue | undefined} oldValue The old value for this bean.
 *
 * @public
 */
/**
 * Event listener function.
 *
 * @template BeanType
 * @template BeanTypeValue
 *
 * @callback InstanceBeanEventListener
 *
 * @param {EventListenerCallbackEvent<BeanType, BeanTypeValue>} event The event (type casted from a real Event).
 * @returns {void}
 *
 * @public
 */ /**
 * Constructs a bean.
 *
 * @template BeanTypeValue
 * @template {InstanceBean<BeanTypeValue, BeanType>} BeanType
 *
 * @param {BeanTypeValue} value The new bean value (if any).
 * @param {BeanType<BeanTypeValue>} BeanType The bean type (a bean constructor).
 * @param {boolean} hasValue Does this new bean have a value?
 *
 * @returns {BeanType<BeanTypeValue>} New bean instance.
 *
 * @internal
 */
const constructInstanceBean = (BeanType, value, hasValue) => {
  if (hasValue) {
    return new BeanType(value);
  }
  return new BeanType();
};

/**
 * Main bean API implementation (minus writing).
 *
 * @template BeanTypeValue
 * @template BeanType
 *
 * @this {BeanType}
 *
 * @virtual
 * @internal
 * @ignore
 */
class InstanceBean extends VirtualBean {
  /**
   * @param {BeanTypeValue} value The bean value.
   * @param {boolean} hasValue Does this bean have a value?
   */
  constructor(value, hasValue) {
    super();

    this[BeanSecret].hasValue = !!hasValue;
    if (this[BeanSecret].hasValue) {
      this[BeanSecret].value = value;
    }

    /**
     * Internal event target to handle event listeners.
     *
     * @type {EventTarget}
     *
     * @protected
     */
    this._evT = new EventTarget();
    /**
     * Internal event options map to make removal of events easier.
     *
     * @type {WeakMap<InstanceBeanEventListener<BeanType, BeanTypeValue>, !EventListenerOptionsPlus> & { fn: InstanceBeanEventListener }}
     *
     * @protected
     */
    this._evM = new WeakMap([]);
  }

  /**
   * Dispatches a change event to this beans listeners.
   *
   * @param {BeanType<BeanTypeValue>} nextBean The next bean.
   * @param {BeanTypeValue} oldValue The old bean value.
   * @returns {BeanType<BeanTypeValue>} New bean instance.
   *
   * @protected
   * @ignore
   */
  _IDNUOYWBF_dispatchChange(nextBean, oldValue) {
    const eventDetail = {
      bubbles: false,
      cancelable: false,
      composed: false,
      detail: {
        nextBean: nextBean,
        oldBean: this,

        nextValue: nextBean.getValue(),
        oldValue: oldValue,
      },
    };

    const event = new CustomEvent('change', eventDetail);
    Object.assign(event, event.detail);
    this._evT.dispatchEvent(event);
  }

  /**
   * Removes a change listener.
   *
   * @param {InstanceBeanEventListener<BeanType, BeanTypeValue>} fn Listener callback function.
   *
   * @public
   */
  removeListener(fn) {
    if (!this._evM.get(fn)) {
      console.warn(this, 'Change listener does not exist for the function:', fn);
      return;
    }

    this._evT.removeEventListener('change', fn, /*options*/ this._evM.get(fn), /*wantsUntrusted*/ true);
    this._evM.delete(fn);
  }
  /**
   * Adds a change listener.
   *
   * @param {InstanceBeanEventListener<BeanType, BeanTypeValue>} fn Listener callback function.
   * @param {boolean} [once] Optional once value, if true this listener will be removed after its called once.
   *
   * @public
   */
  addListener(fn, once) {
    if (this._evM.get(fn)) {
      console.warn(this, 'Change listener already exists for the function:', fn);
      return;
    }

    /**
     * @type {EventListenerCallbackEvent<BeanType, BeanTypeValue>}
     */
    var x = {};
    x;

    const doOnce = !!(once ?? false);

    this._evM.set(fn, { capture: true, once: doOnce, passive: true, fn: fn });
    this._evT.addEventListener('change', fn, /*options*/ this._evM.get(fn), /*wantsUntrusted*/ true);

    if (!doOnce) {
      return;
    }

    // If we only run this handler once we should add another to clean-up the mess left in the event map.
    const removalListener = () => {
      this.removeListener(fn);
      this._evT.removeEventListener('change', removalListener, /*options*/ removalListener.options, /*wantsUntrusted*/ true);
    };
    /**
     * @type {Readonly<EventListenerOptionsPlus>}
     */
    removalListener.options = { capture: true, once: true, passive: true };

    this._evT.addEventListener('change', removalListener, /*options*/ removalListener.options, /*wantsUntrusted*/ true);
  }

  /**
   * Clones this bean.
   *
   * NOTE: If it is immutable its clone will also be immutable.
   *
   * @returns {BeanType<BeanTypeValue>} Cloned bean.
   *
   * @public
   */
  clone() {
    if (this.isReadOnly() && !this.isImmutable()) {
      console.warn(
        this,
        "Cloning a read-only bean will remove its read-only status, you should use the mutableClone method instead if you want that behaviour otherwise you shouldn't clone a read-only bean.",
      );
    }
    return this._IDNUOYWBF_clone(false, false);
  }
  /**
   * Clones this bean and makes it mutable.
   *
   * @returns {BeanType<BeanTypeValue>} Cloned bean (but mutable).
   *
   * @public
   */
  mutableClone() {
    return this._IDNUOYWBF_clone(true, false);
  }

  /**
   * Clear this beans value.
   *
   * @returns {BeanType<BeanTypeValue>} If this bean is immutable a clone, otherwise a reference to the current bean.
   *
   * Errors if the bean is read-only.
   *
   * @virtual
   * @public
   */
  clearValue() {
    console.debug('InstanceBean in question:', this);
    throw new TypeError(`InstanceBean is a Virtual class, its subclass should implement 'clearValue' itself.`);
  }
  /**
   * Sets this beans value.
   *
   * @param {BeanTypeValue} _nextValue The new value of this bean.
   * @returns {BeanType<BeanTypeValue>} If this bean is immutable a clone, otherwise a reference to the current bean.
   *
   * Errors if the bean is read-only.
   *
   * @virtual
   * @public
   */
  setValue(_nextValue) {
    console.debug('InstanceBean in question:', this);
    throw new TypeError(`InstanceBean is a Virtual class, its subclass should implement 'setValue' itself.`);
  }
  /**
   * Alias of `setValue`.
   *
   * @param {BeanTypeValue} nextValue The new value of this bean.
   * @returns {BeanType<BeanTypeValue>} If this bean is immutable a clone, otherwise a reference to the current bean.
   *
   * Errors if the bean is read-only.
   *
   * @public
   */
  set value(nextValue) {
    return this.setValue(nextValue);
  }

  /**
   * Checks if this bean has a value.
   *
   * @returns {boolean} Whether or not this bean has a value.
   *
   * @public
   */
  hasValue() {
    return this[BeanSecret].hasValue;
  }
  /**
   * Gets the this beans value.
   *
   * @returns {BeanTypeValue | undefined} This beans value, or undefined if it doesn't have one.
   *
   * @public
   */
  getValue() {
    return this[BeanSecret].value;
  }

  /**
   * Alias of `getValue`.
   *
   * @returns {BeanTypeValue | undefined} This beans value, or undefined if it doesn't have one.
   *
   * @public
   */
  valueOf() {
    return this.getValue();
  }
  /**
   * Alias of `getValue`.
   *
   * @returns {BeanTypeValue | undefined} This beans value, or undefined if it doesn't have one.
   *
   * @public
   */
  get value() {
    return this.getValue();
  }
}

exports.constructInstanceBean = constructInstanceBean;
exports.InstanceBean = InstanceBean;
// Re-export the BeanSecret for ease of use.
exports.BeanSecret = BeanSecret;

lockns();
