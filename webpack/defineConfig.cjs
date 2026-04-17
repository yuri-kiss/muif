'use strict';

const {
  cleverMerge,

  generateBanner,

  SwcMinifyWebpackPlugin,

  webpack,
  path,
} = require('./utils.cjs');

const defineConfig = (__dirname, attrs, isNode, isProduction, noGoog) => {
  return cleverMerge(
    {
      mode: isProduction ? 'production' : 'development',

      entry: 'stub',
      output: {
        filename: 'stub',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        library: { type: 'stub' },
        libraryTarget: 'stub',
        environment: { arrowFunction: false },
        clean: false,
      },
      target: 'stub',

      resolve: { extensions: ['.js', '.cjs', '.mjs'], alias: {}, preferAbsolute: true },
      resolveLoader: { modules: ['node_modules'] },

      module: {
        parser: { javascript: { commonjs: true, commonjsMagicComments: true, createRequire: false, harmony: false, import: false } },
        rules: [
          {
            test: /\.((m|c)?js)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                assumptions: {
                  constantReexports: true,
                  constantSuper: true,
                  ignoreFunctionLength: true,
                  ignoreToPrimitiveHint: true,
                  noClassCalls: true,
                  noDocumentAll: true,
                  noNewArrows: true,
                  objectRestNoSymbols: true,
                  pureGetters: true,
                },
                presets: [['@babel/preset-env', { targets: [`chrome >= 70`, `chromeandroid >= 70`, `edge >= 17`, `firefox >= 68`], modules: 'commonjs' }]],
                plugins: [
                  [
                    '@babel/plugin-transform-runtime',
                    { moduleName: '@babel/runtime-corejs3', version: '^7.29.2', corejs: { proposals: true, version: 3 }, regenerator: true, helpers: true },
                  ],
                  ['transform-define', Object.assign({ 'muif.process_env_WEBPACK': 'true' }, noGoog ? { 'muif.process_env_NOGOOG': 'true' } : {})],
                ],
              },
            },
          },
        ],
      },

      infrastructureLogging: { colors: true, debug: true, console: console, level: 'verbose' },
      stats: { all: true, colors: true, errorDetails: true, errorStack: true, errorCause: true, logging: 'verbose' },

      cache: { type: 'memory' },

      externalsPresets: { node: !isNode },

      devtool: false,
      optimization: {
        avoidEntryIife: isProduction,
        concatenateModules: isProduction,
        removeEmptyChunks: true,
        mangleExports: isProduction ? 'deterministic' : false,
        mergeDuplicateChunks: true,
        nodeEnv: isProduction ? 'production' : 'development',

        minimize: isProduction,
        minimizer: isProduction
          ? [
              new SwcMinifyWebpackPlugin({
                ecma: 2016,
                safari10: false,
                sourceMap: false,
                inlineSourcesContent: false,
                keep_classnames: false,
                keep_fnames: false,
                outputPath: void 0,
                toplevel: false,
                mangle: false,
                compress: { drop_console: false, drop_debugger: true, ecma: 2016, ie8: false, unsafe: true, passes: 2 },
              }),
            ]
          : [],
      },

      plugins: [
        new webpack.IgnorePlugin({ checkResource: (resource, context) => /^(vm|fs|jsdom)$/i.test(resource) && /goog$/i.test(context) }),
        new webpack.DefinePlugin(Object.assign({ 'muif.process_env_WEBPACK': 'true' }, noGoog ? { 'muif.process_env_NOGOOG': 'true' } : {})),
        new webpack.BannerPlugin({ banner: generateBanner(isNode, isProduction, noGoog), raw: true, entryOnly: true, stage: webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT }),
      ],
    },
    attrs,
  );
};

// devServer: {
//   static: './build',
//   compress: false,
//   port: 8080,
// },
// watch: false,

// devtool: false,

const defineConfigs = (__dirname, isProduction, withGoog) => {
  return [
    defineConfig(
      __dirname,
      {
        entry: './src/pure.cjs',
        output: { filename: `node${withGoog ? '.closurelib' : ''}.umd${isProduction ? '.min' : ''}.js`, library: { type: 'umd2' }, libraryTarget: 'umd', iife: true },
        target: 'node12.22',
      },
      true,
      isProduction,
      !withGoog,
    ),
    defineConfig(
      __dirname,
      {
        entry: './src/index.cjs',
        output: { filename: `browser${withGoog ? '.closurelib' : ''}.umd${isProduction ? '.min' : ''}.js`, library: { type: 'umd2' }, libraryTarget: 'umd', iife: true },
        target: 'web',
      },
      false,
      isProduction,
      !withGoog,
    ),
  ];
};

defineConfig.s = defineConfigs;

module.exports = defineConfig;
