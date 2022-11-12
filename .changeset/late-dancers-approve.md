---
'@toptal/picasso': minor
---

---

### Page.TopBar

- add new variant `grey`
- add `centerContent` prop to display center menu

### Page.TopBar.Menu

- new component for center menu in `TopBar` designed to be used in the new `grey` variant
- allows maximum of 6 menu items
- on mobile the menu can be accessed from the hamburger menu
- example usage:

```jsx
<Page.TopBar.Menu>
  <Page.TopBar.Item icon={<Profile16 />}>Menu item 1</Page.TopBar.Item>
  <Page.TopBar.Item>Menu item 2</Page.TopBar.Item>
</Page.TopBar.Menu>
```
