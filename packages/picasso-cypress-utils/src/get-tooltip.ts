import { TOOLTIP_SELECTOR } from './selectors'

/**
 * Yields the open Tooltip. Kept separate from {@link getPopup} on purpose:
 * after the Base UI migration only real Tooltips carry `role="tooltip"`, so
 * this is no longer a way to reach Select/Dropdown popups.
 *
 * Tooltips open asynchronously (hover delay, then positioning), so let the
 * command retry rather than asserting immediately after the hover.
 */
export const getTooltip = (): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.get(`${TOOLTIP_SELECTOR}:visible`, { withinSubject: null })
