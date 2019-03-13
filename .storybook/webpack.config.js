const webpack = require('webpack')
const path = require('path')

// example: /components/Button/Button.tsx
const COMPONENT_DECLARATION_FILE_REGEXP = /components\/(.*)\/\1.tsx$/

const tsConfigFile = path.join(process.cwd(), './.storybook/tsconfig.json')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: [COMPONENT_DECLARATION_FILE_REGEXP],
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          configFile: tsConfigFile
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
          configFile: tsConfigFile
        }
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          tsconfigPath: tsConfigFile,
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
