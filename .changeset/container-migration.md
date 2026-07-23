---
'@toptal/picasso-container': patch
---

### Container

- drop residual `@material-ui/core` type import (`PropTypes.Alignment`) in favor of an explicit literal union on the `align` prop. Public API and behavior unchanged.
- migrate the props interface to `extends BaseProps`, dropping the vestigial `classes` prop from the public type. The prop was inherited from `StandardProps` but was never read in source and had zero internal / external consumer usage per the cross-tier audit.
