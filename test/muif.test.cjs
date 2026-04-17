'use strict';

const chai = require('chai');
require('node:util').inspect.defaultOptions.depth = 8;

describe('muiflib', () => {
  require('./subtests/lib_lnullj.cjs');
  require('./subtests/lib_ns.cjs');

  require('./subtests/modules/beans/index.cjs');

  describe('muif', () => {
    beforeEach(() => delete global.muif);

    it('requiring the pure version of the library keeps global scope clean?',
      () => {
          require('../src/pure.cjs');
          chai.expect(global.muif).equals(undefined, 'pure version of the library polluted the global scope');
      }
      );

    it('requiring the normal version of the library exposes a copy of the library?',
      () => {
          const $muif = require('../src/index.cjs');

          chai.expect(global.muif).equals($muif,     'normal version of the library did not pollute the global scope');
      }
      );
  });
});
