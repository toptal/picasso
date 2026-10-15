---
'@toptal/picasso-notification': patch
---

### Notification

- the icon container resolves its `min-w` with `twMerge` instead of stylesheet order. No visual change
- replace the root's `shadow-[none]` with `shadow-none`, which resolves against the `elevated` variant's `shadow-3`. A non-elevated notification stays shadowless
