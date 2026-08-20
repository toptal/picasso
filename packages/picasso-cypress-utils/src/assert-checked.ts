import { assertControls } from './assert-controls'
import { CONTROL_INPUT_SELECTOR, CONTROL_ROLE_SELECTOR } from './selectors'

const NOT_FOUND =
  'expected to find a checkbox/switch/radio control inside the subject'

/**
 * Asserts checked state for any subject shape — the role element, the native
 * input, or a wrapper/field container holding either.
 *
 * Checkbox and Switch keep state on the role element as `aria-checked`; Radio
 * did not move to Base UI, so its native input keeps a real `checked` property.
 * This reads whichever applies, so specs stop caring which primitive they hit.
 *
 * @example
 * cy.getByTestId('newsletter').assertChecked()
 * cy.getByTestId('newsletter').assertChecked(false)
 */
export const assertChecked = (
  subject: JQuery<HTMLElement>,
  desired = true
): Cypress.Chainable<JQuery<HTMLElement>> => {
  const stateWord = desired ? 'checked' : 'unchecked'

  return assertControls({
    subject,
    roleSelector: CONTROL_ROLE_SELECTOR,
    nativeSelector: CONTROL_INPUT_SELECTOR,
    notFoundMessage: NOT_FOUND,
    assertControl: (control, where) => {
      if (control.is('input')) {
        if (control.prop('checked') !== desired) {
          throw new Error(`expected the input${where} to be ${stateWord}`)
        }

        return
      }

      if (control.attr('aria-checked') !== String(desired)) {
        throw new Error(
          `expected the ${control.attr('role')}${where} to be ${stateWord}`
        )
      }
    },
  })
}
