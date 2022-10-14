# Menu Item

## Problem

Changes in MenuItem can unexpectedly update multiple components. Currently, MenuItem handles too many things. We can see usage in this [diagram](https://miro.com/app/board/uXjVPOOdjH8=/).

## Proposal

Instead of creating abstraction of Menu.Item, we would create 3 different components.
1. `Menu.Item` - current solution used in Dropdown, Select, Autocomplete, Page.TopBarMenu. They share the same design.
2. `Menu.SidebarItem` - instead of overriding lot of styles of Menu.Item, we would create new component
3. `Menu.AccountItem` - instead of overriding lot of styles of Menu.Item, we would create new component

### Benefits

- Instead of one complex component, we would have three very simple.
- Updating styles of base Menu.Item would not affect other components with different design.
- Should be possible to be done without any breaking change

### Drawbacks and limitations

- I don't see any right now

## Alternatives

- any suggestions?

## Research data

- Usage [diagram](https://miro.com/app/board/uXjVPOOdjH8=/) with screenshots
