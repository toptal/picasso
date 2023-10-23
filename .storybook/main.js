const webpack = require('webpack')
const path = require('path')
const { IgnoreNotFoundPlugin } = require('./plugins')
const ReactDocgenTypescriptPlugin =
  require('@storybook/react-docgen-typescript-plugin').default

const PACKAGES_COMPONENT_DECLARATION_FILE_REGEXP =
  /packages\/.*\/src\/(.*)\/\1.tsx$/

const { env } = process
const isDevelopment = env.NODE_ENV !== 'production' && env.NODE_ENV !== 'test'

const tsConfigFile = path.join(__dirname, './tsconfig.json')
const threadLoaders = [{ loader: 'cache-loader' }, { loader: 'thread-loader' }]

module.exports = {
  addons: [
    'storybook-readme/register',
    '@storybook/addon-viewport/register',

    // no "/register" because https://github.com/storybookjs/storybook/issues/11929#issuecomment-672998494
    '@storybook/addon-a11y',

    './addons/anchor-link-handler/register',
    './addons/document-title/register',
  ],
  staticDirs: ['./public'],
  stories: [path.join(__dirname, './load-stories.js')],
  typescript: {
    check: isDevelopment,
    checkOptions: {
      typescript: {
        configFile: tsConfigFile,
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    },
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: tsConfigFile,
      propFilter: prop => {
        if (prop.description.length === 0) return false

        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules')
        }

        return true
      },
      shouldExtractLiteralValuesFromEnum: true,
    },
  },
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config, options) => {
    const typescriptOptions = await options.presets.apply('typescript')

    const { reactDocgen, reactDocgenTypescriptOptions } = typescriptOptions

    return {
      ...config,
      module: {
        ...config.module,
        // supress an error with dynamic path e.g. require(`${url}`)
        // https://github.com/webpack/webpack/issues/196
        exprContextCritical: false,
        rules: [
          ...config.module.rules,
          {
            test: /\.(ts|tsx)$/,
            oneOf: [
              {
                test: PACKAGES_COMPONENT_DECLARATION_FILE_REGEXP,
                use: threadLoaders,
              },
              { use: threadLoaders },
            ],
          },
        ],
      },
      optimization: {
        ...config.optimization,
        minimizer: [],
      },
      plugins: [
        ...config.plugins,
        new webpack.DefinePlugin({
          TEST_ENV: JSON.stringify(env.TEST_ENV),
        }),
        // https://github.com/TypeStrong/ts-loader/issues/653
        new IgnoreNotFoundPlugin(['OverridableComponent', 'BaseProps']),
        // until we use docs or control addon, we need custom webpack plugin for docgen
        // https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#docs-framework-refactor-for-react
        new ReactDocgenTypescriptPlugin({
          ...reactDocgenTypescriptOptions,
          // We *need* this set so that RDT returns default values in the same format as react-docgen
          savePropValueAsString: true,
        }),
      ],
      node: {
        ...config.node,
        /*
        The following Node.js options configure whether to use the filename of the input file relative to the context option.
        It was added to easily construct links to Source code of components
        */
        __filename: true,
      },
      resolve: {
        ...config.resolve,
        mainFields: ['browser', 'main', 'module'],
        fallback: {
          fs: false,
        },
        alias: {
          ...config.resolve.alias,
          '~': path.resolve(__dirname, '..'),
          '@material-ui/core': path.resolve(
            __dirname,
            '../node_modules/@material-ui/core'
          ),
          '@material-ui': path.resolve(
            __dirname,
            '../node_modules/@material-ui'
          ),
          '@material-ui/core/styles': path.resolve(
            __dirname,
            '../node_modules/@material-ui/core/styles'
          ),
          '@toptal/picasso': path.resolve(__dirname, '../packages/picasso/src'),
          '@toptal/picasso-shared': path.resolve(
            __dirname,
            '../packages/shared/src'
          ),
          '@toptal/picasso/utils': path.resolve(
            __dirname,
            '../packages/picasso/src/utils'
          ),
          '@toptal/picasso/Icon': path.resolve(
            __dirname,
            '../packages/picasso/src/Icon'
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
          ),
          '@toptal/picasso-provider': path.resolve(
            __dirname,
            '../packages/picasso-provider/src'
          ),
          '@toptal/picasso-pictograms': path.resolve(
            __dirname,
            '../packages/picasso-pictograms/src'
          ),
          '@toptal/picasso-rich-text-editor': path.resolve(
            __dirname,
            '../packages/picasso-rich-text-editor/src'
          ),
          '@toptal/picasso-rich-text-editor/utils': path.resolve(
            __dirname,
            '../packages/picasso-rich-text-editor/src/utils'
          ),
        },
      },
    }
  },
  // until we use docs or control addon, we need custom babel plugin for docgen
  // https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#docs-framework-refactor-for-react
  babel: async (config, options) => {
    const typescriptOptions = await options.presets.apply('typescript', {})

    const { reactDocgen } = typescriptOptions

    if (typeof reactDocgen !== 'string') {
      return config
    }

    return {
      ...config,
      overrides: [
        ...(config?.overrides || []),
        {
          test:
            reactDocgen === 'react-docgen'
              ? /\.(mjs|tsx?|jsx?)$/
              : /\.(mjs|jsx?)$/,
          plugins: [
            [
              require.resolve('babel-plugin-react-docgen'),
              {
                DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES',
              },
            ],
          ],
        },
      ],
    }
  },
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
  features: {
    postcss: false,
  },
}
