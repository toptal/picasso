# Migrating tests to the new Picasso

What consumer repos need to change in their Jest and Cypress tests to upgrade
to the base-ui/Tailwind Picasso packages. Validated end-to-end on the
staff-portal migration (epic PF-1988); append learnings from other consumer
migrations to this document.

## What changed in the DOM

base-ui renders form controls as a **visible interactive element**
(`<span role="checkbox|switch|radio">`) with the **native `<input>` kept only
for form participation** — `aria-hidden`, 1×1px, visually clipped, no handlers
of its own. State is exposed via `aria-checked` / `data-checked`, labels via
`aria-labelledby`, disabled via `aria-disabled`. Tooltips, selects, dropdowns,
date pickers and dialogs render **asynchronously, in portals attached to the
picasso root** (they used to render inline).

> **Golden rule:** interact with what the user interacts with — the role
> element — and assert through ARIA, not HTML attributes.

## Jest / Testing Library

| Broken pattern                                                      | Fix                                                                                                                                                                               |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getByTestId(x).querySelector('input')`, `.children[0].children[0]` | Query the role element: `getByRole('checkbox'\|'switch', { name })` or the testid — picasso forwards `data-testid` to the role element                                            |
| `toHaveAttribute('checked')`                                        | `toBeChecked()` (reads `aria-checked`). If the control is controlled by a prop the test never updates, assert the `onChange` callback instead — there is no DOM change to observe |
| `toBeDisabled()`                                                    | `toHaveAttribute('aria-disabled', 'true')` — there is no native `disabled` attribute                                                                                              |
| Sync tooltip queries after hover                                    | `await screen.findByRole('tooltip')` + `toHaveTextContent(…)` — popups mount async                                                                                                |
| `findAllByText(tooltipText)` matching preloaded copies              | `findByRole('tooltip')` targets the real popup only                                                                                                                               |

**One-time test-infra setup:**

- Add a **PointerEvent polyfill** to the Jest setup — jsdom lacks the
  `PointerEvent` + pointer-capture APIs base-ui dispatches on click; without it
  `fireEvent.click` throws `PointerEvent is not a constructor`.
- Expect async **floating-ui `act()` warnings** — base-ui positions popups
  after render; silence them in the console-failure allowlist rather than
  wrapping every render.

## Cypress

| Broken pattern                                                                                  | Fix                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cy.get('[role="tooltip"]')` for **Select/Dropdown/Autocomplete/DatePicker popups**             | The popper container's role now matches its content (`presentation`, `dialog`, …; only real Tooltips keep `role="tooltip"`). Query the stable marker **`[data-picasso-popper]`** instead                                     |
| Popup queries inside `cy.within()` find nothing                                                 | Popups portal to the picasso root, outside your scope — escape with `cy.get('[data-picasso-popper]', { withinSubject: null })`                                                                                               |
| `cy.click()` on the hidden input → _"covered by another element"_                               | Click the interactive element: testids usually sit on the role span → `cy.getByTestId(x).click()`. Only when the selector yields the input itself (`[name=…]`, `#id`, `.find('input')`) climb to its direct wrapper          |
| `cy.check()` / `.uncheck()` refused                                                             | Add `{ force: true }` — Cypress's documented remedy for visually-hidden inputs; sets `checked` + fires `change`, which base-ui honors, and preserves ensure-semantics (vs. click's toggle)                                   |
| Asserting checked state on the input                                                            | Assert on the role element: `should('have.attr', 'aria-checked', 'true')`                                                                                                                                                    |
| Backdrop click doesn't close a modal/drawer                                                     | base-ui dismissal reacts only to **trusted** pointer events; synthetic `cy.click()` is ignored. Use `cy.get('body').realClick({ x: 1, y: 1 })` (cypress-real-events) or the explicit close button                            |
| Clicking a field wrapper to focus it                                                            | Target the actual control: `cy.getByTestId(f).find('textarea, input').first().clear()`, then `.type(…)` in a fresh chain                                                                                                     |
| Wrapped-subject chains (`this.modal.findByTestId(…).find(…)`) failing with _"the page updated"_ | One atomic selector — `cy.get('div[role="dialog"] [data-testid=…] …')` — so Cypress retries the whole query; give each action a fresh chain instead of `.click().clear().type()`                                             |
| Selectors coupled to old markup (`label.picasso-checkbox`, tag+structure)                       | Query by role or testid — the role survived the migration, the tag and structure did not                                                                                                                                     |
| Async-populated options/radios intermittently "not found" or selecting nothing on CI            | Use a retryable atomic selector that includes the expected value (`.find('input[value="…"]')`, `.contains(text)`), let `.should()` gate on it, then assert the resulting state — this waits for the option to actually mount |

## Behavior changes your tests may rely on

- **Clicking a field's `<label>` no longer opens a Select.** The latest
  picasso ignores browser-synthesized label-activation clicks, matching native
  `<select>` behavior: a label click focuses the input, nothing more. If a
  test opened the options by clicking the field label (directly, or
  accidentally via a big-container click), click the field itself instead:
  `cy.getByTestId(field).click()`. Keyboard (Enter/Space), real pointer clicks
  and assistive-technology activation are unaffected.

## Fragile patterns to stop using

- **`.parent().click()` off a field-row testid.** picasso-forms places
  `data-testid` on the whole field row, so `.parent()` is the fields
  container — Cypress then clicks its geometric **center**, i.e. whatever
  element happens to sit mid-form. This is layout-dependent and broke a
  previously-green suite when base-ui's field heights shifted the center onto
  a select's label (PF-2256). Click the visible text or the control instead:
  `cy.getByTestId(x).contains('Label text').click()` or
  `cy.getByTestId(x).find('input').first().check({ force: true })`. If a
  container click is ever deliberate, pass a position (`.click('topLeft')`),
  never the default center.
- **`click({ force: true })` on hidden inputs.** It may appear to work (the
  event bubbles) but bypasses actionability — a genuinely broken layout
  passes. Reserve `force` for `check()`/`uncheck()` on visually-hidden inputs.
- **Global Cypress command overwrites** to paper over the new DOM — invisible
  action-at-a-distance that weakens fidelity for a whole element class.
- **Deleting assertions to go green.** Usually a signal the failure is real —
  see the next section.

## When it's your component, not the test

Patterns that genuinely break with the new packages — fix the code:

1. **`<Checkbox onClick={…}>` → use `onChange`.** picasso's change API is
   `onChange` (wired to base-ui `onCheckedChange`); click handlers miss
   keyboard and programmatic changes.
2. **Reading `e.currentTarget.checked` inside `onChange`** — stale under
   base-ui's forwarded native event. Use the second argument:
   `onChange={(_e, nextChecked) => …}`.
3. **`as={cond ? Link : Button}` on picasso `Button`** — base-ui renders the
   `as` component inside its own button element, so `Button`-as-`Button`
   drops `aria-disabled` and the button is genuinely not disabled. Use
   `as={cond ? Link : undefined}`.
