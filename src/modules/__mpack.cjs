'use strict';
/**
 * @module muif/mpack
 */

const {lockns, lnullj} = require('../lib/ns.cjs').create(module, exports);
const ieee754 = require('core-js-pure/internals/ieee754.js');

// Custom JSON packing format
// 0xFF: close
// 0xFE: null,
// 0x01: object
// 0x02: array
// 0x03: start positive vlq integer
// 0x04: start negative vlq integer
// 0x0F: raw opcode
//
// 0x20: start string
//
// 0x30: start float16
// 0x31: start float32
// 0x32: start float64
//
// 0xE0: -0
// 0xE1: 0
// 0xE2: -1
// 0xE3: 1
// 0xE4: -Infinity
// 0xE5: Infinity
// 0xE6: NaN
// 0xFC: false
// 0xFD: true
//
// 0x40: array of 0 items
// 0x41: array of 1 items
//   etc
// 0x4F: array of 15 items
//
// 0x51: -16
//   etc
// 0x5F: -2
// 0x60: 2
//   etc
// 0x6E: 16
//

/**
 * Packs a VLQ integer.
 *
 * @param {number} value Value to encode.
 * @returns {Array<number>} VLQ encoded integer.
 *
 * @package
 */
exports.packVLQinteger = (value) => {
  const bytes = [];
  const bigValue = BigInt(value);
  let val = bigValue, i = 0, byte;
  while(i++ < 10) {
    byte = Number(val & 0x7Fn) >>> 0;
    val = val >> 7n;
    if (val <= 0n || i === 10) {
      bytes.push(byte);
      break;
    }
    bytes.push(byte | 0x80);
  }
  return bytes;
};

/**
 * Packs singular values.
 *
 * @param {number | string | undefined | null} [value] Value to encode.
 * @param {boolean} [inObject] Is this value an object key?
 * @returns {Array<number>} Packed value.
 *
 * @package
 */
exports.packSingle = (value, inObject) => {
  if (lnullj.empty(value)) {
    return [0xFE];
  }

  switch(typeof value) {
    case 'bigint':
    case 'function':
    case 'symbol':
      throw new TypeError(`Values of type ${typeof value} are not supported in packing.`);
    case 'boolean':
      return [+value + 0xFC];
    case 'string': {
      const bytes = Array.from((new TextEncoder()).encode(value));
      if (inObject && bytes.length <= 15) {
        return [0x40 + bytes.length].concat(bytes);
      }
      return [0x05].concat(exports.packVLQinteger(bytes.length)).concat(bytes);
    };
    case 'number': {
      switch(value) {
        case 0:
          return [Object.is(value, -0) ? 0xE0 : 0xE1];
        case -1:
          return [0xE2];
        case 1:
          return [0xE3];
        case -Infinity:
          return [0xE4];
        case Infinity:
          return [0xE5];
        default:
          if (Number.isNaN(value)) {
            return [0xE6];
          }
          break;
      }

      if (Number.isInteger(value)) {
        if (value >= 2 && value <= 16) {
          return [0x60 + (value - 2)];
        } else if (value <= -2 && value >= -16) {
          return [0x5F + (value + 2)];
        }
        return [Math.sign(value) === 1 ? 0x03 : 0x04].concat(exports.packVLQinteger(value));
      }

      // TODO: Enhance this to have float32 and float16 support.
      return [0x32].concat(ieee754.pack(value, 52, [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
    };
    case 'object':
    case 'undefined':
    default:
      throw new TypeError(`Unexpected type: ${typeof value}`);
  }
};

/**
 * Packs JSON data.
 *
 * @param {Object | Array<unknown> | undefined | null} [value] Object / array value to encode.
 * @returns {Uint8Array} Packed value.
 *
 * @public
 */
exports.pack = (value, topLevel = true) => {
  if (typeof value !== 'object' && !lnullj.empty(value)) {
    throw new TypeError(`value must be undefined, null an object or an array.`);
  }

  if (lnullj.empty(value)) {
    return new Uint8Array(exports.packSingle(value));
  }

  const byteArray = [];
  if (Array.isArray(value)) {
    const len = value.length;
    if (len > 15) {
      byteArray.push(0x02);
    } else {
      byteArray.push(0x40 + len);
    }
    for (let i = 0, val; i < len; ++i) {
      val = value[i];

      if (Array.isArray(val) || typeof val === 'object' && !lnullj.empty(val)) {
        byteArray.push.apply(byteArray, Array.from(exports.pack(val, false)));
        continue;
      }

      byteArray.push.apply(byteArray, exports.packSingle(val));
    }
    if (!topLevel && byteArray[0] === 0x02) {
      byteArray.push(0xFF);
    }
    return new Uint8Array(byteArray);
  }

  if (!topLevel) {
    byteArray.push(0x01);
  }

  const keys = Object.getOwnPropertyNames(value);
  const klen = keys.length;
  for (let i = 0, val; i < klen; ++i) {
    val = value[keys[i]];

    byteArray.push.apply(byteArray, exports.packSingle(keys[i], true));
    if (Array.isArray(val) || typeof val === 'object' && !lnullj.empty(val)) {
      byteArray.push.apply(byteArray, Array.from(exports.pack(val, false)));
      continue;
    }

    byteArray.push.apply(byteArray, exports.packSingle(val));
  }

  if (!topLevel) {
    byteArray.push(0xDF);
  }

  if (byteArray[0] === (void 0)) {
    byteArray.push(0x01);
  }

  return new Uint8Array(byteArray);
};

lockns();
