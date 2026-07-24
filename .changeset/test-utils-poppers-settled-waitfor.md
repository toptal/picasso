---
'@toptal/picasso-test-utils': minor
---

### Test-Utils

- add `createPoppersSettledWaitFor` — builds a Happo `waitFor` predicate that resolves once every open `@floating-ui/react` popper (Dropdown/Menu/Popper) has finished positioning, so a Storybook Happo snapshot serializes the settled geometry rather than a mid-`autoUpdate` frame. Pass it via a story's `parameters.happo.waitFor`. Mirrors the Cypress-Happo capture guard added in `cypress/support/commands.jsx`.
