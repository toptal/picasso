# RFC Template

## Problem

BASE design defines [rules](https://toptal-core.atlassian.net/wiki/spaces/Base/pages/3217031216/Spacing) on how to use spacing between page elements in frontend applications. Picasso has to align with design rules and has to provide tools for Picasso consumers to use BASE-compatible spacing in applications.

## Current situation

Picasso provides a specialised `SpacingType` type that can be either a numeric value or one of the pre-defined string constants (`xsmall`, `small`, etc.) that are resolved to a number (in both cases a numeric value corresponds to a number of `rem` units of spacing).

As an example, the `Container` component has a `top` property that has `SpacingType` type. Based on the statistics of `top` property usage (searching for its occurrences in [this](https://github.com/search?q=org%3Atoptal+%22+top%3D%7B%22&type=code&p=1) GitHub search), Picasso consumers frequently use both numeric values and string constants.

All of the `SpacingType` string constants resolve to numeric values that are present in [BASE design spacings](https://toptal-core.atlassian.net/wiki/spaces/Base/pages/3217031216/Spacing#Base-Increment). Some of the BASE design spacings do not have a counterpart between `SpacingType` string constants. There are 5 `SpacingType` string constants and 12 BASE design spacings – for example, there is no string constant for `spacing-12` spacing. 

## Existing approaches

- [Chakra UI](https://chakra-ui.com/docs/styled-system/theme#spacing) exports spacings in a form of key-value pairs, where `key` is the pixel number value and `value` is the `rem` units string value

```ts
const spacing = {
  space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    ...
  }
}
```

- [Caliber](https://github.com/toptal/caliber/blob/9a0b91110f1c82e07d30f684bb42b49e0e34f918/tailwind.preset.design-tokens.js#L2) defines spacings as key-value pairs and exports spacings in a form of CSS classes generated with TailwindCSS

```js
// Design tokens preset
module.exports = {
  theme: {
    spacing: {
      ...
      4: '16px',
      ...
    }
  }
}
```

```css
...
/* padding: 16px */
.p-4
/* padding-top: 16px */
.pt-4
...
```

## Proposal

### Goal

Picasso has to provide full set of BASE design spacings to allow consumers to use all of them when developing Picasso-based applications. Introduced changes should not break existing usage of spacing in related components mentioned above.

### Technical implementation

Picasso provides a new object `spacing` that includes proposed spacings in a form of key-value pairs (where the key is the index of the increment and the value is a corresponding value in `rem` unit)

```ts
export const spacing = {
  0: 0,
  1: 0.25,
  ...
  10: 2.5,
  12: 3,
}
```

Exported `spacing` object with increments is reused by components with spacing properties (`top`, `right`, `bottom` and `left` properties in Container and `offset` property Dropdown)

```tsx
import { spacing } from '@toptal/picasso/utils'
...
<Container top={spacing[6]}/>
```

The [How to use spacings](https://picasso.toptal.net/?path=/story/tutorials-how-to-use-spacings--how-to-use-spacings) tutorial is updated to contain guidelines on using a new spacing system for a particular example.

## Alternative approaches


- Intoroduce responsive spacing tokens with different values depending on the screen size

This is one of the approaches used on the market (as an example, [Audi Design System](https://react.ui.audi/?path=/docs/brand-identity-design-tokens--page#layout-system)). However, the responsive spacing tokens idea was abandoned after discussion with the Design Team due to its complexity and unclear benefits.

- Provide BASE design spacings as separate constants

```ts
export const spacing0 = 0
export const spacing1 = 0.25
...
export const spacing10 = 2.5
export const spacing12 = 3
```

This approach is not consistent with the way `breakpoint` and `color` objects are exposed by Picaso (they are objects with key-value pairs, not as a separate constants)

- Provide BASE design spacings as object with string values in `rem` units

```ts
export const spacing = {
  0: `0rem`,
  1: `0.25rem`,
  ...
  10: `2.5rem`,
  12: `3rem`,
}
```

This approach complicates handling of new spacing values in related components (`Container` and `Dropdown`), as they will have to handle new case of `Nrem` string besides the existing `SpacingType` without any significant advantage compared to the proposed approach.

## Steps after approval

- Discuss the update of [How to use spacings](https://picasso.toptal.net/?path=/story/tutorials-how-to-use-spacings--how-to-use-spacings) tutorial with the Design Team, create ticket for the update
- Discuss the deprecation of existing `SpacingType` string constants with the Design Team, create ticket for deprecation and update of documentation for `Container` and `Dropdown`
- Create ticket for exposing new `spacing` object from Picasso and announcing the whole change in frontend channels (mention that using numbers of spacing constants will be deprecated in the future)
