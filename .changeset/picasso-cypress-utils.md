---
'@toptal/picasso-cypress-utils': minor
'@toptal/picasso-test-utils': minor
'@toptal/picasso-tooltip': minor
---

### picasso-cypress-utils

- add `@toptal/picasso-cypress-utils` — Cypress commands written against Picasso's DOM contract, so consumer specs state intent instead of walking the DOM. Register them from a Cypress support file with `registerPicassoCypressCommands()`, which takes a `skip` option for repos that already own one of the names
- add `cy.getPopup()` and `cy.getTooltip()` — they resolve the `[data-picasso-popper]` marker with `withinSubject: null` (popups portal out of any `cy.within()`) and a `:visible` filter (a closed `keepMounted` popper stays in the DOM as `display: none` and would otherwise shadow the open one)
- add `.setChecked(desired?)` — puts a Checkbox or Switch into a known state by clicking the visible role element, and only when the state differs. The native input is clipped to 1×1 and can never pass Cypress actionability, so this replaces `check()`/`uncheck()`/`click({ force: true })` on it
- add `.assertChecked(desired?)` and `.assertDisabled(desired?)` — they resolve the real control from a role element, a native input, or a wrapper, assert every match, and throw a distinct "found no control" error when the selector is wrong. `should('be.checked')` on a non-input subject matches nothing and passes vacuously
- add `.selectOption(target)` — opens a Select from its trigger and picks an option by text or `value`, scoped to the open popper
- add `.unhoverAnchor()` — the counterpart to `hoverAnchor` for "the tooltip closes again" assertions. It triggers `mouseleave`, since Picasso's Tooltip closes on React's `onMouseLeave` and a bare `mouseout` does not reliably synthesize it
- add `cy.queryTooltip(innerSelector?, text?)` — the tooltip twin of `queryPopup`. `getTooltip().should('not.exist')` already works, but `getTooltip().contains(x).should('not.exist')` hits the same existence-assertion trap; this folds the lookup into one query
- export `PICASSO_COMMAND_NAMES` as the runtime source of truth for the registered commands (`PicassoCommandName` is derived from it), so docs can be asserted against it
- make `registerPicassoCypressCommands` idempotent — repeat calls are a no-op for names already registered, so a support file pulled in twice cannot crash the run (Cypress throws on a duplicate query command and silently overwrites a duplicate regular one)
- add a shareable `no-restricted-syntax` config at `@toptal/picasso-cypress-utils/eslint` that bans selecting `[data-picasso-popper]` directly, `check`/`uncheck({ force: true })`, and `trigger('mouseover'|'mouseenter', { force: true })`
- add `.toggleControl()` — a query yielding the visible `[role="checkbox"|"switch"]` element from any subject shape, for the cases where ensure-semantics are the wrong verb: dispatching a toggle on a controlled component whose prop never updates (assert the handler instead), or driving focus/blur for touched-state flows
- add `cy.queryPopup(innerSelector?, text?)` — the may-be-absent counterpart to `getPopup` for negative assertions: it folds the whole lookup into one query so `cy.queryPopup('[role="option"]', 'X').should('not.exist')` passes whether the popup is closed or open without the option. The text argument is escaped, so quotes and backslashes in option labels are safe
- add `.hoverAnchor()` — resolves a Tooltip's anchor via the new `data-picasso-tooltip-anchor` marker and hovers it without force, replacing `trigger('mouseover', { force: true })` on natively disabled triggers. When the anchor is itself the disabled element the unforced hover still fails — correctly, since real users cannot open that tooltip either; wrap the disabled trigger in the app

### picasso-tooltip

- mark the anchor — the rendered trigger child owning the open/close listeners — with a stable `data-picasso-tooltip-anchor` attribute, so tests can hover it without per-usage `testIds={{ anchor }}` wiring

### picasso-test-utils

- add `POPPER_ACT_WARNING`, the `act()` warning Popper emits while floating-ui positions a popup asynchronously, for consumers that fail tests on console output
