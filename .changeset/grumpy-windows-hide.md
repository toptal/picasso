---
'@toptal/picasso-query-builder': major
---

- remove padding dependency on `hideControls` property
  Padding on the Query Builder was tied to the `hideControls` property,
  we changed it in such a way that now you can set the desired padding size.
  By default, the padding will be SPACING_6.
  In those places where there should be no padding on Query Builder we should provide padded property set to SPACING_0.
- add `padded` property to define padded layout
- mark `hideControls` property as deprecated
