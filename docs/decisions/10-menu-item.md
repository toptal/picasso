# Menu Item

## Problem

Changes in MenuItem can unexpectedly update multiple components. Currently, MenuItem handles too many things. We can see usage in this [diagram](https://miro.com/app/board/uXjVPOOdjH8=/?share_link_id=687084096239).

## Proposal

Instead of creating abstraction of Menu.Item, we would create multiple different components.
1. `Menu.DropdownItem` - current solution used in Dropdown, Page.TopBarMenu. They share the same design.
2. `Menu.SelectItem` - different design and API
3. `Menu.SidebarItem` - instead of overriding lot of styles of Menu.Item, we would create new component

Also `AccountSelect` is used only in [Platform](https://github.com/toptal/platform/blob/c5b4e5a0749ff44a05b724ababad3e1a5edf0506/app/assets/features/platform/role_selection/components/RoleSelectionScreen/index.jsx#L33) and is not part of BASE design, so we should move this component to their repo.

### Benefits

- Instead of one complex component that does everything, we would have multiple very simple ones.
- Updating styles of base Menu.Item would not affect other components with different design.

### Drawbacks and limitations

- Will cause breaking change that would be hard to fix with codemods

## Alternatives

- any suggestions?

## Research data

- Usage [diagram](https://miro.com/app/board/uXjVPOOdjH8=/?share_link_id=687084096239) with screenshots
