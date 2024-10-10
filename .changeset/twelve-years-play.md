---
'@toptal/picasso-utils': major
'@toptal/picasso': major
---

### useOnScreen

- change return value of the hook to let component know when the oberver starts observing

```diff
-const isOnScreen = useOnScreen({...})
+const { isOnScreen, isObserved } = useOnScreen({...})
```
