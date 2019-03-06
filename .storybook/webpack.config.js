const webpack = require('webpack')

// example: /components/Button/Button.tsx
const COMPONENT_DECLARATION_FILE_REGEXP = /components\/(.*)\/\1.tsx$/

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: [COMPONENT_DECLARATION_FILE_REGEXP],
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true
        }
      }
    ]
  })

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [COMPONENT_DECLARATION_FILE_REGEXP],
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true
        }
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          tsconfigPath: './tsconfig.json',
          skipPropsWithoutDoc: true
        }
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
