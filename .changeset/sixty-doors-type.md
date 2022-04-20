---
'@toptal/picasso': patch
---

---
### Badge

- Use MUI `max` property instead of our custom.
  When we sended `string` (+9999) to MUIBadge,
  it worked as we expected, but when we passed `number` (150),
  it was always trimmed by default mui `max` +99
