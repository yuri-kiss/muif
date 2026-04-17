const muif = require('../../pure.cjs');

if (muif.process_env_WEBPACK) {
  const muif$closureloader$evaluateInLooseMode = (code, globally) => {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.textContent = `(this || self).muif$closureloader$evaluateInLooseMode = () => (0, void ${globally ? '(this || self).' : ''}eval(${JSON.stringify(code)}));`;
    document.body.appendChild(script);
    globalThis.muif$closureloader$evaluateInLooseMode();
    delete globalThis.muif$closureloader$evaluateInLooseMode;
  };
  module.exports = muif$closureloader$evaluateInLooseMode;
} else {
  const muif$closureloader$evaluateInLooseMode = (code) => void require(/* webpackIgnore: true */'vm').runInThisContext.call(globalThis, code, '');
  module.exports = muif$closureloader$evaluateInLooseMode;
}
