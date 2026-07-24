# @toptal/picasso-popper

## 100.0.0

### Major Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Popper

- re-implement on `@floating-ui/react`, removing the `@material-ui/core` peer dependency and all popper.js types; rendering, placement, flipping, overflow shifting, hiding and the `onCreate`/`onUpdate` lifecycle keep behavioral parity
- breaking: `popperOptions` is now typed as a Picasso-native, popper.js-v1-shaped subset (`modifiers.flip/offset/preventOverflow/hide`, `onCreate`, `onUpdate`). popper.js-typed option objects remain assignable, but options outside this subset (`positionFixed`, `eventsEnabled`, custom modifier `fn`s, `arrow`, `applyStyle`, …) are no longer honored at runtime
- breaking: the forwarded `ref` resolves to a `PopperHandle` (`popper` element, `update()`, `scheduleUpdate()`) instead of a popper.js instance; popper.js-only instance members (`destroy()`, `enableEventListeners()`, `options`, …) are gone. `ref.current.popper` keeps working
- breaking: lifecycle callbacks `onCreate`/`onUpdate` are invoked without the popper.js `data` argument
- breaking: when portaled, the popper element is wrapped in a `data-floating-ui-portal` element inside the container instead of being appended directly

### Cypress test notes

- floating-ui positions the popup via `useLayoutEffect` (synchronous before paint), so the element is never visually painted at `top:0; left:0`. However, during the React render cycle the DOM briefly contains the popup at its initial position before `useLayoutEffect` fires. Synthetic Cypress events (`cy.trigger('mouseover')`) do not move the real CDP cursor, so they can land on portal children that appear at `top:0` during that window — producing unexpected hover state in nested drilldown menus. Replace `trigger('mouseover')` / `trigger('mouseout')` with `cy.realHover()` (CDP-based) on any test that drives hover-triggered popups: the real cursor is at the element's actual viewport position, so the transient initial render has no effect.
- popper.js applied `transform: translate3d(x, y, 0)` with `will-change: transform`, which happo-cypress serialized as `top:0` (the RAF that committed the transform fired after serialization). floating-ui commits `top: Xpx; left: Ypx` before the browser paints, so happo now captures the popup at its correct position. Expect visual diffs on all Popper-consuming component snapshots: the popup now appears correctly positioned next to its trigger instead of at the top of the page. These are correct, accept them.

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

### Popper

- add a `role` prop for the floating element (defaults to `tooltip`)

### DatePicker

- expose the calendar popup as `role="dialog"` instead of Popper's default `tooltip`

### Select / Autocomplete / Dropdown / Menu

- mark the popup positioning wrapper as `role="presentation"` — the inner listbox/menu owns the popup semantics, so assistive tech no longer announces these popups as tooltips

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Align the `react` and `react-dom` peer-dependency range to a uniform `>=17.0.0 < 19.0.0` across all Picasso packages.
  - previously the base-UI-migrated packages declared an uncapped `react` peer (`>=17.0.0`) while the rest were capped at `< 19.0.0`; this unifies the whole library on one supported range so consumers see a consistent React requirement.
  - react 19 support is intentionally deferred — lifting the `< 19.0.0` cap across all packages, once validated, is tracked in PF-2262.
  - peer-range change only; no runtime or API changes.

### Patch Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Provider

- fix `usePicassoRoot()` returning `null` forever for components rendered during the tree's first render pass: the Picasso root node is now mirrored into React state through the new `PicassoRootNodeContext`, so `usePicassoRoot` consumers re-render and receive the real node once it mounts (`RootContext.rootRef` is kept for backward compatibility)
- `usePicassoRoot()` now returns `undefined` instead of `null` when the root is unavailable, so its result can be passed directly to any Base UI portal `container` (which treats an explicit `null` as "wait for the container" but falls back to `document.body` on `undefined`). Update any strict `=== null` checks on its result to `== null` or a falsy check

### Modal, Drawer, Popper

- fix a Modal, Drawer or Popper that is open on its very first mount never appearing: an unresolved Picasso root was passed as an explicit `null` portal container, which Base UI treats as "wait for the container" (rendering nothing forever). The portal container now degrades to `document.body` when the Picasso root is unavailable, restoring the pre-migration MUI behavior

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Popper

