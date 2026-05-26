---
'@toptal/picasso-container': patch
---

### Container

Duplicate of `container-migration.md` (orchestrator expected that filename). Safe to delete during release cleanup — version coalesces to a single patch bump and the CHANGELOG entry below is the same.

- Drop residual `@material-ui/core` type import (`PropTypes.Alignment`) in favor of an explicit literal union on the `align` prop. Public API and behavior unchanged.
- Drop vestigial `classes` prop from the public type via `Omit<StandardProps, 'classes'>`. The prop was inherited from `StandardProps` but was never read in source and had zero internal / external consumer usage per the cross-tier audit; runtime destructure backstop preserves the no-op behavior for any legacy passthrough.
- Lift `react` peer cap to `>=16.12.0` so the package is compatible with React 19.
