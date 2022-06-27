# Change Log

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
