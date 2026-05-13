---
'@toptal/picasso-badge': major
---

### Badge

- Replace the `@mui/base/Badge` wrapper with a plain `<span>` composition (no `@base-ui/react` equivalent — Picasso was already mostly custom; see docs/migration/decisions/badge-strategy in migration plan v3 §9.9)
- Lift React peer-dependency cap (drop `< 19.0.0`)
