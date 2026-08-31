import { buildFloatingSelector, POPPER_SELECTOR } from './selectors'

/**
 * The may-be-absent counterpart to `getPopup`, named after Testing Library's
 * `query*` convention — for negative and optional assertions.
 *
 * `getPopup().contains(x).should('not.exist')` fails on the command when the
 * popup is legitimately absent: Cypress waives the implicit existence
 * assertion only on the query the `not.exist` attaches to, and the inner
 * `contains` still needs the outer `get` to yield a popup. This folds the
 * whole lookup into **one** built-in query, so the waiver covers all of it and
 * it retries as a unit.
 *
 * Pass `text` rather than writing `:contains(…)` yourself — the value is
 * escaped, so quotes and backslashes in option labels are safe. Matching is
 * jQuery's: **case-sensitive substring** (`cy.contains` is not used here
 * because it cannot take `withinSubject`, which is what escapes `cy.within()`).
 *
 * @example
 * cy.queryPopup().should('not.exist')                             // closed
 * cy.queryPopup('[role="option"]').should('not.exist')            // no options anywhere
 * cy.queryPopup('[role="option"]', 'Croatia').should('not.exist') // that option offered nowhere
 * cy.queryPopup(undefined, 'Croatia').should('not.exist')         // no popup says it
 *
 * Attach the assertion directly — inserting `.find()`/`.contains()` after it
 * re-introduces the existence requirement on the popup itself.
 */
export const queryPopup = (
  innerSelector?: string,
  text?: string
): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.get(buildFloatingSelector(POPPER_SELECTOR, innerSelector, text), {
    withinSubject: null,
  })
