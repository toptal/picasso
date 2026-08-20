---
'@toptal/picasso-cypress-utils': minor
'@toptal/picasso-test-utils': minor
---

### picasso-cypress-utils

- add `@toptal/picasso-cypress-utils` — Cypress commands written against Picasso's DOM contract, so consumer specs state intent instead of walking the DOM. Register them from a Cypress support file with `registerPicassoCypressCommands()`, which takes a `skip` option for repos that already own one of the names
- add `cy.getPopup()` and `cy.getTooltip()` — they resolve the `[data-picasso-popper]` marker with `withinSubject: null` (popups portal out of any `cy.within()`) and a `:visible` filter (a closed `keepMounted` popper stays in the DOM as `display: none` and would otherwise shadow the open one)
- add `.setChecked(desired?)` — puts a Checkbox or Switch into a known state by clicking the visible role element, and only when the state differs. The native input is clipped to 1×1 and can never pass Cypress actionability, so this replaces `check()`/`uncheck()`/`click({ force: true })` on it
- add `.assertChecked(desired?)` and `.assertDisabled(desired?)` — they resolve the real control from a role element, a native input, or a wrapper, assert every match, and throw a distinct "found no control" error when the selector is wrong. `should('be.checked')` on a non-input subject matches nothing and passes vacuously
- add `.selectOption(target)` — opens a Select from its trigger and picks an option by text or `value`, scoped to the open popper
- add a shareable `no-restricted-syntax` config at `@toptal/picasso-cypress-utils/eslint` that bans selecting `[data-picasso-popper]` directly and `check`/`uncheck({ force: true })`

### picasso-test-utils

- add `POPPER_ACT_WARNING`, the `act()` warning Popper emits while floating-ui positions a popup asynchronously, for consumers that fail tests on console output
