# Change Log

## 100.0.0

### Major Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Decommission the MUI v4 runtime and remove the `@material-ui/core` peer dependency.

  `@toptal/picasso-provider` no longer ships an MUI theme runtime, and `@toptal/picasso` no longer requires `@material-ui/core` as a peer dependency.

  Breaking changes (consumer action required):

  - a `PicassoProvider` and its `.override()`, `.extendTheme()`, and `.disableResponsiveStyle()` methods are removed. There is no runtime MUI theme — override component styling with Tailwind `className`/`data-*` variants instead of `PicassoProvider.override()`.
  - the `theme`, `injectFirst`, and `disableClassNamePrefix` props are removed from `<Picasso>` and `<PicassoLight>` (they only configured the MUI theme and JSS style injection, both gone). To customize the page content width — previously reachable through the `theme` prop — set it on `<Page>` via a CSS-variable class (e.g. `<Page className="[--content-width:80em]">`) instead of the `theme` prop.
  - the theme's `layout.contentMinWidth` field is removed (the `Layout` config type no longer declares it). It was the only theme value `<Page>` read at runtime — the non-responsive minimum page width — and `<Page>` now derives that from the `responsive` prop (`<Picasso responsive={false}>` applies a static `min-w-[768px]`), so there is no replacement to set.
  - `getServersideStylesheets` is removed. Tailwind extracts CSS at build time, so JSS server-side stylesheet collection is obsolete — drop it from SSR setup.
  - a `@material-ui/core` is no longer a peer dependency of `@toptal/picasso`, and `@material-ui/core` / `@material-ui/utils` are no longer dependencies of `@toptal/picasso-provider`.
  - the `reset` prop is removed from `<Picasso>` / `<PicassoLight>`, and the provider no longer injects a runtime reset `<style>` (`CssBaseline` is removed). The global reset now ships as CSS — add `@import '@toptal/picasso-tailwind/base';` to the Tailwind entry CSS, after the theme import. Omitting the import replaces `reset={false}`. The reset lives in `@layer base`, so Tailwind utilities and unlayered app CSS win over it by cascade-layer rules.
  - jest snapshots rendered through `TestingPicasso` no longer contain a reset `<style>` element (expect a one-time snapshot regeneration).
  - `makeResponsiveSpacingProps` is removed (org-wide audit: zero external usage; the sole in-repo consumer was Dropdown `offset`). Per-breakpoint responsive spacing now compiles to static Tailwind classes shipped in build-time CSS, so it is correct on SSR first paint. The removed implementation was client-only: server-rendered HTML carried the generated class names and CSS variables but no bridging `@media` rules until hydration — a silent first-paint layout shift for any SSR consumer of responsive spacing objects. With it gone, the "Tailwind extracts CSS at build time" rationale above genuinely covers every stylesheet.
  - the `preventPageWidthChangeOnScrollbar` prop, the `usePreventPageWidthChangeOnScrollbar` hook (zero external consumers), and the runtime `<style>` they controlled are removed — **the provider no longer injects any runtime CSS**. The page-width-jump fix (`html` hides horizontal overflow, `body` spans `100vw`, from 768px up) now ships in `@toptal/picasso-tailwind/base`. Behavior deltas: under `responsive={false}` the fix previously started at 1024px, now always 768px; `<PicassoLight>` consumers importing the base entry gain the fix (PicassoLight never rendered it); `Page.TopBar` applies `md:w-screen` unconditionally to stay coordinated (override via its `className` if needed). Opt-out remedies: apps that need horizontal page scroll (e.g. signal's wide tables) re-disable it with unlayered app CSS — `html { overflow-x: visible }` + `body { width: 100% }` — which wins over `@layer base` by cascade rules, no `!important` needed (existing `!important` overrides like top-assessment's keep working and can drop the `!important`); browser extensions that inject Picasso into third-party pages (sourcing-extension) must not import the base entry into host-page context at all; test wrappers simply delete the prop. Storybook-like environments that render `<Page>` inside a story frame (a transformed ancestor re-contains the fixed TopBar while `md:w-screen`/`100vw` still sizes against the real viewport) additionally need the CSS opt-out plus `header.mui-fixed { width: 100% }` — see Picasso's own `.storybook/styles.css` for the reference override.

  `@toptal/picasso-utils` also drops a vestigial `notistack@1.0.10` peer dependency (unused in its source) — it was the last transitive pull of `@material-ui/core` v4 in the tree. `@toptal/picasso-collapse`, `@toptal/picasso-fade`, and `@toptal/picasso-slide` now declare `@types/react-transition-group` directly (previously resolved transitively through `@material-ui`).

  A `@toptal/picasso-codemod` transform to strip the removed `<Picasso>` props will ship alongside the consumer migration (tracked in PF-1995).

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

