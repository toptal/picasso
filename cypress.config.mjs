import path from 'path'
import happoTask from 'happo-cypress/task.js'
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress'
import davinciConfig from '@toptal/davinci-qa/src/configs/cypress.config.js'
/* eslint-enable */

export default defineConfig({
  ...davinciConfig,
  component: {
    justInTimeCompile: false,
    ...davinciConfig.component,
    retries: { openMode: 0, runMode: 2 },
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
        devServer: {
          allowedHosts: 'all',
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
              type: 'javascript/auto',
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
              use: [
                'style-loader',
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      config: false,
                      plugins: {
                        tailwindcss: {
                          config: './tailwind.config.js',
                        },
                        autoprefixer: {},
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
        resolve: davinciConfig.component.devServer.webpackConfig.resolve,
      },
    },
  },
})
