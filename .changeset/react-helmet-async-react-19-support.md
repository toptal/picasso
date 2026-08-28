---
'@toptal/picasso-provider': patch
'@toptal/picasso-page': patch
---

### Provider

- upgrade `react-helmet-async` from `2.0.3` to `3.0.0`, the only release whose peer range admits React 19. No 2.x release supports it. The public API is unchanged — `Helmet` remains a class component, and `HelmetProvider`, `HelmetData` and the `HelmetProps` type are still exported — and React 16–18 keeps the existing code path, so behavior is unchanged for current consumers
- on React 19, `<Helmet>` renders real DOM elements for React to hoist and `<HelmetProvider>` becomes a transparent passthrough. This changes four behaviors once consumers move to React 19: the SSR `context` object is no longer populated, and `prioritizeSeoTags`, `helmetData` and `canUseDOM` become inert. `htmlAttributes` and `bodyAttributes` continue to work on both code paths

### Page

- declare `react-helmet-async` as a dependency. `Page.Helmet` imported it without declaring it, so the import resolved to whatever copy the consumer happened to hoist — or to none at all. The dependency is now explicit and pinned to the same version the provider uses, which keeps `Page.Helmet` and `<HelmetProvider>` on one instance
