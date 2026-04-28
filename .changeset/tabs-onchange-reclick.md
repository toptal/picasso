---
'@toptal/picasso-tabs': patch
'@toptal/picasso': patch
---

- fix `Tabs.Tab` `onClick` not firing on click. The handler was silently dropped after the migration to `@mui/base/Tabs` in `@toptal/picasso-tabs@6.0.0` because `@mui/base/Tab` destructures `onClick` out of its props. It is now wired through `slotProps.root.onClick` and fires on every click, including re-clicks of the already-selected tab. Consumers that need to react to re-clicks should use `Tab.onClick` (`Tabs.onChange` continues to fire only on actual value changes, matching MUI base).
