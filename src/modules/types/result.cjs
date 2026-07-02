
'use strict';
/**
 * @module muif/types/result
 */

const { lockns } = require('../../lib/ns.cjs').create(module, exports);

/**
 * Result type.
 *
 * @template {unknown} ValueType The type of the ok value (if any).
 * @template {unknown} ErrorType The type of the error value (if any).
 */
class Result {
  /**
   * @param {boolean} ok Is this result OK?
   * @param {ValueType} value The value of this result (if it is OK).
   * @param {ErrorType} error The error of this result (if it is not OK).
   */
  constructor(ok, value, error) {
    this._ok = ok;
    this._value = ok ? value : null;
    this._error = ok ? null : error;
  }

  isOK() {
    return this._ok;
  }
  /**
   * Unwraps this results value, if it is not OK it will error.
   * @returns {ValueType}
   */
  unwrap() {
    if (!this._ok) {
      throw new Error('Cannot unwrap a result that has errored.', {
        cause: this._error,
      });
    }
    return this._value;
  }
  /**
   * Unwraps this results error value, if it is OK it will error.
   * @returns {rrorType}
   */
  unwrapError() {
    if (this._ok) {
      throw new Error('Cannot unwrap a result error that has not errored.', {
        cause: this._value,
      });
    }
    return this._error;
  }
  /**
   * Unwraps this results value, if it is not OK it will return the value you pass.
   * @template {unknown} OtherValueType The type for the other value if the result is not OK.
   * @param {OtherValueType} value The value to use if the result is not OK.
   * @returns {ValueType | OtherValueType}
   */
  unwrapOr(value) {
    if (this._ok) {
      return this._value;
    }
    return value;
  }
  /**
   * Unwraps this results error value, if it is OK it will return the value you pass.
   * @template {unknown} OtherErrorType The type for the other value if the result is OK.
   * @param {OtherErrorType} value The value to use if the result is OK.
   * @returns {ErrorType | OtherErrorType}
   */
  unwrapErrorOr(value) {
    if (this._ok) {
      return value;
    }
    return this._error;
  }
}
exports.Result = Result;

lockns();
