'use strict';

const muif = require('../../pure.cjs');
const muif$closureloader$evaluateInLooseMode = require('./evaluateInLooseMode.cjs');

{

  // Raw require function: uses the raw-loader when in Webpack and NodeFS otherwise.
  const muif$closureloader$rrequire = muif.process_env_WEBPACK ? (() => {
    const ctx = require.context('!!raw-loader?esModule=false!../../../node_modules/google-closure-library/closure/goog/', true, /(^(?!.*(?=(bootstrap)|(test))))(.+)(\.js$)/);
    const ctx2 = require.context('!!raw-loader?esModule=false!../../../node_modules/google-closure-library/third_party', true, /\.js$/)

    return (module) => {
      if (module.startsWith('./../../third_party')) {
        return ctx2(module.replace('../../third_party/', ''));
      }
      return ctx(module);
    };
  })() : ((module) => {
    return {'default': require(/* webpackIgnore: true */'fs').readFileSync(require.resolve(module.replace('./', 'google-closure-library/closure/goog/'))).toString()};
  });

  // The default file uses a weird bootstrap that wont work as it uses NodeJS specific modules,
  // to get around this we can manually load the base.js file and its dependancies.
  muif$closureloader$evaluateInLooseMode(
    muif$closureloader$rrequire('./base.js')['default'],
    true,
  );
  const goog = muif.lib.es.global.goog;

  const hasDocument = !!muif.lib.es.global.document;
  if (!muif.lib.es.global.window) {
    const jsdom = require(/* webpackIgnore: true */'jsdom');

    const window = (new jsdom.JSDOM()).window;
    muif.lib.es.global.window = window;
    muif.lib.es.global.document = window.document;
  }

  const oldUA = navigator.userAgent;
  if (!oldUA || navigator.userAgent.startsWith('Node.js')) {
    delete navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows CE; Trident/3.1)',
      writable: false,
      enumerable: true,
      configurable: true,
    });
  }

  {
    const muif$closureloader$stack_ = {}, muif$closureloader$loaded_ = new Set([]);

    // muif.lib.es.console.log(muif$closureloader$stack_);

    const goog$addDependency = goog.addDependency;
    goog.addDependency = (file, provides, requires, extra) => {
      for (let i = 0; i < provides.length; ++i) {
        muif$closureloader$stack_[provides[i]] = [file, requires, extra];
      }
    };
    require('google-closure-library/closure/goog/deps');
    goog.addDependency = goog$addDependency;

    const muif$closureloader$req = (muif$closureloader$modul) => {
      if (muif$closureloader$loaded_.has(muif$closureloader$stack_[muif$closureloader$modul][0])) return;
      {
        const file = muif$closureloader$stack_[muif$closureloader$modul][0];
        if (file.includes('bootstrap') || file.includes('test') || file.includes('_perf')) {
          muif$closureloader$loaded_.add(muif$closureloader$stack_[muif$closureloader$modul][0]);
          return;
        }
      };
      // muif.lib.es.console.log('muif/goog loading %s', muif$closureloader$modul);
      for (let j = 0; j < muif$closureloader$stack_[muif$closureloader$modul][1].length; ++j) {
        muif$closureloader$req(muif$closureloader$stack_[muif$closureloader$modul][1][j]);
        if (!muif$closureloader$loaded_.has(muif$closureloader$stack_[muif$closureloader$stack_[muif$closureloader$modul][1][j]][0])) {
          // muif.lib.es.console.log('muif/goog failed to load dependency %s', muif$closureloader$stack_[muif$closureloader$modul][1][j]);
          return;
        }
      }
      muif$closureloader$loaded_.add(muif$closureloader$stack_[muif$closureloader$modul][0]);
      const isModule = muif$closureloader$stack_[muif$closureloader$modul][2] && muif$closureloader$stack_[muif$closureloader$modul][2].module;
      const src = muif$closureloader$rrequire(`./${muif$closureloader$stack_[muif$closureloader$modul][0]}`)['default'];
      muif$closureloader$evaluateInLooseMode(
        `${
          hasDocument
            ? `;document.scripts.item(document.scripts.length - 1).dataset.googModule=${JSON.stringify(muif$closureloader$modul)};`
            : ''
        }${isModule ? 'goog.loadModule(function(exports){"use strict";' : ''}\n${src}\n${isModule ? ';return exports;});' : ''}${
          hasDocument
            ? `;document.scripts.item(document.scripts.length - 1).remove();`
            : ''
        }`
      );
    };

    const muif$closureloader$modules_ = Object.keys(muif$closureloader$stack_);
    for (let i = 0; i < muif$closureloader$modules_.length; ++i) {
      muif$closureloader$req(muif$closureloader$modules_[i]);
    }
  };

  if (oldUA !== navigator.userAgent) {
    delete navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: oldUA,
      writable: false,
      enumerable: true,
      configurable: true,
    });
  }

  exports.closureLibrary_ = goog;
};

