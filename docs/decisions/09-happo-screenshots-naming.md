# Happo screenshots naming

## Problem

Happo plugin for Cypress provides the method `happoScreenshot()`.
It supports parameters `component` and `variant` as described in the [Happo docs](https://docs.happo.io/docs/cypress#usage).
Using it without parameters is creating incorrectly inferred names for screenshots.

## Proposal

Always use the `happoScreenshot()` method with parameters.

The `component` parameter:
- should be set as a constant string before the first test; Example: `const component = 'Autocomplete'`
- should be set to the component name, titlecased; Example: `Autocomplete`

The `variant` parameter can have 2 formats:
- variant; example: `with-description`
- variant/after-action-done; example: `with-description/after-clicked`

Complete example:
```js
const component = 'Autocomplete'

cy.get('body').happoScreenshot({
  component,
  variant: 'with-description/after-clicked',
})
```
