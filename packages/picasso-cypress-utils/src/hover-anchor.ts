import { TOOLTIP_ANCHOR_SELECTOR } from './selectors'

const resolveAnchor = (
  subject: JQuery<HTMLElement>,
  command: string
): JQuery<HTMLElement> => {
  const $anchor = subject.first().closest(TOOLTIP_ANCHOR_SELECTOR)

  if ($anchor.length === 0) {
    throw new Error(
      `${command}: no [data-picasso-tooltip-anchor] found for the subject — ` +
        'the marker ships with @toptal/picasso-tooltip from the same release ' +
        'as this command; check the Tooltip version, and chain this off the ' +
        'trigger child or an element inside it'
    )
  }

  return $anchor
}

/**
 * Hovers the Tooltip's *anchor* — the element the open/close listeners attach
 * to, marked `data-picasso-tooltip-anchor` (shipped in `picasso-tooltip` from
 * the same release as this command).
 *
 * Why: a natively disabled control swallows pointer events, so hovering the
 * control itself never opens its tooltip and specs historically reached for
 * `trigger('mouseover', { force: true })`. This resolves the anchor from the
 * subject (the anchor itself or any node inside it) and hovers it **without
 * force**.
 *
 * Honest-failure property: when the anchor *is* the disabled element, the
 * unforced hover still fails — correctly, because real users cannot open that
 * tooltip either. The fix belongs in the app: wrap the disabled trigger
 * (e.g. in a `<span>`) so the wrapper owns the hover, then this command works.
 *
 * Yields the anchor, so assertions chain: `.hoverAnchor()` then
 * `cy.getTooltip().should('contain', …)`.
 */
export const hoverAnchor = (
  subject: JQuery<HTMLElement>
): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy
    .wrap(resolveAnchor(subject, 'hoverAnchor'), { log: false })
    .trigger('mouseover')

/**
 * Closes a Tooltip by moving the pointer off its anchor — the counterpart to
 * {@link hoverAnchor}, for "closes on mouse-out" assertions.
 *
 * @example
 * cy.getByTestId('save').hoverAnchor()
 * cy.getTooltip().should('be.visible')
 * cy.getByTestId('save').unhoverAnchor()
 * cy.getTooltip().should('not.exist')
 */
export const unhoverAnchor = (
  subject: JQuery<HTMLElement>
): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy
    .wrap(resolveAnchor(subject, 'unhoverAnchor'), { log: false })
    // `mouseleave`, not the bubbling `mouseout`: Picasso's Tooltip closes on
    // React's onMouseLeave, and a bare mouseout with no relatedTarget does not
    // reliably synthesize it.
    .trigger('mouseleave')
