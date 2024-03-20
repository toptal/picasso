# Change Log

## 14.0.1

### Patch Changes

- [#4196](https://github.com/toptal/picasso/pull/4196) [`a1d523092cc4de6cb376156435b99b1e483f39b9`](https://github.com/toptal/picasso/commit/a1d523092cc4de6cb376156435b99b1e483f39b9) Thanks [@mkrl](https://github.com/mkrl)!
- move `@types/color` from `devDependencies` to `dependencies`

## 14.0.0

### Major Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages

## 13.1.4

### Patch Changes

- [#4132](https://github.com/toptal/picasso/pull/4132) [`c76a0d6d0f68e50bb51927d0b6c3ebdd65c60149`](https://github.com/toptal/picasso/commit/c76a0d6d0f68e50bb51927d0b6c3ebdd65c60149) Thanks [@dependabot](https://github.com/apps/dependabot)!
- bump classnames dependency

## 13.1.3

### Patch Changes

- [#4083](https://github.com/toptal/picasso/pull/4083) [`147fd703c1b9e70d2446bfb5f41dfaeb16a57381`](https://github.com/toptal/picasso/commit/147fd703c1b9e70d2446bfb5f41dfaeb16a57381) Thanks [@sashuk](https://github.com/sashuk)!
- bump `notistack` version

## 13.1.2

### Patch Changes

- [#4067](https://github.com/toptal/picasso/pull/4067) [`60d622ed4`](https://github.com/toptal/picasso/commit/60d622ed47c1c908304464877cfd474bf84863f2) Thanks [@iatanas0v](https://github.com/iatanas0v)!

### picasso-shared types

- fixed `data-private` type to allow `lipsum` value as well

## 13.1.1

### Patch Changes

- [#4058](https://github.com/toptal/picasso/pull/4058) [`cdd77e055`](https://github.com/toptal/picasso/commit/cdd77e055784258b2a189b6957dd0375c570d967) Thanks [@mkrl](https://github.com/mkrl)!

### picasso-shared types

- fixed `data-private` type to be mistakenly `string` instead of `boolean`

## 13.1.0

### Minor Changes

- [#4056](https://github.com/toptal/picasso/pull/4056) [`d70202b0d`](https://github.com/toptal/picasso/commit/d70202b0d9ad9ab379712009b0882ff30f2473d6) Thanks [@mkrl](https://github.com/mkrl)!

### Radio, Checkbox, Tooltip, Avatar, Page.TopBarMenu

- pass `data-private` to relevant DOM elements

## 13.0.0

### Major Changes

- [#3895](https://github.com/toptal/picasso/pull/3895) [`a9f5c85b6`](https://github.com/toptal/picasso/commit/a9f5c85b65b123826d4420acae4b3f897101e814) Thanks [@sashuk](https://github.com/sashuk)!

### Spacings

- add BASE ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md)) and responsive ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/19-responsive-component-spacing-properties.md)) spacing to Picasso's theme and to `picasso-shared`

### Codemod

- add `spacing-values` codemod. Please run the codemod (`npx @toptal/picasso-codemod@latest v39.3.0`) to replace spacing property values of `Container` and `Dropdown` components with BASE-aligned property values according to the https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md. Property values that do not have BASE counterpart or are complex expressions have to be updated manually (non-BASE values have to be replaced with BASE ones after consulting with Design Team), codemod outputs the list of such cases for convenience. Run linter or prettier to align updated code with project code style.

- update peer dependencies for `@toptal/picasso` and `@toptal/picasso-shared`
- rename the codemod for spacings

## 12.1.0

### Minor Changes

- [#3890](https://github.com/toptal/picasso/pull/3890) [`17e25b470`](https://github.com/toptal/picasso/commit/17e25b47007948ee31781d35e94644137707c1c8) Thanks [@sashuk](https://github.com/sashuk)!

### Spacings

- add BASE ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md)) and responsive ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/19-responsive-component-spacing-properties.md)) spacing to Picasso's theme and to `picasso-shared`

## 12.0.0

### Patch Changes

