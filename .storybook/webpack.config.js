const path = require('path')
const webpack = require('webpack')

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader')
      }
    ]
  })
  config.resolve.extensions.push('.ts', '.tsx')
  config.plugins.push(
    new webpack.DefinePlugin({
      TEST_ENV: JSON.stringify(process.env.TEST_ENV)
    })
  )

  config.node = {
    fs: 'empty',
    module: 'empty'
  }

  return config
}
