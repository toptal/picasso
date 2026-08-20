# @toptal/picasso-cypress-utils

Cypress commands written against **Picasso's DOM contract**, so consumer specs
state intent instead of walking the DOM.

Picasso builds on [Base UI](https://base-ui.com): popups render asynchronously
in portals, and toggle controls render a visible `role` element with a
visually-hidden native `<input>` as its **sibling**. Hand-rolled selectors that
encode that shape break whenever the shape changes. These commands encode it
once, and version with the components.

## Install

```bash
pnpm add -D @toptal/picasso-cypress-utils
```

`cypress` is a peer dependency (`>=13 <16`).

## Setup

Register the commands from your Cypress support file:

```ts
// cypress/support/component.ts
import { registerPicassoCypressCommands } from '@toptal/picasso-cypress-utils'

registerPicassoCypressCommands()
```

If your repo already owns one of these names — say a hand-rolled `setChecked`
from an earlier migration layer — skip it, or whichever registration runs last
silently overwrites the other (Cypress only throws for duplicate _query_
commands):

```ts
registerPicassoCypressCommands({ skip: ['setChecked'] })
```

### Types

The `Cypress.Chainable` augmentation ships with the package and applies as soon
as a file in your TS program imports from it — which the support file above
already does. If your specs are typechecked by a project that does not include
the support file, add a reference:

```ts
/// <reference types="@toptal/picasso-cypress-utils" />
```

## Commands

| Command                     | Subject | What it does                                                |
| --------------------------- | ------- | ----------------------------------------------------------- |
| `cy.getPopup()`             | —       | The open Select/Dropdown/Menu/Autocomplete/DatePicker popup |
| `cy.getTooltip()`           | —       | The open Tooltip                                            |
| `.setChecked(desired?)`     | element | Ensures a Checkbox/Switch state                             |
| `.assertChecked(desired?)`  | element | Asserts checked state                                       |
| `.assertDisabled(desired?)` | element | Asserts disabled state                                      |
| `.selectOption(target)`     | element | Opens a Select from its trigger and picks an option         |

Deliberately **not** included: generic queries like `getByTestId` /
`findByTestId`. Every Toptal app already ships its own (with differing
signatures — `@topkit/cypress-utils` takes variadic extra selectors), and they
encode nothing about Picasso. This package registers only commands that break
when Picasso's DOM changes; the examples below chain off your app's usual
`getByTestId`.

```ts
cy.getByTestId('country-select').selectOption('Croatia')
cy.getByTestId('country-select').selectOption({ value: 'hr' })

cy.getByTestId('newsletter').setChecked()
cy.getByTestId('newsletter').assertChecked()
cy.getByTestId('terms').assertDisabled(false)

cy.getByTestId('menu-button').click()
cy.getPopup().contains('[role="option"]', 'Archive').click()
```

## Why these, and not the obvious thing

- **`getPopup()`** — popups portal to the Picasso root, so a query inside
  `cy.within()` finds nothing; it passes `withinSubject: null` to escape. It
  also filters to `:visible`, because a closed `keepMounted` popper stays in the
  DOM as `display: none` and would otherwise shadow the open one. Only real
  Tooltips still carry `role="tooltip"` — Select/Dropdown poppers are
  `role="presentation"`, DatePicker is `role="dialog"`.
- **`setChecked()`** — the native input is clipped to 1×1, so it can never pass
  Cypress actionability. `{ force: true }` "fixes" that by disabling every
  actionability check, which is how a spec ends up green against a checkbox
  behind a modal backdrop. This clicks the visible role element instead, and
  only when the state actually differs.
- **`assertChecked()` / `assertDisabled()`** — `should('be.checked')` on
  anything that is not an input matches nothing and **passes vacuously**. These
  resolve the real control first and throw a distinct "found no control" error
  when a selector is wrong.

## Lint rules

Ship-with-the-command bans that stop the replaced patterns coming back:

```js
// .eslintrc.js
const { restrictedSyntax } = require('@toptal/picasso-cypress-utils/eslint')

module.exports = {
  overrides: [
    {
      files: ['**/*.cy.tsx', 'cypress/**/*.ts'],
      rules: { 'no-restricted-syntax': ['error', ...restrictedSyntax] },
    },
  ],
}
```

`createCypressOverride(files?)` returns that `overrides` entry ready-made.

## Escape hatches on the components

Some assertions genuinely need an element these commands do not yield:

- `testIds={{ input }}` on `Checkbox` / `Switch` stamps the visually-hidden
  native input, for assertions about the serialized form value. Prefer
  `assertChecked` for state.
- `testIds={{ anchor }}` on `Tooltip` names the element the open/close listeners
  attach to. A natively disabled child swallows pointer events, so hovering it
  never opens its tooltip — hover the anchor.

## Migration guide

The full consumer-app migration playbook lives in
[`docs/migration-to-new-picasso-v2.md`](https://github.com/toptal/picasso/blob/master/docs/migration-to-new-picasso-v2.md).
