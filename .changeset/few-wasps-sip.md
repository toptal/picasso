---
'@toptal/picasso': major
---

---

### Page.SidebarItem

- add the new prop `tag` to display a new feature in the sidebar

```jsx
<Page.Sidebar.Item tag='New'>Label</Page.Sidebar.Item>
<Page.Sidebar.Item tag={{ content: 'New', ...otherTagProps }}>Label</Page.Sidebar.Item>
```

- update `badge` prop to also support `number` as it is the most common way of the usage
- the badge is now aligned to the right

```jsx
<Page.Sidebar.Item badge={5}>Label</Page.Sidebar.Item>
```

#### BREAKING CHANGES
- sidebar item with a submenu (parent)
  - will not display a `badge` or `tag` (**BREAKING CHANGE**)
  - will display an indicator when any hidden child item has a `badge` or `tag`
- submenu items will no longer display an icon (**BREAKING CHANGE**)