### Provider

- fix `usePicassoRoot()` returning `null` forever for components rendered during the tree's first render pass: the Picasso root node is now mirrored into React state through the new `PicassoRootNodeContext`, so `usePicassoRoot` consumers re-render and receive the real node once it mounts (`RootContext.rootRef` is kept for backward compatibility)
- `usePicassoRoot()` now returns `undefined` instead of `null` when the root is unavailable, so its result can be passed directly to any Base UI portal `container` (which treats an explicit `null` as "wait for the container" but falls back to `document.body` on `undefined`). Update any strict `=== null` checks on its result to `== null` or a falsy check

### Modal, Drawer, Popper

- fix a Modal, Drawer or Popper that is open on its very first mount never appearing: an unresolved Picasso root was passed as an explicit `null` portal container, which Base UI treats as "wait for the container" (rendering nothing forever). The portal container now degrades to `document.body` when the Picasso root is unavailable, restoring the pre-migration MUI behavior

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### PicassoProvider

- expose the `responsive` flag through `RootContext` / `useAppConfig()` (new optional `responsive` prop on `PicassoGlobalStylesProvider`)

### Page

- read the non-responsive min-width from `useAppConfig()` instead of `PicassoProvider.theme.layout`, and apply it as a static Tailwind class (`min-w-[768px]`) instead of an inline style
- merge the consumer `className` after the `--content-width*` CSS variable defaults, so overrides like `<Page className='[--content-width:80em]'>` win
- in `Page.Content` and `Page.Footer` read their max-width from the `--content-width` / `--content-width-wide` variables (with the previous values as fallbacks) instead of hardcoded values

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
- add `spacingToPx`, a utility that converts a Picasso spacing (a `PicassoSpacing` token, a numeric rem value, or a string size such as `'medium'`) to a px string. Accepts an optional `baseFontSize` (default `16`) and mirrors the input contract of the existing `spacingToRem`

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Align the `react` and `react-dom` peer-dependency range to a uniform `>=17.0.0 < 19.0.0` across all Picasso packages.
  - previously the base-UI-migrated packages declared an uncapped `react` peer (`>=17.0.0`) while the rest were capped at `< 19.0.0`; this unifies the whole library on one supported range so consumers see a consistent React requirement.
  - react 19 support is intentionally deferred — lifting the `< 19.0.0` cap across all packages, once validated, is tracked in PF-2262.
  - peer-range change only; no runtime or API changes.

## 6.0.0

### Major Changes

