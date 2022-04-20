const path = require('path')
const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const { startDevServer } = require('@cypress/webpack-dev-server')
const happoTask = require('happo-cypress/task')
// eslint-disable-next-line import/no-extraneous-dependencies
const plugins = require('@toptal/davinci-qa/src/configs/cypress/plugins')

module.exports = (on, config) => {
  plugins(on, config)

  happoTask.register(on)

  const webpackConfig = webpackPreprocessor.defaultOptions.webpackOptions

  const rule = webpackConfig.module.rules[0]

  // add .tsx files to the rule
  rule.test = /\.jsx|\.tsx?$/

  const babelLoader = webpackConfig.module.rules[0].use[0]

  // add typescript preset to compile TS files
  babelLoader.options.presets.push(require.resolve('@babel/preset-typescript'))
  // add React preset to be able to transpile JSX
  babelLoader.options.presets.push(require.resolve('@babel/preset-react'))
  // add istanbul plugin for instrumenting code
  babelLoader.options.plugins = [require.resolve('babel-plugin-istanbul')]

  webpackConfig.resolve = {
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
      '@toptal/picasso-charts': path.resolve(
        __dirname,
        '../../packages/picasso-charts/dist-package'
      ),
      '@toptal/picasso-provider': path.resolve(
        __dirname,
        '../../packages/picasso-provider/dist-package'
      )
    }
  }

  webpackConfig.module.rules.push({
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: require.resolve('url-loader')
  })

  webpackConfig.module.rules.push({
    test: /\.css$/i,
    use: ['style-loader', 'css-loader']
  })

  on('dev-server:start', options => startDevServer({ options, webpackConfig }))

  return config
}
