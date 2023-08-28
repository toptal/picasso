# Spacing

## Problem

Picasso spacings are not aligned with [BASE design guidelines](https://toptal-core.atlassian.net/wiki/spaces/Base/pages/3217031216/Spacing). This fact complicates implementation of BASE-compatible applications using Picasso.

## Context

Picasso provides a specialised `SpacingType` type that can be either a numeric value of `rem` units or one of the pre-defined string constants (`xsmall`, `small`, etc.) that are resolved to `rem` units.

As an example, the `Container` component has a `top` property that has `SpacingType` type. Based on the statistics of `top` property usage (searching for its occurrences in [this](https://github.com/search?q=org%3Atoptal+%22+top%3D%7B%22&type=code&p=1) GitHub search), Picasso consumers frequently use both numeric values and string constants.

All `SpacingType` string constants resolve to numeric values that are present in [BASE design spacings](https://toptal-core.atlassian.net/wiki/spaces/Base/pages/3217031216/Spacing#Base-Increment). Some of the BASE design spacings do not have a counterpart in `SpacingType` string constants. There are 5 `SpacingType` string constants and 12 BASE design spacings – for example, there is no string constant for `spacing-12` spacing.

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

Picasso exports spacing, aligned with [BASE design](https://toptal-core.atlassian.net/wiki/spaces/Base/pages/3217031216/Spacing). The legacy way of specifying spacing (numbers and string constants) is gradually deprecated to encourage usage of BASE spacings. The [How to use spacings](https://picasso.toptal.net/?path=/story/tutorials-how-to-use-spacings--how-to-use-spacings) tutorial is updated to contain up-to-date guidelines on using a new spacing system.

### Technical details

Picasso provides BASE spacings as constants. The constant name is the spacing identifier according to [guidelines](https://toptal-core.atlassian.net/wiki/spaces/Base/pages/3217031216/Spacing) and the constant value is the value in `rem` units.

```ts
// BASE-aligned spacing values in "rem" units
type PicassoSpacingValues = 0 | 0.25 | 0.5 | 0.75 | 1 | 1.5 | 2 | 2.5 | 3

class PicassoSpacing {
  value: number
  constructor(value: PicassoSpacingValues) {
    this.value = value
  }

  valueOf() {
    return this.value
  }
}

export const spacing0 = new PicassoSpacing(0)
export const spacing1 = new PicassoSpacing(0.25)
export const spacing2 = new PicassoSpacing(0.5)
...

...
// SpacingType is extended with PicassoSpacing
export type SpacingType =
  | number
  | SizeType<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>
  | PicassoSpacing
```

Exported `spacing*` constants are reused by components with spacing properties (`top`, `right`, `bottom`, `left`, `gap`, and `padded` properties in Container component and `offset` property in Dropdown component).

```tsx
import { spacing2 } from '@toptal/picasso/utils'
...
<Container top={spacing2}/>
```

### Deprecation of existing approaches

After BASE spacing is introduced, the number and string constants as spacing value have to be deprecated. The deprecation plan has two steps:

1. Forbid number spacing, throw TypeScript error if it is used. For number values, that map to BASE spacing, codemod should be used for replacement. For custom values that do not map to BASE spacing, manual replacement should be applied by owning Teams.

```jsx
// Maps to BASE spacing
<Container top={1}/>
// becomes
<Container top={spacing4}/>

// Does not map to BASE spacing, has to be addressed manually, otherwise TypeScript error is thrown
<Container top={0.1}/>
```

Statistics: the `org:toptal "top={"` [GitHub search](https://github.com/search?q=org%3Atoptal+%22top%3D%7B%22&type=code) finds 10 occurences of non-BASE values (for example, `0.1`, `-2`. `0.125`, etc.) used in `Container.top` property 

2. Forbid string constants and replace them with corresponding BASE spacings. Every string constant maps to BASE spacing, so codemod should be used for replacement.

```jsx
type Sizes = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

export enum SpacingEnum {
  xsmall = 0.5,  // maps to spacing2
  small = 1,     // maps to spacing4
  medium = 1.5,  // maps to spacing6
  large = 2,     // maps to spacing8
  xlarge = 2.5,  // maps to spacing10
}

// Example of conversion
<Container top='small'/>
// becomes
<Container top={spacing4}/>
```

The goal is to remove `number` and `SizeType` from `SpacingType` union type.

```jsx
export type SpacingType = PicassoSpacing
```

## Alternative approaches

- Intoroduce responsive spacing tokens with different values depending on the screen size

This is one of the approaches used on the market (as an example, [Audi Design System](https://react.ui.audi/?path=/docs/brand-identity-design-tokens--page#layout-system)). However, the responsive spacing tokens idea was abandoned after discussion with the Design Team due to its complexity and unclear benefits.

- Provide BASE design spacings as `spacing` object properties

```ts
type PicassoSpacing = 0 | 0.25 | 0.5 | 0.75 | 1 | 1.5 | 2 | 2.5 | 3

export const spacing: Record<number, PicassoSpacing> = {
  0: 0,
  1: 0.25,
  ...
  10: 2.5,
  12: 3,
}
```

This approach allows `number` values to be passed to spacing properties and the notation itself is rejected.

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
