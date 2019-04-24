const webpack = require('webpack')
const path = require('path')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

// example: /components/Button/Button.tsx
const COMPONENT_DECLARATION_FILE_REGEXP = /components\/(.*)\/\1.tsx$/

const tsConfigFile = path.join(process.cwd(), './.storybook/tsconfig.json')

module.exports = ({ config }) => {
  config.entry = ['@babel/polyfill', ...config.entry]

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
  config.resolve.alias = {
    '~': path.resolve(__dirname, '..'),
    '@': path.resolve(__dirname, '../src'),
    '@components': path.resolve(__dirname, '../src/components')
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      TEST_ENV: JSON.stringify(process.env.TEST_ENV)
    })
  )
  if (process.env.CACHE) {
    config.plugins.push(new HardSourceWebpackPlugin())
  }

  config.node = {
    fs: 'empty',
    module: 'empty'
  }

  return config
}
