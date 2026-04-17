'use strict';

const webpack = require('webpack');
const path = require('node:path');
const { SwcMinifyWebpackPlugin } = require('swc-minify-webpack-plugin');

const dtFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'full', timeZone: 'UTC' });

const generateBanner = (isNode, isProduction, noGoog) => {
  return `
/**!
 * @fileoverview MUIF Library build.
 * Do not remove this comment.
 *
 * @see https://github.com/yuri-kiss/muif/
 * @copyright Miyo Sho
 *
 * @license LGPL-2.1-only
 */
/**
 * Build time: ${dtFormat.format(new Date())}
 * Build settings: (node: ${!!isNode}, prod: ${!!isProduction}, closure: ${!noGoog})
 */
  `.trim();
};

module.exports = {
  cleverMerge: webpack.util.cleverMerge,

  dtFormat,
  generateBanner,

  SwcMinifyWebpackPlugin,

  webpack,
  path,
};
