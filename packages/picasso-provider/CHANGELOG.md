# Change Log

## 3.0.0

### Major Changes

- [#3552](https://github.com/toptal/picasso/pull/3552) [`87068a468`](https://github.com/toptal/picasso/commit/87068a4680f099185be00863b7ebeada893c0e29) Thanks [@sashuk](https://github.com/sashuk)!

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
  - before: `screenSizeToBreakpointKey(300) = 'small'`; now: `screenSizeToBreakpointKey(300) = 'xs'` (because `300px` is between `xs` and `sm` breakpoints)
  - before: `screenSizeToBreakpointKey(2000) = 'extra-large'`; now: `screenSizeToBreakpointKey(2000) = 'xl'` (because `2000px` is bigger than the biggest `xl` breakpoint)
- `isScreenSize()`, `useBreakpoint()`, and `useScreens()` hooks also changed their behavior due to the same changes in breakpoint ranges.

### Grid ([#3538](https://github.com/toptal/picasso/pull/3538))

- in order to comply with BASE design, `Grid` spacing property automatically adjusts to the screen size, unless explicitly specified by consumer. Extra-small and small screens have `16px` spacing, medium screens have `24px` spacing and large and extra-large screens have `32px` spacing. If you want to keep the old behavior, please explicitly set `spacing={32}` for `Grid` components.

**Migration guide**

- grids are expected to work as before, as responsive grid spacing (the space between grid items) does not change the overall layout. However, please manually check how Grids that do not have `spacing` property set explicitly (so, the responsive spacing will be applied by default) look on different screens to ensure that it does not interfere with some custom grid item styling if there is any.

### Grid.Item, Checkbox.Group and Radio.Group ([#3540](https://github.com/toptal/picasso/pull/3540))

- components have replaced `small`, `medium`, and `large` properties with `xs`, `sm`, `md`, `lg`, and `xl` properties to align with updated BASE-compatible breakpoints.

**Migration guide**

For the mentioned components

- replace `small` property with `xs` property. Please note, that old `small` property is not the same as new `sm` property – the `sm` is not a minimal breakpoint range anymore (the `xs` now covers all the screen sizes now), plus `small` breakpoints was `576px` and `sm` is `480px` now;
- replace `medium` property with `md` property;
- replace `large` property with `lg` property. Please note, that old `large` property is not the same as new `lg` property – `large` breakpoint was `992px`, and `lg` is `1024px` now.

## 2.2.0

### Minor Changes

- [#3501](https://github.com/toptal/picasso/pull/3501) [`dd2dc7a28`](https://github.com/toptal/picasso/commit/dd2dc7a28b71e07506a5c5422a3e0df6f4a7b7cd) Thanks [@augustobmoura](https://github.com/augustobmoura)!

---

### PicassoProvider

- add font sizes to Picasso theme

- [#3501](https://github.com/toptal/picasso/pull/3501) [`dd2dc7a28`](https://github.com/toptal/picasso/commit/dd2dc7a28b71e07506a5c5422a3e0df6f4a7b7cd) Thanks [@augustobmoura](https://github.com/augustobmoura)!

---

- basic gradients were added (blue, darker blue, light grey, grey, darker grey); `@toptal/picasso` requires `@toptal/picasso-provider >= 2.2.0`

### Patch Changes

- [#3501](https://github.com/toptal/picasso/pull/3501) [`dd2dc7a28`](https://github.com/toptal/picasso/commit/dd2dc7a28b71e07506a5c5422a3e0df6f4a7b7cd) Thanks [@augustobmoura](https://github.com/augustobmoura)!

---

- memoize class names creator in PicassoLight

- [#3501](https://github.com/toptal/picasso/pull/3501) [`dd2dc7a28`](https://github.com/toptal/picasso/commit/dd2dc7a28b71e07506a5c5422a3e0df6f4a7b7cd) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### PicassoGlobalStylesProvider

- add exception to SSR on Picasso root mounted guard

## 2.1.1

### Patch Changes

- [#3445](https://github.com/toptal/picasso/pull/3445) [`26533bda9`](https://github.com/toptal/picasso/commit/26533bda9b64232a090a3e4560c2f33ebefa49a1) Thanks [@dmaklygin](https://github.com/dmaklygin)! - ---

  - memoize class names creator in Picasso provider

## 2.1.0

### Minor Changes

- [#3235](https://github.com/toptal/picasso/pull/3235) [`7fe506ea`](https://github.com/toptal/picasso/commit/7fe506ea3c0d94b0aa5d009655689a6fdd1f4ea0) Thanks [@tiagoporto](https://github.com/tiagoporto)! - ### NotificationsProvider

  - Add `maxNotifications` prop

## 2.0.1

### Patch Changes

- [#3237](https://github.com/toptal/picasso/pull/3237) [`b820471e`](https://github.com/toptal/picasso/commit/b820471e3091a5c22fe521de0ee85ec4347f58f5) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### PicassoGlobalStylesProvider

  - only render application after Picasso's root element is mounted

## 2.0.0

### Major Changes

- [#3137](https://github.com/toptal/picasso/pull/3137) [`356678e34`](https://github.com/toptal/picasso/commit/356678e341388e60fce5dcfc5cc4b9aa956d2c02) Thanks [@sanex3339](https://github.com/sanex3339)! - ---

  ### PicassoProvider

  **BREAKING CHANGE:**

  - replace usage of `react-helmet` package with `react-helmet-async`
  - add `disableHelmet` prop to disable the usage of `<HelmetProvider>` component from `react-helmet-async` for server environment

## 1.3.1

### Patch Changes

- [#3030](https://github.com/toptal/picasso/pull/3030) [`108a3161`](https://github.com/toptal/picasso/commit/108a31619fef88f64d08912bf6ef00955f5272ea) Thanks [@SergeyKolchenko](https://github.com/SergeyKolchenko)! - ---
  PicassoProvider

  - uses `createTheme` instead of deprecated `createMuiTheme` due to the function was renamed

  ***

  Grid

  - uses the `justifyContent` property instead of deprecated `justify` one

  ***

  Loader

  - uses the `determinate` variant property value instead of deprecated `static` one

  ***

  OutlinedInput

  - uses `minRows` and `maxRows` props instead of deprecated `rows` and `rowsMax` respectively

## 1.3.0

### Minor Changes

- [#3016](https://github.com/toptal/picasso/pull/3016) [`2082a952`](https://github.com/toptal/picasso/commit/2082a952874740fed64c4d698e500192377275ed) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Dependencies

  - update material-ui to latest 4.x.x version

## 1.2.2

### Patch Changes

- [#2959](https://github.com/toptal/picasso/pull/2959) [`984b826a`](https://github.com/toptal/picasso/commit/984b826af8f54835c6914586c338d60c64c741ff) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  - bump `notistack` to `1.0.10`

## 1.2.1

### Patch Changes

- [#2884](https://github.com/toptal/picasso/pull/2884) [`187eb79ab70045243037754d29c9a3da74ac202f`](https://github.com/toptal/picasso/commit/187eb79ab70045243037754d29c9a3da74ac202f) Thanks [@konstrybakov](https://github.com/konstrybakov)! - ---

  ### PicassoLight

  - Added a composable Picasso version. This change may affect direct component imports (the usage of which is not recommended).

  ### FixViewport

  ### PicassoGlobalStylesProvider

  ### PicassoRootNode

  - Extracted to a separate component

  repo: toptal/picasso

## 1.2.0

### Minor Changes

- [#2852](https://github.com/toptal/picasso/pull/2852) [`053e386c`](https://github.com/toptal/picasso/commit/053e386c7268bc34f294adbaa3327470c80947f1) Thanks [@s0ber](https://github.com/s0ber)! - ---

  ### Picasso

  - allow injecting Picasso styles first inside head

## 1.1.4

### Patch Changes

- [#2840](https://github.com/toptal/picasso/pull/2840) [`38e61c28`](https://github.com/toptal/picasso/commit/38e61c286d48d33f7e4e1080d2f0b48747950e67) Thanks [@vvmarulin](https://github.com/vvmarulin)! - Upgrade `notistack` to version `1.0.6`

## 1.1.3

### Patch Changes

- [#2806](https://github.com/toptal/picasso/pull/2806) [`81a56673`](https://github.com/toptal/picasso/commit/81a56673a16f0290564d7205f414efebbfd9f7ce) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---
  - Fix format of peerDependency for `react` and `react-dom`

## 1.1.2

### Patch Changes

- [#2753](https://github.com/toptal/picasso/pull/2753) [`c49d9073`](https://github.com/toptal/picasso/commit/c49d90735837b121c34da9681958a31b9dfcce6a) Thanks [@konstrybakov](https://github.com/konstrybakov)! - SSR compatibility updates

## 1.1.1

### Patch Changes

- [#2715](https://github.com/toptal/picasso/pull/2715) [`a365d67d`](https://github.com/toptal/picasso/commit/a365d67d8d27e2f861a4f7d89e31ef4614e41706) Thanks [@separatio](https://github.com/separatio)! - ---

  - Applied prettier formatting to the whole codebase

## 1.1.0

### Minor Changes

- [#2605](https://github.com/toptal/picasso/pull/2605) [`ec1ab713`](https://github.com/toptal/picasso/commit/ec1ab7130b28cac2ba7ad1080cb0859743cececb) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### React 18

  update peerDependencies to support React@18

## 1.0.0

### Major Changes

- [#2569](https://github.com/toptal/picasso/pull/2569) [`e8833df2`](https://github.com/toptal/picasso/commit/e8833df2329c6285840ae02c0d029fe4eebb8247) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Project

  - Update typescript to version 4.6

## 0.7.1

### Patch Changes

- [#2521](https://github.com/toptal/picasso/pull/2521) [`fc9b34cc`](https://github.com/toptal/picasso/commit/fc9b34ccad04a2e7926a84eb1d710350f1d663d5) Thanks [@deniskaber](https://github.com/deniskaber)! - Change useLayoutEffect to useIsomorphicLayoutEffect for SSR support

## 0.7.0

### Minor Changes

- [#2494](https://github.com/toptal/picasso/pull/2494) [`d82ed00d`](https://github.com/toptal/picasso/commit/d82ed00d8ab94b77654f2b3be4776aa514c44daa) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### PicassoProvider

  - added new purple.main color in palette

## 0.6.1

### Patch Changes

- [#2451](https://github.com/toptal/picasso/pull/2451) [`53efb37c`](https://github.com/toptal/picasso/commit/53efb37cc242cff904a06eb793b5ded47945204e) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  ### Applies to all Components

  - fix linting errors

## 0.6.0

### Minor Changes

- [#2375](https://github.com/toptal/picasso/pull/2375) [`16574dee`](https://github.com/toptal/picasso/commit/16574dee549095cc06deccccdbcfb4c7a073a601) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  ### Common

  - Add new `scroll menu` shadow in `packages/picasso-provider/src/Picasso/config/shadows.ts`

## 0.5.0

### Minor Changes

- [#2304](https://github.com/toptal/picasso/pull/2304) [`6446e620`](https://github.com/toptal/picasso/commit/6446e620808fed2a411fc124821c4cc896add734) Thanks [@yusufzmly](https://github.com/yusufzmly)! - Add isBrowser utils function and Fix NumberInput and Tooltip component for SSR

## 0.4.1

### Patch Changes

- [#2272](https://github.com/toptal/picasso/pull/2272) [`9548a15d`](https://github.com/toptal/picasso/commit/9548a15d541dd4b5505d11e32f0c7557297613e4) Thanks [@konstrybakov](https://github.com/konstrybakov)! - Adding documentation for Server Side Rendering and related utility function `getServersideStylesheets`

## 0.4.0

### Minor Changes

- [#2242](https://github.com/toptal/picasso/pull/2242) [`34e990a3`](https://github.com/toptal/picasso/commit/34e990a3fe6d66bb204d1d468c505ebe0b8fd127) Thanks [@deniskaber](https://github.com/deniskaber)! - Add `disableClassNamePrefix` parameter for PicassoProvider to support Picasso usage in SSR

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso-provider@0.3.0...@toptal/picasso-provider@0.3.1) (2021-11-09)

**Note:** Version bump only for package @toptal/picasso-provider

# [0.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso-provider@0.2.0...@toptal/picasso-provider@0.3.0) (2021-10-14)

### Features

- v12 ([b0a00a0](https://github.com/toptal/picasso/commit/b0a00a0a8d3d92fcd7930a4a0bf0fdc09103ac6c))

### BREAKING CHANGES

- - Stepper - remove fullWidth property

* Link - fontSize changed to 14px, if you are using `Link` inside
  headings or perex, you need to use `size="inherit"` - underline prop was replaced by textDecoration: `'none' | 'underline'`. `'none'` by default.
* Badge - new medium size - previous medium size is now large, - the default value is changed to large - new type of content `content: number` - content higher than or equal to 100 is transformed to 99+ - for small size, the threshold is 10
* ButtonGroup - since button group can have only one style of Button,
  we have Button.Group.Item that should be used
  instead of `<Button variant='secondary' />`
* Tag - users of Tag and Indicator will need to check names of variant

# [0.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-provider@0.1.2...@toptal/picasso-provider@0.2.0) (2021-10-13)

### Features

- **Typography:** update line heights and colors to match BASE 2.0 ([#2184](https://github.com/toptal/picasso/issues/2184)) ([aacd827](https://github.com/toptal/picasso/commit/aacd8271dd6c6ef5093fef78d4a419c48b046db5))

### BREAKING CHANGES

- **Typography:** - Changed line-height of small heading and body

* Removed blue color from Typography
* Removed blue color from OverviewBlock

## [0.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso-provider@0.1.1...@toptal/picasso-provider@0.1.2) (2021-09-16)

### Bug Fixes

- remove material-ui/styles from dependencies ([#2165](https://github.com/toptal/picasso/issues/2165)) ([d403a67](https://github.com/toptal/picasso/commit/d403a67d11338bb2fcb1af09dc9766b235e27236))

## [0.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso-provider@0.1.0...@toptal/picasso-provider@0.1.1) (2021-09-08)

**Note:** Version bump only for package @toptal/picasso-provider

# 0.1.0 (2021-06-25)

### Features

- [FX-1956] Add picasso-provider package ([#2104](https://github.com/toptal/picasso/issues/2104)) ([8a766bd](https://github.com/toptal/picasso/commit/8a766bd174e9662e663819a3d772b757a08cc9b4))

### BREAKING CHANGES

- Picasso root component has been moved to the separate package - `@toptal/picasso-provider`. This should help us in managing multiple different versions of Picasso package (`@toptal/picasso`) for sub-applications, while the main host application would be able to share Picasso Context via the locked version of `@toptal/picasso-provider` package.

To migrate to the new version you need to change

```
import Picasso from '@toptal/picasso'
```

to

```
import Picasso from '@toptal/picasso-provider'
```

in your applications.
