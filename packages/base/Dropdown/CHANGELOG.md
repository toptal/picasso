# @toptal/picasso-dropdown

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
  Align the `react` and `react-dom` peer-dependency range to a uniform `>=17.0.0 < 19.0.0` across all Picasso packages.
  - previously the base-UI-migrated packages declared an uncapped `react` peer (`>=17.0.0`) while the rest were capped at `< 19.0.0`; this unifies the whole library on one supported range so consumers see a consistent React requirement.
  - react 19 support is intentionally deferred — lifting the `< 19.0.0` cap across all packages, once validated, is tracked in PF-2262.
  - peer-range change only; no runtime or API changes.

### Patch Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Dropdown

- Remove the `@mui/base` (`ClickAwayListener`) and `@material-ui/core` (`Grow`, `PopperPlacementType`) dependencies; public API and behavioral parity unchanged.
- Click-away dismissal now uses the shared `@toptal/picasso-utils` `ClickAwayListener` (the MUI-free replacement already used by DatePicker and Menu), instead of `@mui/base`'s listener.
- The open grow transition moves from MUI `Grow` to a CSS `@starting-style` entry animation (`transition-[opacity,scale]` + `starting:scale-75 starting:opacity-0`), resting at `scale-100`.
- The `placement` prop type is now imported from `@toptal/picasso-popper` (`PopperPlacementType`) instead of being redefined locally — same 12 members as `@material-ui/core`'s, no removed values, no consumer-visible narrowing.
- The locally narrowed `classes?: { popper?, content? }` surface is preserved unchanged (used by external consumers).

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Dropdown

