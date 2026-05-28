'use strict';
/**
 * @module muiflib/tuple
 */

/** @import { Tuple, TupleConstructor } from './tuple.d.ts' */;

const { lockns, lnullj } = require('./ns.cjs').create(module, exports);

/**
 * @param {null | unknown[]} arr
 * @param  {...unknown} $arguments
 * @returns {Tuple<unknown>}
 */
function RebrandArrayToTuple(arr, ...$arguments) {
  // HACK: Rebrand an actual array instance to ensure Array.isArray works properly on the returned tuple.
  // https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isarray
  // https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-arraycreate
  const internal = arr ?? Array(...$arguments);
  const length = internal.length;
  Object.setPrototypeOf(internal, Tuple.prototype);

  const props = {
    'constructor': {
      writable: true,
      enumerable: false,
      configurable: true,
      value: Tuple,
    },
  };

  for (let i = 0; i < length; ++i) {
    props[i] = {
      enumerable: true,
      configurable: true,
      get: ((val) => val).bind(internal, internal[i]),
      set: () => true,
    };
  }

  Object.defineProperties(internal, props);

  // HACK: Return a proxy to get around the unconfigurable length property so we can emulate it being readonly.
  const isProtectedProperty = (key) => (key === 'length') || (!isNaN(key) && (+key >= 0 && +key < length));
  return new Proxy(internal, {
    defineProperty(target, property, attributes) {
      if (property === 'length') {
        return true;
      }
      return Reflect.defineProperty(target, property, attributes);
    },
    deleteProperty(target, property) {
      if (isProtectedProperty(property)) {
        return true;
      }
      return Reflect.deleteProperty(target, property);
    },
    getOwnPropertyDescriptor(target, property) {
      if (property === 'length') {
        return {
          configurable: false,
          enumerable: false,
          writable: false,
          value: target.length,
        };
      }
      return Reflect.getOwnPropertyDescriptor(target, property);
    },
    set(target, property, newValue, receiver) {
      if (isProtectedProperty(property)) {
        return true;
      }
      return Reflect.set(target, property, newValue, receiver);
    },
  });
}

/** @type {TupleConstructor} */
function Tuple() {
  if (this == (void 0)) {
    return new Tuple(...arguments);
  }
  return RebrandArrayToTuple(null, ...arguments);
}

