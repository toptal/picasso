---
'@toptal/picasso-provider': patch
---

### PicassoBreakpoints

- drop `values.lg` to the desktop floor (768) alongside the widened `lg` media query when `disableMobileBreakpoints()` runs, so the two breakpoint APIs cannot disagree. The media queries drive `useBreakpoint`, the pixel values drive `useScreens`/`isScreenSize`, and with `values.lg` left at 1024 a width of 800px was `lg` by media query and `md` by pixel value at the same moment — while `md` is blanked, so `useBreakpoint('md')` was `false` and `isScreenSize('md', 800)` was `true` together. Follow-up to PF-2282, which fixed the practical dead zone but left this split behind
