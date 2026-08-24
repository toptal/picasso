import { resolveToggleRole } from './resolve-toggle'

/**
 * Yields the visible `[role="checkbox"|"switch"]` element resolved from any
 * subject shape — the role element itself, the hidden native input, or a
 * wrapper/field container.
 *
 * This is the raw primitive under `setChecked`, exposed for the cases where
 * ensure-semantics are the wrong verb:
 *
 * - **Controlled component whose prop never updates** (a stubbed `onChange`):
 *   there is no DOM state to ensure — `setChecked` would skip or fail on its
 *   trailing assertion. Dispatch the interaction and assert the handler:
 *   `cy.getByTestId(x).toggleControl().click()` then check the stub.
 * - **Focus management**: `.toggleControl().focus()` / `.blur()` — e.g. to
 *   drive a form library's touched state. (After any click the role element
 *   is the focused node, so `cy.focused().blur()` also works.)
 * - **State attributes**: `.toggleControl().should('have.attr', 'data-indeterminate')`.
 *
 * Registered as a Cypress *query*: it retries while async content mounts and
 * throws a distinct error when the subject contains no toggle control.
 */
export const toggleControl =
  () =>
  (subject: JQuery<HTMLElement> | undefined): JQuery<HTMLElement> => {
    if (!subject || subject.length === 0) {
      throw new Error(
        'toggleControl requires a DOM subject — chain it off cy.get()/getByTestId()'
      )
    }

    if (subject.length > 1) {
      throw new Error(
        `toggleControl expects a single control, but the subject resolved to ` +
          `${subject.length} elements — narrow the selector (.first(), .eq(n), …)`
      )
    }

    const $role = resolveToggleRole(subject)

    if ($role.length === 0) {
      throw new Error(
        'toggleControl: no [role="checkbox"|"switch"] element found for the ' +
          'subject — for radios and other native controls target the input directly'
      )
    }

    return $role
  }