- Surface `PopperPlacementType` from the package entry so consumers can import it instead of redefining the placement union locally. Type-only and additive — no runtime or behavioral change.

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Popper / Dropdown

- restore backwards compatibility with the pre-migration popper.js-based `popperOptions.positionFixed` option: `popperOptions.positionFixed: true` again positions the popper with a `fixed` strategy (relative to the viewport), escaping a clipping/scrolling ancestor (e.g. an `overflow: hidden` container) that the default `absolute` positioning cannot, matching its old popper.js v1 behavior.
- Updated dependencies [[`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5)]:
  - @toptal/picasso-provider@100.0.0
  - @toptal/picasso-utils@100.0.0
  - @toptal/picasso-modal-context@100.0.0
  - @toptal/picasso-shared@100.0.0
  - @toptal/picasso-tailwind@100.0.0
  - @toptal/picasso-tailwind-merge@100.0.0

## 2.0.3

### Patch Changes

- Updated dependencies [[`440f217`](https://github.com/toptal/picasso/commit/440f217c1748d09beeca90e5277d2137d4251897)]:
  - @toptal/picasso-shared@16.0.0
  - @toptal/picasso-utils@4.0.1
  - @toptal/picasso-modal-context@1.0.1

## 2.0.2

### Patch Changes

- Updated dependencies [[`e93f40b`](https://github.com/toptal/picasso/commit/e93f40bf03c4ea943ff9561c2dd032125a05ffc1)]:
  - @toptal/picasso-utils@4.0.0

## 2.0.1

### Patch Changes

- [#4797](https://github.com/toptal/picasso/pull/4797) [`c90ccde`](https://github.com/toptal/picasso/commit/c90ccdefa944fc3576bcccb060bb68119a7807e6) Thanks [@sashuk](https://github.com/sashuk)!
- stop using deprecated way of specifying default component property values (`.defaultProps` will not be supported in the future, please see [this React issue](https://github.com/facebook/react/issues/29233) for details)

## 2.0.0

### Major Changes

- [#4777](https://github.com/toptal/picasso/pull/4777) [`6aae8c6`](https://github.com/toptal/picasso/commit/6aae8c67f2f3c4979df322d30494b0f2958d6ccb) Thanks [@ascrazy](https://github.com/ascrazy)!

### Popper

- migrate to tailwind styling

This affects priority of Popper's default `margin` and `padding` rules. Consumers that are supplying any overrides for these rules might need to increase specificity on their side. e.g. if you are using `<Popper className='mt-4' />`, after the upgrade `mt-4` will not have effect. In order to make it work you'll need to do `<Popper className='[&]:mt-4' />`

## 1.1.0

### Minor Changes

- [#4738](https://github.com/toptal/picasso/pull/4738) [`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447) Thanks [@diogolessa](https://github.com/diogolessa)!
- replace overflow hidden by overflow clip in Popper

### Patch Changes

- Updated dependencies [[`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447)]:
  - @toptal/picasso-utils@3.1.0

## 1.0.5

### Patch Changes

- Updated dependencies [[`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498)]:
  - @toptal/picasso-utils@3.0.0

## 1.0.4

### Patch Changes

- Updated dependencies [[`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d)]:
  - @toptal/picasso-utils@2.0.0

## 1.0.3

### Patch Changes

- Updated dependencies [[`d599529`](https://github.com/toptal/picasso/commit/d599529bcb283c367b63c612fee81394e66c9740)]:
  - @toptal/picasso-shared@15.0.0
  - @toptal/picasso-utils@1.0.3

## 1.0.2

### Patch Changes

- Updated dependencies [[`a1d523092cc4de6cb376156435b99b1e483f39b9`](https://github.com/toptal/picasso/commit/a1d523092cc4de6cb376156435b99b1e483f39b9)]:
  - @toptal/picasso-shared@14.0.1
  - @toptal/picasso-utils@1.0.2

## 1.0.1

### Patch Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages
- Updated dependencies [[`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30)]:
  - @toptal/picasso-shared@14.0.0
  - @toptal/picasso-modal-context@1.0.1
  - @toptal/picasso-utils@1.0.1
