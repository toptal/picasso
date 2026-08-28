import { getPopup } from './get-popup'
import { escapeSelectorString, OPTION_SELECTOR } from './selectors'

/** Match an option by its visible text, or by the `value` attribute it carries. */
export type SelectOptionTarget = string | number | { value: string | number }

/**
 * Opens a Select/Autocomplete from its trigger and picks one option.
 *
 * Scoping the option lookup to the open popper matters: with several
 * same-label dropdowns used in sequence, an unscoped `cy.contains('li', …)` can
 * match the *previous, closing* popup. Scoping to `[role="option"]` also stops
 * the trigger's own displayed value from matching.
 *
 * Neither click is pre-gated with `should('be.visible')` on purpose. An option
 * below the fold of the popup's scroll container is genuinely not visible at
 * query time and only becomes visible when the click's own pre-scroll runs — a
 * visibility assertion never scrolls, an action always does.
 *
 * @example
 * cy.getByTestId('country-select').selectOption('Croatia')
 * cy.getByTestId('country-select').selectOption({ value: 'hr' })
 */
export const selectOption = (
  subject: JQuery<HTMLElement>,
  target: SelectOptionTarget
): Cypress.Chainable<JQuery<HTMLElement>> => {
  cy.wrap(subject, { log: false }).click()

  if (typeof target === 'object') {
    return getPopup()
      .find(
        `${OPTION_SELECTOR}[value="${escapeSelectorString(
          String(target.value)
        )}"]`
      )
      .click()
  }

  return getPopup().contains(OPTION_SELECTOR, String(target)).click()
}
