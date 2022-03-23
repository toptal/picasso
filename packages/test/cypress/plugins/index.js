const webpack = require('@cypress/webpack-preprocessor')

const parallelization = require('./parallelization')

const defaults = webpack.defaultOptions

// added istanbul babel plugin for instrumenting code before generating coverage
defaults.webpackOptions.module.rules[0].use[0].options.plugins = ['istanbul']

module.exports = function (on, config) {
  // generate code coverage
  require('@cypress/code-coverage/task')(on, config)

  // added custom webpack config
  on('file:preprocessor', webpack(defaults))

  // split spec files
  parallelization(config)

  return config
}
