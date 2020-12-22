# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.0.0 (2020-12-22)


### Features

* v5 ([#1487](https://github.com/toptal/picasso/issues/1487)) ([ee77cde](https://github.com/toptal/picasso/commit/ee77cde12f8f7670f50958ae3973327eb513d9f9)), closes [#1500](https://github.com/toptal/picasso/issues/1500) [#f3f4f6](https://github.com/toptal/picasso/issues/f3f4f6) [#e5e7](https://github.com/toptal/picasso/issues/e5e7) [#d8d9](https://github.com/toptal/picasso/issues/d8d9) [#1670](https://github.com/toptal/picasso/issues/1670) [#1686](https://github.com/toptal/picasso/issues/1686) [#1700](https://github.com/toptal/picasso/issues/1700) [#1688](https://github.com/toptal/picasso/issues/1688) [#1695](https://github.com/toptal/picasso/issues/1695) [#1691](https://github.com/toptal/picasso/issues/1691) [#1682](https://github.com/toptal/picasso/issues/1682) [#1705](https://github.com/toptal/picasso/issues/1705) [#1715](https://github.com/toptal/picasso/issues/1715) [#1721](https://github.com/toptal/picasso/issues/1721) [#1731](https://github.com/toptal/picasso/issues/1731) [#1741](https://github.com/toptal/picasso/issues/1741) [#1738](https://github.com/toptal/picasso/issues/1738) [#1745](https://github.com/toptal/picasso/issues/1745) [#1739](https://github.com/toptal/picasso/issues/1739) [#1751](https://github.com/toptal/picasso/issues/1751) [#1749](https://github.com/toptal/picasso/issues/1749) [#1736](https://github.com/toptal/picasso/issues/1736) [#1747](https://github.com/toptal/picasso/issues/1747) [#1762](https://github.com/toptal/picasso/issues/1762) [#1768](https://github.com/toptal/picasso/issues/1768) [#1758](https://github.com/toptal/picasso/issues/1758) [#1771](https://github.com/toptal/picasso/issues/1771) [#1774](https://github.com/toptal/picasso/issues/1774) [#1773](https://github.com/toptal/picasso/issues/1773) [#1775](https://github.com/toptal/picasso/issues/1775) [#1783](https://github.com/toptal/picasso/issues/1783) [#1781](https://github.com/toptal/picasso/issues/1781) [#1792](https://github.com/toptal/picasso/issues/1792) [#1796](https://github.com/toptal/picasso/issues/1796)


### BREAKING CHANGES

* - Page.Header: set the default Page.Header variant to dark. If you need a `light` variant - set `variant='light'`.

* feat(Select): refactor highlighting and add option description

- Select: fixed issue with multiple highlighted options
- Autocomplete: add option description
- Autocomplete: add checkmark for selected options
- Select: add option description
- Select: add checkmark for selected options
* - `useModals` is removed, instead use `useModal`
- `showPrompt` is removed, instead use `showModal` in combination with `PromptModal`
- `useModal` expect you to add `Modal` or `PromptModal` in your component in explicit way
- for mutliple modals create declare multiple hooks, one per Modal

```
import { useModal } from '@toptal/picasso/utils'

...

const {showModal, hideModal, isOpen } = useModal()

...

const handleClick = () => showModal()

...

<Modal open={isOpen} onClose={hideModal} />
```

* feat(Helpbox):  align with BASE 2.0 design

- Container: added `rounded` property - `8px`
- Helpbox: modified internal padding - set to `medium`
- Helpbox: added rounded corners

* feat(PageHeader): align with BASE 2.0 design

- Page.Header: decreased height
- Select: changed the color of the selected option to black

* feat(Notification): align with BASE 2.0 design

- Notification: adjusted style to match BASE 2.0 design (added border radius, margin and shadows)

* feat(Tooltip): prevent tooltip overflow by default
* - Tooltip: `preventOverflow` property of Tooltip component changed default value from false to true

* feat(Sidebar): align with BASE 2.0 design

- Sidebar: make the width narrower
- Sidebar: change background color to grey lighter

* feat(Subheader): align with BASE 2.0 design

- Subheader.Breadcrumbs: not part of Subheader anymore and Breadcrumbs decided to make as a separate component in scope of picasso-lab

```
import { Breadcrumbs } from '@toptal/picasso-lab'
```

* feat(Button): align with BASE 2.0 design
* - Button: variants have been changed and circular is extracted to separate component. Here is migration path:

Button variants:
* `primary-blue` -> `primary` (default value)
* `primary-red` -> `negative`
* `primary-green` -> `positive`
* `secondary-blue, secondary-red, secondary-green` -> `secondary`
* `flat` -> `secondary`
* `flat-white` -> `transparent`
* `secondary-white` -> `transparent`

- Button: `<Button circular />` was replaced with `<Button.Circular />` with dedicated variants only for circular button: `primary, flat and transparent`

* feat(Modal): align with BASE 2.0 design, no close on backdrop click

- Modal: added rounded corners
- Modal: changed a style of the close button
* - Modal: `disableBackdropClick` prop was removed. `disableBackdropClick` is set by default now and can't be modified

* feat(NumberInput): [FX-1089] Change NumberInput icons

- NumberInput: changed icons to `ArrowUpMinor16` and `ArrowDownMinor16`

* feat(OverviewBlock): align with BASE 2.0 design

- OverviewBlock: changed background color to white
- OverviewBlock: changed paddings, added vertical separators
- OverviewBlock: added `OverviewBlock.Row` component to support multiple-line layout for blocks
- OverviewBlock.Group: added `align` and `blockWidth` props

* feat(Notification): changed default variant, fixed exported type
* - Notification: change default variant to `white`
- Notification: removed `variant`, `elevated` and `icon` props

* feat(Colors): change light grey colors
* 
* - PromptModal: variant prop has changed its values to `positive` or `negative`.

PromptModal variants:
* `green` -> `positive` (default value)
* `red` -> `negative`
* `blue` -> removed
* - Label: renamed to Tag
- Label: removed white variant
- Label: added blue variant

* feat(Switch): [FX-1387] Add Switch component

- Switch: new lab component based on Material UI Counterpart
* - Accordion: `bordered` prop is renamed to `borders`, which has 3 new values - `all`, `middle` and `none`

Accordion borders:
* `bordered: true` -> `all` (default value)
* `bordered: false` -> `none`
* `middle` is a new variant
* - FormLabel: 'required' prop changed to 'requiredDecoration', which now supports two options: asterisk or optional
- Checkbox:  'required' prop changed to 'requiredDecoration', which now supports two options: asterisk or optional

* feat(Page): [FX-1256] Rename Page.Header and Page.HeaderMenu
* - Page.Header: renamed to Page.TopBar
- Page.HeaderMenu: renamed to Page.TopBarMenu

* fix(Tooltip): positioning inside a dropdown

* feat(Select): [FX-1354] add dedicated search input

- Select: disabled input functionality for the select input, instead added Search input inside the options list
- Select: added property `searchPlaceholder` to set placeholder for the added Search input inside options list. Default value `Search`
- Select: `searchThreshold` default value is set to 10 instead of 4 previously

chore(Accordion): use snapshots in tests

* feat(Select): [FX-1441] deprecate onSearchChange
* - Select: `onSearchChange` is deprecated and will be removed in the next Picasso version. Select component should not be used with dynamic options anymore. Please use Autocomplete instead for such case

* feat(Tooltip): hide on click for uncontrolled

- Tooltip: uncontrolled Tooltip is getting closed after second click/touch on children element
* - Notification: fullWidth prop removed
- Notification: elevated prop removed
- Notification: content width increased
- Notification: left-aligned content
* - Notification: variant prop removed
- Notification: icon prop removed
- PageContent: padding reduced
- PageBannerMessage: removed
* - UserBadge: avatar size reduced
- Notification: icon size reduced
- Subheader: removed left padding
* - Subheader: rename to PageHead
* - Modal: set base font-size to 1rem
* - Sidebar: increased horizontal padding
- SidebarLogo: increased left padding
- PageContent: removed horizontal padding

* feat(Sidebar): induce grey background on the left side of page
* - PageContent: background becomes gray lighter if there is Sidebar
