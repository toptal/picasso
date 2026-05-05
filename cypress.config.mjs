import path from 'path'
import happoTask from 'happo-cypress/task.js'
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress'
import davinciConfig from '@toptal/davinci-qa/src/configs/cypress.config.js'
/* eslint-enable */

const ROOT = path.dirname(new URL(import.meta.url).pathname)

export default defineConfig({
  ...davinciConfig,
  component: {
    ...davinciConfig.component,
    retries: { openMode: null, runMode: 2 },
    setupNodeEvents: (on, config) => {
      davinciConfig.component.setupNodeEvents(on, config)

      happoTask.register(on)

      return config
    },
    specPattern: 'cypress/component/**/*.spec.tsx',
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: {
        // Stop webpack's FileSystemInfo from chasing pnpm's circular
        // workspace symlinks (e.g. packages/picasso/node_modules/@toptal/
        // picasso-provider -> packages/picasso-provider, which has its
        // own symlink back to packages/picasso). Without this,
        // _resolveContextTimestamp's recursion grows the local hashes
        // array until Array.push throws RangeError: Invalid array
        // length at FileSystemInfo.js:3593.
        //
        // Webpack only checks managedPaths against the path being read
        // by _readContext. The symlink TARGETS are workspace package
        // dirs (packages/<x>), not node_modules paths — so the
        // node_modules regex alone doesn't catch them. Mark the
        // workspace package directories as managed too. More specific
        // path first so packages/base/<Comp> wins over packages/.
        // Safe for `cypress run --component` (single-shot, no watch).
        snapshot: {
          managedPaths: [
            /^(.+?[\\/]node_modules[\\/])/,
            path.resolve(ROOT, 'packages/base') + path.sep,
            path.resolve(ROOT, 'packages') + path.sep,
          ],
        },
        watchOptions: {
          ignored: /[\\/](node_modules|coverage|\.nyc_output)[\\/]/,
        },
        module: {
          rules: [
            {
              test: /\.jsx|\.tsx|\.mjs|\.ts?$/,
              resolve: {
                fullySpecified: false, // disable the behaviour
              },
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      '@babel/preset-typescript',
                      '@babel/preset-react',
                    ],
                    plugins: [
                      '@babel/plugin-proposal-nullish-coalescing-operator',
                      '@babel/plugin-proposal-optional-chaining',
                      'istanbul',
                    ],
                  },
                },
              ],
            },
            {
              test: /\.(js)$/,
              type: "javascript/auto",
              resolve: {
                fullySpecified: false,
              },
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: 'url-loader',
            },
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader', {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    config: false,
                    plugins: {
                      '@tailwindcss/postcss': {},
                    },
                  },
                },
              }],
            },
          ],
        },
        resolve: davinciConfig.component.devServer.webpackConfig.resolve,
      },
    },
  },
})
