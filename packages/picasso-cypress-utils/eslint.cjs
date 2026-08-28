/**
 * Shareable `no-restricted-syntax` entries that keep the anti-patterns this
 * package exists to replace from re-entering a test suite.
 *
 * CommonJS on purpose — it is consumed from `.eslintrc.js`, which ESLint loads
 * with `require`.
 *
 * @example
 * // .eslintrc.js — the ready-made entry, which already excludes your support layer
 * const {
 *   createCypressOverride,
 * } = require('@toptal/picasso-cypress-utils/eslint')
 *
 * module.exports = { overrides: [createCypressOverride()] }
 */

const GET_POPUP_MESSAGE =
  'Use cy.getPopup() instead of selecting [data-picasso-popper] directly — it ' +
  'scopes to the visible popper and escapes cy.within().'

const SET_CHECKED_MESSAGE =
  'check()/uncheck({ force: true }) bypasses actionability on the hidden ' +
  'Base UI input. Use cy.setChecked(desired?), which clicks the visible role ' +
  'element only when the state differs.'

const GET_TOOLTIP_MESSAGE =
  'Use cy.getTooltip() (or cy.queryTooltip() for negative assertions) instead ' +
  'of selecting [role="tooltip"] directly — they scope to the visible tooltip ' +
  'and escape cy.within(). Note only real Tooltips carry this role; ' +
  'Select/Dropdown poppers do not, so use cy.getPopup() for those.'

const HOVER_ANCHOR_MESSAGE =
  "trigger('mouseover', { force: true }) fires a hover through a channel real " +
  'pointers never reach, so it can pass against a tooltip no user can open. ' +
  'Use cy.hoverAnchor() — it resolves the tooltip anchor and hovers it ' +
  'unforced. If the plain unforced hover already works, just drop the force.'

/**
 * Spread into your own `no-restricted-syntax` list — these are additive, so an
 * app keeps whatever bans it already has.
 *
 * Apply them to spec globs and **exclude your Cypress support/utils layer** —
 * that layer legitimately touches the raw markers (it is where `getPopup`,
 * `getTooltip` and geometry-settling helpers live).
 *
 * Deliberately NOT banned: literal `[role=checkbox]`/`[role=switch]`
 * selectors. `setChecked`/`toggleControl` replace most of them, but multi-control
 * lookups are legitimate (staff-portal has
 * `.find('[role="checkbox"]').last()` over a group, which `toggleControl`
 * rejects by design), so a blanket ban would be noise rather than signal.
 */
const restrictedSyntax = [
  {
    selector: 'Literal[value=/data-picasso-popper/]',
    message: GET_POPUP_MESSAGE,
  },
  {
    selector: 'TemplateElement[value.raw=/data-picasso-popper/]',
    message: GET_POPUP_MESSAGE,
  },
  {
    selector:
      "CallExpression[callee.property.name=/^(check|uncheck)$/] ObjectExpression > Property[key.name='force'][value.value=true]",
    message: SET_CHECKED_MESSAGE,
  },
  {
    selector:
      "CallExpression[callee.property.name='trigger'][arguments.0.value=/^mouse(over|enter)$/] ObjectExpression > Property[key.name='force'][value.value=true]",
    message: HOVER_ANCHOR_MESSAGE,
  },
  {
    selector: 'Literal[value=/\\[role=.?tooltip/]',
    message: GET_TOOLTIP_MESSAGE,
  },
  {
    selector: 'TemplateElement[value.raw=/\\[role=.?tooltip/]',
    message: GET_TOOLTIP_MESSAGE,
  },
]

/** Default globs for Cypress specs. */
const defaultFiles = [
  '**/*.cy.js',
  '**/*.cy.jsx',
  '**/*.cy.ts',
  '**/*.cy.tsx',
  '**/cypress/**/*.ts',
  '**/cypress/**/*.tsx',
]

/**
 * Globs excluded by default: your Cypress support/utils layer is the one place
 * that legitimately touches the raw markers these bans point away from — it is
 * where `getPopup`, `getTooltip` and geometry-settling helpers are implemented.
 * Without this, `**\/cypress/**` would sweep that layer in and flag it.
 *
 * A support layer living outside `cypress/` (e.g. a `cypress-utils` package)
 * is already outside the default globs; pass your own `excludedFiles` if yours
 * sits somewhere else again.
 */
const defaultExcludedFiles = ['**/cypress/support/**']

/**
 * Ready-made ESLint `overrides` entry. Pass your own globs when your specs live
 * somewhere the defaults miss, and your own exclusions when your command layer
 * does.
 */
const createCypressOverride = (
  files = defaultFiles,
  excludedFiles = defaultExcludedFiles
) => ({
  files,
  excludedFiles,
  rules: {
    'no-restricted-syntax': ['error', ...restrictedSyntax],
  },
})

module.exports = {
  restrictedSyntax,
  defaultFiles,
  defaultExcludedFiles,
  createCypressOverride,
}
