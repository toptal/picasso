const path = require('path')
const { createWebpackConfig } = require('@toptal/davinci-engine')
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = on => {
  const { mode, resolve, module } = createWebpackConfig({
    webpackEnv: 'production'
  })
  const updatedConfig = {
    mode,
    resolve,
    module: {
      rules: [
        {
          oneOf: module.rules[0].oneOf.map(rule => ({
            ...rule,
            include: undefined
          }))
        }
      ]
    }
  }

  on(
    'file:preprocessor',
    webpackPreprocessor({
      webpackOptions: updatedConfig,
      additionalEntries: path.resolve(
        __dirname,
        '../../packages/picasso/src/index.ts'
      )
    })
  )
}
