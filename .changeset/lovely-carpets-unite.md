---
'@toptal/picasso-tabs': major
---

- migrate to mui/base and TailwindCSS, material-ui@4 is no longer required for this package.

- for horizontal tabs:

  - updated the animation of the active tab.
  - removed scrollable buttons on the sides, now using native browser scrolling.

- type updates:
  - core: `Tabs` and `Tab` are now generic components. If you want to use a custom value type (e.g., enum or string literal), specify the generic explicitly:

```tsx
<Tabs<MyType> value={myValue} onChange={...}>
  <Tab value={...} label="..." />
</Tabs>
```

- if the generic is not specified, `number` (tab index) is used by default.
- the value type is inferred automatically; it is not limited to `string | number | null`.
- if you don't specify a value for Tab, it will be assigned automatically by index.
