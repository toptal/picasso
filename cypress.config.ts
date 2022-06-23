import path from 'path'
import happoTask from 'happo-cypress/task'
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress'
import davinciConfig from '@toptal/davinci-qa/src/configs/cypress.config.js'
/* eslint-enable */

export default defineConfig({
  ...davinciConfig,
  component: {
    ...davinciConfig.component,
    setupNodeEvents: (on, config) => {
      davinciConfig.component.setupNodeEvents(on, config)

      happoTask.register(on)

      return config
    },
    specPattern: 'cypress/component/*.spec.tsx',
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
                    require.resolve('@babel/plugin-proposal-optional-chaining'),
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
          '@topkit/analytics-charts': path.resolve(
            process.cwd(),
            './packages/topkit-analytics-charts/dist-package'
          ),
        },
      },
    },
  },
})
