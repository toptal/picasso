---
'@toptal/picasso-tabs': major
---

- migrate to mui/base and TailwindCSS, material-ui@4 is no longer required for this package

- for horizontal tabs

  - we updated the animation of the active tab
  - we don't have scrollable buttons on side, instead we reuse native browser scrolling

- update types

```diff
{
-  value: any
+  value: string | number | null

-  onChange: (event: React.ChangeEvent<{}>, value: any) => void
+  onChange: (event: React.ChangeEvent<{}> | null, value: string | number | null) => null
}
```
