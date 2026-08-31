/**
 * Shared walk behind `assertChecked` and `assertDisabled`.
 *
 * Resolution happens **inside** the `should` callback so the whole thing
 * retries while async content mounts, and every matched control is asserted —
 * not just the first.
 *
 * The distinct "no control found" error matters: `should('be.checked')` on a
 * subject that is not an input matches nothing and **passes vacuously** (a
 * `<td>` is never `:checked`), which is the single biggest source of tests that
 * survive a migration while asserting nothing. A mistyped selector must report
 * "found no control", never a misleading "expected the input to be checked".
 */
export const assertControls = ({
  subject,
  roleSelector,
  nativeSelector,
  notFoundMessage,
  assertControl,
}: {
  subject: JQuery<HTMLElement>
  /** Base UI role elements, which carry state as ARIA. */
  roleSelector: string
  /** Real form elements, which carry state as DOM properties. */
  nativeSelector: string
  assertControl: (control: JQuery<HTMLElement>, where: string) => void
  notFoundMessage: string
}): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.wrap(subject, { log: false }).should($subject => {
    let controlsFound = 0

    $subject.each(subjectIndex => {
      const el = $subject.eq(subjectIndex)
      const subjectWhere =
        $subject.length > 1
          ? ` (subject element ${subjectIndex + 1} of ${$subject.length})`
          : ''

      // the subject may BE the control, contain role elements, or — for a field
      // container that renders no role element — contain native ones
      let controls = el.is(`${nativeSelector}, ${roleSelector}`)
        ? el
        : el.find(roleSelector)

      if (controls.length === 0) {
        controls = el.find(nativeSelector)
      }

      if (controls.length === 0) {
        throw new Error(`${notFoundMessage}${subjectWhere}`)
      }

      controlsFound += controls.length

      controls.each(controlIndex => {
        const controlWhere =
          controls.length > 1
            ? ` ${controlIndex + 1} of ${controls.length}`
            : ''

        assertControl(
          controls.eq(controlIndex),
          `${controlWhere}${subjectWhere}`
        )
      })
    })

    if (controlsFound === 0) {
      throw new Error(notFoundMessage)
    }
  })
