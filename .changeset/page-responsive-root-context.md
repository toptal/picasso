---
'@toptal/picasso-provider': minor
'@toptal/picasso-page': minor
---

### PicassoProvider

- expose the `responsive` flag through `RootContext` / `useAppConfig()` (new optional `responsive` prop on `PicassoGlobalStylesProvider`)

### Page

- read the non-responsive min-width from `useAppConfig()` instead of `PicassoProvider.theme.layout`, and apply it as a static Tailwind class (`min-w-[768px]`) instead of an inline style
- merge the consumer `className` after the `--content-width*` CSS variable defaults, so overrides like `<Page className='[--content-width:80em]'>` win
- in `Page.Content` and `Page.Footer` read their max-width from the `--content-width` / `--content-width-wide` variables (with the previous values as fallbacks) instead of hardcoded values
