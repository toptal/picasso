---
'@toptal/picasso': patch
---

---

### Typography

- inherits font-weight correctly when taken as italic component.

**Example**

```jsx
<Typography as='strong' weight='semibold'>
  <Typography as='em'>Should be both bold and italic</Typography>
</Typography>
```
