# Problem

BASE design defines [rules](https://toptal-core.atlassian.net/wiki/spaces/Base/pages/3217031216/Spacing) on how to use spacing in frontend application. Picasso has to align with design guidelines and provide tools for Picasso consumers to implement BASE-compatible spacing in application.

# Current situation

Picasso provides specialised `SpacingType` type that can be either a numeric value or one of the pre-defined string constants (`xsmall`, `small`, etc.) that are resolved to a number (in both cases a numeric value corresponds to a number of `rem` units of spacing).

For example, `Container` component has a `top` property that is `SpacingType`. Based on the data of `top` property usage (searching by its occurences in the following [GitHub search](https://github.com/search?q=org%3Atoptal+%22+top%3D%7B%22&type=code&p=1)), both numeric and string constant values are widely used by Picasso consumers.

Existing `SpacingType` string constants resolve to numeric values from [BASE design increments](https://toptal-core.atlassian.net/wiki/spaces/Base/pages/3217031216/Spacing#Base-Increment), but they do not fully align with them (for example, there is no string constant for `spacing-12` increment).

# Existing approaches

- [Chakra UI](https://chakra-ui.com/docs/styled-system/theme#spacing) exports tokens like `spacing.space['2'] = '0.5rem'`(key to string value in `rem` units)
- [Caliber](https://github.com/toptal/caliber/blob/9a0b91110f1c82e07d30f684bb42b49e0e34f918/tailwind.preset.design-tokens.js#L2) exports tokens like `theme.spacing['2'] = '8px'` (key to string value in `px` units)

# Proposal

## Goal

Picasso has to provde full set of BASE desing increments so they are used when developing Picasso-based applications. Introduced changes do not break existing usage of spacing in related components.

## Technical implementation

Picasso provides new object that contains proposed increments in a form of key-value pairs (where key is the index of the increment and the value is the correlating `rem` units)

```
export const spacing = {
  0: 0,
  1: 0.25,
  ...
  10: 2.5,
  12: 3,
}
```

Exported object with increments are reused by components with spacing properties (`top`, `right`, `bottom` and `left` properties in Container and `offset` property Dropdown)

```
import { spacing } from '@toptal/picasso/utils'
<Container top={spacing[6]}/>
```

The https://picasso.toptal.net/?path=/story/tutorials-how-to-use-spacings--how-to-use-spacings tutorial is updated to contain guidelines on using new spacing system in the particular example.

# Alternative approaches

- Provide BASE design increments as separate constants

```
export const spacing0 = 0
export const spacing1 = 0.25
...
export const spacing10 = 2.5
export const spacing12 = 3
```

This approach is not consistent with the way `breakpoint` and `color` values are provided (provided as object with key-value pairs, not as a separate constants)

- Provide BASE design increments as object with string values in rem units

```
export const spacing = {
  0: `0rem`,
  1: `0.25rem`,
  ...
  10: `2.5rem`,
  12: `3rem`,
}
```

This approach complicates handling of new spacing values in affected components, as they will handle special case of Nrem string besides the existing `SpacingType` without significant advantage to the proposed one.