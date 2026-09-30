---
'@toptal/picasso-provider': minor
'@toptal/picasso-page': patch
---

### Provider

- upgrade `react-helmet-async` from `2.0.3` to `3.0.0`, the only release whose peer range admits React 19. No 2.x release supports it. The public API is unchanged — `Helmet` remains a class component, and `HelmetProvider`, `HelmetData` and the `HelmetProps` type are still exported — and React 16–18 keeps the existing code path, so behavior is unchanged for current consumers
- on React 19, `<Helmet>` renders real DOM elements for React to hoist and `<HelmetProvider>` becomes a transparent passthrough. This changes these behaviors once consumers move to React 19: the SSR `context` object is no longer populated; `prioritizeSeoTags`, `helmetData` and `canUseDOM` become inert; helmets no longer merge, so a parent's `titleTemplate` or `defaultTitle` no longer applies to a nested helmet, duplicate `<title>` and `<meta>` tags stay, and `onChangeClientState` no longer fires; and a `<script>` child without `async` is rendered in place and does not run. `htmlAttributes` and `bodyAttributes` continue to work on both code paths
- export `Helmet` and the `HelmetProps` type from the `react-helmet-async` copy that renders the provider's `<HelmetProvider>`, so a helmet rendered through them always finds that provider, even when the app installs another `react-helmet-async` version of its own

### Page

- render `Page.Helmet` through the `Helmet` that `@toptal/picasso-provider` exports instead of importing `react-helmet-async` itself. The import was never declared, so it resolved to whatever copy the consumer happened to hoist — or to none at all — and a copy other than the provider's threw on React 17 and 18. `Page.Helmet` now always shares the provider's instance
