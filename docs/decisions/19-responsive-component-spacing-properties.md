# Responsive component spacing properties

## Problem

The `Container` and `Dropdown` component spacing properties are not responsive. Consumers use workarounds to make properties to have certain values depending on screen size by using responsive hooks which degrades development experience and [is not supported by Server Side Rendering (SSR)](https://toptal-core.atlassian.net/wiki/spaces/FE/pages/3326443609/Server-Side+Rendering+SSR+and+Creating+SSR-Supported+Components+in+React).

This document focuses on spacing properties of [Container component](https://picasso.toptal.net/?path=/story/layout-container--container) (`top`, `right`, `bottom`, `left`, `gap`, and `padded` properties) and [Dropdown component](https://picasso.toptal.net/?path=/story/components-dropdown--dropdown) (`offset` property) and uses `Container.top` property as an example.

## Context

`Container` and `Dropdown` spacing properties have `SizeType` that can be a spacing constant like `xsmall`, `small`, etc. or a number (which is a spacing in `rem` units). Spacing constants are resolved to `rem` units as well. 

The scale of the problem is large enough for measures to be taken. According to the research in [Container properties usages section](#container-properties-usage), 4% of the `Container.top` spacing property usages retrieve the screen size before calculating the value of the property:

- `org:toptal "top={" language:TSX` ([GitHub search](https://github.com/search?q=org%3Atoptal+%22top%3D%7B%22+language%3ATSX&type=code), 488 files total) – 15 files out of 100 analysed have `Container.top` property responsive (extrapolated values – 72 out of 488 files)
- `org:toptal "top=\"" language:TSX` ([GitHub search](https://github.com/search?q=org%3Atoptal+%22top%3D%5C%22%22+language%3ATSX&type=code), 54 files total) and `org:toptal "top='" language:TSX` ([GitHub search](https://github.com/search?q=org%3Atoptal+%22top%3D%27%22+language%3ATSX&type=code), 1800 files total) – 0 files out of 100 analysed have `Container.top` property responsive (extrapolated values – 0 out of 1854 files)

Result – 4% of files with `Container.top` usage (72 out of 2288 files in Toptal organisation codebase) use `Container` component and have `Container.top` property values assigned based on the screen size.

## Proposal

The `Container` and `Dropdown` component spacing properties allow setting values depending on the screen size without workarounds for consumers. The implementation should follow the mobile-first approach, do not degrade performance, and be compatible with SSR. The existing way of specifying spacing properties should work the same (for example, `top={SPACING_2}` sets `SPACING_2` as a spacing for all screen sizes).

### API changes

- extend spacing properties type to accept object with defined spacing for screen size breakpoints (similar approach is used in [ChakraUI](https://chakra-ui.com/docs/styled-system/responsive-styles#the-object-syntax)).

```jsx
/**
 * Picasso breakpoint ranges
 * Value         |0px     480px    768px    1024px   1440px
 * Screen width  |--------|--------|--------|--------|-------->
 * Range         |   xs   |   sm   |   md   |   lg   |   xl
 * 
 * For screens in "xs", "sm", and "md" breakpoint ranges top padding is SPACING_1
 * For screens in and bigger than "lg" breakpoint range top padding is SPACING_2
 */

/**
 * Current approach
 * 
 * Container.top can be "SpacingType" only
 */
const mobileScreen = useBreakpoint(['xs', 'sm', 'md'])
<Container top={mobileScreen ? SPACING_1 : SPACING_2}/>

/**
 * Proposed approach
 * 
 * Container.top can be "SpacingType" or "{ xs?: SpacingType, sm?: SpacingType, md?: SpacingType, lg?: SpacingType, xl?: SpacingType }
 */
<Container top={{
  xs: SPACING_1,
  lg: SPACING_2
}}/>
```

- allow only BASE spacings as values in provided object. Currently, spacing properties of the `Container` component take either a number value in `rem` units or a spacing constant that is later resolved to `rem` units, which will be deprecated soon.

```jsx
import { SPACING_1, SPACING_2 } from '@toptal/picasso/utils'
...
// Correct usage
<Container top={{ md: SPACING_1, lg: SPACING_2 }}/>
// Incorrect usage, only BASE spacings can be provided
<Container top={{ md: 1, lg: 'large' }}/> // throws TypeScript error
```

### Questions and answers

This section covers common use cases and questions that may rise during adoption

---

Question: what padding is set for `xs` and `sm` screens when `top={{ md: SPACING_N }}` spacing property value is set?

Answer: no padding is set, no styles are applied to `xs` and `sm` screens. All screens above `sm` have `SPACING_N` spacing

---

Q: how to set `SPACING_N` padding only for `lg` screen?

A: it should be `top={{ lg: SPACING_N, xl: SPACING_0 }}`, xl: `SPACING_0` is needed to reset the value for `xl` screens

---

Q: how to set `SPACING_N` padding for all screens?

A: no need to use responsive spacing, having `top={SPACING_N}` is enough

---

Q: how to set `SPACING_N` padding for all screens and `SPACING_M` only for `md` screens?

A: it should be `top={{ xs: SPACING_N, md: SPACING_M, lg: SPACING_N }}`

---

Q: are responsive spacings compatible with Server Side Rendering?

A: yes, mixture of CSS media queries and CSS variables is used under the hood, so there is no need in extra re-renders

### Alternative approaches

Another approach is to make spacing properties accept arrays with spacing values (similar approach is used in [ChakraUI](https://chakra-ui.com/docs/styled-system/responsive-styles#the-array-syntax)). Arrays specify values (if there is no value, then `null` has to be explicitly specified) for all the breakpoints until the biggest one is mentioned.

```jsx
/**
 * Picasso breakpoint ranges
 * Value         |0px     480px    768px    1024px   1440px
 * Screen width  |--------|--------|--------|--------|-------->
 * Range         |   xs   |   sm   |   md   |   lg   |   xl
 * 
 * For screens in "xs" and "sm" breakpoint ranges top padding is 0rem / 0px (due to "null" value)
 * For screens in "md" breakpoint range top padding is SPACING_1
 * For screens in and bigger than "lg" breakpoint range top padding is SPACING_2
 */

<Container top={[/* xs */ null, /* sm */ null, /* md */ SPACING_1, /* lg */ SPACING_2]}/>
```

Array syntax requires explicit specification of smaller breakpoint ranges even if spacing is not set for them, which makes it less usable compared to object syntax. Array syntax is not consistent with the way Picasso defines APIs of components, it is not used anywhere else. Array syntax requires remembering of breakpoint ranges to match the index of value in array to the breakpoint range. All three factors make it a less preferable approach compared to object syntax mentioned earlier.
