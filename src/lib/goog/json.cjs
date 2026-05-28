'use strict';

const defineBadExports = require('./defineBadExports.cjs');

module.exports = (goog) => {
  const ns = (goog.json = {});

  ns.errorLogger_ = goog.nullFunction;
  ns.setErrorLogger = goog.nullFunction;
  ns.USE_NATIVE_JSON = true;
  ns.parse = JSON.parse;
  ns.serialize = JSON.stringify;

  ns.isValid = (s) => {
    // All empty whitespace is not valid.
    if (/^\s*$/.test(s)) {
      return false;
    }

    // This is taken from http://www.json.org/json2.js which is released to the
    // public domain.
    // Changes: We dissallow \u2028 Line separator and \u2029 Paragraph separator
    // inside strings.  We also treat \u2028 and \u2029 as whitespace which they
    // are in the RFC but IE and Safari does not match \s to these so we need to
    // include them in the reg exps in all places where whitespace is allowed.
    // We allowed \x7f inside strings because some tools don't escape it,
    // e.g. http://www.json.org/java/org/json/JSONObject.java

    // Parsing happens in three stages. In the first stage, we run the text
    // against regular expressions that look for non-JSON patterns. We are
    // especially concerned with '()' and 'new' because they can cause invocation,
    // and '=' because it can cause mutation. But just to be safe, we want to
    // reject all unexpected forms.

    // We split the first stage into 4 regexp operations in order to work around
    // crippling inefficiencies in IE's and Safari's regexp engines. First we
    // replace all backslash pairs with '@' (a non-JSON character). Second, we
    // replace all simple value tokens with ']' characters, but only when followed
    // by a colon, comma, closing bracket or end of string. Third, we delete all
    // open brackets that follow a colon or comma or that begin the text. Finally,
    // we look to see that the remaining characters are only whitespace or ']' or
    // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

    // Don't make these static since they have the global flag.
    const backslashesRe = /\\["\\\/bfnrtu]/g;
    const simpleValuesRe = /(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g;
    const openBracketsRe = /(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g;
    const remainderRe = /^[\],:{}\s\u2028\u2029]*$/;

    return remainderRe.test(s.replace(backslashesRe, '@').replace(simpleValuesRe, ']').replace(openBracketsRe, ''));
  };

  defineBadExports(ns, 'goog.json', [
    'Replacer',
    'Reviver',
    'Serializer',
  ]);
};
