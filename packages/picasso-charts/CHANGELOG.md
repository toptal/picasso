# Change Log

## 14.0.0

### Patch Changes

- Updated dependencies [[`4370e2d8`](https://github.com/toptal/picasso/commit/4370e2d84c3768719a530c621eefae835e163e73)]:
  - @toptal/picasso@17.1.0

## 13.0.0

### Patch Changes

- Updated dependencies [[`ce7be40f`](https://github.com/toptal/picasso/commit/ce7be40fbfb04536058cc94b03ccf86f7125529b), [`b9859b6c`](https://github.com/toptal/picasso/commit/b9859b6c246f582d336250b7df45e6c284902299), [`6446e620`](https://github.com/toptal/picasso/commit/6446e620808fed2a411fc124821c4cc896add734)]:
  - @toptal/picasso@17.0.0
  - @toptal/picasso-shared@7.1.1

## 12.0.0

### Patch Changes

- Updated dependencies [[`9f6579ad`](https://github.com/toptal/picasso/commit/9f6579ad97304aaa39ef3a388fda6b0ac1a4c2f6), [`ee92ee0c`](https://github.com/toptal/picasso/commit/ee92ee0cdb2aa0d4b679b25cb1b34be48d5c7a71)]:
  - @toptal/picasso@16.4.0
  - @toptal/picasso-shared@7.1.0

## 11.0.0

### Patch Changes

- Updated dependencies [[`7c9cc79b`](https://github.com/toptal/picasso/commit/7c9cc79b007f546c310684000cbbc6b1870516a9), [`bc7427db`](https://github.com/toptal/picasso/commit/bc7427dbf53fef3e1f1a60c0d9edf57c997ce019)]:
  - @toptal/picasso@16.3.0

## 10.0.0

### Patch Changes

- Updated dependencies [[`be64ee77`](https://github.com/toptal/picasso/commit/be64ee77b10b683ec04a4ca9a702b94e6590f9a4), [`1c5807b1`](https://github.com/toptal/picasso/commit/1c5807b12b35bc85d7700cacd1519a267eb7280f)]:
  - @toptal/picasso@16.2.0

## 9.0.0

### Patch Changes

- Updated dependencies [[`ba2ddd61`](https://github.com/toptal/picasso/commit/ba2ddd610e44ac0b6776436858ec3976343f5d65)]:
  - @toptal/picasso@16.1.0

## 8.0.0

### Patch Changes

- Updated dependencies [[`4953df3d`](https://github.com/toptal/picasso/commit/4953df3d2642c704b404ff565e63c3d53b415832)]:
  - @toptal/picasso@16.0.0

## 7.0.0

### Patch Changes

- Updated dependencies [[`0dcd4178`](https://github.com/toptal/picasso/commit/0dcd4178c581d7b390834e2f34c9cb661771c841)]:
  - @toptal/picasso@15.2.0

## 6.0.0

### Patch Changes

- Updated dependencies [[`36fc6c72`](https://github.com/toptal/picasso/commit/36fc6c72f1edd39314f6ca1ac559a28c8ffc5b8c), [`3d484420`](https://github.com/toptal/picasso/commit/3d48442096da95eabdbf74b3975fea9050a794bd)]:
  - @toptal/picasso@15.1.0

## 5.0.0

### Major Changes

- [#2226](https://github.com/toptal/picasso/pull/2226) [`6619b3d8`](https://github.com/toptal/picasso/commit/6619b3d8011b1dae26032a4144e3228d07dc9544) Thanks [@LashaJini](https://github.com/LashaJini)! - Removed static `data-testid` values and replaced them with dynamic ones, which
  means that now you should manually provide values for them.

  ##### Autocomplete

  `picasso/src/Autocomplete/Autocomplete.tsx`

  Has 2 new dynamic `data-testid`s for `Input` and `InputAdornment`. To add
  custom `data-testid`s user should set values for `testIds.input` or
  `testIds.InputAdornment`. For example:

  ```jsx
  <Autocomplete
    testIds={{ input: 'custom-name-1', loadingAdornment: 'custom-name-2' }}
    {...props}
  />
  ```

  ##### PageAutocomplete

  `picasso/src/PageAutocomplete/PageAutocomplete.tsx`

  Has 2 new dynamic `data-testid`s like `Autocomplete` does.

  ##### Menu

  `picasso/src/Menu/Menu.tsx`

  Has 1 new dynamic `data-testid` for `MenuItem`. To add custom `data-testid`
  user should set value for `testIds.menuItem`. For example:

  ```jsx
  <Menu testIds={{ menuItem: 'custom-name-1' }} {...props} />
  ```

  ##### BarChart

  `picasso-charts/src/BarChart/BarChart.tsx`

  Has 1 new dynamic `data-testid` for `Tooltip`. To add custom `data-testitd`
  user should set value for `testIds.tooltip`. For example:

  ```jsx
  <BarChart testIds={{ tooltip: 'custom-name-1' }} {...props} />
  ```

  ##### DatePicker

  `picasso-lab/src/DatePicker/DatePicker.tsx`

  Has 2 new dynamic `data-testid`s for `Input` and `Calendar`. To add custom
  `data-testid` user should set values for `testIds.input` or `testIds.calendar`.
  For example:

  ```jsx
  <DatePicker
    testIds={{ input: 'custom-name-1', calendar: 'custom-name-2' }}
    {...props}
  />
  ```

  ##### Accordion

  `picasso/src/Accordion/Accordion.tsx`

  Has 2 new dynamic `data-testid`s for `EmptyAccordionSummary` and
  `AccordionSummary`. To add custom `data-testid`s user shold set values for
  `testIds.emptyAccordionSummary` or `testIds.accordionSummary`. For example:

  ```jsx
  <Accordion
    testIds={{
      emptyAccordionSummary: 'custom-name-1',
      calendar: 'custom-name-2'
    }}
    {...props}
  />
  ```

  ##### FileListItem

  `picasso/src/FileListItem/FileListItem.tsx`

  Has 1 new dynamic `data-testid` for `ProgressBar`. To add custom `data-testid`
  user should set value for `testIds.progressBar`. For example:

  ```jsx
  <FileListItem testIds={{ progressBar: 'custom-name-1' }} {...props} />
  ```

  ##### OutlinedInput

  `picasso/src/OutlinedInput/OutlinedInput.tsx`

  Has 1 new dynamic `data-testid` for `InputAdornment`. To add custom
  `data-testid` user should set value for `testIds.resetButton`. For example:

  ```jsx
  <OutlinedInput testIds={{ resetButton: 'custom-name-1' }} {...props} />
  ```

  ##### Input

  `picasso/src/Input/Input.tsx`

  Has 2 new dynamic `data-testid`s for `InputAdornment` and for `OutlinedInput`
  component's child component - `InputAdornment`. To add custom `data-testid`
  user should set values for `testIds.inputAdornment` or `testIds.resetButton`.
  For example:

  ```jsx
  <Input
    testIds={{ inputAdornment: 'custom-name-1', resetButton: 'custom-name-2' }}
    {...props}
  />
  ```

  ##### CategoriesChartTooltip

  `topkit-analytics-charts/src/CategoriesChartTooltip/CategoriesChartTooltip.tsx`

  Has 1 new dynamic `data-testid` for `Paper`. To add custom `data-testid` user
  should set value for `testIds.paper`. For example:

  ```jsx
  <CategoriesChartTooltip testIds={{ paper: 'custom-name-1' }} {...props} />
  ```

### Patch Changes

- Updated dependencies [[`88b091e2`](https://github.com/toptal/picasso/commit/88b091e2be71bb5aeae51a051d3653ccb10512bc), [`6619b3d8`](https://github.com/toptal/picasso/commit/6619b3d8011b1dae26032a4144e3228d07dc9544), [`f081e380`](https://github.com/toptal/picasso/commit/f081e3800513ba85c5c5f7a077b2c472db18c867)]:
  - @toptal/picasso@15.0.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@4.0.2...@toptal/picasso-charts@4.0.3) (2021-10-18)

**Note:** Version bump only for package @toptal/picasso-charts

## [4.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@4.0.1...@toptal/picasso-charts@4.0.2) (2021-10-14)

**Note:** Version bump only for package @toptal/picasso-charts

## [4.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@4.0.0...@toptal/picasso-charts@4.0.1) (2021-10-14)

**Note:** Version bump only for package @toptal/picasso-charts

# [4.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@3.0.0...@toptal/picasso-charts@4.0.0) (2021-10-14)

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

# [3.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.3.0...@toptal/picasso-charts@3.0.0) (2021-10-13)

### Features

- **Typography:** update line heights and colors to match BASE 2.0 ([#2184](https://github.com/toptal/picasso/issues/2184)) ([aacd827](https://github.com/toptal/picasso/commit/aacd8271dd6c6ef5093fef78d4a419c48b046db5))

### BREAKING CHANGES

- **Typography:** - Changed line-height of small heading and body

* Removed blue color from Typography
* Removed blue color from OverviewBlock

# [2.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.2.3...@toptal/picasso-charts@2.3.0) (2021-09-27)

### Features

- **Icon:** [SPB-2461] add transfer icon ([#2177](https://github.com/toptal/picasso/issues/2177)) ([caee460](https://github.com/toptal/picasso/commit/caee460457267392067879b29746535fcc118543))

## [2.2.3](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.2.2...@toptal/picasso-charts@2.2.3) (2021-09-09)

### Bug Fixes

- **picasso:** add explicit dependency on debounce ([#2161](https://github.com/toptal/picasso/issues/2161)) ([7471191](https://github.com/toptal/picasso/commit/7471191f2e7f6e3953e3066d627fc25209dda9c4))

## [2.2.2](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.2.1...@toptal/picasso-charts@2.2.2) (2021-09-08)

**Note:** Version bump only for package @toptal/picasso-charts

## [2.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.2.0...@toptal/picasso-charts@2.2.1) (2021-08-15)

### Bug Fixes

- fix path of generated component ([#2127](https://github.com/toptal/picasso/issues/2127)) ([fa175e6](https://github.com/toptal/picasso/commit/fa175e6cfa27cced19c4cc920b7d5380be6ef614))

# [2.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.1.0...@toptal/picasso-charts@2.2.0) (2021-06-02)

### Features

- **CategoriesChart:** add categories chart ([#2024](https://github.com/toptal/picasso/issues/2024)) ([c0860fb](https://github.com/toptal/picasso/commit/c0860fb7a0c8153ad7d62f9d6684abff6c7455ad))

# [2.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.0.10...@toptal/picasso-charts@2.1.0) (2021-05-14)

### Features

- **Typography:** update green color ([#2071](https://github.com/toptal/picasso/issues/2071)) ([6591aac](https://github.com/toptal/picasso/commit/6591aac722c0567d116f003dab9d168ccd1362c2))

## [2.0.10](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.0.9...@toptal/picasso-charts@2.0.10) (2021-04-28)

**Note:** Version bump only for package @toptal/picasso-charts

## [2.0.9](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.0.8...@toptal/picasso-charts@2.0.9) (2021-03-30)

**Note:** Version bump only for package @toptal/picasso-charts

## [2.0.8](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.0.7...@toptal/picasso-charts@2.0.8) (2021-03-25)

### Bug Fixes

- readme not being published to npm ([#2006](https://github.com/toptal/picasso/issues/2006)) ([1b82c73](https://github.com/toptal/picasso/commit/1b82c7382acbc4d17423c28e42f1dadf773abe11))

## [2.0.7](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.0.6...@toptal/picasso-charts@2.0.7) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso-charts

## [2.0.6](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.0.5...@toptal/picasso-charts@2.0.6) (2021-03-24)

### Bug Fixes

- prepublish ([#2004](https://github.com/toptal/picasso/issues/2004)) ([800db08](https://github.com/toptal/picasso/commit/800db08bd0f47fb2b3f0752e6e5b3952ae503723))

## [2.0.5](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.0.4...@toptal/picasso-charts@2.0.5) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso-charts

## [2.0.4](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.0.3...@toptal/picasso-charts@2.0.4) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso-charts

## [2.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.0.2...@toptal/picasso-charts@2.0.3) (2021-03-15)

### Bug Fixes

- versions dependency between packages ([#1981](https://github.com/toptal/picasso/issues/1981)) ([ca4ab84](https://github.com/toptal/picasso/commit/ca4ab84934204323c8842991fe382745f56b5ff6))

## [2.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@2.0.1...@toptal/picasso-charts@2.0.2) (2021-03-12)

**Note:** Version bump only for package @toptal/picasso-charts

## [2.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@1.2.1...@toptal/picasso-charts@2.0.1) (2021-03-10)

**Note:** Version bump only for package @toptal/picasso-charts

## [1.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@1.2.0...@toptal/picasso-charts@1.2.1) (2021-03-04)

**Note:** Version bump only for package @toptal/picasso-charts

# [1.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@1.1.4...@toptal/picasso-charts@1.2.0) (2021-02-25)

### Features

- cross platform package builds ([#1925](https://github.com/toptal/picasso/issues/1925)) ([21f30be](https://github.com/toptal/picasso/commit/21f30beeb360fcc67c88d70af5c3234d8dcfe213))

## [1.1.4](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@1.1.3...@toptal/picasso-charts@1.1.4) (2021-02-22)

### Bug Fixes

- update recharts and fix typings ([#1901](https://github.com/toptal/picasso/issues/1901)) ([f9e1e26](https://github.com/toptal/picasso/commit/f9e1e2605691c4576ddc3754ef9b8187144b9c34))

## [1.1.3](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@1.1.2...@toptal/picasso-charts@1.1.3) (2021-02-15)

**Note:** Version bump only for package @toptal/picasso-charts

## [1.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@1.1.1...@toptal/picasso-charts@1.1.2) (2021-02-05)

**Note:** Version bump only for package @toptal/picasso-charts

## [1.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@1.1.0...@toptal/picasso-charts@1.1.1) (2021-02-03)

**Note:** Version bump only for package @toptal/picasso-charts

# [1.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@1.0.3...@toptal/picasso-charts@1.1.0) (2021-01-29)

### Features

- **BarChart:** add bar chart ([#1857](https://github.com/toptal/picasso/issues/1857)) ([83c8f23](https://github.com/toptal/picasso/commit/83c8f23157149ab874fdc166ab9c176219b1e74d))

## [1.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@1.0.2...@toptal/picasso-charts@1.0.3) (2021-01-26)

### Bug Fixes

- update recharts to the latest version ([#1864](https://github.com/toptal/picasso/issues/1864)) ([b1eaa1c](https://github.com/toptal/picasso/commit/b1eaa1cf662ebdaa19cd42124c6be260cf5adffa))

## [1.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@1.0.1...@toptal/picasso-charts@1.0.2) (2021-01-20)

**Note:** Version bump only for package @toptal/picasso-charts

## [1.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@1.0.0...@toptal/picasso-charts@1.0.1) (2021-01-18)

**Note:** Version bump only for package @toptal/picasso-charts

# [1.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.7.3...@toptal/picasso-charts@1.0.0) (2020-12-22)

### Features

- v5 ([#1487](https://github.com/toptal/picasso/issues/1487)) ([ee77cde](https://github.com/toptal/picasso/commit/ee77cde12f8f7670f50958ae3973327eb513d9f9))

## [0.7.3](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.7.2...@toptal/picasso-charts@0.7.3) (2020-12-14)

### Bug Fixes

- **AnalyticsChart:** format y axis ([#1770](https://github.com/toptal/picasso/issues/1770)) ([bd342b9](https://github.com/toptal/picasso/commit/bd342b9c744c26d5be95466340e0ba5330d294ce))

## [0.7.2](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.7.1...@toptal/picasso-charts@0.7.2) (2020-12-11)

### Bug Fixes

- **picasso-charts:** add debounce package ([#1772](https://github.com/toptal/picasso/issues/1772)) ([3892c72](https://github.com/toptal/picasso/commit/3892c721bcb9ffbc356bcb69b39a735633d7ad28))

## [0.7.1](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.7.0...@toptal/picasso-charts@0.7.1) (2020-11-30)

**Note:** Version bump only for package @toptal/picasso-charts

# [0.7.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.6.0...@toptal/picasso-charts@0.7.0) (2020-11-27)

### Features

- add logic for rendering x axis in day and hour granularity ([#1696](https://github.com/toptal/picasso/issues/1696)) ([4bd3439](https://github.com/toptal/picasso/commit/4bd3439a9b37b10916325731f3b5c0bb4dafdd21))

# [0.6.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.5.5...@toptal/picasso-charts@0.6.0) (2020-11-13)

### Features

- add Y axis ticks configuration for charts ([#1676](https://github.com/toptal/picasso/issues/1676)) ([d9b6b3d](https://github.com/toptal/picasso/commit/d9b6b3d7207a033625956a7838a8d8f5a087c5d8))

## [0.5.5](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.5.4...@toptal/picasso-charts@0.5.5) (2020-11-06)

**Note:** Version bump only for package @toptal/picasso-charts

## [0.5.4](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.5.3...@toptal/picasso-charts@0.5.4) (2020-11-02)

**Note:** Version bump only for package @toptal/picasso-charts

## [0.5.3](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.5.2...@toptal/picasso-charts@0.5.3) (2020-10-27)

**Note:** Version bump only for package @toptal/picasso-charts

## [0.5.2](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.5.1...@toptal/picasso-charts@0.5.2) (2020-09-23)

### Bug Fixes

- **AnalyticsChart:** allow passing null values ([#1577](https://github.com/toptal/picasso/issues/1577)) ([68dc4b1](https://github.com/toptal/picasso/commit/68dc4b1b9e607b84c218149c3bc6c675d8108a01))
- **LineChart:** fix highlight header height calculation ([#1576](https://github.com/toptal/picasso/issues/1576)) ([0e8374d](https://github.com/toptal/picasso/commit/0e8374d0bb1169c5fe36501d924daeb0bc06dcda))

## [0.5.1](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.5.0...@toptal/picasso-charts@0.5.1) (2020-08-31)

**Note:** Version bump only for package @toptal/picasso-charts

# [0.5.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.4.2...@toptal/picasso-charts@0.5.0) (2020-06-22)

### Features

- add custom calculations for tooltip ([#1384](https://github.com/toptal/picasso/issues/1384)) ([a97aaf0](https://github.com/toptal/picasso/commit/a97aaf0e3e46a107ec321ba2b12b54c7ea68c6e8))

## [0.4.2](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.4.1...@toptal/picasso-charts@0.4.2) (2020-06-16)

**Note:** Version bump only for package @toptal/picasso-charts

## [0.4.1](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.4.0...@toptal/picasso-charts@0.4.1) (2020-06-02)

**Note:** Version bump only for package @toptal/picasso-charts

# [0.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.3.7...@toptal/picasso-charts@0.4.0) (2020-05-22)

### Features

- add allowEscapeViewBox prop to charts ([#1323](https://github.com/toptal/picasso/issues/1323)) ([0c12e41](https://github.com/toptal/picasso/commit/0c12e41296576100eaec2523f31313356e4f0524))

## [0.3.7](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.3.5...@toptal/picasso-charts@0.3.7) (2020-05-14)

### Bug Fixes

- add picasso/utils import alias ([#1305](https://github.com/toptal/picasso/issues/1305)) ([905f808](https://github.com/toptal/picasso/commit/905f80867f940dd7971a8bb7454a5dc73a42818f))

## [0.3.6](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.3.5...@toptal/picasso-charts@0.3.6) (2020-05-14)

### Bug Fixes

- add picasso/utils import alias ([#1305](https://github.com/toptal/picasso/issues/1305)) ([905f808](https://github.com/toptal/picasso/commit/905f80867f940dd7971a8bb7454a5dc73a42818f))

## [0.3.5](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.3.4...@toptal/picasso-charts@0.3.5) (2020-04-14)

**Note:** Version bump only for package @toptal/picasso-charts

## [0.3.4](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.3.3...@toptal/picasso-charts@0.3.4) (2020-04-09)

**Note:** Version bump only for package @toptal/picasso-charts

## [0.3.3](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.3.2...@toptal/picasso-charts@0.3.3) (2020-04-06)

### Bug Fixes

- analytics-charts overflow and highlighting ([#1213](https://github.com/toptal/picasso/issues/1213)) ([f184b01](https://github.com/toptal/picasso/commit/f184b0100f6c819986d414c47dc51fee3580aa83))

## [0.3.2](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.3.1...@toptal/picasso-charts@0.3.2) (2020-04-02)

### Bug Fixes

- analytics charts types ([#1209](https://github.com/toptal/picasso/issues/1209)) ([348fa94](https://github.com/toptal/picasso/commit/348fa94b906a809225bbcaf3450c57e53e27157a))

## [0.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.3.0...@toptal/picasso-charts@0.3.1) (2020-04-02)

### Bug Fixes

- tsconfig ([#1207](https://github.com/toptal/picasso/issues/1207)) ([cf79fde](https://github.com/toptal/picasso/commit/cf79fde32e4c1f1379b96f4ef51ef2b205af86f8))

# [0.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.2.0...@toptal/picasso-charts@0.3.0) (2020-04-01)

### Features

- @topkit/analytics-charts ([#1187](https://github.com/toptal/picasso/issues/1187)) ([57d452b](https://github.com/toptal/picasso/commit/57d452b712313a524685f74ab39969539e7cac32))
- support multiple lines in analytics chart ([#1197](https://github.com/toptal/picasso/issues/1197)) ([3fdbb47](https://github.com/toptal/picasso/commit/3fdbb47f99481d1cfa52d7d17b9d9405aede37a9))

# [0.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.1.1...@toptal/picasso-charts@0.2.0) (2020-03-26)

### Features

- line chart ([#1173](https://github.com/toptal/picasso/issues/1173)) ([0bea86e](https://github.com/toptal/picasso/commit/0bea86ea0c852476335a078f2e2f034b16e35938))

## [0.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso-charts@0.1.0...@toptal/picasso-charts@0.1.1) (2020-03-18)

**Note:** Version bump only for package @toptal/picasso-charts

# 0.1.0 (2020-03-13)

### Features

- bootstrap picasso-charts ([#1162](https://github.com/toptal/picasso/issues/1162)) ([d7ba9b2](https://github.com/toptal/picasso/commit/d7ba9b2e104e871941b854f4bd14bcbe494c7373))
