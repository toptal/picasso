# @toptal/picasso-test-utils

## 100.1.0

### Minor Changes

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

### Patch Changes

- Updated dependencies [[`6d1b219`](https://github.com/toptal/picasso/commit/6d1b2195a634807590d5d807fcd15c6ea3c1f39e)]:
  - @toptal/picasso-provider@100.2.0
  - @toptal/picasso-shared@100.1.0

## 100.0.1

### Patch Changes

- Updated dependencies [[`a726b1c`](https://github.com/toptal/picasso/commit/a726b1ce44b902507fa03b97b897475b0d19311d)]:
  - @toptal/picasso-shared@100.1.0

## 100.0.0

### Major Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Raise the `react` and `react-dom` peer-dependency floor to React 17.

  - raise the `react` and `react-dom` peer-dependency floor from `>=16.12.0` to `>=17.0.0` across all Picasso packages — **React 16 is no longer supported**. Picasso components now depend on `@base-ui/react`, which requires React 17+ (`^17 || ^18 || ^19`), so React 16 could no longer be honored in practice.
  - this is a peer-range change only — no runtime or API changes. Existing upper bounds are untouched: packages currently capped at `<19.0.0` stay capped (lifting that cap to admit React 19 is tracked separately in PF-2236 / PF-2262).
  - consumer action: ensure `react` and `react-dom` resolve to `>=17`. [PF-2237]

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Re-baseline the entire Picasso library to a single unified major version (v100) as part of the @base-ui/react modernization.
  - all Picasso packages are released together at v100.0.0 as one unified version.
  - no API or behavior change comes from this re-baseline itself; see each package's changelog for the specific modernization changes it received.

### Minor Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Test-Utils

- add `createPoppersSettledWaitFor` — builds a Happo `waitFor` predicate that resolves once every open `@floating-ui/react` popper (Dropdown/Menu/Popper) has finished positioning, so a Storybook Happo snapshot serializes the settled geometry rather than a mid-`autoUpdate` frame. Pass it via a story's `parameters.happo.waitFor`. Mirrors the Cypress-Happo capture guard added in `cypress/support/commands.jsx`.

### Patch Changes

- Updated dependencies [[`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5)]:
  - @toptal/picasso-provider@100.0.0
  - @toptal/picasso-shared@100.0.0

## 2.0.1

### Patch Changes

- Updated dependencies [[`440f217`](https://github.com/toptal/picasso/commit/440f217c1748d09beeca90e5277d2137d4251897)]:
  - @toptal/picasso-shared@16.0.0

## 2.0.0

### Major Changes

- [#4898](https://github.com/toptal/picasso/pull/4898) [`e93f40b`](https://github.com/toptal/picasso/commit/e93f40bf03c4ea943ff9561c2dd032125a05ffc1) Thanks [@javier-delgado](https://github.com/javier-delgado)!
  Upgraded Tailwind CSS from v3 to v4:
  - updated `tailwindcss` peer dependency from `^3.4.10` to `^4.2.1`
  - updated deprecated utility classes
  - min node version is 20 or higher

## 1.1.1

### Patch Changes

- Updated dependencies [[`d599529`](https://github.com/toptal/picasso/commit/d599529bcb283c367b63c612fee81394e66c9740)]:
  - @toptal/picasso-shared@15.0.0

## 1.1.0

### Minor Changes

- [#4204](https://github.com/toptal/picasso/pull/4204) [`ae69e0e985c48542e7cc1df401d82ca91aa474ad`](https://github.com/toptal/picasso/commit/ae69e0e985c48542e7cc1df401d82ca91aa474ad) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- add posibility to pass injectFirst property to TestingPicasso

## 1.0.2

### Patch Changes

- Updated dependencies [[`a1d523092cc4de6cb376156435b99b1e483f39b9`](https://github.com/toptal/picasso/commit/a1d523092cc4de6cb376156435b99b1e483f39b9)]:
  - @toptal/picasso-shared@14.0.1

## 1.0.1

### Patch Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages
- Updated dependencies [[`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30)]:
  - @toptal/picasso-shared@14.0.0
