---
'@toptal/picasso-provider': major
'@toptal/picasso': major
'@toptal/picasso-utils': patch
'@toptal/picasso-collapse': patch
'@toptal/picasso-fade': patch
'@toptal/picasso-slide': patch
---

Decommission the MUI v4 runtime and remove the `@material-ui/core` peer dependency.

`@toptal/picasso-provider` no longer ships an MUI theme runtime, and `@toptal/picasso` no longer requires `@material-ui/core` as a peer dependency. Both packages now allow React 19 (the `react`/`react-dom` peer range widens to `>=16.12.0`).

Breaking changes (consumer action required):

- a `PicassoProvider` and its `.override()`, `.extendTheme()`, and `.disableResponsiveStyle()` methods are removed. There is no runtime MUI theme — override component styling with Tailwind `className`/`data-*` variants instead of `PicassoProvider.override()`.
- the `theme`, `injectFirst`, and `disableClassNamePrefix` props are removed from `<Picasso>` and `<PicassoLight>` (they only configured the MUI theme and JSS style injection, both gone). For the one field with a runtime effect — page content width — set it on `<Page>` via a CSS-variable class (e.g. `<Page className="[--content-width:80em]">`) rather than the `theme` prop.
- `getServersideStylesheets` is removed. Tailwind extracts CSS at build time, so JSS server-side stylesheet collection is obsolete — drop it from SSR setup.
- a `@material-ui/core` is no longer a peer dependency of `@toptal/picasso`, and `@material-ui/core` / `@material-ui/utils` are no longer dependencies of `@toptal/picasso-provider`.
- the `reset` prop is removed from `<Picasso>` / `<PicassoLight>`, and the provider no longer injects a runtime reset `<style>` (`CssBaseline` is removed). The global reset now ships as CSS — add `@import '@toptal/picasso-tailwind/base';` to the Tailwind entry CSS, after the theme import. Omitting the import replaces `reset={false}`. The reset lives in `@layer base`, so Tailwind utilities and unlayered app CSS win over it by cascade-layer rules.
- jest snapshots rendered through `TestingPicasso` no longer contain a reset `<style>` element (expect a one-time snapshot regeneration).
- `makeResponsiveSpacingProps` is removed (org-wide audit: zero external usage; the sole in-repo consumer was Dropdown `offset`). Per-breakpoint responsive spacing now compiles to static Tailwind classes shipped in build-time CSS, so it is correct on SSR first paint. The removed implementation was client-only: server-rendered HTML carried the generated class names and CSS variables but no bridging `@media` rules until hydration — a silent first-paint layout shift for any SSR consumer of responsive spacing objects. With it gone, the "Tailwind extracts CSS at build time" rationale above genuinely covers every stylesheet.
- the `preventPageWidthChangeOnScrollbar` prop, the `usePreventPageWidthChangeOnScrollbar` hook (zero external consumers), and the runtime `<style>` they controlled are removed — **the provider no longer injects any runtime CSS**. The page-width-jump fix (`html` hides horizontal overflow, `body` spans `100vw`, from 768px up) now ships in `@toptal/picasso-tailwind/base`. Behavior deltas: under `responsive={false}` the fix previously started at 1024px, now always 768px; `<PicassoLight>` consumers importing the base entry gain the fix (PicassoLight never rendered it); `Page.TopBar` applies `md:w-screen` unconditionally to stay coordinated (override via its `className` if needed). Opt-out remedies: apps that need horizontal page scroll (e.g. signal's wide tables) re-disable it with unlayered app CSS — `html { overflow-x: visible }` + `body { width: 100% }` — which wins over `@layer base` by cascade rules, no `!important` needed (existing `!important` overrides like top-assessment's keep working and can drop the `!important`); browser extensions that inject Picasso into third-party pages (sourcing-extension) must not import the base entry into host-page context at all; test wrappers simply delete the prop. Storybook-like environments that render `<Page>` inside a story frame (a transformed ancestor re-contains the fixed TopBar while `md:w-screen`/`100vw` still sizes against the real viewport) additionally need the CSS opt-out plus `header.mui-fixed { width: 100% }` — see Picasso's own `.storybook/styles.css` for the reference override.

`@toptal/picasso-utils` also drops a vestigial `notistack@1.0.10` peer dependency (unused in its source) — it was the last transitive pull of `@material-ui/core` v4 in the tree. `@toptal/picasso-collapse`, `@toptal/picasso-fade`, and `@toptal/picasso-slide` now declare `@types/react-transition-group` directly (previously resolved transitively through `@material-ui`).

A `@toptal/picasso-codemod` transform to strip the removed `<Picasso>` props will ship alongside the consumer migration (tracked in PF-1995).
