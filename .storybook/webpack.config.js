const webpack = require('webpack')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const { IgnoreNotFoundPlugin } = require('./plugins')

// example: /components/Button/Button.tsx
const COMPONENT_DECLARATION_FILE_REGEXP = /components\/(.*)\/\1.tsx$/
const LAB_COMPONENT_DECLARATION_FILE_REGEXP = /components\/lab\/(.*)\/\1.tsx$/

const { env } = process
const isDevelopment = env.NODE_ENV !== 'production' && env.NODE_ENV !== 'test'

const tsConfigFile = path.join(process.cwd(), './.storybook/tsconfig.json')

const tsLoader = {
  loader: require.resolve('ts-loader'),
  options: {
    configFile: tsConfigFile,
    transpileOnly: true,
    experimentalWatchApi: isDevelopment
  }
}

const tsDocgenLoader = {
  loader: require.resolve('react-docgen-typescript-loader'),
  options: {
    tsconfigPath: tsConfigFile,
    propFilter: prop => {
      if (prop.description.length === 0) return false

      if (prop.parent) {
        return !prop.parent.fileName.includes('node_modules')
      }

      return true
    }
  }
}

const defaultLoaders =
  env.TEST_ENV === 'visual' ? [tsLoader] : [tsLoader, tsDocgenLoader]

module.exports = ({ config }) => {
  // config.entry = ['@babel/polyfill', ...config.entry]

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    oneOf: [
      {
        test: COMPONENT_DECLARATION_FILE_REGEXP,
        use: defaultLoaders
      },
      {
        test: LAB_COMPONENT_DECLARATION_FILE_REGEXP,
        use: defaultLoaders
      },
      { use: [tsLoader] }
    ]
  })

  config.resolve.extensions.push('.ts', '.tsx')
  config.resolve.alias = {
    '~': path.resolve(__dirname, '..'),
    '@': path.resolve(__dirname, '../src'),
    '@components': path.resolve(__dirname, '../src/components'),
    '@toptal/picasso': path.resolve(__dirname, '../src/components')
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      TEST_ENV: JSON.stringify(env.TEST_ENV)
    }),
    // https://github.com/TypeStrong/ts-loader/issues/653
    new IgnoreNotFoundPlugin(['OverridableComponent', 'StandardProps'])
  )

  if (isDevelopment) {
    config.plugins.push(
      new ForkTsCheckerWebpackPlugin(),
      new ForkTsCheckerNotifierWebpackPlugin({
        title: 'Picasso',
        excludeWarnings: true,
        skipSuccessful: true,
        skipFirstNotification: true
      })
    )
  }

  config.node = {
    fs: 'empty',
    module: 'empty'
  }

  config.optimization.minimizer = []

  return config
}
