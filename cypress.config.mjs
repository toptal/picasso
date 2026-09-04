import path from 'path'
import { fileURLToPath } from 'url'
import happoTask from 'happo-cypress/task.js'
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress'
import davinciConfig from '@toptal/davinci-qa/src/configs/cypress.config.js'
/* eslint-enable */

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// CYPRESS_REACT_19=1 runs the component tests against the standalone React 19
// install in react19/ (see jest.react19.mjs for why it is not a workspace
// member). A plain directory alias covers the subpaths too — react/jsx-runtime,
// react-dom/client (which cypress/react mounts through) — and react-dom 19
// finds its own `scheduler` next to itself, so two aliases are enough. Normal
// runs are byte-identical: everything is gated on the env var.
const useReact19 = process.env.CYPRESS_REACT_19 === '1'
const react19Aliases = useReact19
  ? {
      react: path.resolve(__dirname, 'react19/node_modules/react'),
      'react-dom': path.resolve(__dirname, 'react19/node_modules/react-dom'),
      // picasso-test-utils (the TestingPicasso mount wrapper) bundles
      // @testing-library/react; the workspace copy is built for react-dom 18
      '@testing-library/react': path.resolve(
        __dirname,
        'react19/node_modules/@testing-library/react'
      ),
      '@testing-library/dom': path.resolve(
        __dirname,
        'react19/node_modules/@testing-library/dom'
      ),
    }
  : {}

if (useReact19) {
  console.log(
    '[react19] cypress component tests resolve react from react19/node_modules'
  )
}

const davinciResolve = davinciConfig.component.devServer.webpackConfig.resolve

export default defineConfig({
  ...davinciConfig,
  component: {
    ...davinciConfig.component,
    // Cypress 14 validates this as a number; `null` used to mean "no retries"
    retries: { openMode: 0, runMode: 2 },
    // davinci-qa runs every spec in one tab (experimentalSingleTabRunMode); on
    // Cypress 14's Chromium the renderer ran out of memory around the 27th spec
    // and Cypress hung instead of failing. Freeing memory between tests keeps
    // the single-tab speed without the crash.
    experimentalMemoryManagement: true,
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
                        '@tailwindcss/postcss': {},
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
        resolve: {
          ...davinciResolve,
          alias: { ...davinciResolve.alias, ...react19Aliases },
        },
      },
    },
  },
})
