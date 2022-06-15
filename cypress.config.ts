import davinciConfig from '@toptal/davinci-qa/src/configs/cypress.config.js'
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress'
import fs from 'fs'
import glob from 'glob'
import happoTask from 'happo-cypress/task'
import path from 'path'

const sizeOf = file => fs.statSync(file).size

const parallelization = config => {
  const groupIndex = parseInt(process.env.GROUP_INDEX || 0, 10)
  const total = parseInt(process.env.PARALLEL_GROUPS || 1, 10)

  if (groupIndex < 0 || total <= 1) {
    return
  }

  const { specPattern } = config

  config.specPattern = glob
    .sync(specPattern)
    .sort((lhs, rhs) => sizeOf(rhs) - sizeOf(lhs))
    .filter((_, index) => index % total === groupIndex)
}
/* eslint-enable */

export default defineConfig({
  ...davinciConfig,
  e2e: {
    ...davinciConfig.e2e,
    setupNodeEvents(on, config) {
      // split spec files in CI
      parallelization(config)
    },
  },
  component: {
    ...davinciConfig.component,
    setupNodeEvents: (on, config) => {
      parallelization(config)

      happoTask.register(on)

      return config
    },
    specPattern: 'cypress/component/*.spec.tsx',
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.jsx|\.tsx?$/,
              use: [
                {
                  loader: require.resolve('babel-loader'),
                  options: {
                    presets: [
                      require.resolve('@babel/preset-typescript'),
                      require.resolve('@babel/preset-react'),
                    ],
                    plugins: [
                      require.resolve(
                        '@babel/plugin-proposal-nullish-coalescing-operator'
                      ),
                      require.resolve(
                        '@babel/plugin-proposal-optional-chaining'
                      ),
                      require.resolve('babel-plugin-istanbul'),
                    ],
                  },
                },
              ],
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
            },
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
          ],
        },
        resolve: {
          alias: {
            '@toptal/picasso': path.resolve(
              process.cwd(),
              './packages/picasso/dist-package'
            ),
            '@toptal/picasso-shared': path.resolve(
              process.cwd(),
              './packages/shared/dist-package'
            ),
            '@toptal/picasso-forms': path.resolve(
              process.cwd(),
              './packages/picasso-forms/dist-package'
            ),
            '@toptal/picasso-charts': path.resolve(
              process.cwd(),
              './packages/picasso-charts/dist-package'
            ),
            '@toptal/picasso-provider': path.resolve(
              process.cwd(),
              './packages/picasso-provider/dist-package'
            ),
            '@toptal/topkit-analytics-charts': path.resolve(
              process.cwd(),
              './packages/topkit-analytics-charts/dist-package'
            ),
          },
        },
      },
    },
  },
})
