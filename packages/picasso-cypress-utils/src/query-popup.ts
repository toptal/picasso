import { POPPER_SELECTOR } from './selectors'

/**
 * The may-be-absent counterpart to `getPopup`, named after Testing Library's
 * `query*` convention — for negative and optional assertions.
 *
 * `getPopup().contains(x).should('not.exist')` fails on the command when the
 * popup is legitimately absent: Cypress waives the implicit existence
 * assertion only on the query the `not.exist` attaches to, and the inner
 * `contains` still needs the outer `get` to yield a popup. `queryPopup` folds
 * the inner selector into **one** query, so the waiver covers the whole
 * lookup and it retries as a unit:
 *
 * @example
 * cy.queryPopup().should('not.exist') // popup closed
 * cy.queryPopup('[role="option"]:contains("Croatia")')
 *   .should('not.exist') // offered nowhere — popup closed OR open without it
 *
 * Attach the assertion directly — inserting `.find()`/`.contains()` between
 * re-introduces the existence requirement on the popup itself.
 *
 * Like `getPopup`, escapes any enclosing `cy.within()` (popups portal to the
 * Picasso root).
 */
export const queryPopup = (
  innerSelector?: string
): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.get(
    innerSelector
      ? `${POPPER_SELECTOR}:visible ${innerSelector}`
      : `${POPPER_SELECTOR}:visible`,
    { withinSubject: null }
  )
