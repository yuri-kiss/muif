```js
'use strict';
/**
 * @module muiflib/example
 */

const {lockns, global} = require('./ns.cjs').create(module, exports);
// NOTE: also has lnullj and es exports for ease of use!

// namespace code here
// exports.abc = 123;

lockns();
```
