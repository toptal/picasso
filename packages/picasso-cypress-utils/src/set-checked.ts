import { resolveToggleInput } from './resolve-toggle'
import { TOGGLE_ROLE_SELECTOR } from './selectors'

/**
 * Puts a Checkbox or Switch into a known state, with `check()`-style **ensure**
 * semantics: it clicks the visible role element only when the current state
 * differs, then asserts the native input reached the state.
 *
 * Why this exists: Base UI renders the native `<input>` clipped to 1x1 as a
 * *sibling* of the role element, so it can never pass Cypress actionability.
 * `.check()` / `.uncheck()` / `.click()` on it all fail, and the usual reflex —
 * `{ force: true }` — disables every actionability check, so the test then
 * passes against controls the user cannot reach at all.
 *
 * Chain it off the testid, the hidden input, or any wrapper containing both.
 *
 * **Not** for tests where the click itself is under test (e.g. asserting a
 * disabled checkbox ignores clicks): on already-matching state this skips the
 * click entirely and passes vacuously. Click the role element instead and
 * assert the state did not change.
 *
 * **Not** for controlled components whose `checked` prop never updates (a
 * stubbed `onChange`): there is no DOM change to ensure, so the trailing
 * assertion can only time out — and whether the click even fires depends on
 * the pinned value. Use `toggleControl().click()` and assert the handler.
 *
 * Yields the hidden native input (wrapped in the state assertion); use
 * `toggleControl()` when you need the visible role element.
 */
export const setChecked = (
  subject: JQuery<HTMLElement>,
  desired = true
): Cypress.Chainable<JQuery<HTMLElement>> => {
  if (subject.length > 1) {
    throw new Error(
      `setChecked expects a single control, but the subject resolved to ` +
        `${subject.length} elements — narrow the selector (.first(), .eq(n), ` +
        `a value-scoped find, …)`
    )
  }

  const $input = resolveToggleInput(subject.first())

  if ($input.length === 0) {
    throw new Error('setChecked: could not find a native input for the subject')
  }

  if ($input.prop('checked') !== desired) {
    const $role = $input.siblings(TOGGLE_ROLE_SELECTOR).first()

    if ($role.length === 0) {
      throw new Error(
        'setChecked: no [role="checkbox"|"switch"] element next to the ' +
          'input — for radios and other native controls use check()/click()'
      )
    }

    cy.wrap($role, { log: false }).click()
  }

  return cy
    .wrap($input, { log: false })
    .should(desired ? 'be.checked' : 'not.be.checked')
}
