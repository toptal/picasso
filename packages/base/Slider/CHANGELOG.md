# @toptal/picasso-slider

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

### Slider

- Re-implement on `@base-ui/react/slider`; public API unchanged.

## Intentional visual changes

Slider now matches the current Figma design-of-record (diverged from the legacy
`@mui/base` pixels). Pre-authorized in `docs/migration/components/Slider.md`
§"Approved visual deltas":

- Thumb diameter `15px` → `19px` (2px white border retained).
- Rail fill: translucent `bg-gray-500` @ `opacity-[0.24]` → solid `bg-gray-500`.
- Disabled track (under `disableTrackHighlight`): `bg-gray-200` → `bg-gray-500`.
- Mark: `6px` + 2px white border → `9px` solid fill, no border.
- Container vertical rhythm: `my-[6px]` → `mt-[5px] mb-[4px]` + `h-[15px]`.

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Slider

- make the thumb border transparent instead of white and stop the track at the thumb's edge, so the thumb-to-track separation shows the actual background and renders correctly on any surface color

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Upgrade `@base-ui/react` from 1.4.1 to 1.6.0
  No consumer-facing API changes. base-ui 1.6 emits a few additional data
  attributes for styling/animation (`data-popup-open`, `data-activation-direction`,
  `data-hidden`) and tightens its internal accessibility semantics (Accordion Root
  no longer carries `role="region"`, per APG; Modal focus guards use
  `aria-hidden` instead of `role="button"`).
- Updated dependencies [[`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5)]:
  - @toptal/picasso-provider@100.0.0
  - @toptal/picasso-utils@100.0.0
  - @toptal/picasso-shared@100.0.0
  - @toptal/picasso-tailwind@100.0.0
  - @toptal/picasso-tailwind-merge@100.0.0
  - @toptal/picasso-tooltip@100.0.0

## 5.0.2

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-tooltip@2.0.7

## 5.0.1

### Patch Changes

- Updated dependencies [[`440f217`](https://github.com/toptal/picasso/commit/440f217c1748d09beeca90e5277d2137d4251897)]:
  - @toptal/picasso-shared@16.0.0
  - @toptal/picasso-tooltip@2.0.6
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
  - @toptal/picasso-tooltip@2.0.5

## 4.0.6

### Patch Changes

- [#4797](https://github.com/toptal/picasso/pull/4797) [`c90ccde`](https://github.com/toptal/picasso/commit/c90ccdefa944fc3576bcccb060bb68119a7807e6) Thanks [@sashuk](https://github.com/sashuk)!
- stop using deprecated way of specifying default component property values (`.defaultProps` will not be supported in the future, please see [this React issue](https://github.com/facebook/react/issues/29233) for details)

- Updated dependencies [[`c90ccde`](https://github.com/toptal/picasso/commit/c90ccdefa944fc3576bcccb060bb68119a7807e6)]:
  - @toptal/picasso-tooltip@2.0.4

## 4.0.5

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-tooltip@2.0.3

## 4.0.4

### Patch Changes

- Updated dependencies [[`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447)]:
  - @toptal/picasso-utils@3.1.0
  - @toptal/picasso-tooltip@2.0.2

## 4.0.3

### Patch Changes

- [#4572](https://github.com/toptal/picasso/pull/4572) [`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Slider

- fix initial position of Tooltip
- Updated dependencies [[`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498)]:
  - @toptal/picasso-utils@3.0.0
  - @toptal/picasso-tooltip@2.0.1

## 4.0.2

### Patch Changes

- [#4562](https://github.com/toptal/picasso/pull/4562) [`2880a4b`](https://github.com/toptal/picasso/commit/2880a4b68cb4676be3b91b416f45a87d201df715) Thanks [@sofiaternovskaya](https://github.com/sofiaternovskaya)!
- update mui/base lib to fix multiline textarea issue

## 4.0.1

### Patch Changes

- Updated dependencies [[`031e242`](https://github.com/toptal/picasso/commit/031e242924442575d7dbafcc8a644b5ec03658de), [`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d)]:
  - @toptal/picasso-tooltip@2.0.0
  - @toptal/picasso-utils@2.0.0

## 4.0.0

### Major Changes

- [#4500](https://github.com/toptal/picasso/pull/4500) [`3ed8c02`](https://github.com/toptal/picasso/commit/3ed8c0271982a82dd9cdc6b967c63656afd3654f) Thanks [@ruslan-sed](https://github.com/ruslan-sed)!
- update version of `@toptal/picasso-tailwind-merge` peer dependency

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-tooltip@1.1.5

## 3.0.0

### Major Changes

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- add @toptal/picasso-tailwind-merge as peer dependency, it now needs to be provided by the project consuming the package

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-tooltip@1.1.4

## 2.0.0

### Major Changes

- [#4320](https://github.com/toptal/picasso/pull/4320) [`75540be4ee8bd57c4da93ae725782c39c7cf85b2`](https://github.com/toptal/picasso/commit/75540be4ee8bd57c4da93ae725782c39c7cf85b2) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Slider

- migrate from MUI@4 to MUI Base and TailwindCSS
- remove `compact`, `disablePortal` and `TooltipComponent` props in Slider component

## 1.0.6

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-tooltip@1.1.3

## 1.0.5

### Patch Changes

- Updated dependencies [[`d599529`](https://github.com/toptal/picasso/commit/d599529bcb283c367b63c612fee81394e66c9740)]:
  - @toptal/picasso-shared@15.0.0
  - @toptal/picasso-tooltip@1.1.2
  - @toptal/picasso-utils@1.0.3

## 1.0.4

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-tooltip@1.1.1

## 1.0.3

### Patch Changes

- Updated dependencies [[`977da66`](https://github.com/toptal/picasso/commit/977da669eaa4ee5aefbe2acda773e3621e5981c4)]:
  - @toptal/picasso-tooltip@1.1.0

## 1.0.2

### Patch Changes

- Updated dependencies [[`a1d523092cc4de6cb376156435b99b1e483f39b9`](https://github.com/toptal/picasso/commit/a1d523092cc4de6cb376156435b99b1e483f39b9)]:
  - @toptal/picasso-shared@14.0.1
  - @toptal/picasso-tooltip@1.0.2
  - @toptal/picasso-utils@1.0.2

## 1.0.1

### Patch Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages
- Updated dependencies [[`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30)]:
  - @toptal/picasso-shared@14.0.0
  - @toptal/picasso-tooltip@1.0.1
  - @toptal/picasso-utils@1.0.1
