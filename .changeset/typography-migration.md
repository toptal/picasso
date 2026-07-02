---
'@toptal/picasso-typography': major
---

### Typography
- Drop `@material-ui/core` peer dependency; widen React peer range to `>=16.12.0`.
- Remove vestigial `classes` prop from the public type via `Omit<StandardProps, 'classes'>`; runtime backstop discards any inherited value. Behavioral parity verified by snapshot + unit tests; public API unchanged for real consumers (audit-verified: 0 internal, 0 external usages).
