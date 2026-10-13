---
'@toptal/picasso-provider': minor
'@toptal/picasso-page': patch
'@toptal/picasso-notification': patch
'@toptal/picasso-shared': major
'@toptal/picasso': major
---

### Provider

- upgrade `react-helmet-async` from `2.0.3` to `3.0.0`, the only release that admits React 19. The API and the React 17 and 18 behavior are unchanged
- on React 19, `<Helmet>` renders elements for React to hoist and `<HelmetProvider>` is a passthrough: the SSR `context` stays empty, `prioritizeSeoTags`, `helmetData` and `canUseDOM` do nothing, helmets rendered directly don't merge (a parent's `titleTemplate` or `defaultTitle` doesn't apply, duplicate `<title>` and `<meta>` tags stay, `onChangeClientState` doesn't fire), and a `<script>` child without `async` doesn't run. `htmlAttributes` and `bodyAttributes` keep working
- export `Helmet` and `HelmetProps` from the `react-helmet-async` copy behind the provider's `<HelmetProvider>`, so a helmet rendered through them always finds it
- mount the favicon `<link>` tags once their URLs resolve, so React 19 hoists them into `<head>`

### Page

- render `Page.Helmet` through the provider's `Helmet` instead of an undeclared `react-helmet-async` import, which could resolve to another copy and throw on React 17 and 18
- on React 19, `Page.Helmet` keeps merging titles: the innermost `title`, formatted with the innermost `titleTemplate`, or else the innermost `defaultTitle`, with the innermost helmet's title attributes. Other head tags don't merge, and the title is set after mount, so a server render gets no `<title>` from it

### Notification

- upgrade `notistack` from `3.0.1` to `3.0.2`, the first release that admits React 19. It ships no code changes
- **consumer action** for `@toptal/picasso` and `@toptal/picasso-shared`: move to `notistack@3.0.2`, an exact peer that keeps a single notistack instance
