const path = require('path')

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

  config.module.rules[0].use[0].options.plugins.push(
    require.resolve('@babel/plugin-syntax-dynamic-import')
  )

  return config
}
