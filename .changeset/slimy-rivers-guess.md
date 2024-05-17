---
'@toptal/picasso-modal': major
'@toptal/picasso': major
---

### Modal

- as we don't use Paper from material ui anymore, we have to change
  `paperProps` to `HTMLDivAttributes`.
- it should not affect our users as
  from the research we found out that it is used mainly to set aria attributes, change the role attribute, or customize styles.
  Still, technically it is breaking change.
