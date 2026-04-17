'use strict';

const defineConfig = require('./webpack/defineConfig.cjs');

module.exports = (_env, _argv) => {
  return [
    // No goog
    defineConfig.s(__dirname, false, false),
    defineConfig.s(__dirname, true, false),
    // With goog
    defineConfig.s(__dirname, false, true),
    defineConfig.s(__dirname, true, true),
  ].flat(1);
};