// Redefine the "goog" variable as the closure library would have overwritten it with its implementations by now.
const goog = exports.goog = {};
module.exports = exports;

const {global, console, defineBadExports} = muif.lib.es;

// This file is just for defining top level compatibility values and simple 1 to 1 maps of functions.
// The lib/goog/goog.cjs file contains the extra code unrelated to things like that.

goog.global = global;

goog.typeOf = muif.types.extendedTypeOf;
goog.isString = muif.types.is.isString;
goog.isBoolean = muif.types.is.isBoolean;
goog.isNumber = muif.types.is.isNumber;
goog.isNull = muif.types.is.isNull;
goog.isArray = muif.types.is.isArray;
goog.isArrayLike = muif.types.is.isArrayLike;
goog.isObject = muif.types.is.isObjectGoog;
goog.isFunction = muif.types.is.isFunction;
goog.isDef = (value) => !muif.types.is.isUndefined(value);
goog.isDefAndNotNull = muif.types.is.isNullish;
goog.isDateLike = muif.types.is.isDateLike;

goog.now = () => goog.global.Date.now();

goog.nullFunction = () => (void 0);

// NOTE: Removed in later versions but some stuff might still use it.
goog.mixin = (child, parent) => {
  for (const key in parent) child[key] = parent[key];
};
goog.bind = (value, self, args) => {
  if (goog.isDefAndNotNull(args)) {
    return goog.global.Function.prototype.bind.call(value, self, ...args);
  }
  return goog.global.Function.prototype.bind.call(value, self);
};

goog.logToConsole_ = (value) => console.error(value);

goog.globalEval = (js) => muif$closureloader$evaluateInLooseMode(js);

// Compatibility constants.
goog.LOCALE = 'en';
goog.DEBUG = false;
goog.TRUSTED_SITE = true;
goog.STRICT_MODE_COMPATIBLE = true;
goog.DISALLOW_TEST_ONLY_CODE = true;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = false;
goog.ENABLE_DEBUG_LOADER = false;
goog.LOAD_MODULE_USING_EVAL = false;
goog.SEAL_MODULE_EXPORTS = true;
goog.DEPENDENCIES_ENABLED = false;
goog.TRANSPILE = false;
goog.TRANSPILE_TO_LANGUAGE = '';
goog.TRANSPILER = '';
goog.ASSUME_ES_MODULES_TRANSPILED = true;
goog.ASSUME_NATIVE_PROMISE = true;
goog.NATIVE_ARRAY_PROTOTYPES = true;

// We don't support Safari 10.
goog.hasBadLetScoping = false;
goog.useSafari10Workaround = () => goog.hasBadLetScoping;
goog.workaroundSafari10EvalBug = () => '';

// Import submodules to finish off goog.
// require('./log.cjs')(goog);
// require('./json.cjs')(goog);
// require('./math.cjs')(goog);
require('./reflect.cjs')(goog);

