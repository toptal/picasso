---
'@toptal/picasso-page': major
'@toptal/picasso': major
---

### PageHead

- update `@toptal/picasso-tailwind` to `3.0.0` with the latest `tailwindcss`
  - check new TailwindCSS [features](https://tailwindcss.com/blog/tailwindcss-v3-4)
- remove PageHead compound components
- change API of PageHead
  - add new property `actions`
  - add new property `breadcrumbs`
  - add new property `controls`
  - add new property `title`
  - add new property `titleAdornments`
  - add new property `subtitle`
  - remove property `enableMinHeight` from PageHead.Title, it is supported by default
  - check [Storybook](https://picasso.toptal.net/?path=/story/components-pagehead--pagehead) for examples
