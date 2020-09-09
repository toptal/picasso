const webpack = require('webpack')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const { IgnoreNotFoundPlugin } = require('./plugins')

// example1: /packages/picasso/src/Button/Button.tsx
// example2: /packages/picasso-lab/src/Slider/Slider.tsx
const PACKAGES_COMPONENT_DECLARATION_FILE_REGEXP = /packages\/.*\/src\/(.*)\/\1.tsx$/

const { env } = process
const isDevelopment = env.NODE_ENV !== 'production' && env.NODE_ENV !== 'test'

const tsConfigFile = path.join(process.cwd(), './.storybook/tsconfig.json')
const tsLoader = {
  loader: require.resolve('ts-loader'),
  options: {
    configFile: tsConfigFile,
    transpileOnly: isDevelopment || env.TEST_ENV === 'visual',
    experimentalWatchApi: isDevelopment,
    happyPackMode: true
  }
}
const threadLoader = [{ loader: 'cache-loader' }, { loader: 'thread-loader' }]

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
  config.entry = [
    'core-js/stable',
    'regenerator-runtime/runtime',
    ...config.entry
  ]

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    oneOf: [
      {
        test: PACKAGES_COMPONENT_DECLARATION_FILE_REGEXP,
        use: [...threadLoader, ...defaultLoaders]
      },
      { use: [...threadLoader, tsLoader] }
    ]
  })

  config.resolve.extensions.push('.ts', '.tsx')

  config.resolve.alias = {
    ...config.resolve.alias,
    '~': path.resolve(__dirname, '..'),
    '@toptal/picasso': path.resolve(__dirname, '../packages/picasso/src'),
    '@toptal/picasso-shared': path.resolve(__dirname, '../packages/shared/src'),
    '@toptal/picasso/utils': path.resolve(
      __dirname,
      '../packages/picasso/src/utils'
    ),
    '@toptal/picasso/Icon': path.resolve(
      __dirname,
      '../packages/picasso/src/Icon'
    ),
    '@toptal/picasso-lab': path.resolve(
      __dirname,
      '../packages/picasso-lab/src'
    ),
    '@toptal/picasso-forms': path.resolve(
      __dirname,
      '../packages/picasso-forms/src'
    ),
    '@toptal/picasso-charts': path.resolve(
      __dirname,
      '../packages/picasso-charts/src'
    ),
    '@topkit/analytics-charts': path.resolve(
      __dirname,
      '../packages/topkit-analytics-charts/src'
    )
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
      new ForkTsCheckerWebpackPlugin({
        // needed for happyPackMode
        // https://medium.com/webpack/typescript-webpack-super-pursuit-mode-83cc568dea79
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true
          }
        }
      }),
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
