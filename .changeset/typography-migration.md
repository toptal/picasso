---
'@toptal/picasso-typography': major
---

### Typography

- drop `@material-ui/core` peer dependency.
- remove vestigial `classes` prop from the public type via `Omit<StandardProps, 'classes'>`; runtime backstop discards any inherited value. Behavioral parity verified by snapshot + unit tests; public API unchanged for real consumers (audit-verified: 0 internal, 0 external usages).
