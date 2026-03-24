const {goog} = require('./goog.cjs');
const lodash = require('../lodash.cjs');

const ns = goog.math = {};

ns.modulo = (value, modulus) => {
  const remainder = value % modulus;
  if ((remainder * modulus) < 0) return remainder + modulus;
  return remainder;
};

ns.clamp = lodash.clamp;
ns.lerp = (x, y, l) => (
  x + (l * (y - x))
);
ns.standardAngle = (value) => ns.modulo(value, 360);
ns.nearlyEquals = (x, y, prec) => Math.abs(x - y) <= (prec || 0.000001);
