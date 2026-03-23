'use strict';
/**
 * @module muif/beans/readonly
 */

const {lockns, es: { console }} = require('../../../lib/ns.cjs').create(module, exports);

const {InstanceBean, BeanSecret, constructInstanceBean} = require('../instance.cjs');

/**
 * Bean that is read-only.
 *
 * This errors whenever the bean is about to be mutated.
 *
 * @template BeanTypeValue
 *
 * @extends {InstanceBean<BeanTypeValue, ReadOnlyBean<BeanTypeValue>>}
 *
 * @public
 */
class ReadOnlyBean extends InstanceBean {
  /**
   * @param {BeanTypeValue} [value] The bean value.
   */
  constructor(value) {
    super(value, arguments.length > 0);

    this[BeanSecret].readOnly = true;
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
    if (!ignoreImmutability && !makeMutable) {
      console.warn(this, 'Cloning a read-only bean without making it mutable is useless.');
    }
    return constructInstanceBean(
      ReadOnlyBean,
      /** @type {BeanValueType} */(this.getValue()),
      this.hasValue(),
    );
  }

  /**
   * Read-only beans cannot be listened too, do not use this method!
   *
   * @param {unknown} _fn UNUSED.
   *
   * @returns {never} This WILL throw an error if use.
   *
   * @public
   */
  removeListener(_fn) {
    console.debug('Bean in question:', this);
    throw new TypeError('Cannot remove a change listener for a read-only bean.');
  }
  /**
   * Read-only beans cannot be listened too, do not use this method!
   *
   * @param {unknown} _fn UNUSED.
   *
   * @returns {never} This WILL throw an error if use.
   *
   * @public
   */
  addListener(_fn) {
    console.debug('Bean in question:', this);
    throw new TypeError('Cannot add a change listener for a read-only bean.');
  }

  /**
   * Read-only beans cannot be mutated, do not use this method!
   *
   * @returns {never} This WILL throw an error if use.
   *
   * @public
   */
  clearValue() {
    console.debug('Bean in question:', bean);
    throw new TypeError('Cannot write to a read-only bean.');
  }
  /**
   * Read-only beans cannot be mutated, do not use this method!
   *
   * @param {unknown} _nextValue UNUSED.
   *
   * @returns {never} This WILL throw an error if use.
   *
   * @public
   */
  setValue(_nextValue) {
    console.debug('Bean in question:', bean);
    throw new TypeError('Cannot write to a read-only bean.');
  }
}

exports.ReadOnlyBean = ReadOnlyBean;

lockns();
