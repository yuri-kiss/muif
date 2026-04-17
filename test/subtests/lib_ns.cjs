'use strict';

const chai = require('chai');

describe('lib/ns#create()', () => {
  let modl;
  beforeEach(() => (modl = { exports: null }));

  const ns = require('../../src/lib/ns.cjs');

  it('ns.create overrides module.exports with exports', () => {
    const e = { a: 1 };
    ns.create(modl, e);
    chai.expect(modl.exports && modl.exports.a).equals(1, 'ns.create did not override the modules exports');
  });

  describe('ns.create#lockns', () => {
    it('lockns should freeze the exports object', () => {
      const e = {};
      const n = ns.create(modl, e);
      n.lockns();
      chai.expect(Object.isFrozen(modl.exports), 'lockns did not freeze the modules exports');
    });

    it('lockns should make the exports object null prototyped?', () => {
      const e = {};
      const n = ns.create(modl, e);
      n.lockns();
      chai.expect(require('../../src/lib/lnullj.cjs').is(modl.exports), 'lockns did not make the modules exports null prototyped');
    });
  });
});
