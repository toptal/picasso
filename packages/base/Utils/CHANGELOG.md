# @toptal/picasso-utils

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

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Utils

- Add `isPointerModality`, `subscribePointerModality` and
  `unsubscribePointerModality` — a shared, ref-counted input-modality tracker
  (window-capture `keydown`/`pointerdown` listeners) for telling
  pointer-initiated focus from keyboard-initiated focus in environments where
  `:focus-visible` cannot. First consumer: Tooltip's pointer-focus open
  suppression. [PF-2253]

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Utils

- add the spacing-class resolver — `getSpacingClasses`, `getSpacingStyles`, `getMappedClass`, `getResponsiveClasses` over a static, mobile-first Tailwind class table — moved unchanged from `@toptal/picasso-container` internals so Container spacing props and Dropdown `offset` share one implementation

### Patch Changes

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

### Utils

- re-implement off `@material-ui/core`; public API unchanged (behavioral parity).
- `capitalize` is now a local implementation (identical output to MUI's, including the throw on non-string input).
- the `ClickAwayListener` is now a local Picasso component (same `onClickAway` / `mouseEvent` / `touchEvent` / `disableReactTree` surface).
- the `Rotate180` transition migrated from JSS to Tailwind (`transition-transform duration-150 ease-in-out` + `rotate-180`); animation timing/curve unchanged.
- drop `@material-ui/core` peer dependency.
- Updated dependencies [[`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5)]:
  - @toptal/picasso-provider@100.0.0
  - @toptal/picasso-shared@100.0.0
  - @toptal/picasso-tailwind-merge@100.0.0

## 4.0.1

### Patch Changes

- Updated dependencies [[`440f217`](https://github.com/toptal/picasso/commit/440f217c1748d09beeca90e5277d2137d4251897)]:
  - @toptal/picasso-shared@16.0.0

## 4.0.0

### Major Changes

- [#4898](https://github.com/toptal/picasso/pull/4898) [`e93f40b`](https://github.com/toptal/picasso/commit/e93f40bf03c4ea943ff9561c2dd032125a05ffc1) Thanks [@javier-delgado](https://github.com/javier-delgado)!
  Upgraded Tailwind CSS from v3 to v4:
  - updated `tailwindcss` peer dependency from `^3.4.10` to `^4.2.1`
  - updated deprecated utility classes
  - min node version is 20 or higher

## 3.1.0

### Minor Changes

- [#4738](https://github.com/toptal/picasso/pull/4738) [`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447) Thanks [@diogolessa](https://github.com/diogolessa)!
- replace overflow hidden by overflow clip in Popper

## 3.0.0

### Major Changes

- [#4572](https://github.com/toptal/picasso/pull/4572) [`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### useOnScreen

- change return value of the hook to let component know when the oberver starts observing

```diff
-const isOnScreen = useOnScreen({...})
+const { isOnScreen, isObserved } = useOnScreen({...})
```

## 2.0.0

### Major Changes

- [#4527](https://github.com/toptal/picasso/pull/4527) [`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Utils

- remove the export of "Maybe" type from the Utils package
- the type can be defined directly in your project or imported from private package `@topkit/gql-base-types` if you have access

## 1.0.3

### Patch Changes

- Updated dependencies [[`d599529`](https://github.com/toptal/picasso/commit/d599529bcb283c367b63c612fee81394e66c9740)]:
  - @toptal/picasso-shared@15.0.0

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