- Updated dependencies [[`87068a468`](https://github.com/toptal/picasso/commit/87068a4680f099185be00863b7ebeada893c0e29)]:
  - @toptal/picasso-provider@3.0.0

## 11.3.0

### Minor Changes

- [#3315](https://github.com/toptal/picasso/pull/3315) [`8d1d3a66`](https://github.com/toptal/picasso/commit/8d1d3a6697a30c1d991a5f7750e6cef189fa6ee8) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  - add new `isForwardRef` util function to detect whether React component has a React.forwardRef wrapper

## 11.2.1

### Patch Changes

- [#3283](https://github.com/toptal/picasso/pull/3283) [`a9218c42`](https://github.com/toptal/picasso/commit/a9218c42b85ed5964909b9493fdd58503d036cb4) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  - add hook `useHasMultilineCounter` for multiline form elements that use counter

## 11.2.0

### Minor Changes

- [#3246](https://github.com/toptal/picasso/pull/3246) [`83f57466`](https://github.com/toptal/picasso/commit/83f57466ab64eb581e172382da63573ee7ff2bb2) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  - add `getElementById` util function

## 11.1.0

### Minor Changes

- [#3183](https://github.com/toptal/picasso/pull/3183) [`9b12b62b`](https://github.com/toptal/picasso/commit/9b12b62b536bf53831dc80fc5eae9c2ee6385c97) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Typography

  - enable `grey-main-2` as a `color` option of Typography
  - update reusable `ColorType`

## 11.0.0

### Patch Changes

- Updated dependencies [[`356678e34`](https://github.com/toptal/picasso/commit/356678e341388e60fce5dcfc5cc4b9aa956d2c02)]:
  - @toptal/picasso-provider@2.0.0

## 10.0.0

### Major Changes

- [#3047](https://github.com/toptal/picasso/pull/3047) [`549bbb96d`](https://github.com/toptal/picasso/commit/549bbb96d4d1a5090b3fbc8169d16f19a939659e) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Dependencies

  - change notistack from a dependency to peerDependency

## 9.0.1

### Patch Changes

- [#2959](https://github.com/toptal/picasso/pull/2959) [`984b826a`](https://github.com/toptal/picasso/commit/984b826af8f54835c6914586c338d60c64c741ff) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  - bump `notistack` to `1.0.10`

## 9.0.0

### Major Changes

- [#2864](https://github.com/toptal/picasso/pull/2864) [`b07a0fe8`](https://github.com/toptal/picasso/commit/b07a0fe8f72d670aa2a1844e1b7da9ec26a19d12) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### dependencies

  - `picasso-provider` is now a peer dependency of `picasso`, you should add it to your own project as a `dependency`

## 8.2.2

### Patch Changes

- [#2840](https://github.com/toptal/picasso/pull/2840) [`38e61c28`](https://github.com/toptal/picasso/commit/38e61c286d48d33f7e4e1080d2f0b48747950e67) Thanks [@vvmarulin](https://github.com/vvmarulin)! - Upgrade `notistack` to version `1.0.6`

- Updated dependencies [[`38e61c28`](https://github.com/toptal/picasso/commit/38e61c286d48d33f7e4e1080d2f0b48747950e67)]:
  - @toptal/picasso-provider@1.1.4

## 8.2.1

### Patch Changes

- [#2806](https://github.com/toptal/picasso/pull/2806) [`81a56673`](https://github.com/toptal/picasso/commit/81a56673a16f0290564d7205f414efebbfd9f7ce) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---
  - Fix format of peerDependency for `react` and `react-dom`
- Updated dependencies [[`81a56673`](https://github.com/toptal/picasso/commit/81a56673a16f0290564d7205f414efebbfd9f7ce)]:
  - @toptal/picasso-provider@1.1.3

## 8.2.0

### Minor Changes

- [#2701](https://github.com/toptal/picasso/pull/2701) [`7d7a17b2`](https://github.com/toptal/picasso/commit/7d7a17b2748364a7880691cfec7b84162380ae11) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  ### Color Type

  - Add `light-blue` color

### Patch Changes

- Updated dependencies [[`a365d67d`](https://github.com/toptal/picasso/commit/a365d67d8d27e2f861a4f7d89e31ef4614e41706)]:
  - @toptal/picasso-provider@1.1.1

## 8.1.0

### Minor Changes

- [#2605](https://github.com/toptal/picasso/pull/2605) [`ec1ab713`](https://github.com/toptal/picasso/commit/ec1ab7130b28cac2ba7ad1080cb0859743cececb) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### React 18

  update peerDependencies to support React@18

### Patch Changes

- Updated dependencies [[`ec1ab713`](https://github.com/toptal/picasso/commit/ec1ab7130b28cac2ba7ad1080cb0859743cececb)]:
  - @toptal/picasso-provider@1.1.0

## 8.0.0

### Major Changes

- [#2569](https://github.com/toptal/picasso/pull/2569) [`e8833df2`](https://github.com/toptal/picasso/commit/e8833df2329c6285840ae02c0d029fe4eebb8247) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Project

  - Update typescript to version 4.6

### Patch Changes

- Updated dependencies [[`e8833df2`](https://github.com/toptal/picasso/commit/e8833df2329c6285840ae02c0d029fe4eebb8247)]:
  - @toptal/picasso-provider@1.0.0

## 7.3.0

### Minor Changes

- [#2521](https://github.com/toptal/picasso/pull/2521) [`fc9b34cc`](https://github.com/toptal/picasso/commit/fc9b34ccad04a2e7926a84eb1d710350f1d663d5) Thanks [@deniskaber](https://github.com/deniskaber)! - Change useLayoutEffect to useIsomorphicLayoutEffect for SSR support

### Patch Changes

- Updated dependencies [[`fc9b34cc`](https://github.com/toptal/picasso/commit/fc9b34ccad04a2e7926a84eb1d710350f1d663d5)]:
  - @toptal/picasso-provider@0.7.1

## 7.2.4

### Patch Changes

- Updated dependencies [[`d82ed00d`](https://github.com/toptal/picasso/commit/d82ed00d8ab94b77654f2b3be4776aa514c44daa)]:
  - @toptal/picasso-provider@0.7.0

## 7.2.3

### Patch Changes

- [#2451](https://github.com/toptal/picasso/pull/2451) [`53efb37c`](https://github.com/toptal/picasso/commit/53efb37cc242cff904a06eb793b5ded47945204e) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  ### Applies to all Components

  - fix linting errors

- Updated dependencies [[`53efb37c`](https://github.com/toptal/picasso/commit/53efb37cc242cff904a06eb793b5ded47945204e)]:
  - @toptal/picasso-provider@0.6.1

## 7.2.2

### Patch Changes

- Updated dependencies [[`16574dee`](https://github.com/toptal/picasso/commit/16574dee549095cc06deccccdbcfb4c7a073a601)]:
  - @toptal/picasso-provider@0.6.0

## 7.2.1

### Patch Changes

- [#2383](https://github.com/toptal/picasso/pull/2383) [`3141521b`](https://github.com/toptal/picasso/commit/3141521ba1bd5eb6aaee9ae2749eb490959e6e7b) Thanks [@TomasSlama](https://github.com/TomasSlama)! - Update `picasso-provider` to the latest version

## 7.2.0

### Minor Changes

- [#2362](https://github.com/toptal/picasso/pull/2362) [`df144e2d`](https://github.com/toptal/picasso/commit/df144e2d5defed03aeabb89cb1654f3d7ace7bfa) Thanks [@denieler](https://github.com/denieler)! - Deleting the fixed version of the reference to `picasso-provider` package to allow more flexible version management for `picasso-provider` package in projects.

## 7.1.1

### Patch Changes

- Updated dependencies [[`6446e620`](https://github.com/toptal/picasso/commit/6446e620808fed2a411fc124821c4cc896add734)]:
  - @toptal/picasso-provider@0.5.0

## 7.1.0

### Minor Changes

- [#2315](https://github.com/toptal/picasso/pull/2315) [`ee92ee0c`](https://github.com/toptal/picasso/commit/ee92ee0cdb2aa0d4b679b25cb1b34be48d5c7a71) Thanks [@ascrazy](https://github.com/ascrazy)! - \* Add `transitionProps` prop for the `Modal`
  - Add `transitionProps` prop for the `Accordion`

## 7.0.2

### Patch Changes

- Updated dependencies [[`34e990a3`](https://github.com/toptal/picasso/commit/34e990a3fe6d66bb204d1d468c505ebe0b8fd127)]:
  - @toptal/picasso-provider@0.4.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [7.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@7.0.0...@toptal/picasso-shared@7.0.1) (2021-11-09)

**Note:** Version bump only for package @toptal/picasso-shared

# [7.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@6.0.0...@toptal/picasso-shared@7.0.0) (2021-10-14)

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

# [6.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@5.0.2...@toptal/picasso-shared@6.0.0) (2021-10-13)

### Features

- **Typography:** update line heights and colors to match BASE 2.0 ([#2184](https://github.com/toptal/picasso/issues/2184)) ([aacd827](https://github.com/toptal/picasso/commit/aacd8271dd6c6ef5093fef78d4a419c48b046db5))

### BREAKING CHANGES

- **Typography:** - Changed line-height of small heading and body

* Removed blue color from Typography
* Removed blue color from OverviewBlock

## [5.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@5.0.1...@toptal/picasso-shared@5.0.2) (2021-09-16)

**Note:** Version bump only for package @toptal/picasso-shared

## [5.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@5.0.0...@toptal/picasso-shared@5.0.1) (2021-09-08)

**Note:** Version bump only for package @toptal/picasso-shared

# [5.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@4.1.1...@toptal/picasso-shared@5.0.0) (2021-06-25)

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

## [4.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@4.1.0...@toptal/picasso-shared@4.1.1) (2021-06-18)

### Bug Fixes

- **AppUpdateNotification:** [ER-12060] Fix non-intractable action buttons ([#2103](https://github.com/toptal/picasso/issues/2103)) ([9de2732](https://github.com/toptal/picasso/commit/9de2732fb2d1c31f21c938a35c5869a752fb3305))

# [4.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@4.0.0...@toptal/picasso-shared@4.1.0) (2021-05-24)

### Features

- **Page:** make naming consistent ([#2078](https://github.com/toptal/picasso/issues/2078)) ([a679bab](https://github.com/toptal/picasso/commit/a679bab9bc6af46963b6866ab8e918ca318a9ecc))

# [4.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@3.0.11...@toptal/picasso-shared@4.0.0) (2021-04-29)

### Features

- **button:** make children required ([#2049](https://github.com/toptal/picasso/issues/2049)) ([d38f7ea](https://github.com/toptal/picasso/commit/d38f7ea871c16aa2808eddcebc7be0ab56713bdf))

### BREAKING CHANGES

- **button:** use Button.Circular for buttons without text

## [3.0.11](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@3.0.10...@toptal/picasso-shared@3.0.11) (2021-03-30)

**Note:** Version bump only for package @toptal/picasso-shared

## [3.0.10](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@3.0.9...@toptal/picasso-shared@3.0.10) (2021-03-30)

### Bug Fixes

- readme not being published to npm ([#2006](https://github.com/toptal/picasso/issues/2006)) ([1b82c73](https://github.com/toptal/picasso/commit/1b82c7382acbc4d17423c28e42f1dadf773abe11))

## [3.0.9](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@3.0.8...@toptal/picasso-shared@3.0.9) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso-shared

## [3.0.8](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@3.0.7...@toptal/picasso-shared@3.0.8) (2021-03-24)

### Bug Fixes

- prepublish ([#2004](https://github.com/toptal/picasso/issues/2004)) ([800db08](https://github.com/toptal/picasso/commit/800db08bd0f47fb2b3f0752e6e5b3952ae503723))

## [3.0.7](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@3.0.6...@toptal/picasso-shared@3.0.7) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso-shared

## [3.0.6](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@3.0.5...@toptal/picasso-shared@3.0.6) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso-shared

## [3.0.5](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@3.0.4...@toptal/picasso-shared@3.0.5) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso-shared

## [3.0.4](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@3.0.3...@toptal/picasso-shared@3.0.4) (2021-03-22)

**Note:** Version bump only for package @toptal/picasso-shared

## [3.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@3.0.2...@toptal/picasso-shared@3.0.3) (2021-03-16)

### Bug Fixes

- **Autocomplete:** loading test case ([#1972](https://github.com/toptal/picasso/issues/1972)) ([6df7f0a](https://github.com/toptal/picasso/commit/6df7f0ace3c95ca73cc71e7501d4c2bb1902ca6c))

## [3.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@3.0.1...@toptal/picasso-shared@3.0.2) (2021-03-12)

### Bug Fixes

- use correct typing of deepmerge ([#1970](https://github.com/toptal/picasso/issues/1970)) ([b753267](https://github.com/toptal/picasso/commit/b75326780033027aa315fc81ba45b3da541e2c60))

## [3.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@2.1.4...@toptal/picasso-shared@3.0.1) (2021-03-10)

**Note:** Version bump only for package @toptal/picasso-shared

## [2.1.4](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@2.1.2...@toptal/picasso-shared@2.1.4) (2021-03-09)

**Note:** Version bump only for package @toptal/picasso-shared

## [2.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@2.1.1...@toptal/picasso-shared@2.1.2) (2021-03-02)

### Bug Fixes

- **PageArticle:** make smaller padding for smaller screens ([#1941](https://github.com/toptal/picasso/issues/1941)) ([c74d603](https://github.com/toptal/picasso/commit/c74d6031a5b9cae00298fc18f20807a25e6be3fe))

## [2.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@2.1.0...@toptal/picasso-shared@2.1.1) (2021-03-02)

**Note:** Version bump only for package @toptal/picasso-shared

# [2.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@2.0.6...@toptal/picasso-shared@2.1.0) (2021-02-25)

### Features

- cross platform package builds ([#1925](https://github.com/toptal/picasso/issues/1925)) ([21f30be](https://github.com/toptal/picasso/commit/21f30beeb360fcc67c88d70af5c3234d8dcfe213))

## [2.0.6](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@2.0.5...@toptal/picasso-shared@2.0.6) (2021-02-03)

**Note:** Version bump only for package @toptal/picasso-shared

## [2.0.5](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@2.0.4...@toptal/picasso-shared@2.0.5) (2021-01-20)

**Note:** Version bump only for package @toptal/picasso-shared

## [2.0.4](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@2.0.3...@toptal/picasso-shared@2.0.4) (2021-01-18)

**Note:** Version bump only for package @toptal/picasso-shared

## [2.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@2.0.2...@toptal/picasso-shared@2.0.3) (2021-01-18)

### Bug Fixes

- **MediaSkeletonLoader:** size variants ([#1840](https://github.com/toptal/picasso/issues/1840)) ([de9dd52](https://github.com/toptal/picasso/commit/de9dd52bec3cb1674d985e850ade7bbeb023ab6b))

## [2.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@2.0.1...@toptal/picasso-shared@2.0.2) (2021-01-05)

**Note:** Version bump only for package @toptal/picasso-shared

## [2.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@2.0.0...@toptal/picasso-shared@2.0.1) (2020-12-29)

**Note:** Version bump only for package @toptal/picasso-shared

# [2.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.17.0...@toptal/picasso-shared@2.0.0) (2020-12-22)

### Features

- v5 ([#1487](https://github.com/toptal/picasso/issues/1487)) ([ee77cde](https://github.com/toptal/picasso/commit/ee77cde12f8f7670f50958ae3973327eb513d9f9))

# [1.17.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.16.7...@toptal/picasso-shared@1.17.0) (2020-11-10)

### Features

- update staging banner color and favicon ([#1668](https://github.com/toptal/picasso/issues/1668)) ([432915d](https://github.com/toptal/picasso/commit/432915dcddf320cd0554a283316a86839fb637da))

## [1.16.7](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.16.6...@toptal/picasso-shared@1.16.7) (2020-11-06)

**Note:** Version bump only for package @toptal/picasso-shared

## [1.16.6](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.16.5...@toptal/picasso-shared@1.16.6) (2020-11-02)

**Note:** Version bump only for package @toptal/picasso-shared

## [1.16.5](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.16.4...@toptal/picasso-shared@1.16.5) (2020-10-27)

**Note:** Version bump only for package @toptal/picasso-shared

## [1.16.4](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.16.3...@toptal/picasso-shared@1.16.4) (2020-09-09)

**Note:** Version bump only for package @toptal/picasso-shared

## [1.16.3](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.16.2...@toptal/picasso-shared@1.16.3) (2020-08-31)

**Note:** Version bump only for package @toptal/picasso-shared

## [1.16.2](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.16.1...@toptal/picasso-shared@1.16.2) (2020-08-26)

**Note:** Version bump only for package @toptal/picasso-shared

## [1.16.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.16.0...@toptal/picasso-shared@1.16.1) (2020-08-11)

**Note:** Version bump only for package @toptal/picasso-shared

# [1.16.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.15.2...@toptal/picasso-shared@1.16.0) (2020-07-13)

### Features

- use AP-style title case for components ([#1422](https://github.com/toptal/picasso/issues/1422)) ([b64ed4c](https://github.com/toptal/picasso/commit/b64ed4cdb50c9d306c1c492332e4db498ab0cb72))

## [1.15.2](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.15.1...@toptal/picasso-shared@1.15.2) (2020-07-01)

### Bug Fixes

- typings in type declarations for picasso-shared ([#1402](https://github.com/toptal/picasso/issues/1402)) ([4129e7c](https://github.com/toptal/picasso/commit/4129e7c04526f7f83a2e1074bd76f9a0ae3d5184))

## [1.15.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.15.0...@toptal/picasso-shared@1.15.1) (2020-06-16)

**Note:** Version bump only for package @toptal/picasso-shared

# [1.15.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.14.0...@toptal/picasso-shared@1.15.0) (2020-06-11)

### Features

- add global component props overriding ([#1357](https://github.com/toptal/picasso/issues/1357)) ([c251d5b](https://github.com/toptal/picasso/commit/c251d5b09353d407b2332b177921a0d4dad54470))

# [1.14.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.13.1...@toptal/picasso-shared@1.14.0) (2020-06-03)

### Features

- add titleCase configuration for Picasso ([#1354](https://github.com/toptal/picasso/issues/1354)) ([072add9](https://github.com/toptal/picasso/commit/072add9e2e7a65bc16aabf327136ab6899750503))

## [1.13.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.13.0...@toptal/picasso-shared@1.13.1) (2020-06-02)

**Note:** Version bump only for package @toptal/picasso-shared

# [1.13.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.12.5...@toptal/picasso-shared@1.13.0) (2020-05-21)

### Features

- update logo ([#1324](https://github.com/toptal/picasso/issues/1324)) ([10a43ae](https://github.com/toptal/picasso/commit/10a43ae3624ded54e713681217643affa80bdea9))

## [1.12.5](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.12.4...@toptal/picasso-shared@1.12.5) (2020-05-21)

**Note:** Version bump only for package @toptal/picasso-shared

## [1.12.4](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.12.2...@toptal/picasso-shared@1.12.4) (2020-05-14)

### Bug Fixes

- add picasso/utils import alias ([#1305](https://github.com/toptal/picasso/issues/1305)) ([905f808](https://github.com/toptal/picasso/commit/905f80867f940dd7971a8bb7454a5dc73a42818f))

## [1.12.3](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.12.2...@toptal/picasso-shared@1.12.3) (2020-05-14)

### Bug Fixes

- add picasso/utils import alias ([#1305](https://github.com/toptal/picasso/issues/1305)) ([905f808](https://github.com/toptal/picasso/commit/905f80867f940dd7971a8bb7454a5dc73a42818f))

## [1.12.2](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.12.1...@toptal/picasso-shared@1.12.2) (2020-05-12)

**Note:** Version bump only for package @toptal/picasso-shared

## [1.12.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.12.0...@toptal/picasso-shared@1.12.1) (2020-05-07)

### Bug Fixes

- **Picasso:** simplify theme override ([#1283](https://github.com/toptal/picasso/issues/1283)) ([56a3999](https://github.com/toptal/picasso/commit/56a3999b53e3c934255a9d13b86d87cba6620296))

# [1.12.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.11.5...@toptal/picasso-shared@1.12.0) (2020-04-30)

### Features

- **Picasso:** add theme property ([#1262](https://github.com/toptal/picasso/issues/1262)) ([1ca7d44](https://github.com/toptal/picasso/commit/1ca7d44ee1716afcd5fddb038b4ac21fe7e35334))

## [1.11.5](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.11.4...@toptal/picasso-shared@1.11.5) (2020-04-30)

### Bug Fixes

- **Accordion:** [FX-873] Add custom summary example, buttons line height ([#1271](https://github.com/toptal/picasso/issues/1271)) ([ea439c3](https://github.com/toptal/picasso/commit/ea439c3422b723aff0e0d6b0b9825d167ac0e87d))

## [1.11.4](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.11.3...@toptal/picasso-shared@1.11.4) (2020-04-27)

### Bug Fixes

- useBreakpoint flicky implementation ([#1256](https://github.com/toptal/picasso/issues/1256)) ([a0be5c6](https://github.com/toptal/picasso/commit/a0be5c6632d0e93e14cece10587dfa233f238f18))

## [1.11.3](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.11.2...@toptal/picasso-shared@1.11.3) (2020-04-24)

### Bug Fixes

- **Favicon:** support temploy environment ([#1252](https://github.com/toptal/picasso/issues/1252)) ([e6a0097](https://github.com/toptal/picasso/commit/e6a0097947658c1d890011a2efca944bee9c3efd))

## [1.11.2](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.11.1...@toptal/picasso-shared@1.11.2) (2020-04-15)

### Bug Fixes

- **Select:** randomize id attribute value in forms ([#1225](https://github.com/toptal/picasso/issues/1225)) ([0f7b56b](https://github.com/toptal/picasso/commit/0f7b56b7103aa88acc56c9e0a6b3e09bf5936022))

## [1.11.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.11.0...@toptal/picasso-shared@1.11.1) (2020-04-09)

**Note:** Version bump only for package @toptal/picasso-shared

# [1.11.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.10.7...@toptal/picasso-shared@1.11.0) (2020-04-06)

### Features

- add drawer component ([#1211](https://github.com/toptal/picasso/issues/1211)) ([9dc2233](https://github.com/toptal/picasso/commit/9dc2233bf5cc276205fadba982ccc452b5099175))

## [1.10.7](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.10.6...@toptal/picasso-shared@1.10.7) (2020-03-30)

### Bug Fixes

- lint errors ([#1191](https://github.com/toptal/picasso/issues/1191)) ([2d830ac](https://github.com/toptal/picasso/commit/2d830ac37b63e5642ccc2c9a0016458dbdd6f7a6))

## [1.10.6](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.10.5...@toptal/picasso-shared@1.10.6) (2020-03-25)

### Bug Fixes

- [FX-855] Fix class names collision for chrome extensions ([#1186](https://github.com/toptal/picasso/issues/1186)) ([5ea5fac](https://github.com/toptal/picasso/commit/5ea5fac7e63d6e68086a73612f32d8c69ea42a6e))

## [1.10.5](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.10.4...@toptal/picasso-shared@1.10.5) (2020-03-25)

### Bug Fixes

- [FX-855] Fix class names collisions for multiple Picasso ([#1182](https://github.com/toptal/picasso/issues/1182)) ([8f9fb65](https://github.com/toptal/picasso/commit/8f9fb654283a06d1714ef2d299cda95f9f2f7b27))

## [1.10.4](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.10.3...@toptal/picasso-shared@1.10.4) (2020-03-23)

**Note:** Version bump only for package @toptal/picasso-shared

## [1.10.3](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.10.2...@toptal/picasso-shared@1.10.3) (2020-03-18)

### Bug Fixes

- **notificationprovider:** fix notification spacing on pages with header ([#1169](https://github.com/toptal/picasso/issues/1169)) ([80fc1c9](https://github.com/toptal/picasso/commit/80fc1c91e76813bf77406e991e62ac39dd19a4aa)), closes [#1168](https://github.com/toptal/picasso/issues/1168)

## [1.10.2](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.10.1...@toptal/picasso-shared@1.10.2) (2020-03-17)

### Bug Fixes

- **pageheader:** update color of light variant ([#1170](https://github.com/toptal/picasso/issues/1170)) ([ffb4004](https://github.com/toptal/picasso/commit/ffb4004e56571facd3d3b0f95470e16a20f10160))

## [1.10.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.10.0...@toptal/picasso-shared@1.10.1) (2020-03-11)

### Bug Fixes

- **Page:** [FX-823] Fix viewport scaling ([#1159](https://github.com/toptal/picasso/issues/1159)) ([a037d1b](https://github.com/toptal/picasso/commit/a037d1bead309b4422df2f7ff07c65b2c36b3a85))

# [1.10.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.9.2...@toptal/picasso-shared@1.10.0) (2020-02-26)

### Features

- support test environment at root component ([#1133](https://github.com/toptal/picasso/issues/1133)) ([9e3baaa](https://github.com/toptal/picasso/commit/9e3baaa6b3c23479a46695d0d5a85a702df83038))

## [1.9.2](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.9.1...@toptal/picasso-shared@1.9.2) (2020-02-24)

### Bug Fixes

- **favicon:** prevent webpack compilation warning ([#1125](https://github.com/toptal/picasso/issues/1125)) ([b853b3b](https://github.com/toptal/picasso/commit/b853b3ba86459ef12e9d68e11aa1684e05abc6d3)), closes [#1124](https://github.com/toptal/picasso/issues/1124)

## [1.9.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.9.0...@toptal/picasso-shared@1.9.1) (2020-02-20)

### Bug Fixes

- add environment prop to picasso root component ([#1120](https://github.com/toptal/picasso/issues/1120)) ([3282f58](https://github.com/toptal/picasso/commit/3282f580dcf4acf938e49086112d4aca2a66efee))

# [1.9.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.8.0...@toptal/picasso-shared@1.9.0) (2020-02-20)

### Features

- add test utils ([#1123](https://github.com/toptal/picasso/issues/1123)) ([eddc6df](https://github.com/toptal/picasso/commit/eddc6df73c7be5071012a227e1932b607964f6bc))

# [1.8.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.7.0...@toptal/picasso-shared@1.8.0) (2020-02-19)

### Features

- disable responsive ui ([#1113](https://github.com/toptal/picasso/issues/1113)) ([cdf111f](https://github.com/toptal/picasso/commit/cdf111f0f50f704406c2cd1a88246458a610a2b7))

# [1.7.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.6.1...@toptal/picasso-shared@1.7.0) (2020-02-13)

### Features

- **picasso:** disable scaling inputs in iOS Safari ([#1108](https://github.com/toptal/picasso/issues/1108)) ([92acce5](https://github.com/toptal/picasso/commit/92acce5680fa9f4c6f2723bfe6d61f6dc4206a14))

## [1.6.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.6.0...@toptal/picasso-shared@1.6.1) (2020-02-12)

**Note:** Version bump only for package @toptal/picasso-shared

# [1.6.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.4.0...@toptal/picasso-shared@1.6.0) (2020-02-12)

### Features

- add Favicon component ([#1085](https://github.com/toptal/picasso/issues/1085)) ([38a834f](https://github.com/toptal/picasso/commit/38a834fbbe091503d3d145269c913ee8c4bf5738))

# [1.5.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.4.0...@toptal/picasso-shared@1.5.0) (2020-02-12)

### Features

- add Favicon component ([#1085](https://github.com/toptal/picasso/issues/1085)) ([38a834f](https://github.com/toptal/picasso/commit/38a834fbbe091503d3d145269c913ee8c4bf5738))

# [1.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.3.1...@toptal/picasso-shared@1.4.0) (2020-02-05)

### Features

- support wide desktop screen ([#1063](https://github.com/toptal/picasso/issues/1063)) ([0c9eb83](https://github.com/toptal/picasso/commit/0c9eb8366ecb8576143c63bf5a8777103b3e00d9))

## [1.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.3.0...@toptal/picasso-shared@1.3.1) (2020-01-31)

**Note:** Version bump only for package @toptal/picasso-shared

# [1.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.2.1...@toptal/picasso-shared@1.3.0) (2020-01-24)

### Features

- **logo:** replace the logo with the 2020 design ([#1044](https://github.com/toptal/picasso/issues/1044)) ([ff58ddb](https://github.com/toptal/picasso/commit/ff58ddb8592b36db6f421348053e57133d267dac))

## [1.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.2.0...@toptal/picasso-shared@1.2.1) (2020-01-09)

### Bug Fixes

- **Notification:** [FX-701] Fix missing context when using in Modal ([#1003](https://github.com/toptal/picasso/issues/1003)) ([c893c00](https://github.com/toptal/picasso/commit/c893c00da9e2ddef2196f7382efb86ddbc1cc1fe))

# [1.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.1.6...@toptal/picasso-shared@1.2.0) (2020-01-02)

### Features

- **helpbox:** some tweaks ([#994](https://github.com/toptal/picasso/issues/994)) ([b4de027](https://github.com/toptal/picasso/commit/b4de0270426af6072dfea87493a08e2ab061c022))

## [1.1.6](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.1.5...@toptal/picasso-shared@1.1.6) (2019-12-26)

**Note:** Version bump only for package @toptal/picasso-shared

## [1.1.5](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.1.4...@toptal/picasso-shared@1.1.5) (2019-12-24)

**Note:** Version bump only for package @toptal/picasso-shared

## [1.1.4](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.1.3...@toptal/picasso-shared@1.1.4) (2019-12-24)

**Note:** Version bump only for package @toptal/picasso-shared

## [1.1.3](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.1.2...@toptal/picasso-shared@1.1.3) (2019-12-16)

### Bug Fixes

- create Popper component ([#956](https://github.com/toptal/picasso/issues/956)) ([18eaa09](https://github.com/toptal/picasso/commit/18eaa09468917673bf8d5689b1d6e4ff2f38a4f6))

## [1.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.1.1...@toptal/picasso-shared@1.1.2) (2019-12-12)

### Bug Fixes

- [FX-653] Fix em-related sizes in components ([#958](https://github.com/toptal/picasso/issues/958)) ([726799c](https://github.com/toptal/picasso/commit/726799c02a11e4f23b7bc211eeb5c51a101ae2ce))

## [1.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.1.0...@toptal/picasso-shared@1.1.1) (2019-12-10)

### Bug Fixes

- correct typings for withClasses HOC ([#949](https://github.com/toptal/picasso/issues/949)) ([053d6f5](https://github.com/toptal/picasso/commit/053d6f5eb7dcc9ad6d4ac3d81b702c3bf958322d))

# [1.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.0.1...@toptal/picasso-shared@1.1.0) (2019-12-09)

### Features

- [BIL-789] extend NotificationProvider with createPortal ([#777](https://github.com/toptal/picasso/issues/777)) ([eaa69c8](https://github.com/toptal/picasso/commit/eaa69c8ac1f31cc623bcd7ce5a4fc768d836fe65))

## [1.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-shared@1.0.0...@toptal/picasso-shared@1.0.1) (2019-12-05)

### Bug Fixes

- fix tree-shaking ([#941](https://github.com/toptal/picasso/issues/941)) ([6a9d2a0](https://github.com/toptal/picasso/commit/6a9d2a02f8c692e3b061a026d3cc5d748e9f2263))

# 1.0.0 (2019-12-03)

### Features

- [FX-593] Fix package json versions ([#929](https://github.com/toptal/picasso/issues/929)) ([340a01c](https://github.com/toptal/picasso/commit/340a01c1806ff9e5b9a475dd1821899c5384c33a))
- v4 ([#820](https://github.com/toptal/picasso/issues/820)) ([4378192](https://github.com/toptal/picasso/commit/437819284fe13a6385346c730912d7b94adfdf44))

### BREAKING CHANGES

- Picasso v4 release

## @toptal/picasso

- **Radio:** Changed type of the `label` prop and now `ReactNode` is allowed to pass there (https://github.com/toptal/picasso/pull/910)
- **Select:** Added loading indicator. (https://github.com/toptal/picasso/pull/829)
- **TagSelector:** Fix issue with size of the dropdown menu (https://github.com/toptal/picasso/pull/905)

### BREAKING CHANGES:

- Remove all lab components from the core Picasso and moved them to `@toptal/picasso-lab` package (https://github.com/toptal/picasso/pull/876)
- **Accordion:** Now, no styles are applied to summary and details of accordion by default. It is the responsibility of the user to style them or you have an option to use sub-components
  `Accordion.Summary` and `Accordion.Details` to style summary and details according to the BASE design system (https://github.com/toptal/picasso/pull/814)
- **Autocomplete:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/858)
- **Autocomplete:** Changed type definition for Item to allow custom Item type shape (https://github.com/toptal/picasso/pull/887):
  - `onOtherOptionSelect` passing only `inputValue` instead of new `Item`
  - `getDisplayValue` item is of type `Item` not Autocomplete's Item
  - Item interface changed `text` from required to optional
  - Item allows custom props
  - onChange changed signature and got the second argument ‘options’
- **Autocomplete:** Added opportunity to hide NoOptions label via passing `null` as `options` (https://github.com/toptal/picasso/pull/901)
- **Checkbox:**: When Checkbox is used without a label, now it does not have any margins. Also, changed a type of the `label` prop and now you can pass ReactNode there (https://github.com/toptal/picasso/pull/912)
- **Dropdown:** Removed deprecated `anchorOrigin` and `transformOrigin` props (https://github.com/toptal/picasso/pull/913)
- **Icon:** Change type of color prop. Now it accepts a string.
  `<Settings16 color={palette.red.main} />` -> `<Settings16 color='red' />` (https://github.com/toptal/picasso/pull/914)
- **Image**: Change default variant type name to `rectangle` (https://github.com/toptal/picasso/pull/888)
- **Link**: Change default variant type name to `anchor` (https://github.com/toptal/picasso/pull/888)
- **Link**: Remove `invert` prop. You should control color via `color` prop instead (https://github.com/toptal/picasso/pull/892)
- **Loaded**: Change default variant type name to `blue` (https://github.com/toptal/picasso/pull/888)
- **Logo**: Change default variant type name to `blue` (https://github.com/toptal/picasso/pull/888)
- **Logo**: Change default variant type name to `blue` (https://github.com/toptal/picasso/pull/888)
- **Modal:** Removed deprecated useModal hook. It was replaced by useModals hook (https://github.com/toptal/picasso/pull/913)
- **MonthSelect:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/911)
- **Page.Content:** Make it to be `display: flex` by default (https://github.com/toptal/picasso/pull/913)
- **PromptModal:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/911)
- **Select:** Replaced `Select` with a brand new `Select` with a search. Component API was changed
  - value prop changed a type
  - onChange has a strict type check for the value type and not receiving a child node anymore
  - because of adding input and changing the internals of the component - markup is changed, so your unit test snapshots should be updated
  - Input component in error state doesn't have a background color anymore
    (https://github.com/toptal/picasso/pull/812)
- **Sidebar:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/876)
- **Slider:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/911)
- **TagSelector:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/858)
- **TagSelector:** Changed type definition for Item to allow custom Item type shape (https://github.com/toptal/picasso/pull/887):
  - `onOtherOptionSelect` passing only `inputValue` instead of new `Item`
  - Item interface changed `text` and `value` from required to optional
  - Item allows custom props
- **TextField:** Removed deprecated TextField component. It was replaced by Input (https://github.com/toptal/picasso/pull/913)
- **YearSelect:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/911)

## @toptal/picasso-lab

- **DatePicker:** Change `onSelect` to `onChange` (https://github.com/toptal/picasso/pull/888)
