import path from 'path'
import happoTask from 'happo-cypress/task.js'
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress'
import davinciConfig from '@toptal/davinci-qa/src/configs/cypress.config.js'
/* eslint-enable */

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
        module: {
          rules: [
            {
              test: /\.jsx|\.tsx?$/,
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
                      'babel-plugin-istanbul',
                    ],
                  },
                },
              ],
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: 'url-loader',
            },
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
          ],
        },
        resolve: {
          mainFields: ['browser', 'main', 'module'],
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
            '@toptal/picasso-pictograms': path.resolve(
              process.cwd(),
              './packages/picasso-pictograms/dist-package'
            ),
            '@toptal/picasso-rich-text-editor': path.resolve(
              process.cwd(),
              './packages/picasso-rich-text-editor/dist-package'
            ),
            '@topkit/analytics-charts': path.resolve(
              process.cwd(),
              './packages/topkit-analytics-charts/dist-package'
            ),
          },
        },
      },
    },
  },
})
