---
'@toptal/picasso-provider': minor
---

### Provider

- upgrade `react-helmet-async` from `2.0.3` to `3.0.0`, the only release that admits React 19. Its API is unchanged
- **consumer action**: an app that renders `<Helmet>` from its own `react-helmet-async` 2.x shared one copy with the provider's `2.0.3`. Now it gets a second copy, whose `<Helmet>` can't find the provider and throws. Import `Helmet` and `HelmetProps` from `@toptal/picasso-provider` instead
- export `Helmet` and `HelmetProps` from the `react-helmet-async` copy behind the provider's `<HelmetProvider>`, so a helmet rendered through them finds it, even when the app installs another `react-helmet-async` version of its own
- **consumer action**: an app that renders its own `<HelmetProvider>`, with `<Picasso disableHelmet>` or `PicassoLight`, pins `react-helmet-async` to exactly `3.0.0`. `FixViewport`, `Favicon` and `Page.Helmet` render the provider's copy, which only finds a `<HelmetProvider>` from that same copy
- on React 19, `<Helmet>` renders elements for React to hoist and `<HelmetProvider>` is a passthrough: the SSR `context` stays empty, `prioritizeSeoTags`, `helmetData` and `canUseDOM` do nothing, helmets rendered directly don't merge (a parent's `titleTemplate` or `defaultTitle` doesn't apply, duplicate `<title>` and `<meta>` tags stay, `onChangeClientState` doesn't fire), and a `<script>` child without `async` doesn't run. `htmlAttributes` and `bodyAttributes` keep working
- mount the favicon `<link>` tags once their URLs resolve, so React 19 hoists them into `<head>`
