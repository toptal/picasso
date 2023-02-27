---
'@toptal/picasso': minor
---

---

### ShowMore

- add a new state as a parameter to `onToggle` callback

```diff
<ShowMore
  onToggle={
-    () => {}
+    (newState) => {}
  }
/>
```
