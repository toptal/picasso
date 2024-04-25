---
'@toptal/picasso-query-builder': major
---

- remove `totalCount` and `totalCountLoading` props from Query Builder. Add `runQueryChildren` prop to Query Builder.
  In order for users to add the desired functionality for the Run Query button, we added `runQueryChildren` prop.
  `totalCount` and `totalCountLoading` are properties that should not be defined at the library level.
  Instead they will be implemented in the consumer.
- remove deprecation of `hideControls` propery.
