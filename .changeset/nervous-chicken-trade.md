---
'@toptal/picasso': minor
---

---

### ShowMore

- the `onToggle` callback has a new state as a parameter

```diff
<ShowMore
  onToggle={
-    () => {}
+    (newState) => {}
  }
/>
```
