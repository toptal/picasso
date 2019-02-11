const path = require('path')

module.exports = (baseConfig, env, config) => {
  if (env === 'PRODUCTION') {
    config.devtool = false
  }

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader')
      }
    ]
  })
  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
