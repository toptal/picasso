---
'@toptal/picasso': major
---

---

### Sidebar

- Renamed to PageSidebar
- No longer is exported from Picasso, the only way to use it now it's as `Page.Sidebar`
- Now has a collapsible property that allows one to collapse the sidebar on the side


### SidebarItem

- Add an special property `badge` for controlling badges on Menu items, it becomes an overlay when the sidebar is collapsed
- Add tooltips for Menu items when collapsed
- Change sub-menus to a dropdown when in compact mode


### SidebarContext

- Removed direct access to `SidebarContext.Provider` and `SidebarContext.Consumer`. Now you need to use the new component `SidebarContextProvider` and the new hook `useSidebarContext` and their respective places
