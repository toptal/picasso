import { buildFloatingSelector, TOOLTIP_SELECTOR } from './selectors'

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

/**
 * The may-be-absent counterpart to {@link getTooltip} — the tooltip twin of
 * `queryPopup`, with the same rationale.
 *
 * `getTooltip().should('not.exist')` already works, because the waiver applies
 * to the single query it is attached to. But the moment a spec needs to look
 * *inside* the tooltip — `getTooltip().contains(x).should('not.exist')` — it
 * hits the trap: the inner query gets the waiver while the outer `get` still
 * demands a tooltip. This folds the lookup into one query.
 *
 * `text` is escaped, so quotes and backslashes are safe. Matching is jQuery's
 * case-sensitive substring.
 *
 * @example
 * cy.queryTooltip().should('not.exist')
 * cy.queryTooltip('strong', 'Required').should('not.exist')
 * cy.queryTooltip(undefined, 'Required').should('not.exist') // no tooltip says it
 */
export const queryTooltip = (
  innerSelector?: string,
  text?: string
): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.get(buildFloatingSelector(TOOLTIP_SELECTOR, innerSelector, text), {
    withinSubject: null,
  })
