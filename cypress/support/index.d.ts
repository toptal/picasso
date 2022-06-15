/// <reference types="cypress" />
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'cypress/react'
import { HappoScreenshotOptions } from 'happo-cypress'

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      isWithinViewport(): Chainable<Subject>
      getByTestId(testId: string): Chainable<Subject>
      getByRole(role: string): Chainable<Subject>
      hoverAndTakeHappoScreenshot(
        options?: HappoScreenshotOptions
      ): Chainable<Subject>
      mount: typeof mount
    }
  }
}
