'use strict';
/**
 * @module muiflib/oop
 */

const {lockns, lnullj, es: { Object }} = require('./ns.cjs').create(module, exports);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain

exports.Clazz = /** @template {VoidFunction} T @param {T} $constructor @param {?T} [parent] */($constructor, parent) => {
  const clazz = function MClazz() {
    'use strict';
    if (this === lnullj.UNDF) {
      return new MClazz(...arguments);
    }
    const $super = (parent || (() => (void 0))).bind(this);
    return $constructor.call(this, $super, ...arguments) ?? this;
  };
  if (!lnullj.empty(parent)) {
    Object.setPrototypeOf(clazz.prototype, parent.prototype);
  }
  clazz.prototype.constructor = clazz;
  return clazz;
};

lockns();
