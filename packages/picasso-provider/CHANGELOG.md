# Change Log

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
