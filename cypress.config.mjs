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
    // specPattern: [
    //   'cypress/component/**/Accordion.spec.tsx',
    //   'cypress/component/**/ApplicationUpdateNotification.spec.tsx',
    //   'cypress/component/**/Autocomplete.spec.tsx',
    //   'cypress/component/**/Avatar.spec.tsx',
    //   ////'cypress/component/**/AvatarUpload.spec.tsx',
    //   'cypress/component/**/BarChart.spec.tsx',
    //   'cypress/component/**/ButtonSplit.spec.tsx',
    //   'cypress/component/**/Calendar.spec.tsx',
    //   'cypress/component/**/Carousel.spec.tsx',
    //   'cypress/component/**/CategoriesChart.spec.tsx',
    //   'cypress/component/**/Checkbox.spec.tsx',
    //   'cypress/component/**/Container.spec.tsx',
    //   'cypress/component/**/DatePicker.spec.tsx',
    //   'cypress/component/**/Drawer.spec.tsx',
    //   'cypress/component/**/Dropdown.spec.tsx',
    //   'cypress/component/**/Dropzone.spec.tsx',
    //   'cypress/component/**/FieldRequirements.spec.tsx',
    //   'cypress/component/**/FileInput.spec.tsx',
    //   'cypress/component/**/Form.spec.tsx',
    //   'cypress/component/**/Icon.spec.tsx',
    //   'cypress/component/**/Input.spec.tsx',
    //   'cypress/component/**/InputHiglightAutofill.spec.tsx',
    //   'cypress/component/**/Link.spec.tsx',
    //   'cypress/component/**/List.spec.tsx',
    //   'cypress/component/**/Menu.spec.tsx',
    //   'cypress/component/**/Modal.spec.tsx',
    //   'cypress/component/**/NotificationStream.spec.tsx',
    //   'cypress/component/**/Page.spec.tsx',
    //   'cypress/component/**/PageHamburger.spec.tsx',
    //   'cypress/component/**/PageSidebar.spec.tsx',
    //   'cypress/component/**/PasswordInput.spec.tsx',
    //   'cypress/component/**/PromptModal.spec.tsx',
    //   'cypress/component/**/Radio.spec.tsx',
    //   'cypress/component/**/Rating.spec.tsx',
    //   'cypress/component/**/Select.spec.tsx',
    //   'cypress/component/**/ShowMore.spec.tsx',
    //   'cypress/component/**/SidebarItem.spec.tsx',
    //   'cypress/component/**/Slider.spec.tsx',
    //   'cypress/component/**/Stepper.spec.tsx',
    //   'cypress/component/**/Table.spec.tsx',
    //   'cypress/component/**/TableCell.spec.tsx',
    //   // 'cypress/component/**/Tabs.spec.tsx',
    //   // 'cypress/component/**/Tag.spec.tsx',
    //   // 'cypress/component/**/TagSelector.spec.tsx',
    //   // 'cypress/component/**/Tooltip.spec.tsx',
    //   // 'cypress/component/**/TopBarMenu.spec.tsx',
    //   // 'cypress/component/**/TreeView.spec.tsx',
    //   // 'cypress/component/**/TypographyOverflow.spec.tsx',
    // ],
    specPattern: 'cypress/component/**/*.spec.tsx',
    //specPattern: 'cypress/component/**/Carousel.spec.tsx',
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
