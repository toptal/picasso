---
'@toptal/picasso-query-builder': major
---

- remove `totalCount` and `totalCountLoading` props from Query Builder. Add `runQueryButtonContent` prop to Query Builder.
  In order to allow consumers to add the desired functionality for the Run Query button, we added `runQueryButtonContent` prop.
  `totalCount` and `totalCountLoading` are properties that should not be defined at the library level.
  Instead they will be implemented in the consumer.
- remove deprecation of `hideControls` propery.
