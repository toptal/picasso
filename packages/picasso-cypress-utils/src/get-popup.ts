import { POPPER_SELECTOR } from './selectors'

/**
 * Yields the open Picasso popup — Select, Dropdown, Menu, Autocomplete or
 * DatePicker.
 *
 * `withinSubject: null` escapes any enclosing `cy.within()`, because popups
 * portal to the Picasso root rather than rendering inline. `:visible` keeps a
 * closed `keepMounted` popper (e.g. `DropdownButton`, which stays in the DOM as
 * `display: none`) from shadowing the open one.
 *
 * @example
 * cy.getByTestId('country-select').click()
 * cy.getPopup().contains('[role="option"]', 'Croatia').click()
 */
export const getPopup = (): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.get(`${POPPER_SELECTOR}:visible`, { withinSubject: null })
