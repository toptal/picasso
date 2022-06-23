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
  },
})
