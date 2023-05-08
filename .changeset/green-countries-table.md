---
'@toptal/picasso-provider': major
'@toptal/picasso-forms': major
'@toptal/picasso': major
---

### Breakpoints ([#3535](https://github.com/toptal/picasso/pull/3535))

- in order to comply with BASE design, Picasso breakpoint values were updated, please see the https://github.com/toptal/picasso/blob/master/docs/decisions/13-breakpoints.md for more details. As a consequence, breakpoint ranges were updated as well.

```
Before:
Value         |0px     576px    768px    992px    1920px
Breakpoint    |xs      sm       md       lg       xl
Screen width  |--------|--------|--------|--------|-------->
Range         |   sm   |   md   |   lg   |   xl   |   xl
After:
Value         |0px     480px    768px    1024px   1440px
Breakpoint    |xs      sm       md       lg       xl
Screen width  |--------|--------|--------|--------|-------->
Range         |   xs   |   sm   |   md   |   lg   |   xl
```

**Migration guide**

- `screenSizeToBreakpointKey()` hook now returns the breakpoint range for a specific screen size in a different manner (according to the differences in the breakpoints ranges scheme mentioned above, there is a new breakpoint range `xs`, the smallest one). Please see the examples below:
  - before: `screenSizeToBreakpointKey(300) = 'small`; now: `screenSizeToBreakpointKey(300) = 'xs` (because `300px` is between `xs` and `sm` breakpoints)
  - before: `screenSizeToBreakpointKey(2000) = 'extra-large`; now: `screenSizeToBreakpointKey(2000) = 'xl` (because `2000px` is bigger than the biggest `xl` breakpoint)
- `isScreenSize()`, `useBreakpoint()`, and `useScreens()` hooks also changed their behavior due to the same changes in breakpoint ranges.

### Grid ([#3538](https://github.com/toptal/picasso/pull/3538))

- in order to comply with BASE design, `Grid` spacing property automatically adjusts to the screen size, unless explicitly specified by consumer. Extra-small and small screens have `16px` spacing, medium screens have `24px` spacing and large and extra-large screens have `32px` spacing. If you want to keep the old behavior, please explicitly set `spacing={32}` for `Grid` components.

**Migration guide**

- grids are expected to work as before, as responsive grid gutters do not change the overall layout. However, please manually check how Grids that do not have `spacing` property set explicitly (so, the responsive spacing will be applied by default) look on different screens to ensure that it does not interfere with some custom grid item styling if there is any.

### Grid.Item, Checkbox.Group and Radio.Group ([#3540](https://github.com/toptal/picasso/pull/3540))

- components have replaced `small`, `medium`, and `large` properties with `xs`, `sm`, `md`, `lg`, and `xl` properties to align with updated BASE-compatible breakpoints.

**Migration guide**

For the mentioned components

- replace `small` property with `xs` property. Please note, that old `small` property is not the same as new `sm` property – the `sm` is not a minimal breakpoint range anymore (the `xs` now covers all the screen sizes now), plus `small` breakpoints was `576px` and `sm` is `480px` now;
- replace `medium` property with `md` property;
- replace `large` property with `lg` property. Please note, that old `large` property is not the same as new `lg` property – `large` breakpoint was `992px`, and `lg` is `1024px` now.
