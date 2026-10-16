---
'@toptal/picasso-page': patch
---

### Page

- render `Page.Helmet` through the provider's `Helmet` instead of an undeclared `react-helmet-async` import, which could resolve to another copy and throw on React 17 and 18
- on React 19, `Page.Helmet` keeps merging titles: the innermost `title`, formatted with the innermost `titleTemplate`, or else the innermost `defaultTitle`, with the innermost helmet's title attributes. Other head tags don't merge, and the title is set after mount, so a server render gets no `<title>` from it