- `offset` now resolves through the shared static spacing-class table from `@toptal/picasso-utils` (the same table Container's spacing props use): spacing tokens and deprecated size strings become static Tailwind margin classes; deprecated raw numbers stay inline rem styles. Computed margins are unchanged
- fix the inverted responsive-offset cascade: per-breakpoint offset objects emitted their media queries largest-first, so on wide viewports the smallest specified breakpoint won. The bug shipped with the feature; an org-wide audit found zero users of the responsive object form. With Tailwind's mobile-first variants, `offset={{ top: { sm: SPACING_2, lg: SPACING_8 } }}` now correctly applies the `lg` value on `lg`+ screens
- responsive offsets are now correct on SSR first paint — the classes live in the build-time Tailwind CSS, where the previous runtime `<style>` bridge was client-only (reachable in SSR HTML with `keepMounted` + `disablePortal`)
- token/string offsets moved from inline styles to classes, so consumer CSS targeting the popper can now override the offset margins (inline styles previously always won)
- responsive offsets no longer react to `disableMobileBreakpoints()` — they use the fixed Tailwind screens, matching Container's responsive spacing props

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Popper / Dropdown

- restore backwards compatibility with the pre-migration popper.js-based `popperOptions.positionFixed` option: `popperOptions.positionFixed: true` again positions the popper with a `fixed` strategy (relative to the viewport), escaping a clipping/scrolling ancestor (e.g. an `overflow: hidden` container) that the default `absolute` positioning cannot, matching its old popper.js v1 behavior.

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Popper

- add a `role` prop for the floating element (defaults to `tooltip`)

### DatePicker

- expose the calendar popup as `role="dialog"` instead of Popper's default `tooltip`

### Select / Autocomplete / Dropdown / Menu

- mark the popup positioning wrapper as `role="presentation"` — the inner listbox/menu owns the popup semantics, so assistive tech no longer announces these popups as tooltips
- Updated dependencies [[`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5)]:
  - @toptal/picasso-provider@100.0.0
  - @toptal/picasso-utils@100.0.0
  - @toptal/picasso-popper@100.0.0
  - @toptal/picasso-shared@100.0.0
  - @toptal/picasso-paper@100.0.0
  - @toptal/picasso-tailwind-merge@100.0.0

## 5.0.1

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-paper@4.0.6
  - @toptal/picasso-popper@2.0.3
  - @toptal/picasso-utils@4.0.1

## 5.0.0

### Major Changes

- [#4898](https://github.com/toptal/picasso/pull/4898) [`e93f40b`](https://github.com/toptal/picasso/commit/e93f40bf03c4ea943ff9561c2dd032125a05ffc1) Thanks [@javier-delgado](https://github.com/javier-delgado)!
  Upgraded Tailwind CSS from v3 to v4:
  - updated `tailwindcss` peer dependency from `^3.4.10` to `^4.2.1`
  - updated deprecated utility classes
  - min node version is 20 or higher

### Patch Changes

- Updated dependencies [[`e93f40b`](https://github.com/toptal/picasso/commit/e93f40bf03c4ea943ff9561c2dd032125a05ffc1)]:
  - @toptal/picasso-utils@4.0.0
  - @toptal/picasso-paper@4.0.5
  - @toptal/picasso-popper@2.0.2

## 4.2.4

### Patch Changes

- [#4797](https://github.com/toptal/picasso/pull/4797) [`c90ccde`](https://github.com/toptal/picasso/commit/c90ccdefa944fc3576bcccb060bb68119a7807e6) Thanks [@sashuk](https://github.com/sashuk)!
- stop using deprecated way of specifying default component property values (`.defaultProps` will not be supported in the future, please see [this React issue](https://github.com/facebook/react/issues/29233) for details)

- Updated dependencies [[`c90ccde`](https://github.com/toptal/picasso/commit/c90ccdefa944fc3576bcccb060bb68119a7807e6)]:
  - @toptal/picasso-popper@2.0.1
  - @toptal/picasso-paper@4.0.4

## 4.2.3

### Patch Changes

- Updated dependencies [[`6aae8c6`](https://github.com/toptal/picasso/commit/6aae8c67f2f3c4979df322d30494b0f2958d6ccb)]:
  - @toptal/picasso-popper@2.0.0

## 4.2.2

### Patch Changes

- Updated dependencies [[`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447)]:
  - @toptal/picasso-popper@1.1.0
  - @toptal/picasso-utils@3.1.0
  - @toptal/picasso-paper@4.0.3

## 4.2.1

### Patch Changes

- Updated dependencies [[`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498)]:
  - @toptal/picasso-utils@3.0.0
  - @toptal/picasso-paper@4.0.2
  - @toptal/picasso-popper@1.0.5

## 4.2.0

### Minor Changes

- [#4568](https://github.com/toptal/picasso/pull/4568) [`75087fa`](https://github.com/toptal/picasso/commit/75087fa5ddbb989681255807fba61288b207e2b6) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Dropdown

- support disabled state

## 4.1.2

### Patch Changes

- [#4562](https://github.com/toptal/picasso/pull/4562) [`2880a4b`](https://github.com/toptal/picasso/commit/2880a4b68cb4676be3b91b416f45a87d201df715) Thanks [@sofiaternovskaya](https://github.com/sofiaternovskaya)!
- update mui/base lib to fix multiline textarea issue

## 4.1.1

### Patch Changes

- Updated dependencies [[`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d)]:
  - @toptal/picasso-utils@2.0.0
  - @toptal/picasso-paper@4.0.1
  - @toptal/picasso-popper@1.0.4

## 4.1.0

### Minor Changes

- [#4499](https://github.com/toptal/picasso/pull/4499) [`3a0125d`](https://github.com/toptal/picasso/commit/3a0125df1849c66335436c3adaea1b90f989ee7b) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Dropdown

- change the ClickAwayListener component to be imported from @mui/base

## 4.0.0

### Major Changes

- [#4500](https://github.com/toptal/picasso/pull/4500) [`3ed8c02`](https://github.com/toptal/picasso/commit/3ed8c0271982a82dd9cdc6b967c63656afd3654f) Thanks [@ruslan-sed](https://github.com/ruslan-sed)!
- update version of `@toptal/picasso-tailwind-merge` peer dependency

### Patch Changes

- Updated dependencies [[`3ed8c02`](https://github.com/toptal/picasso/commit/3ed8c0271982a82dd9cdc6b967c63656afd3654f)]:
  - @toptal/picasso-paper@4.0.0

## 3.0.0

### Major Changes

- [#4451](https://github.com/toptal/picasso/pull/4451) [`a1c2b1d`](https://github.com/toptal/picasso/commit/a1c2b1dc5ee808034171dc2879b30a63de24257d) Thanks [@sashuk](https://github.com/sashuk)!
- align dropdown arrow icon with BASE design
  - update peer dependencies in Dropdown component

## 2.0.4

### Patch Changes

- Updated dependencies [[`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685)]:
  - @toptal/picasso-paper@3.0.0

## 2.0.3

### Patch Changes

- Updated dependencies [[`ab2b605`](https://github.com/toptal/picasso/commit/ab2b605da9877b2f5fca18830923e0dcfbe1b9ed)]:
  - @toptal/picasso-paper@2.0.4

## 2.0.2

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-popper@1.0.3
  - @toptal/picasso-utils@1.0.3
  - @toptal/picasso-paper@2.0.3

## 2.0.1

### Patch Changes

- Updated dependencies [[`da32106`](https://github.com/toptal/picasso/commit/da32106624188e82773df7fadcf708943e4fc09a)]:
  - @toptal/picasso-paper@2.0.2

## 2.0.0

### Major Changes

- [#4229](https://github.com/toptal/picasso/pull/4229) [`b779ddce4a67593bab27e8d09c2c930708cfb2ec`](https://github.com/toptal/picasso/commit/b779ddce4a67593bab27e8d09c2c930708cfb2ec) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- delete unused Popover

## 1.0.3

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-popper@1.0.2
  - @toptal/picasso-utils@1.0.2
  - @toptal/picasso-paper@2.0.1

## 1.0.2

### Patch Changes

- [#4173](https://github.com/toptal/picasso/pull/4173) [`d22bf5d913428b586e2813cf530f4e96d46b622e`](https://github.com/toptal/picasso/commit/d22bf5d913428b586e2813cf530f4e96d46b622e) Thanks [@sashuk](https://github.com/sashuk)!

### Dropdown

- refactor usage of Paper component
- Updated dependencies [[`d22bf5d913428b586e2813cf530f4e96d46b622e`](https://github.com/toptal/picasso/commit/d22bf5d913428b586e2813cf530f4e96d46b622e)]:
  - @toptal/picasso-paper@2.0.0

## 1.0.1

### Patch Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages
- Updated dependencies [[`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30)]:
  - @toptal/picasso-popper@1.0.1
  - @toptal/picasso-paper@1.0.1
  - @toptal/picasso-utils@1.0.1
