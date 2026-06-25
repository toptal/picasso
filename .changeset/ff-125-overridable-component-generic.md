---
'@toptal/picasso-shared': major
'@toptal/picasso': major
'@toptal/picasso-button': major
'@toptal/picasso-link': major
'@toptal/picasso-menu': major
'@toptal/picasso-breadcrumbs': major
'@toptal/picasso-overview-block': major
'@toptal/picasso-page': major
---

### OverridableComponent

- restore generic, inferring typing for the polymorphic `as` prop. The `as` target's props are again type-checked at the call site, so `<Link as={RouterLink} to="/x" />` validates `to` against the target component (FF-125). This reverts the permissive `P & { [key: string]: any }` shape introduced for the TypeScript 5.5 upgrade.
- add the `overridableForwardRef` helper, used internally by components whose props have required fields (`Page.Article`, `Breadcrumbs.Item`, `OverviewBlock`), which TypeScript 5.5 will not assign to the generic call signature directly.

This is a type-level breaking change for every polymorphic component (`Link`, `Button`, `Button.Group`/`Button.Action`/`Button.Circular`, `Menu.Item`, `Breadcrumbs.Item`, `OverviewBlock`, `Page.Article`, `Page.SidebarItem`, `Page.TopBarItem`). Undeclared props that the permissive shape silently accepted as `any` are now type-checked: a prop that exists on neither the component nor the `as` target is a type error. Consumers may need to remove stray props or correct the props passed to the `as` target. There is no runtime change.

Known limitation: when `as` is a string intrinsic (e.g. `as="a"`), TypeScript widens the inferred type and does not strictly check that branch's attributes. Component `as` targets (e.g. `as={RouterLink}`) are fully type-checked.
