# @toptal/picasso-cypress-utils

## 100.0.0

### Major Changes

- [#5092](https://github.com/toptal/picasso/pull/5092) [`6d1b219`](https://github.com/toptal/picasso/commit/6d1b2195a634807590d5d807fcd15c6ea3c1f39e) Thanks [@vedrani](https://github.com/vedrani)!

### picasso-cypress-utils

- add `@toptal/picasso-cypress-utils`, a set of Cypress commands written against Picasso's DOM contract, so consumer specs state intent instead of walking the DOM. Register them from a Cypress support file with `registerPicassoCypressCommands()`; the call is idempotent and takes a `skip` option for repos that already own one of the names. The major is the version jump, not a break: `0.0.0` on npm is a placeholder from bootstrapping the package, and this first real release joins the v100 line

  **Finding popups.** Base UI portals every popup out of the component tree and gives it a role that varies by consumer, so neither `cy.within()` nor a role selector reaches it. `cy.getPopup()` and `cy.getTooltip()` resolve the stable markers with `withinSubject: null` and a `:visible` filter — the latter matters because a closed `keepMounted` popper stays in the DOM as `display: none` and would otherwise shadow the open one. Only real Tooltips still carry `role="tooltip"`; Select and Dropdown poppers do not.

  **Negative assertions.** `cy.queryPopup(innerSelector?, text?)` and `cy.queryTooltip(innerSelector?, text?)` are the may-be-absent counterparts. Cypress waives the implicit existence assertion only for the query a `not.exist` attaches to, so `getPopup().contains(x).should('not.exist')` fails on the _command_ when the popup is legitimately absent. These fold the whole lookup into one query. The text argument is escaped, so quotes and backslashes in option labels are safe.

  **Toggle controls.** Checkbox and Switch render a visible role element beside a native input clipped to 1×1, which can never pass Cypress actionability — the reason specs reached for `check()`/`click({ force: true })`. `.setChecked(desired?)` clicks the role element, and only when the state differs. `.toggleControl()` yields the role element itself for the cases where ensure-semantics are the wrong verb: dispatching a toggle on a controlled component whose prop never updates, or driving focus/blur for touched-state flows.

  **State assertions.** `.assertChecked(desired?)` and `.assertDisabled(desired?)` resolve the real control from a role element, a native input, or a wrapper, assert every match, and throw a distinct "found no control" error when the selector is wrong — `should('be.checked')` on a non-input subject matches nothing and passes vacuously.

  **Selects and tooltips.** `.selectOption(target)` opens a Select from its trigger and picks an option by text or `value`, scoped to the open popper. `.hoverAnchor()` resolves a Tooltip's anchor through the new `data-picasso-tooltip-anchor` marker and hovers it unforced, replacing `trigger('mouseover', { force: true })` on natively disabled triggers; when the anchor is itself the disabled element the unforced hover still fails, correctly, since real users cannot open that tooltip either — wrap the disabled trigger in the app. `.unhoverAnchor()` is the counterpart for "the tooltip closes again" assertions, firing `mouseleave` because that is what Picasso's Tooltip listens to.

- add a shareable `no-restricted-syntax` config at `@toptal/picasso-cypress-utils/eslint` that keeps the replaced patterns from coming back — it bans selecting `[data-picasso-popper]` directly, `check`/`uncheck({ force: true })`, `trigger('mouseover'|'mouseenter', { force: true })`, and selecting `[role="tooltip"]` directly. `createCypressOverride()` returns a ready-made `overrides` entry that already excludes `**/cypress/support/**`, since your command layer is the one place that legitimately touches those raw markers

### picasso-tooltip

- mark the anchor — the rendered trigger child owning the open/close listeners — with a stable `data-picasso-tooltip-anchor` attribute, so tests can hover it without per-usage `testIds={{ anchor }}` wiring

### picasso-test-utils

- add `POPPER_ACT_WARNING`, the `act()` warning Popper emits while floating-ui positions a popup asynchronously, for consumers that fail tests on console output
