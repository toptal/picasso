/**
 * Shareable `no-restricted-syntax` entries that keep the anti-patterns this
 * package exists to replace from re-entering a test suite.
 *
 * CommonJS on purpose — it is consumed from `.eslintrc.js`, which ESLint loads
 * with `require`.
 *
 * @example
 * // .eslintrc.js
 * const { restrictedSyntax } = require('@toptal/picasso-cypress-utils/eslint')
 *
 * module.exports = {
 *   overrides: [
 *     {
 *       files: ['**\/*.cy.*', 'cypress/**\/*'],
 *       rules: { 'no-restricted-syntax': ['error', ...restrictedSyntax] },
 *     },
 *   ],
 * }
 */

const GET_POPUP_MESSAGE =
  'Use cy.getPopup() instead of selecting [data-picasso-popper] directly — it ' +
  'scopes to the visible popper and escapes cy.within().'

const SET_CHECKED_MESSAGE =
  'check()/uncheck({ force: true }) bypasses actionability on the hidden ' +
  'Base UI input. Use cy.setChecked(desired?), which clicks the visible role ' +
  'element only when the state differs.'

/**
 * Spread into your own `no-restricted-syntax` list — these are additive, so an
 * app keeps whatever bans it already has.
 */
const HOVER_ANCHOR_MESSAGE =
  "trigger('mouseover', { force: true }) fires a hover through a channel real " +
  'pointers never reach, so it can pass against a tooltip no user can open. ' +
  'Use cy.hoverAnchor() — it resolves the tooltip anchor and hovers it ' +
  'unforced. If the plain unforced hover already works, just drop the force.'

/**
 * Spread into your own `no-restricted-syntax` list — these are additive, so an
 * app keeps whatever bans it already has.
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
]

/** Default globs for Cypress specs and support files. */
const defaultFiles = [
  '**/*.cy.js',
  '**/*.cy.jsx',
  '**/*.cy.ts',
  '**/*.cy.tsx',
  '**/*.spec.cy.ts',
  '**/*.spec.cy.tsx',
  '**/cypress/**/*.ts',
  '**/cypress/**/*.tsx',
]

/**
 * Ready-made ESLint `overrides` entry. Pass your own globs when your specs live
 * somewhere the defaults miss.
 */
const createCypressOverride = (files = defaultFiles) => ({
  files,
  rules: {
    'no-restricted-syntax': ['error', ...restrictedSyntax],
  },
})

module.exports = {
  restrictedSyntax,
  defaultFiles,
  createCypressOverride,
}
