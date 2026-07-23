const webpack = require('webpack')
const path = require('path')
const { IgnoreNotFoundPlugin } = require('./plugins')
const ReactDocgenTypescriptPlugin =
  require('@storybook/react-docgen-typescript-plugin').default
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const tsconfigReferencesJson = require('../tsconfig.pkgsrc.json')

const PACKAGES_COMPONENT_DECLARATION_FILE_REGEXP =
  /packages\/(?:base\/)?.*\/src\/(.*)\/\1.tsx$/

const { env } = process
const isDevelopment = env.NODE_ENV !== 'production' && env.NODE_ENV !== 'test'

const tsConfigFile = path.join(__dirname, './tsconfig.json')
const threadLoaders = [{ loader: 'cache-loader' }, { loader: 'thread-loader' }]

module.exports = {
  addons: [
    '@storybook/addon-viewport/register',

    // no "/register" because https://github.com/storybookjs/storybook/issues/11929#issuecomment-672998494
    '@storybook/addon-a11y',

    './addons/anchor-link-handler/register',
    './addons/document-title/register',
  ],
  staticDirs: ['./public'],
  stories: [path.join(__dirname, './load-stories.js')],
  typescript: {
    // @TODO: reenable in FX-4688 if needed, otherwise run tsc in watch mode
    check: false,
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

    // Storybook's default rule for .(mjs|tsx?|jsx?) uses babel-loader with
    // `exclude: /node_modules/`. That's correct for normal npm packages but
    // wrong for `@toptal/picasso-*` workspace packages, which ship their
    // `src/` directory alongside `dist-package/` in the published tarball.
    // Picasso has at least one cross-package story import (Form's story
    // pulls in FormLabel's story via `@toptal/picasso-form-label/src/...`)
    // that resolves through node_modules into raw TypeScript source. Without
    // babel applied, webpack tries to parse `import type` and fails with
    // ModuleParseError. Narrow the exclude so workspace package sources go
    // through babel even when resolved through node_modules.
    const babelRule = config.module.rules.find(
      rule => rule.test && rule.test.toString() === '/\\.(mjs|tsx?|jsx?)$/'
    )

    if (babelRule) {
      babelRule.exclude = filePath =>
        filePath.includes('/node_modules/') &&
        !/[/\\]node_modules[/\\]@toptal[/\\]picasso-[^/\\]+[/\\]src[/\\]/.test(
          filePath
        )
    }

    const cssRule = config.module.rules.find(
      rule => rule.test && rule.test.toString().includes('.css')
    )

    cssRule.use.push({
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: false,
          plugins: {
            '@tailwindcss/postcss': {},
          },
        },
      },
    })

    return {
      ...config,
      watchOptions: {
        ...config.watchOptions,
        ignored: /[\\/](node_modules|coverage|\.nyc_output)[\\/]/,
      },
      module: {
        ...config.module,
        // supress an error with dynamic path e.g. require(`${url}`)
        // https://github.com/webpack/webpack/issues/196
        exprContextCritical: false,
        rules: [
          ...config.module.rules,
          {
            test: /\.(ts|tsx)$/,
            exclude: /\.test\.(ts|tsx)$/,
            oneOf: [
              {
                test: PACKAGES_COMPONENT_DECLARATION_FILE_REGEXP,
                use: threadLoaders,
              },
              { use: threadLoaders },
            ],
          },
          {
            test: /\.(js)$/,
            type: 'javascript/auto',
            resolve: {
              fullySpecified: false,
            },
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
        // Applies only to require.context() directory scans, not normal imports.
        // Current scans in .storybook/load-stories.js and
        // .storybook/components/CodeExample/CodeExample.tsx read ~/packages for
        // stories/source examples; package-local node_modules are pnpm symlink
        // noise for those contexts.
        new webpack.ContextExclusionPlugin(/^node_modules$/),
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
        plugins: [
          new TsconfigPathsPlugin({
            configFile: './tsconfig.json',
            references: tsconfigReferencesJson.references.map(r => r.path),
          }),
        ],
        alias: {
          ...config.resolve.alias,
          '~': path.resolve(__dirname, '..'),
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
