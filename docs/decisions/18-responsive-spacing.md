# WORK IN PROGRESS

# Problem

Container component has top, right, bottom, and left properties that define spacing on each side. The spacing value is specified by SizeType (string like `small`, `medium`, etc.) and number (which is later converted to rem).

Problem is that cotainer does not allow defining spacing per screen size (mobile-first approach) which complicates development experience (the [1] will provide data on how ofthen it is actually needed). 

# Abandoned ideas

Responsive spacing tokens with different values depending on the screen size (the similar approach is used in Responsive spacing like in Audi Design System https://react.ui.audi/?path=/docs/brand-identity-design-tokens--page#layout-system) – abandoned after discussion with the Design Team.

# Research [WIP]

// Chakra – breakpoint support comes from https://styled-system.com/responsive-styles/
https://ondrejsevcik.com/blog/improving-styled-components-performance

Chakra has packages/components/media-query/src/use-breakpoint-value.ts hook that does not support SSR and they suggest to use user-agent based guessing

Can we access props in styled components? Problem with https://github.com/mui/material-ui/issues/20446, fixed in v5

Can be solved via JSS

# Concerns and risks

- Any modifications made to Container need to be SSR-friendly (not using responsive hooks and using media queries instead)
- Performance needs to be the same or better than current implementation, as Container is used in many places
- New component APIs need to be consist

# Proposal

## 1. Export spacing tokens

Spacing tokens are exported from `@toptal/picasso/utils`

```
// key to rem
export const spacing = {
  0: 0,
  ...
  4: 1,
  6: 1.5,
}
```

## 2. Use spacing tokens in Container spacing properties (`top`, `left`, etc.)

### Pass spacing tokens (no effort, low risk, low reward)

Container spacing properties allow number value, which are expected to be values in `rem`. The spacing tokens are also provided in `rem`, so they can be just passed to the Container spacing properties

```
import { spacing } from '@toptal/picasso/utils'
<Container top={spacing[6]}/>
```

### Extend Container spacing properties with responsive values (big effort, high risk, high reward)

Based on [1] evidence, having ability to provide responsive Container spacing properties is needed. Based on the research in existing UI libraries (Chakra UI, Material UI, Digital Scotland), the following options can be cosidered:

```
<Container top={{md: ..., lg: .. }}/>
...
<Container top=[1, 2, ...]/>
```

The overall idea is that logic of selecting the proper value of spacing for the specific screen size is moved to the Container component, so it is an improvement for development experience. The Container component has two options of implementing such API:

1. use responsive hooks (like Chakra UI does) – this approach is not SSR-friendly, so it is not an option
2. build proper media queries based on component props – this approach is SSR-friendly, but it is more complicated

The main problem is that we need to access component props in the styled component, which is not possible in the current version of Material UI (v4, addressed in v5, more in https://github.com/mui/material-ui/issues/20446). The problem is fixed in v5, but there are no plans to migrate to it. Possible workarounds are:

- use JSS in Container
- somehow create own classes with media queries

# Data

[1] Usages of responsive spacing and Container component (only top property) https://github.com/search?q=org%3Atoptal+%22+top%3D%7B%22&type=code&p=5
[2] Chakra and performance problems https://chakra-ui.com/getting-started/comparison#the-runtime-trade-off-%EF%B8%8F