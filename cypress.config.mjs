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
    // TODO: revert before merge
    specPattern: ['cypress/component/**/Carousel.spec.tsx', 'cypress/component/**/Calendar.spec.tsx'],
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: {
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
                      'istanbul'
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
        resolve: davinciConfig.component.devServer.webpackConfig.resolve,
      },
    },
  },
})
