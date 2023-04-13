# Breakpoints and breakpoint ranges

- [BASE design / Grids](https://www.figma.com/file/q2nvjiyO2CLqBv4DeJnU3i/Product-Library-Documentation?node-id=8-15&t=jDRAyAKU5f75GkYt-0)
- [Responsiveness discussion channel (#responsive-design)](https://toptal-core.slack.com/archives/C052MRF4QJV)

## Problem

Picasso breakpoints and responsiveness in general has to be in sync with [BASE design guidelines](https://www.figma.com/file/q2nvjiyO2CLqBv4DeJnU3i/Product-Library-Documentation?node-id=4533%3A28468&t=RruM6iH4OeX5Csm7-1). Current breakpoints and breakpoint ranges are presented below (as well as in https://picasso.toptal.net/?path=/story/utils-breakpoints--breakpoints):

```
// Breakpoints
xs: 0px,
sm: 576,
md: 768px,
lg: 992px,
xl: 1920px,

// Breakpoint ranges
small:       0-575px
medium:      576-767px
large:       768-991px
extra-large: 992px+
```

## Proposal

[Breakpoints from BASE design](https://www.figma.com/file/q2nvjiyO2CLqBv4DeJnU3i/Product-Library-Documentation?node-id=4533%3A28468&t=RruM6iH4OeX5Csm7-1) should be fully supported in Picasso. Proposed breakpoints and breakpoint ranges that correspond to the BASE design:

```
// Breakpoints
xs:  0px    (extra-small)
sm:  480px  (small)
md:  768px  (medium)
lg:  1024px (large)
xl:  1440px (extra-large)
2xl: 1920px (extra-extra-large)

// Breakpoint ranges
xs:  0-479px
sm:  480-767px
md:  768-1023px
lg:  1024-1493px
xl:  1440-1919px
2xl: 1920px+

Value         |0px     480px    768px    1024px   1440px   1920px
Key           |xs      sm       md       lg       xl       2xl
Screen width  |--------|--------|--------|--------|--------|------->
Range         |   xs   |   sm   |   md   |   lg   |   xl   |   2xl
```

## Decision

Pending discussion and approval
