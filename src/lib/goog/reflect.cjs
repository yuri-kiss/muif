module.exports = (goog) => {
  const ns = (goog.reflect = {});

  ns.object = (_unused, object) => object;
  ns.objectProperty = (property, _unused) => property;
  ns.sinkValue = (x) => x;
  ns.sinkValue[' '] = goog.nullFunction;
  ns.canAccessProperty = (object, property) => {
    try {
      void object[property];
      return true;
    } catch(_error) {
      return false;
    }
  };
  ns.cache = (cache, key, valueFunc, keyFunc) => {
    const property = keyFunc ? keyFunc(key) : key;
    if (Object.hasOwn(cache, property)) {
      return cache[property];
    }
    cache[property] = valueFunc(key);
    return cache[property];
  };
};
