const path = require('path')
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // const { mode, resolve, module } = createWebpackConfig({
  //   webpackEnv: 'production'
  // })
  // const updatedConfig = {
  //   mode,
  //   resolve,
  //   module: {
  //     rules: [
  //       {
  //         oneOf: module.rules[0].oneOf.map(rule => ({
  //           ...rule,
  //           include: undefined
  //         }))
  //       }
  //     ]
  //   }
  // }

  // on(
  //   'file:preprocessor',
  //   webpackPreprocessor({
  //     webpackOptions: updatedConfig,
  //     additionalEntries: path.resolve(
  //       __dirname,
  //       '../../packages/picasso/src/index.ts'
  //     )
  //   })
  // )

  const opts = {
    ...webpackPreprocessor.defaultOptions
    // additionalEntries: [path.resolve(__dirname, '../../packages/picasso/build/index.js')]
  }

  const babelLoader = opts.webpackOptions.module.rules[0].use[0]

  // add React preset to be able to transpile JSX
  babelLoader.options.presets.push(require.resolve('@babel/preset-react'))

  opts.webpackOptions.resolve = {
    alias: {
      '@toptal/picasso': path.resolve(
        __dirname,
        '../../packages/picasso/dist-package'
      ),
      '@toptal/picasso-shared': path.resolve(
        __dirname,
        '../../packages/shared/dist-package'
      ),
      '@toptal/picasso-forms': path.resolve(
        __dirname,
        '../../packages/picasso-forms/dist-package'
      ),
      '@toptal/picasso-lab': path.resolve(
        __dirname,
        '../../packages/picasso-lab/dist-package'
      )
    }
  }

  opts.webpackOptions.module.rules.push({
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: require.resolve('url-loader')
  })

  console.log('Config:', config)
  // console.log('Opts:', opts)
  // console.log(opts.webpackOptions.module.rules[0].use[0])

  on('file:preprocessor', webpackPreprocessor(opts))

  return config
}

// Additional fixes
// https://github.com/cypress-io/cypress/issues/8759
