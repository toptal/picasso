import { assertControls } from './assert-controls'
import { CONTROL_ROLE_SELECTOR, NATIVE_CONTROL_SELECTOR } from './selectors'

const NOT_FOUND = 'expected to find a control inside the subject'

/**
 * Asserts disabled state for any subject shape.
 *
 * Base UI role elements are not form elements, so they have no native
 * `disabled` attribute and jest-dom/Chai's `be.disabled` deliberately ignores
 * ARIA — `should('be.disabled')` on a `[role="checkbox"]` fails even when the
 * control is disabled. This reads `aria-disabled` for role elements and the
 * native property for real form elements.
 *
 * Every control inside the subject must match, so pointing this at a field
 * *wrapper* asserts the adornments too — a disabled `Input` with an enabled
 * clear or reveal button fails. Target the control itself when that is not what
 * you mean: `cy.getByTestId(field).find('input').assertDisabled()`.
 *
 * @example
 * cy.getByTestId('submit').assertDisabled()
 * cy.getByTestId('terms-checkbox').assertDisabled(false)
 */
export const assertDisabled = (
  subject: JQuery<HTMLElement>,
  desired = true
): Cypress.Chainable<JQuery<HTMLElement>> => {
  const stateWord = desired ? 'disabled' : 'enabled'

  return assertControls({
    subject,
    roleSelector: CONTROL_ROLE_SELECTOR,
    nativeSelector: NATIVE_CONTROL_SELECTOR,
    notFoundMessage: NOT_FOUND,
    assertControl: (control, where) => {
      const isNative = control.is(NATIVE_CONTROL_SELECTOR)
      const disabled = isNative
        ? Boolean(control.prop('disabled'))
        : control.attr('aria-disabled') === 'true'

      if (disabled !== desired) {
        const name = isNative
          ? String(control.prop('tagName')).toLowerCase()
          : control.attr('role')

        throw new Error(`expected the ${name}${where} to be ${stateWord}`)
      }
    },
  })
}
