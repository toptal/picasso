---
'@toptal/picasso': minor
---

---

### Page.TopBar

- add new variant `black`
- add `centerContent` prop to display center menu

### TopBar.Menu

- new component for center menu in TopBar designed to be used in new variant `black` of TopBar
- allows maximum of 6 menu items
- on mobile it portals to hamburger menu
- example usage:

```jsx
<Page.TopBar.Menu>
  <Page.TopBar.Item icon={<Profile16 />}>Menu item 1</Page.TopBar.Item>
  <Page.TopBar.Item>Menu item 2</Page.TopBar.Item>
</Page.TopBar.Menu>
```
