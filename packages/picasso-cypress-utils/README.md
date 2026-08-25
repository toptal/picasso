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

Calling it twice is safe — registration is idempotent, so a support file pulled
in twice cannot crash the run. To keep your own implementation of a name
instead, skip it:

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

| Command                        | Subject | What it does                                                |
| ------------------------------ | ------- | ----------------------------------------------------------- |
| `cy.getPopup()`                | —       | The open Select/Dropdown/Menu/Autocomplete/DatePicker popup |
| `cy.getTooltip()`              | —       | The open Tooltip                                            |
| `.setChecked(desired?)`        | element | Ensures a Checkbox/Switch state                             |
| `.assertChecked(desired?)`     | element | Asserts checked state                                       |
| `.assertDisabled(desired?)`    | element | Asserts disabled state                                      |
| `.selectOption(target)`        | element | Opens a Select from its trigger and picks an option         |
| `.toggleControl()`             | element | Yields the visible role element from any subject shape      |
| `cy.queryPopup(inner?, text?)` | —       | One-query popup lookup, for negative assertions             |
| `.hoverAnchor()`               | element | Hovers a Tooltip's anchor — for natively disabled triggers  |
| `.unhoverAnchor()`             | element | Moves the pointer off the anchor — closes the tooltip       |

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

// controlled checkbox whose prop never updates — dispatch, assert the handler
cy.getByTestId('pinned').toggleControl().click()
cy.get('@onChange').should('have.been.calledOnce')

// negative assertions that tolerate an absent popup
cy.queryPopup('[role="option"]', 'X').should('not.exist')

// tooltip on a natively disabled control — hover the anchor, no force
cy.getByTestId('save').hoverAnchor()
cy.getTooltip().should('contain', 'Why this is disabled')
cy.getByTestId('save').unhoverAnchor()
cy.getTooltip().should('not.exist')
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
- **`toggleControl()`** — `setChecked`'s ensure-semantics assume the DOM
  reflects state. A controlled component whose `checked` prop never updates (a
  stubbed handler) has nothing to ensure — dispatch with
  `toggleControl().click()` and assert the handler, the Cypress twin of the
  RTL rule in the migration guide.
- **`queryPopup(inner?)`** — Cypress's implicit-existence rule means
  `getPopup().contains(x).should('not.exist')` fails on the _command_ when the
  popup is legitimately absent (only the last query gets the `not.exist`
  waiver). `queryPopup` folds the inner selector into **one** query, so the
  waiver covers the whole lookup — attach the `should` directly. Pass the text
  as the second argument rather than writing `:contains(…)`: the value is
  escaped, so quotes and backslashes in labels are safe.
- **`hoverAnchor()`** — a natively disabled control swallows pointer events,
  so hovering it never opens its tooltip; the historical workaround,
  `trigger('mouseover', { force: true })`, fires handlers through a channel
  real pointers never reach. This hovers the marked anchor **without force**;
  where it still can't open the tooltip, users can't either — wrap the
  disabled trigger in the app.

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

One ESLint gotcha (hit by the first adopter): `overrides` **replace** a rule's
options rather than merging them. If another override already configures
`no-restricted-syntax` for the same files, spread `restrictedSyntax` into that
existing entry — or repeat the existing selectors in the new one — instead of
adding a second override and silently losing whichever loses the specificity
race.

## Escape hatches on the components

Some assertions genuinely need an element these commands do not yield:

- `testIds={{ input }}` on `Checkbox` / `Switch` stamps the visually-hidden
  native input, for assertions about the serialized form value. Prefer
  `assertChecked` for state.
- `testIds={{ anchor }}` on `Tooltip` names the element the open/close listeners
  attach to. The anchor also always carries `data-picasso-tooltip-anchor` —
  which is what `.hoverAnchor()` resolves — so the testid is only needed to
  address a _specific_ tooltip's anchor globally.

## Migration guide

The full consumer-app migration playbook lives in
[`docs/migration-to-new-picasso-v2.md`](https://github.com/toptal/picasso/blob/master/docs/migration-to-new-picasso-v2.md).
