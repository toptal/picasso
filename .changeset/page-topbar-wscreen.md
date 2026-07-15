---
'@toptal/picasso-page': major
---

### PageTopBar

- the `Page.TopBar` header always applies `md:w-screen`, keeping the top bar coordinated with the page-width-jump fix that now ships unconditionally in `@toptal/picasso-tailwind/base`. It was previously conditional on the provider's `preventPageWidthChangeOnScrollbar` prop, which is removed. Consumers that opted out of the fix and need the old top-bar width back override via `className` (e.g. `md:w-full`) — consumer `className` is last in the merge, so it wins