Object.defineProperties(Tuple, {
  // https://tc39.es/ecma262/multipage/indexed-collections.html#sec-get-array-%symbol.species%
  [Symbol.species]: {
    configurable: true,
    enumerable: false,
    get: Object.defineProperties(
      function TupleSpecies() {
        return Tuple;
      },
      {
        'name': {
          writable: false,
          enumerable: false,
          configurable: true,
          value: 'get [Symbol.species]',
        },
        'displayName': {
          writable: true,
          enumerable: false,
          configurable: true,
          value: 'get [Symbol.species]',
        },
      },
    ),
    set: (void 0),
  },
  'prototype': {
    writable: false,
    enumerable: false,
    configurable: false,
    value: Object.assign(Array(), Object.create(Array.prototype, {
      'constructor': {
        writable: false,
        enumerable: false,
        configurable: false,
        value: Tuple,
      },
      [Symbol.toStringTag]: {
        writable: false,
        enumerable: false,
        configurable: false,
        value: '[object Tuple]',
      },
      [Symbol.isConcatSpreadable]: {
        writable: false,
        enumerable: false,
        configurable: false,
        value: true,
      },
      [Symbol.iterator]: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: Object.defineProperties(
          function TupleIterator() {
            return this.values(...arguments);
          },
          {
            'name': {
              writable: false,
              enumerable: false,
              configurable: true,
              value: 'values',
            },
            'displayName': {
              writable: true,
              enumerable: false,
              configurable: true,
              value: 'values',
            },
          },
        ),
      },
      // https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype-%symbol.unscopables%
      // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-symbol.unscopables
      [Symbol.unscopables]: {
        writable: false,
        enumerable: false,
        configurable: true,
        value: lnullj.create({
          'at': true,
          'copyWithin': true,
          'entries': true,
          'fill': true,
          'find': true,
          'findIndex': true,
          'findLast': true,
          'findLastIndex': true,
          'flat': true,
          'flatMap': true,
          'includes': true,
          'keys': true,
          'toReversed': true,
          'toSorted': true,
          'toSpliced': true,
          'values': true,

          'with': true,
          'toArray': true,
          'toJSON': true,
        }),
      },
      // https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-the-array-prototype-object
      'length': {
        writable: false,
        enumerable: false,
        configurable: false,
        value: 0,
      },
    }), {
      toJSON() {
        return this.toArray();
      },
      toArray() {
        return Array.from(this);
      },

      at(index) {
        return Array.prototype.at.call(this, index);
      },
      entries() {
        return Array.prototype.entries.call(this);
      },
      every(func, thisArg) {
        func = arguments.length < 2 ? func : func.bind(thisArg);
        return Array.prototype.every.call(this, (v, i) => func(v, i, this));
      },
      find(func, thisArg) {
        func = arguments.length < 2 ? func : func.bind(thisArg);
        return Array.prototype.find.call(this, (v, i) => func(v, i, this));
      },
      findIndex(func, thisArg) {
        func = arguments.length < 2 ? func : func.bind(thisArg);
        return Array.prototype.findIndex.call(this, (v, i) => func(v, i, this));
      },
      findLast(func, thisArg) {
        func = arguments.length < 2 ? func : func.bind(thisArg);
        return Array.prototype.findLast.call(this, (v, i) => func(v, i, this));
      },
      findLastIndex(func, thisArg) {
        func = arguments.length < 2 ? func : func.bind(thisArg);
        return Array.prototype.findLastIndex.call(this, (v, i) => func(v, i, this));
      },
      forEach(func, thisArg) {
        func = arguments.length < 2 ? func : func.bind(thisArg);
        return Array.prototype.forEach.call(this, (v, i) => func(v, i, this));
      },
      includes(value, offset) {
        return Array.prototype.includes.call(this, value, offset);
      },
      indexOf(value, offset) {
        return Array.prototype.indexOf.call(this, value, offset);
      },
      join(sep) {
        return Array.prototype.join.call(this, sep);
      },
      keys() {
        return Array.prototype.keys.call(this);
      },
      lastIndexOf(value, offset) {
        return Array.prototype.lastIndexOf.call(this, value, offset);
      },
      reduce(func, start) {
        func = arguments.length < 2 ? func : func.bind(thisArg);
        return Array.prototype.reduce.call(this, (p, v, i) => func(p, v, i, this), start);
      },
      reduceRight(func, start) {
        func = arguments.length < 2 ? func : func.bind(thisArg);
        return Array.prototype.reduceRight.call(this, (p, v, i) => func(p, v, i, this), start);
      },
      some(func, thisArg) {
        func = arguments.length < 2 ? func : func.bind(thisArg);
        return Array.prototype.some.call(this, (v, i) => func(v, i, this));
      },
      toLocaleString() {
        return Array.prototype.toLocaleString.call(this);
      },
      toString() {
        return Array.prototype.toString.call(this);
      },
      values() {
        return Array.prototype.values.call(this);
      },

      concat(...values) {
        return RebrandArrayToTuple([].concat(...values));
      },
      copyWithin(target, start, end) {
        if (Tuple.isTuple(target)) {
          const result = target.toArray();
          Array.prototype.copyWithin.call(this, result, start, end);
          return RebrandArrayToTuple(result);
        }
        Array.prototype.copyWithin.call(this, target, start, end);
        return target;
      },
      fill(value, start, end) {
        return RebrandArrayToTuple(this.toArray().fill(value, start, end));
      },
      filter(func, thisArg) {
        return RebrandArrayToTuple(this.toArray().filter((v, i) => func.apply(thisArg, [v, i])))
      },
      flat(depth) {
        return RebrandArrayToTuple(Array.prototype.flat.call(this, depth));
      },
      flatMap(func, thisArg) {
        func = arguments.length < 2 ? func : func.bind(thisArg);
        return RebrandArrayToTuple(Array.prototype.flatMap.call(this, (v, i) => func(v, i, this)));
      },
      map(func, thisArg) {
        func = arguments.length < 2 ? func : func.bind(thisArg);
        return RebrandArrayToTuple(Array.prototype.map.call(this, (v, i) => func(v, i, this)));
      },
      pop() {
        const arr = this.toArray();
        arr.pop();
        return RebrandArrayToTuple(arr);
      },
      push(...items) {
        const arr = this.toArray();
        arr.push(...items);
        return RebrandArrayToTuple(arr);
      },
      reverse() {
        return RebrandArrayToTuple(this.toArray().reverse());
      },
      shift() {
        const arr = this.toArray();
        arr.shift();
        return RebrandArrayToTuple(arr);
      },
      slice(start, end) {
        return RebrandArrayToTuple(Array.prototype.slice.call(this, start, end));
      },
      sort(func) {
        return RebrandArrayToTuple(this.toArray().sort(func));
      },
      splice(start, deleteN, ...items) {
        const arr = this.toArray();
        arr.splice(start, deleteN, ...items);
        return RebrandArrayToTuple(arr);
      },
      toReversed() {
        return this.reverse();
      },
      toSorted(func) {
        return this.sort(func);
      },
      toSpliced(start, deleteN, ...items) {
        return this.splice(start, deleteN, ...items);
      },
      unshift(...items) {
        const arr = this.toArray();
        arr.unshift(...items);
        return RebrandArrayToTuple(arr);
      },
      with(index, value) {
        const arr = this.toArray();
        arr.with(index, value);
        return RebrandArrayToTuple(arr);
      },
    }),
  },
});
Object.assign(Tuple, {
  isArray(arg) {
    return Array.isArray(arg);
  },
  isTuple(arg) {
    return this.isArray(arg) && (arg instanceof this);
  },
  from(iterable, mapFunc, thisArg) {
    return RebrandArrayToTuple(Array.from(iterable, mapFunc, thisArg));
  },
  fromAsync(iterable, mapFunc, thisArg) {
    return Array.fromAsync(iterable, mapFunc, thisArg).then((value) => RebrandArrayToTuple(value));
  },
  of(...items) {
    return RebrandArrayToTuple(Array.of(...items));
  },
});

exports.Tuple = /** @type {TupleConstructor} */(Tuple);

lockns();
