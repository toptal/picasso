/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
// eslint-disable-next-line import/no-extraneous-dependencies
import type { mount } from 'cypress/react'
import type { HappoScreenshotOptions } from 'happo-cypress'
// eslint-disable-next-line import/no-extraneous-dependencies
import '@toptal/picasso-cypress-utils'

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      isWithinViewport(): Chainable<Subject>
      getByTestId(testId: string, options?: object): Chainable<Subject>
      getByRole(role: string): Chainable<Subject>
      hoverAndTakeHappoScreenshot(
        options?: HappoScreenshotOptions
      ): Chainable<Subject>
      waitForOverlayOpen(selector?: string): Chainable<JQuery<HTMLElement>>
      waitForCalendarOpen(): Chainable<JQuery<HTMLElement>>
      waitForImagesDecoded(selector?: string): Chainable<JQuery<HTMLElement>>
      waitForGeometryToSettle(selector: string): Chainable<JQuery<HTMLElement>>
      waitForTransitionsToSettle(
        selector: string
      ): Chainable<JQuery<HTMLElement>>
      mount: typeof mount
    }
  }
}
