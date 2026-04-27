---
'@toptal/picasso-tabs': patch
'@toptal/picasso': patch
---

- fix `Tabs` `onChange` not firing when re-clicking the already-selected tab. Restores the MUI v4 behavior that was lost during the migration to `@mui/base/Tabs` in `@toptal/picasso-tabs@6.0.0`, so consumers relying on side-effects in `onChange` (e.g. scroll-to-section) work again.
