---
'@toptal/picasso': minor
---

---

### useBoolean

- add new reusable hook `useBoolean`

```diff
const Component = () => {
-  const [isOpened, setOpen] = useState(false)
-
-  const handleOpen = () => setOpen(true)
-  const handleClose = () => setOpen(false)
-  const handleToggle = () => setOpen(value => !value)

+ const [isOpened, handleOpen, handleClose, handleToggle] = useBoolean()
}
```

```diff
const Component = () => {
-  const [isCollapsed, setCollapsed] = useState(true)
-
-  const handleToggle = () => setCollapsed(value => !value)

+ const [isCollapsed, , , handleToggle] = useBoolean(true)
}
```
