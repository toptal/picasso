# RFC Template

## Problem

[Picasso Container component](https://picasso.toptal.net/?path=/story/layout-container--container) has `top`, `right`, `bottom`, and `left` properties that define spacing on each side of the container (margins). These properties have `SizeType` that can be a spacing constant like `xsmall`, `small`, etc. or a number (which is a spacing in `rem` units). Spacing constants are resolved to `rem` units as well. 

The problem is that Container components do not allow defining spacing per screen size, so consumers have to find workarounds like using responsive hooks provided by Picasso (their usage is discouraged as [they do not support Server Side Rendering (SSR)](https://toptal-core.atlassian.net/wiki/spaces/FE/pages/3326443609/Server-Side+Rendering+SSR+and+Creating+SSR-Supported+Components+in+React)) or having a custom implementation of screen size detection.

The scale of the problem is large enough for measures to be taken. According to the research in the Container properties usages section, 8% of the `Container.top` spacing property usages take into account screen size before assigning the value of the property.

## Proposal

`Container` spacing properties have to allow setting values depending on the screen size without workarounds for consumers. The implementation should follow the mobile-first approach, do not degrade performance, and be compatible with SSR.

This RFC proposes changes to the `Container` component API and does not propose technical implementation due to the problems described in technical challenges section and the fact that upcoming Picasso migration to TailwindCSS can potentially solve described technical problems.

### Abandoned ideas

Responsive spacing tokens with different values depending on the screen size is one of the approaches used on the market (as an example, [Audi Design System](https://react.ui.audi/?path=/docs/brand-identity-design-tokens--page#layout-system)). The responsive spacing tokens idea was abandoned after discussion with the Design Team due to its complexity and unclear benefits.

### API changes

Currently, spacing properties of the `Container` component take either a number value in `rem` units or a spacing constant that is later resolved to `rem` units. The proposal is to extend spacing properties to accept object with defined spacing for screen size breakpoints (similar approach is used in [ChakraUI](https://chakra-ui.com/docs/styled-system/responsive-styles#the-object-syntax))

```jsx
/**
 * Picasso breakpoint ranges
 * Value         |0px     480px    768px    1024px   1440px
 * Screen width  |--------|--------|--------|--------|-------->
 * Range         |   xs   |   sm   |   md   |   lg   |   xl
 * 
 * For screens in "xs" and "sm" breakpoint ranges top padding is 0rem / 0px
 * For screens in "md" breakpoint range top padding is 1rem / 16px
 * For screens in and bigger than "lg" breakpoint range top padding is 'large' that equals to 2rem / 32px
 */

<Container top={{ md: 1, lg: 'large' }}/>
```

### Alternative approaches

Another approach is to make spacing properties accept arrays with spacing values (similar approach is used in [ChakraUI](https://chakra-ui.com/docs/styled-system/responsive-styles#the-array-syntax)). Arrays have to specify values (if there is no value, then `null` has to be explicitly specified) for all the breakpoints until the biggest one is mentioned.

```jsx
/**
 * Picasso breakpoint ranges
 * Value         |0px     480px    768px    1024px   1440px
 * Screen width  |--------|--------|--------|--------|-------->
 * Range         |   xs   |   sm   |   md   |   lg   |   xl
 * 
 * For screens in "xs" and "sm" breakpoint ranges top padding is 0rem / 0px (due to "null" value)
 * For screens in "md" breakpoint range top padding is 1rem / 16px
 * For screens in and bigger than "lg" breakpoint range top padding is 'large' that equals to 2rem / 32px
 */

<Container top={[/* xs */ null, /* sm */ null, /* md */ 1, /* lg */ 'large']}/>
```

Array syntax requires explicit specification of smaller breakpoint ranges even if spacing is not set for them, which makes it less usable compared to object syntax. Array syntax is not consistent with the way Picasso defines APIs of components, it is not used anywhere else. Array syntax requires remembering of breakpoint ranges to match the index of value in array to the breakpoint range. All three factors make it a less preferable approach compared to object syntax mentioned earlier.

## Steps after approval

- Create ticket for implementing new spacing properties API in the TailwindCSS migration epic

## Additional information

### Technical challenges

In order to maintain compatibility with SSR, existing responsive hooks can not be used due to their reliance on `window` object (please see [Server-Side Rendering (SSR) and Creating SSR-Supported Components in React](https://toptal-core.atlassian.net/wiki/spaces/FE/pages/3326443609/Server-Side+Rendering+SSR+and+Creating+SSR-Supported+Components+in+React) for details) when implementing the proposed component API and functionality.

CSS media queries are viable option as they are compatible with SSR. However, the problem is that `Container` props need to be accessed when generating CSS classes, which is not possible in the current version of MaterialUI . The problem is fixed in `v5`, please see https://github.com/mui/material-ui/issues/20446 for details.

One of the workarounds is to use CSS in JavaScript ([JSS](https://cssinjs.org/)) that allows creating CSS classes with media queries, but it introduces higher complexity due to another way of defining styling for components and it affects the bundle size.

Taking into account planned Picasso migration to TailwindCSS and problems that rise in case of using workaround, the technical implementation of API proposal is postponed until TailwindCSS migration is completed.

### Container properties usage

Calculation of `Container.top` usage statistics

- `org:toptal "top={" language:TSX` ([GitHub search](https://github.com/search?q=org%3Atoptal+%22top%3D%7B%22+language%3ATSX&type=code)) – 118 usages, 15 of them take into account the screen size
- `org:toptal "top=\"" language:TSX` ([GitHub search](https://github.com/search?q=org%3Atoptal+%22top%3D%5C%22%22+language%3ATSX&type=code)) – 60 usages, 0 of them take into account the screen size

Result – 8% of `Container.top` usages (15 out of 178) contain a special condition that takes into account screen size