const mapFromGoog = (props) => {
  for (let i = 0; i < props.length; ++i) {
    goog[props[i]] = exports.closureLibrary_[props[i]];
  }
};

mapFromGoog(['log']);

defineBadExports(goog, 'goog', [
// mapFromGoog([
  'isInModuleLoader_',
  'isInGoogModuleLoader_',
  'isInEs6ModuleLoader_',
  'exportPath_',
  'define',
  'provide',
  'constructNamespace_',
  'getScriptNonce',
  'NONCE_PATTERN_',
  'cspNonce_',
  'VALID_MODULE_RE_',
  'module',
  'ModuleType',
  'moduleLoaderState_',
  'declareModuleId',
  'setTestOnly',
  'forwardDeclare',
  'getObjectByName',
  'globalize',
  'addDependancy',
  'require',
  'requireType',
  'basePath',
  'abstractMethod',
  'addSingletonGetter',
  'instantiatedSingletons',
  'loadedModules_',
  'loadModule',
  'loadModuleFromSource_',
  'normalizePath_',
  'loadFileSync',
  'transpile_',
  'getUid',
  'hasUid',
  'removeUid',
  'UID_PROPERTY_',
  'uidCounter_',
  'getHashCode',
  'removeHashCode',
  'bindNative_',
  'bindJs_',
  'getCssMame',
  'setCssNameMapping',
  'getMsg',
  'getMsgWithFallback',
  'exportSymbol',
  'exportProperty',
  'base',
  'scope',
  'tagUnsealableClass',
  'UNSEALABLE_CONSTRUCTOR_PROPERTY_',
  'debug',
  'labs',
  'disposable',
  'Disposable',
  'dispose',
  'disposeAll',
  'fs',
  'i18n',
  'a11y',
  'Thenable',
  'async',
  'promise',
  'Promise',
  'Timer',
  'getMsgOrig',
  'iter',
  'fx',
  'Delay',
  'structs',
  'FEATURESET_YEAR',
  'getScriptNonce_',
  'isProvided_',
  'implicitNamespaces_',
  'addDependency',
  'instantiatedSingletons_',
  'TRUSTED_TYPES_POLICY_NAME',
  'loadFileSync_',
  'getCssName',
  'GetMsgOptions',
  'identity_',
  'createTrustedTypesPolicy',
  'CLOSURE_EVAL_PREFILTER_',
  'flags',
  'Throttle',
  'collections',
  'crypt',
  'cssom',
  'date',
  'db',
  'net',
  'uri',
  'window',
  'editor',
  'positioning',
  'format',
  'graphics',
  'history',
  'memoize',
  'History',
  'Uri',
  'pubsub',
  'storage',
  'loader',
  'locale',
  'messaging',
  'proto',
  'proto2',
  'singleton',
  'soy',
  'spell',
  'stats',
  'tweak',
  'url',
  'vec',
  'webgl',
]);

// @todo: Implement the following ourselves.
goog.inherits = exports.closureLibrary_.inherits;
goog.defineClass = exports.closureLibrary_.defineClass;
goog.dom = exports.closureLibrary_.dom;
goog.asserts = exports.closureLibrary_.asserts;
goog.array = exports.closureLibrary_.array;
goog.string = exports.closureLibrary_.string;
goog.object = exports.closureLibrary_.object;
goog.reflect = exports.closureLibrary_.reflect;
goog.userAgent = exports.closureLibrary_.userAgent;
goog.events = exports.closureLibrary_.events;
goog.math = exports.closureLibrary_.math;
goog.functions = exports.closureLibrary_.functions;
goog.html = exports.closureLibrary_.html;
goog.style = exports.closureLibrary_.style;
goog.ui = exports.closureLibrary_.ui;
goog.color = exports.closureLibrary_.color; // https://drafts.csswg.org/css-color-4/#typedef-named-color
goog.cloneObject = exports.closureLibrary_.cloneObject;
goog.partial = exports.closureLibrary_.partial;

goog['__true_library__'] = exports.closureLibrary_;
goog.global.goog = goog;