- [#4963](https://github.com/toptal/picasso/pull/4963) [`440f217`](https://github.com/toptal/picasso/commit/440f217c1748d09beeca90e5277d2137d4251897) Thanks [@dulishkovych](https://github.com/dulishkovych)!
  [PF-2031] Upgrade TypeScript to v5.5 and align davinci tooling to v25/v15/v19/v8/v3
  **BREAKING:** the `typescript` peer dependency on every published package moves from `~4.7.0` to `^5.5.0`. Consumers must be on TypeScript 5.5 or newer to install these packages. No other consumer code changes should be required — see "Public type surface" below.
  Picasso now builds against TypeScript 5.5 and pulls its lint/test/codegen infrastructure from `@toptal/davinci-syntax@25`, `@toptal/davinci-engine@15`, `@toptal/davinci-qa@19.1`, `@toptal/davinci-ci@8`, and `@toptal/davinci-code@3` (the stable releases of toptal/davinci#2677). Build, typecheck, and lint all pass clean (0 errors).
  Public type surface:
  - the `OverridableComponent<P>` type in `@toptal/picasso-shared` is rewritten as a single-signature interface `(props: P & { [key: string]: any }) => JSX.Element | null`. declared fields of `P` remain strictly typed at JSX call sites (e.g. `<Button size={42} />` still errors), and any other prop is accepted untyped. this preserves the polymorphic `as`-prop usage pattern and lets `forwardRef<R, P>(...)` assign directly without an escape hatch. trade-off versus the pre-PF-2031 shape: TypeScript no longer pulls prop types FROM the `as` target — `<Button as={Link} to={...} />` does not validate `to` against `Link`'s props. full polymorphic-inheritance typing for the `as` prop is tracked in FF-125.
    Internal type adjustments in `Tagselector`, `Container`, `Menu`, `PromptModal`, and `NumberInput` (not publicly exported) resolve build/lint regressions surfaced by `@typescript-eslint` v8. `OverviewBlock`, `Page`, `Breadcrumbs`, `Button`, `ButtonBase`, `ButtonCircular`, `MenuItem`, `Link`, and `SidebarItem` compile cleanly without source changes under the new `OverridableComponent` shape. `ButtonAction` got a one-line internal fix (an `icon` helper returning `null` where `ReactElement | undefined` was declared) that the stricter declared-prop typing in the new shape surfaced.

## 5.0.2

### Patch Changes

- [#4797](https://github.com/toptal/picasso/pull/4797) [`c90ccde`](https://github.com/toptal/picasso/commit/c90ccdefa944fc3576bcccb060bb68119a7807e6) Thanks [@sashuk](https://github.com/sashuk)!
- stop using deprecated way of specifying default component property values (`.defaultProps` will not be supported in the future, please see [this React issue](https://github.com/facebook/react/issues/29233) for details)

## 5.0.1

### Patch Changes

- [#4788](https://github.com/toptal/picasso/pull/4788) [`dae5bce`](https://github.com/toptal/picasso/commit/dae5bce794a5c4f6406449c83a6e425cfcafff0f) Thanks [@sashuk](https://github.com/sashuk)!
- stop using deprecated way of specifying default component property values (`.defaultProps` will not be supported in the future, please see [this React issue](https://github.com/facebook/react/issues/29233) for details)

## 5.0.0

### Major Changes

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- remove custom Picasso overrides, if the overrides are still necessary for compatibility copy them inside your project with caution

## 4.2.1

### Patch Changes

- [#4276](https://github.com/toptal/picasso/pull/4276) [`045081fe7fed880890cb16d5defd7859d1e0b147`](https://github.com/toptal/picasso/commit/045081fe7fed880890cb16d5defd7859d1e0b147) Thanks [@sashuk](https://github.com/sashuk)!

### RadioGroup

- add deprecation notice to sizes

## 4.2.0

### Minor Changes

- [#4200](https://github.com/toptal/picasso/pull/4200) [`4ee1ebdafd9e5830d5ec6007620186d5a61befee`](https://github.com/toptal/picasso/commit/4ee1ebdafd9e5830d5ec6007620186d5a61befee) Thanks [@mkrl](https://github.com/mkrl)!
- migrate Typography to TailwindCSS
  - style overrides for Typography have been moved to picasso-provider
  - added utility classes `font-inherit-weight` and `font-inherit-size` to Picasso Tailwind config

## 4.1.0

### Minor Changes

- [#4163](https://github.com/toptal/picasso/pull/4163) [`bd9c2213733168515dbe1581ba63afb191d667ed`](https://github.com/toptal/picasso/commit/bd9c2213733168515dbe1581ba63afb191d667ed) Thanks [@dmaklygin](https://github.com/dmaklygin)!

### Fonts

- make fonts exportable

## 4.0.0

### Major Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages

## 3.5.1

### Patch Changes

- [#4132](https://github.com/toptal/picasso/pull/4132) [`c76a0d6d0f68e50bb51927d0b6c3ebdd65c60149`](https://github.com/toptal/picasso/commit/c76a0d6d0f68e50bb51927d0b6c3ebdd65c60149) Thanks [@dependabot](https://github.com/apps/dependabot)!
- bump classnames dependency

## 3.5.0

### Minor Changes

- [#4126](https://github.com/toptal/picasso/pull/4126) [`02d69ac79e7dc02bbde3c6a2808793befe67f89c`](https://github.com/toptal/picasso/commit/02d69ac79e7dc02bbde3c6a2808793befe67f89c) Thanks [@augustobmoura](https://github.com/augustobmoura)!

---

### Forms

- enhanced customization in horizontal Form layout: Introducing the `labelWidth` prop for adjusting the width of label columns in horizontal layout forms.

The new `labelWidth` property in the `Form` component significantly increases the flexibility of form design, allowing for more responsive and visually balanced layouts. This property can be set with either a single numeric value (e.g., `2`, `3`, or `4`) for a uniform width across all screen sizes, or an object mapping specific widths to breakpoints (e.g., `{ md: 4, lg: 3, xl: 2 }`).

Example Usage:
Uniform width setting: `<Form layout="horizontal" labelWidth={3}>...</Form>`
Responsive width setting: `<Form layout="horizontal" labelWidth={{ md: 4, lg: 3, xl: 2 }}>...</Form>`

## 3.4.3

### Patch Changes

- [#4083](https://github.com/toptal/picasso/pull/4083) [`147fd703c1b9e70d2446bfb5f41dfaeb16a57381`](https://github.com/toptal/picasso/commit/147fd703c1b9e70d2446bfb5f41dfaeb16a57381) Thanks [@sashuk](https://github.com/sashuk)!
- bump `notistack` version

## 3.4.2

### Patch Changes

- [#4040](https://github.com/toptal/picasso/pull/4040) [`fb57b1f5a`](https://github.com/toptal/picasso/commit/fb57b1f5ab531902ab8fdc3309684e09d4805986) Thanks [@dependabot](https://github.com/apps/dependabot)!
- bump `react-helmet-async`

## 3.4.1

### Patch Changes

- [#3900](https://github.com/toptal/picasso/pull/3900) [`0054a0933`](https://github.com/toptal/picasso/commit/0054a0933fddb53187e8e3361391431760f7e6f0) Thanks [@sashuk](https://github.com/sashuk)!

### Spacing

- make spacing index field public

## 3.4.0

### Minor Changes

- [#3890](https://github.com/toptal/picasso/pull/3890) [`17e25b470`](https://github.com/toptal/picasso/commit/17e25b47007948ee31781d35e94644137707c1c8) Thanks [@sashuk](https://github.com/sashuk)!

### Spacings

- add BASE ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md)) and responsive ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/19-responsive-component-spacing-properties.md)) spacing to Picasso's theme and to `picasso-shared`

## 3.3.1

### Patch Changes

- [#3886](https://github.com/toptal/picasso/pull/3886) [`d070c4df8`](https://github.com/toptal/picasso/commit/d070c4df877e7668c027d0e36a872eed2c9e770d) Thanks [@sashuk](https://github.com/sashuk)!

### Notifications

- fix notifications display when drawer is opened

## 3.3.0

### Minor Changes

- [#3811](https://github.com/toptal/picasso/pull/3811) [`5a729ea53`](https://github.com/toptal/picasso/commit/5a729ea53d83939dae0696afe1db8b6fc315764d) Thanks [@sashuk](https://github.com/sashuk)!
- prevent page width change caused by vertical scrollbar (that appears depending on the page height). The behaviour can be disabled by setting `preventPageWidthChangeOnScrollbar` to `false` in Picasso provider.

## 3.2.0

### Minor Changes

- [#3838](https://github.com/toptal/picasso/pull/3838) [`9a02bbdb4`](https://github.com/toptal/picasso/commit/9a02bbdb4574cbdac26a2f6e9e4cf9de65609695) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### Theme

- set Tooltip's zIndex to be the same as Modal

## 3.1.3

### Patch Changes

- [#3796](https://github.com/toptal/picasso/pull/3796) [`0a00c224b`](https://github.com/toptal/picasso/commit/0a00c224b12958d2cf4adc309d190634b48592c9) Thanks [@mkrl](https://github.com/mkrl)!

### PicassoGlobalStylesProvider

- fixed issue with `PicassoGlobalStylesProvider` setting context value incorrectly, thus causing style mismatch when both sidebar + drawer are used

## 3.1.2

### Patch Changes

- [#3604](https://github.com/toptal/picasso/pull/3604) [`c7e22ccda`](https://github.com/toptal/picasso/commit/c7e22ccda1ebee0f2aa40903e06afa5834e3b696) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- revert Root component render guard to fix rendering on SSR

## 3.1.1

### Patch Changes

- [#3577](https://github.com/toptal/picasso/pull/3577) [`324b067c5`](https://github.com/toptal/picasso/commit/324b067c535122ba332207a4e405ec8f9c2812e5) Thanks [@sashuk](https://github.com/sashuk)!
- breakpoints media queries now cover the 1px gap problem

## 3.1.0

### Minor Changes

- [#3570](https://github.com/toptal/picasso/pull/3570) [`cb4e71886`](https://github.com/toptal/picasso/commit/cb4e718860b7df72064ff5041bfd1775c40ef733) Thanks [@sashuk](https://github.com/sashuk)!
- remove media queries overlap for breakpoint range detection

## 3.0.0

### Major Changes

- [#3552](https://github.com/toptal/picasso/pull/3552) [`87068a468`](https://github.com/toptal/picasso/commit/87068a4680f099185be00863b7ebeada893c0e29) Thanks [@sashuk](https://github.com/sashuk)!

### Breakpoints ([#3535](https://github.com/toptal/picasso/pull/3535))

- in order to comply with BASE design, Picasso breakpoint values were updated, please see the https://github.com/toptal/picasso/blob/master/docs/decisions/13-breakpoints.md for more details. As a consequence, breakpoint ranges were updated as well.

```
Before:
Value         |0px     576px    768px    992px    1920px
Breakpoint    |xs      sm       md       lg       xl
Screen width  |--------|--------|--------|--------|-------->
Range         |   sm   |   md   |   lg   |   xl   |   xl
After:
Value         |0px     480px    768px    1024px   1440px
Breakpoint    |xs      sm       md       lg       xl
Screen width  |--------|--------|--------|--------|-------->
Range         |   xs   |   sm   |   md   |   lg   |   xl
```

**Migration guide**

- `screenSizeToBreakpointKey()` hook now returns the breakpoint range for a specific screen size in a different manner (according to the differences in the breakpoints ranges scheme mentioned above, there is a new breakpoint range `xs`, the smallest one). Please see the examples below:
  - before: `screenSizeToBreakpointKey(300) = 'small'`; now: `screenSizeToBreakpointKey(300) = 'xs'` (because `300px` is between `xs` and `sm` breakpoints)
  - before: `screenSizeToBreakpointKey(2000) = 'extra-large'`; now: `screenSizeToBreakpointKey(2000) = 'xl'` (because `2000px` is bigger than the biggest `xl` breakpoint)
- `isScreenSize()`, `useBreakpoint()`, and `useScreens()` hooks also changed their behavior due to the same changes in breakpoint ranges.

### Grid ([#3538](https://github.com/toptal/picasso/pull/3538))

- in order to comply with BASE design, `Grid` spacing property automatically adjusts to the screen size, unless explicitly specified by consumer. Extra-small and small screens have `16px` spacing, medium screens have `24px` spacing and large and extra-large screens have `32px` spacing. If you want to keep the old behavior, please explicitly set `spacing={32}` for `Grid` components.

**Migration guide**

- grids are expected to work as before, as responsive grid spacing (the space between grid items) does not change the overall layout. However, please manually check how Grids that do not have `spacing` property set explicitly (so, the responsive spacing will be applied by default) look on different screens to ensure that it does not interfere with some custom grid item styling if there is any.

### Grid.Item, Checkbox.Group and Radio.Group ([#3540](https://github.com/toptal/picasso/pull/3540))

- components have replaced `small`, `medium`, and `large` properties with `xs`, `sm`, `md`, `lg`, and `xl` properties to align with updated BASE-compatible breakpoints.

**Migration guide**

For the mentioned components

- replace `small` property with `xs` property. Please note, that old `small` property is not the same as new `sm` property – the `sm` is not a minimal breakpoint range anymore (the `xs` now covers all the screen sizes now), plus `small` breakpoints was `576px` and `sm` is `480px` now;
- replace `medium` property with `md` property;
- replace `large` property with `lg` property. Please note, that old `large` property is not the same as new `lg` property – `large` breakpoint was `992px`, and `lg` is `1024px` now.

## 2.2.0

### Minor Changes

- [#3501](https://github.com/toptal/picasso/pull/3501) [`dd2dc7a28`](https://github.com/toptal/picasso/commit/dd2dc7a28b71e07506a5c5422a3e0df6f4a7b7cd) Thanks [@augustobmoura](https://github.com/augustobmoura)!

---

### PicassoProvider

- add font sizes to Picasso theme

- [#3501](https://github.com/toptal/picasso/pull/3501) [`dd2dc7a28`](https://github.com/toptal/picasso/commit/dd2dc7a28b71e07506a5c5422a3e0df6f4a7b7cd) Thanks [@augustobmoura](https://github.com/augustobmoura)!

---

- basic gradients were added (blue, darker blue, light grey, grey, darker grey); `@toptal/picasso` requires `@toptal/picasso-provider >= 2.2.0`

### Patch Changes

- [#3501](https://github.com/toptal/picasso/pull/3501) [`dd2dc7a28`](https://github.com/toptal/picasso/commit/dd2dc7a28b71e07506a5c5422a3e0df6f4a7b7cd) Thanks [@augustobmoura](https://github.com/augustobmoura)!

---

- memoize class names creator in PicassoLight

- [#3501](https://github.com/toptal/picasso/pull/3501) [`dd2dc7a28`](https://github.com/toptal/picasso/commit/dd2dc7a28b71e07506a5c5422a3e0df6f4a7b7cd) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### PicassoGlobalStylesProvider

- add exception to SSR on Picasso root mounted guard

## 2.1.1

### Patch Changes

- [#3445](https://github.com/toptal/picasso/pull/3445) [`26533bda9`](https://github.com/toptal/picasso/commit/26533bda9b64232a090a3e4560c2f33ebefa49a1) Thanks [@dmaklygin](https://github.com/dmaklygin)! - ---

  - memoize class names creator in Picasso provider

## 2.1.0

### Minor Changes

- [#3235](https://github.com/toptal/picasso/pull/3235) [`7fe506ea`](https://github.com/toptal/picasso/commit/7fe506ea3c0d94b0aa5d009655689a6fdd1f4ea0) Thanks [@tiagoporto](https://github.com/tiagoporto)! - ### NotificationsProvider

  - Add `maxNotifications` prop

## 2.0.1

### Patch Changes

- [#3237](https://github.com/toptal/picasso/pull/3237) [`b820471e`](https://github.com/toptal/picasso/commit/b820471e3091a5c22fe521de0ee85ec4347f58f5) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### PicassoGlobalStylesProvider

  - only render application after Picasso's root element is mounted

## 2.0.0

### Major Changes

- [#3137](https://github.com/toptal/picasso/pull/3137) [`356678e34`](https://github.com/toptal/picasso/commit/356678e341388e60fce5dcfc5cc4b9aa956d2c02) Thanks [@sanex3339](https://github.com/sanex3339)! - ---

  ### PicassoProvider

  **BREAKING CHANGE:**

  - replace usage of `react-helmet` package with `react-helmet-async`
  - add `disableHelmet` prop to disable the usage of `<HelmetProvider>` component from `react-helmet-async` for server environment

## 1.3.1

### Patch Changes

- [#3030](https://github.com/toptal/picasso/pull/3030) [`108a3161`](https://github.com/toptal/picasso/commit/108a31619fef88f64d08912bf6ef00955f5272ea) Thanks [@SergeyKolchenko](https://github.com/SergeyKolchenko)! - ---
  PicassoProvider

  - uses `createTheme` instead of deprecated `createMuiTheme` due to the function was renamed

  ***

  Grid

  - uses the `justifyContent` property instead of deprecated `justify` one

  ***

  Loader

  - uses the `determinate` variant property value instead of deprecated `static` one

  ***

  OutlinedInput

  - uses `minRows` and `maxRows` props instead of deprecated `rows` and `rowsMax` respectively

## 1.3.0

### Minor Changes

- [#3016](https://github.com/toptal/picasso/pull/3016) [`2082a952`](https://github.com/toptal/picasso/commit/2082a952874740fed64c4d698e500192377275ed) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Dependencies

  - update material-ui to latest 4.x.x version

## 1.2.2

### Patch Changes

- [#2959](https://github.com/toptal/picasso/pull/2959) [`984b826a`](https://github.com/toptal/picasso/commit/984b826af8f54835c6914586c338d60c64c741ff) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  - bump `notistack` to `1.0.10`

## 1.2.1

### Patch Changes

- [#2884](https://github.com/toptal/picasso/pull/2884) [`187eb79ab70045243037754d29c9a3da74ac202f`](https://github.com/toptal/picasso/commit/187eb79ab70045243037754d29c9a3da74ac202f) Thanks [@konstrybakov](https://github.com/konstrybakov)! - ---

  ### PicassoLight

  - Added a composable Picasso version. This change may affect direct component imports (the usage of which is not recommended).

  ### FixViewport

  ### PicassoGlobalStylesProvider

  ### PicassoRootNode

  - Extracted to a separate component

  repo: toptal/picasso

## 1.2.0

### Minor Changes

- [#2852](https://github.com/toptal/picasso/pull/2852) [`053e386c`](https://github.com/toptal/picasso/commit/053e386c7268bc34f294adbaa3327470c80947f1) Thanks [@s0ber](https://github.com/s0ber)! - ---

  ### Picasso

  - allow injecting Picasso styles first inside head

## 1.1.4

### Patch Changes

- [#2840](https://github.com/toptal/picasso/pull/2840) [`38e61c28`](https://github.com/toptal/picasso/commit/38e61c286d48d33f7e4e1080d2f0b48747950e67) Thanks [@vvmarulin](https://github.com/vvmarulin)! - Upgrade `notistack` to version `1.0.6`

## 1.1.3

### Patch Changes

- [#2806](https://github.com/toptal/picasso/pull/2806) [`81a56673`](https://github.com/toptal/picasso/commit/81a56673a16f0290564d7205f414efebbfd9f7ce) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---
  - Fix format of peerDependency for `react` and `react-dom`

## 1.1.2

### Patch Changes

- [#2753](https://github.com/toptal/picasso/pull/2753) [`c49d9073`](https://github.com/toptal/picasso/commit/c49d90735837b121c34da9681958a31b9dfcce6a) Thanks [@konstrybakov](https://github.com/konstrybakov)! - SSR compatibility updates

## 1.1.1

### Patch Changes

- [#2715](https://github.com/toptal/picasso/pull/2715) [`a365d67d`](https://github.com/toptal/picasso/commit/a365d67d8d27e2f861a4f7d89e31ef4614e41706) Thanks [@separatio](https://github.com/separatio)! - ---

  - Applied prettier formatting to the whole codebase

## 1.1.0

### Minor Changes

- [#2605](https://github.com/toptal/picasso/pull/2605) [`ec1ab713`](https://github.com/toptal/picasso/commit/ec1ab7130b28cac2ba7ad1080cb0859743cececb) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### React 18

  update peerDependencies to support React@18

## 1.0.0

### Major Changes

- [#2569](https://github.com/toptal/picasso/pull/2569) [`e8833df2`](https://github.com/toptal/picasso/commit/e8833df2329c6285840ae02c0d029fe4eebb8247) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Project

  - Update typescript to version 4.6

## 0.7.1

### Patch Changes

- [#2521](https://github.com/toptal/picasso/pull/2521) [`fc9b34cc`](https://github.com/toptal/picasso/commit/fc9b34ccad04a2e7926a84eb1d710350f1d663d5) Thanks [@deniskaber](https://github.com/deniskaber)! - Change useLayoutEffect to useIsomorphicLayoutEffect for SSR support

## 0.7.0

### Minor Changes

- [#2494](https://github.com/toptal/picasso/pull/2494) [`d82ed00d`](https://github.com/toptal/picasso/commit/d82ed00d8ab94b77654f2b3be4776aa514c44daa) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### PicassoProvider

  - added new purple.main color in palette

## 0.6.1

### Patch Changes

- [#2451](https://github.com/toptal/picasso/pull/2451) [`53efb37c`](https://github.com/toptal/picasso/commit/53efb37cc242cff904a06eb793b5ded47945204e) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  ### Applies to all Components

  - fix linting errors

## 0.6.0

### Minor Changes

- [#2375](https://github.com/toptal/picasso/pull/2375) [`16574dee`](https://github.com/toptal/picasso/commit/16574dee549095cc06deccccdbcfb4c7a073a601) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  ### Common

  - Add new `scroll menu` shadow in `packages/picasso-provider/src/Picasso/config/shadows.ts`

## 0.5.0

### Minor Changes

- [#2304](https://github.com/toptal/picasso/pull/2304) [`6446e620`](https://github.com/toptal/picasso/commit/6446e620808fed2a411fc124821c4cc896add734) Thanks [@yusufzmly](https://github.com/yusufzmly)! - Add isBrowser utils function and Fix NumberInput and Tooltip component for SSR

## 0.4.1

### Patch Changes

- [#2272](https://github.com/toptal/picasso/pull/2272) [`9548a15d`](https://github.com/toptal/picasso/commit/9548a15d541dd4b5505d11e32f0c7557297613e4) Thanks [@konstrybakov](https://github.com/konstrybakov)! - Adding documentation for Server Side Rendering and related utility function `getServersideStylesheets`

## 0.4.0

### Minor Changes

- [#2242](https://github.com/toptal/picasso/pull/2242) [`34e990a3`](https://github.com/toptal/picasso/commit/34e990a3fe6d66bb204d1d468c505ebe0b8fd127) Thanks [@deniskaber](https://github.com/deniskaber)! - Add `disableClassNamePrefix` parameter for PicassoProvider to support Picasso usage in SSR

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso-provider@0.3.0...@toptal/picasso-provider@0.3.1) (2021-11-09)

**Note:** Version bump only for package @toptal/picasso-provider

# [0.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso-provider@0.2.0...@toptal/picasso-provider@0.3.0) (2021-10-14)

### Features

- v12 ([b0a00a0](https://github.com/toptal/picasso/commit/b0a00a0a8d3d92fcd7930a4a0bf0fdc09103ac6c))

### BREAKING CHANGES

- - Stepper - remove fullWidth property

* Link - fontSize changed to 14px, if you are using `Link` inside
  headings or perex, you need to use `size="inherit"` - underline prop was replaced by textDecoration: `'none' | 'underline'`. `'none'` by default.
* Badge - new medium size - previous medium size is now large, - the default value is changed to large - new type of content `content: number` - content higher than or equal to 100 is transformed to 99+ - for small size, the threshold is 10
* ButtonGroup - since button group can have only one style of Button,
  we have Button.Group.Item that should be used
  instead of `<Button variant='secondary' />`
* Tag - users of Tag and Indicator will need to check names of variant

# [0.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-provider@0.1.2...@toptal/picasso-provider@0.2.0) (2021-10-13)

### Features

- **Typography:** update line heights and colors to match BASE 2.0 ([#2184](https://github.com/toptal/picasso/issues/2184)) ([aacd827](https://github.com/toptal/picasso/commit/aacd8271dd6c6ef5093fef78d4a419c48b046db5))

### BREAKING CHANGES

- **Typography:** - Changed line-height of small heading and body

* Removed blue color from Typography
* Removed blue color from OverviewBlock

## [0.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso-provider@0.1.1...@toptal/picasso-provider@0.1.2) (2021-09-16)

### Bug Fixes

- remove material-ui/styles from dependencies ([#2165](https://github.com/toptal/picasso/issues/2165)) ([d403a67](https://github.com/toptal/picasso/commit/d403a67d11338bb2fcb1af09dc9766b235e27236))

## [0.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso-provider@0.1.0...@toptal/picasso-provider@0.1.1) (2021-09-08)

**Note:** Version bump only for package @toptal/picasso-provider

# 0.1.0 (2021-06-25)

### Features

- [FX-1956] Add picasso-provider package ([#2104](https://github.com/toptal/picasso/issues/2104)) ([8a766bd](https://github.com/toptal/picasso/commit/8a766bd174e9662e663819a3d772b757a08cc9b4))

### BREAKING CHANGES

- Picasso root component has been moved to the separate package - `@toptal/picasso-provider`. This should help us in managing multiple different versions of Picasso package (`@toptal/picasso`) for sub-applications, while the main host application would be able to share Picasso Context via the locked version of `@toptal/picasso-provider` package.

To migrate to the new version you need to change

```
import Picasso from '@toptal/picasso'
```

to

```
import Picasso from '@toptal/picasso-provider'
```

in your applications.
