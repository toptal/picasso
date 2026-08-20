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
