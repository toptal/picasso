# @toptal/picasso-collapse

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
- Updated dependencies [[`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5)]:
  - @toptal/picasso-utils@100.0.0
  - @toptal/picasso-tailwind@100.0.0
  - @toptal/picasso-tailwind-merge@100.0.0

## 3.0.5

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-utils@4.0.1

## 3.0.4

### Patch Changes

- Updated dependencies [[`e93f40b`](https://github.com/toptal/picasso/commit/e93f40bf03c4ea943ff9561c2dd032125a05ffc1)]:
  - @toptal/picasso-utils@4.0.0

## 3.0.3

### Patch Changes

- Updated dependencies [[`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447)]:
  - @toptal/picasso-utils@3.1.0

## 3.0.2

### Patch Changes

- Updated dependencies [[`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498)]:
  - @toptal/picasso-utils@3.0.0

## 3.0.1

### Patch Changes

- Updated dependencies [[`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d)]:
  - @toptal/picasso-utils@2.0.0

## 3.0.0

### Major Changes

- [#4500](https://github.com/toptal/picasso/pull/4500) [`3ed8c02`](https://github.com/toptal/picasso/commit/3ed8c0271982a82dd9cdc6b967c63656afd3654f) Thanks [@ruslan-sed](https://github.com/ruslan-sed)!
- update version of `@toptal/picasso-tailwind-merge` peer dependency

## 2.0.1

### Patch Changes

- [#4434](https://github.com/toptal/picasso/pull/4434) [`5580ada`](https://github.com/toptal/picasso/commit/5580ada3feac0767aac160853047f71da32d0212) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- set height auto after the open transition is finished

## 2.0.0

### Major Changes

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- add @toptal/picasso-tailwind-merge as peer dependency, it now needs to be provided by the project consuming the package

### Patch Changes

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- change the type of children prop from React.ReactElement to ReactNode

## 1.0.4

### Patch Changes

- [#4320](https://github.com/toptal/picasso/pull/4320) [`75540be4ee8bd57c4da93ae725782c39c7cf85b2`](https://github.com/toptal/picasso/commit/75540be4ee8bd57c4da93ae725782c39c7cf85b2) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Collapse

- wrap content into additional layer to stretch the content as in legacy implementation

## 1.0.3

### Patch Changes

- [#4308](https://github.com/toptal/picasso/pull/4308) [`81ba64e3ee6206aa7119fa2069ca685228567746`](https://github.com/toptal/picasso/commit/81ba64e3ee6206aa7119fa2069ca685228567746) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- make wider range for `@toptal/picasso-tailwind` peer dependency

## 1.0.2

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-utils@1.0.3

## 1.0.1

### Patch Changes

- [#4286](https://github.com/toptal/picasso/pull/4286) [`fac5181f3f4aea8d18a697d72bebebb7200376ea`](https://github.com/toptal/picasso/commit/fac5181f3f4aea8d18a697d72bebebb7200376ea) Thanks [@mkrl](https://github.com/mkrl)!

### Collapse

- added a `Collapse` transition component
