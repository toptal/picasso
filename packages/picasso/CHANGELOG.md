# Change Log

## 15.0.0

### Major Changes

- [#2280](https://github.com/toptal/picasso/pull/2280) [`88b091e2`](https://github.com/toptal/picasso/commit/88b091e2be71bb5aeae51a051d3653ccb10512bc) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Removed fontSize prop from the Link
  The Link fontSize should be controlled by the wrapper e.g. Typography

* [#2226](https://github.com/toptal/picasso/pull/2226) [`6619b3d8`](https://github.com/toptal/picasso/commit/6619b3d8011b1dae26032a4144e3228d07dc9544) Thanks [@LashaJini](https://github.com/LashaJini)! - Removed static `data-testid` values and replaced them with dynamic ones, which
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

### Minor Changes

- [#2267](https://github.com/toptal/picasso/pull/2267) [`f081e380`](https://github.com/toptal/picasso/commit/f081e3800513ba85c5c5f7a077b2c472db18c867) Thanks [@yvniTop](https://github.com/yvniTop)! - feat(icon): [CT-2094] Add backspace icons

## 14.1.1

### Patch Changes

- [#2271](https://github.com/toptal/picasso/pull/2271) [`e2417ca8`](https://github.com/toptal/picasso/commit/e2417ca8e4bef621ae9640591eb3fe6e08660df4) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Updated Notification testIds props to be optional

## 14.1.0

### Minor Changes

- [#2262](https://github.com/toptal/picasso/pull/2262) [`d225d195`](https://github.com/toptal/picasso/commit/d225d1956f3cc8ae3507a836f7e4667bf3aaa729) Thanks [@elviocb](https://github.com/elviocb)! - feat(Icons): [SPC-1436] Add new arrow subdirectory icon

### Patch Changes

- [#2268](https://github.com/toptal/picasso/pull/2268) [`78312c45`](https://github.com/toptal/picasso/commit/78312c45170ae975f7c30385f06fa64161cbf29b) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Added data-testid into the Notification

## 14.0.2

### Patch Changes

- [#2261](https://github.com/toptal/picasso/pull/2261) [`a91e6b3c`](https://github.com/toptal/picasso/commit/a91e6b3cc8b30e9c423aee13c34ed75941b64814) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Added aria-disabled prop into the Link, to prevent overriding of aria-disable, by the disabled prop

## 14.0.1

### Patch Changes

- [#2257](https://github.com/toptal/picasso/pull/2257) [`ad250b5b`](https://github.com/toptal/picasso/commit/ad250b5bbbf23168b810f9f67f1ee9cb8cc9818c) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Fixed warnings in the Pagination, caused by incorrect key name for the ellipsis component

## 14.0.0

### Major Changes

- [#2234](https://github.com/toptal/picasso/pull/2234) [`95b61597`](https://github.com/toptal/picasso/commit/95b6159716cef8deeae5bfd816c540ea6d7352a3) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Updated link appearence according to the designs
  - Removed ColorType `Black`
  - Link with ColorType `White`, has underline always
  - Link with ColorType `Blue`, has underline on hover only
  - `textDecoration` property, has a single variant, which is `none`

## 13.7.0

### Minor Changes

- [#2236](https://github.com/toptal/picasso/pull/2236) [`b2332734`](https://github.com/toptal/picasso/commit/b2332734ba730e9c001638bee47d6ce1f3b87a22) Thanks [@michal-bednarz](https://github.com/michal-bednarz)! - Add 'New' icon

* [#2235](https://github.com/toptal/picasso/pull/2235) [`dedc9057`](https://github.com/toptal/picasso/commit/dedc905704f93a3a2f3f024c850f5db55599fdcb) Thanks [@michal-bednarz](https://github.com/michal-bednarz)! - Add Support icon

### Patch Changes

- Updated dependencies [[`34e990a3`](https://github.com/toptal/picasso/commit/34e990a3fe6d66bb204d1d468c505ebe0b8fd127)]:
  - @toptal/picasso-provider@0.4.0
  - @toptal/picasso-shared@7.0.2

## 13.6.1

### Patch Changes

- [#2233](https://github.com/toptal/picasso/pull/2233) [`499d0996`](https://github.com/toptal/picasso/commit/499d099644d3873eb644a448941f12c24c2f2e5a) Thanks [@OleksandrNechai](https://github.com/OleksandrNechai)! - Fixed closing overlay when scrolling in TagSelector and Autocomplete

## 13.6.0

### Minor Changes

- [#2237](https://github.com/toptal/picasso/pull/2237) [`e00c54e7`](https://github.com/toptal/picasso/commit/e00c54e7c56d660c986ae5e096dc6da67ccd48e9) Thanks [@teimurjan](https://github.com/teimurjan)! - Fix option in Select cannot be selected when using number values.

## 13.5.0

### Minor Changes

- [#2219](https://github.com/toptal/picasso/pull/2219) [`07e80d4e`](https://github.com/toptal/picasso/commit/07e80d4ee4275a8717c422c82d062519e232d6dc) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - Introduced size attribute to Picasso Rating component. Default is "small" and newly added is a "large" variant.

### Patch Changes

- [#2217](https://github.com/toptal/picasso/pull/2217) [`d8cb590b`](https://github.com/toptal/picasso/commit/d8cb590b7e181acf0e5534913f13af0655caac62) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - Updated generate-icons script to use our .prettierrc.js config

## 13.4.2

### Patch Changes

- [#2218](https://github.com/toptal/picasso/pull/2218) [`6a7073f0`](https://github.com/toptal/picasso/commit/6a7073f012bdc60b1ef95f30d0731204802731e4) Thanks [@TomasSlama](https://github.com/TomasSlama)! - Update storybook to latest version and make some small adjusments in components to work properly in the new Storybook.

## 13.4.1

### Patch Changes

- [#2220](https://github.com/toptal/picasso/pull/2220) [`410e267e`](https://github.com/toptal/picasso/commit/410e267e166228f23ca7fd59e16122901b16a578) Thanks [@vshyrokov](https://github.com/vshyrokov)! - add font-size style into the SideBarItem

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [13.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@13.3.4...@toptal/picasso@13.4.0) (2021-11-09)

### Features

- **icon:** add dialpad16 icon ([#2211](https://github.com/toptal/picasso/issues/2211)) ([3a7d65b](https://github.com/toptal/picasso/commit/3a7d65b6a931e8b8cb53520edb6bbd472dd6958a))

## [13.3.4](https://github.com/toptal/picasso/compare/@toptal/picasso@13.3.3...@toptal/picasso@13.3.4) (2021-11-09)

### Bug Fixes

- **Modal:** [FX-2237] shadows are broken in desktop Safari & iOs ([#2213](https://github.com/toptal/picasso/issues/2213)) ([6ca10bc](https://github.com/toptal/picasso/commit/6ca10bca4658fc3c1f0c5e2d1b65b94894199f21))

## [13.3.3](https://github.com/toptal/picasso/compare/@toptal/picasso@13.3.2...@toptal/picasso@13.3.3) (2021-11-09)

**Note:** Version bump only for package @toptal/picasso

## [13.3.2](https://github.com/toptal/picasso/compare/@toptal/picasso@13.3.1...@toptal/picasso@13.3.2) (2021-11-09)

### Bug Fixes

- **Link:** [FX-2231] fix on hover style ([#2209](https://github.com/toptal/picasso/issues/2209)) ([3b8cf3a](https://github.com/toptal/picasso/commit/3b8cf3aa299597fee95f511e0ce1f84eb5c449f4))

## [13.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso@13.3.0...@toptal/picasso@13.3.1) (2021-11-09)

**Note:** Version bump only for package @toptal/picasso

# [13.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@13.2.1...@toptal/picasso@13.3.0) (2021-11-08)

### Features

- **tag:** [FX-2232] update Tag props type ([#2210](https://github.com/toptal/picasso/issues/2210)) ([199a4cb](https://github.com/toptal/picasso/commit/199a4cb2abd2bd462baf9d68e1cdb447263952f7))

## [13.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso@13.2.0...@toptal/picasso@13.2.1) (2021-11-05)

**Note:** Version bump only for package @toptal/picasso

# [13.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@13.1.1...@toptal/picasso@13.2.0) (2021-11-04)

### Features

- **AvatarGroup:** create new component Avatar.Group ([#2194](https://github.com/toptal/picasso/issues/2194)) ([ffd0ef0](https://github.com/toptal/picasso/commit/ffd0ef0610853b78ef902c41654ebb9d3a2164d5))

## [13.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@13.1.0...@toptal/picasso@13.1.1) (2021-11-04)

**Note:** Version bump only for package @toptal/picasso

# [13.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@13.0.0...@toptal/picasso@13.1.0) (2021-11-03)

### Features

- **prompt modal:** [FX-2217] add data-testid into PromptModal ([#2205](https://github.com/toptal/picasso/issues/2205)) ([72fcf5d](https://github.com/toptal/picasso/commit/72fcf5db09727fd3bd25f31440d437e060dcb667))

# [13.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@12.4.0...@toptal/picasso@13.0.0) (2021-11-02)

### Code Refactoring

- **Container:** make gap to fuction as other size props ([#2201](https://github.com/toptal/picasso/issues/2201)) ([281de61](https://github.com/toptal/picasso/commit/281de61a52a1f3b500766930e84a7bad2c240b69))

### BREAKING CHANGES

- **Container:** `gap` property accepts different values

# [12.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@12.3.1...@toptal/picasso@12.4.0) (2021-10-26)

### Features

- **Select:** add disabled option ([#2195](https://github.com/toptal/picasso/issues/2195)) ([9df4459](https://github.com/toptal/picasso/commit/9df4459cf6bed91315f104ab7bdd2c7e8b4263aa))

## [12.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso@12.3.0...@toptal/picasso@12.3.1) (2021-10-26)

### Bug Fixes

- ensure Notification has allways alert role ([#2199](https://github.com/toptal/picasso/issues/2199)) ([cfc9330](https://github.com/toptal/picasso/commit/cfc93307b286ee148fc30f21742202468dcfb9cd))

# [12.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@12.2.2...@toptal/picasso@12.3.0) (2021-10-22)

### Features

- **Typography:** add new size of Typography ([#2196](https://github.com/toptal/picasso/issues/2196)) ([905088b](https://github.com/toptal/picasso/commit/905088bf84f6efd1904fd6c9211bfb090d576481))

## [12.2.2](https://github.com/toptal/picasso/compare/@toptal/picasso@12.2.1...@toptal/picasso@12.2.2) (2021-10-21)

### Bug Fixes

- **Select:** fix invalid highlighting for groups ([#2192](https://github.com/toptal/picasso/issues/2192)) ([2719b5f](https://github.com/toptal/picasso/commit/2719b5f18453372628bfc771eff5913646fb6b82))

## [12.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso@12.2.0...@toptal/picasso@12.2.1) (2021-10-19)

### Bug Fixes

- **Autocomplete:** add inputProps type to the definition of Autocomplete props ([#2114](https://github.com/toptal/picasso/issues/2114)) ([704c2e1](https://github.com/toptal/picasso/commit/704c2e11a896dfb6ecc00da3b921f55369811fdf))

# [12.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@12.1.0...@toptal/picasso@12.2.0) (2021-10-15)

### Features

- **icon:** add bell off icon ([#2188](https://github.com/toptal/picasso/issues/2188)) ([d8585fe](https://github.com/toptal/picasso/commit/d8585fea44b56c58f3a9fd269f10008e044a462c))

# [12.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@12.0.3...@toptal/picasso@12.1.0) (2021-10-15)

### Features

- **Avatar:** add default state variant with icon placeholder ([#2181](https://github.com/toptal/picasso/issues/2181)) ([c43b031](https://github.com/toptal/picasso/commit/c43b0310a38a6e738b74327c20aa60bb2f0c97e5))

## [12.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso@12.0.2...@toptal/picasso@12.0.3) (2021-10-14)

**Note:** Version bump only for package @toptal/picasso

## [12.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso@12.0.1...@toptal/picasso@12.0.2) (2021-10-14)

**Note:** Version bump only for package @toptal/picasso

## [12.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso@12.0.0...@toptal/picasso@12.0.1) (2021-10-14)

**Note:** Version bump only for package @toptal/picasso

# [12.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@11.0.0...@toptal/picasso@12.0.0) (2021-10-14)

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

# [11.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.7.0...@toptal/picasso@11.0.0) (2021-10-13)

### Features

- **Typography:** update line heights and colors to match BASE 2.0 ([#2184](https://github.com/toptal/picasso/issues/2184)) ([aacd827](https://github.com/toptal/picasso/commit/aacd8271dd6c6ef5093fef78d4a419c48b046db5))

### BREAKING CHANGES

- **Typography:** - Changed line-height of small heading and body

* Removed blue color from Typography
* Removed blue color from OverviewBlock

# [10.7.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.6.0...@toptal/picasso@10.7.0) (2021-10-11)

### Features

- **Link:** remove focus borders ([#2182](https://github.com/toptal/picasso/issues/2182)) ([e57b8c3](https://github.com/toptal/picasso/commit/e57b8c3f181a2a7aaa20896579d5faf7ef5b8cb6))

# [10.6.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.5.2...@toptal/picasso@10.6.0) (2021-09-27)

### Features

- **Icon:** [SPB-2461] add transfer icon ([#2177](https://github.com/toptal/picasso/issues/2177)) ([caee460](https://github.com/toptal/picasso/commit/caee460457267392067879b29746535fcc118543))

## [10.5.2](https://github.com/toptal/picasso/compare/@toptal/picasso@10.5.1...@toptal/picasso@10.5.2) (2021-09-17)

### Bug Fixes

- **Autocomplete:** do not render noOptions item when no options available ([#2167](https://github.com/toptal/picasso/issues/2167)) ([02ce33b](https://github.com/toptal/picasso/commit/02ce33baf532178d88f29c0a11bbf6d92aec860a))

## [10.5.1](https://github.com/toptal/picasso/compare/@toptal/picasso@10.5.0...@toptal/picasso@10.5.1) (2021-09-16)

### Bug Fixes

- remove material-ui/styles from dependencies ([#2165](https://github.com/toptal/picasso/issues/2165)) ([d403a67](https://github.com/toptal/picasso/commit/d403a67d11338bb2fcb1af09dc9766b235e27236))

# [10.5.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.4.2...@toptal/picasso@10.5.0) (2021-09-10)

### Features

- add limit property for Form.Select ([#2153](https://github.com/toptal/picasso/issues/2153)) ([1a036ad](https://github.com/toptal/picasso/commit/1a036ad071a08dc24d20b2fc1c731303b90dc86d))

## [10.4.2](https://github.com/toptal/picasso/compare/@toptal/picasso@10.4.1...@toptal/picasso@10.4.2) (2021-09-09)

### Bug Fixes

- **picasso:** add explicit dependency on debounce ([#2161](https://github.com/toptal/picasso/issues/2161)) ([7471191](https://github.com/toptal/picasso/commit/7471191f2e7f6e3953e3066d627fc25209dda9c4))

## [10.4.1](https://github.com/toptal/picasso/compare/@toptal/picasso@10.4.0...@toptal/picasso@10.4.1) (2021-09-08)

**Note:** Version bump only for package @toptal/picasso

# [10.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.3.5...@toptal/picasso@10.4.0) (2021-09-08)

### Features

- **TreeView:** [FX-2016] Horizontal layout, margin props & compact variant for TreeView ([#2122](https://github.com/toptal/picasso/issues/2122)) ([6b9d41f](https://github.com/toptal/picasso/commit/6b9d41f4206d8b5bca098eec0dd5e63bf907bcab))

## [10.3.5](https://github.com/toptal/picasso/compare/@toptal/picasso@10.3.4...@toptal/picasso@10.3.5) (2021-09-07)

### Bug Fixes

- update modal scrollable shades to fix resize inheritance ([#2154](https://github.com/toptal/picasso/issues/2154)) ([0cdd7fc](https://github.com/toptal/picasso/commit/0cdd7fc5084a08eaf652f1a45bf2fb5798f7e332))

## [10.3.4](https://github.com/toptal/picasso/compare/@toptal/picasso@10.3.3...@toptal/picasso@10.3.4) (2021-08-25)

**Note:** Version bump only for package @toptal/picasso

## [10.3.3](https://github.com/toptal/picasso/compare/@toptal/picasso@10.3.2...@toptal/picasso@10.3.3) (2021-08-19)

**Note:** Version bump only for package @toptal/picasso

## [10.3.2](https://github.com/toptal/picasso/compare/@toptal/picasso@10.3.1...@toptal/picasso@10.3.2) (2021-08-15)

### Bug Fixes

- fix path of generated component ([#2127](https://github.com/toptal/picasso/issues/2127)) ([fa175e6](https://github.com/toptal/picasso/commit/fa175e6cfa27cced19c4cc920b7d5380be6ef614))

## [10.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso@10.3.0...@toptal/picasso@10.3.1) (2021-08-12)

### Bug Fixes

- allow default tooltip to be overwriten on slider ([#2133](https://github.com/toptal/picasso/issues/2133)) ([4ebdc7b](https://github.com/toptal/picasso/commit/4ebdc7b3afacb9f459ea627e681251caaea4a147))

# [10.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.2.1...@toptal/picasso@10.3.0) (2021-08-12)

### Features

- **Icon:** add 24px version of the Player icon ([#2132](https://github.com/toptal/picasso/issues/2132)) ([200864d](https://github.com/toptal/picasso/commit/200864d127863cf378cddd76a825cdf4949a05bc))

## [10.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso@10.2.0...@toptal/picasso@10.2.1) (2021-08-11)

### Bug Fixes

- **Tooltip:** add container prop ([#2130](https://github.com/toptal/picasso/issues/2130)) ([b1b4b8d](https://github.com/toptal/picasso/commit/b1b4b8ddc84becb7b30cd002702a0e5e3dbe5430))

# [10.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.9...@toptal/picasso@10.2.0) (2021-08-10)

### Features

- **Dropdown:** add contentOverflow option ([#2124](https://github.com/toptal/picasso/issues/2124)) ([55fe14b](https://github.com/toptal/picasso/commit/55fe14b434dae611806683589f99bdbfa735f62f))

## [10.1.9](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.8...@toptal/picasso@10.1.9) (2021-08-09)

### Bug Fixes

- adds data-testid for badge component ([#2126](https://github.com/toptal/picasso/issues/2126)) ([90cb384](https://github.com/toptal/picasso/commit/90cb384d405626ef1b7a0049d12de1777245ecc5))

## [10.1.8](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.7...@toptal/picasso@10.1.8) (2021-08-09)

### Bug Fixes

- [SPT-1814] change green color tags to darker shade ([#2123](https://github.com/toptal/picasso/issues/2123)) ([9467729](https://github.com/toptal/picasso/commit/9467729ebbf09bdc9460399c72fbc042bf28eade))

## [10.1.7](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.6...@toptal/picasso@10.1.7) (2021-07-16)

### Bug Fixes

- **Slider:** overlapping labels on range slider ([#2108](https://github.com/toptal/picasso/issues/2108)) ([806ebb1](https://github.com/toptal/picasso/commit/806ebb17b5c3cb3144590dcdfb0d054ee3a7d94e))

## [10.1.6](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.5...@toptal/picasso@10.1.6) (2021-07-14)

### Bug Fixes

- **Popper:** fix popper shaking on each render ([#2119](https://github.com/toptal/picasso/issues/2119)) ([66a17a3](https://github.com/toptal/picasso/commit/66a17a31aa31154dc8e522b897eaa98523339e5c))

## [10.1.5](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.4...@toptal/picasso@10.1.5) (2021-07-14)

**Note:** Version bump only for package @toptal/picasso

## [10.1.4](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.3...@toptal/picasso@10.1.4) (2021-07-12)

### Bug Fixes

- **Button:** replace background of flat button ([#2116](https://github.com/toptal/picasso/issues/2116)) ([a4c0d91](https://github.com/toptal/picasso/commit/a4c0d91b786c07a611e32b6ed223f56520315dad))

## [10.1.3](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.2...@toptal/picasso@10.1.3) (2021-07-09)

### Bug Fixes

- **TagSelector:** compare by value ([#2115](https://github.com/toptal/picasso/issues/2115)) ([4c1f385](https://github.com/toptal/picasso/commit/4c1f3855326be1f72ac0d9f1c50c96b02549767e))

## [10.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.1...@toptal/picasso@10.1.2) (2021-07-08)

### Bug Fixes

- **Select:** close Popper after disabling Select ([#2113](https://github.com/toptal/picasso/issues/2113)) ([8fc94c5](https://github.com/toptal/picasso/commit/8fc94c5d887ce438ca7e6cd15cdd997dbb5d7b57))

## [10.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.0...@toptal/picasso@10.1.1) (2021-07-07)

### Bug Fixes

- **OutlinedInput:** do not trigger onBlur event after clicking adornment ([#2111](https://github.com/toptal/picasso/issues/2111)) ([3c51eeb](https://github.com/toptal/picasso/commit/3c51eebf9c3d21334893f3e1baa3407a2b8dfbf5))

# [10.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.0.0...@toptal/picasso@10.1.0) (2021-06-29)

### Features

- **Icon:** add pin solid icon ([#2107](https://github.com/toptal/picasso/issues/2107)) ([9a0c192](https://github.com/toptal/picasso/commit/9a0c192be6d659cf8bc097e64ea07151da038a8a))

# [10.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@9.3.0...@toptal/picasso@10.0.0) (2021-06-25)

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

# [9.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@9.2.4...@toptal/picasso@9.3.0) (2021-06-24)

### Bug Fixes

- **TagSelector:** add definition of popperContainer prop ([#2105](https://github.com/toptal/picasso/issues/2105)) ([9caabbb](https://github.com/toptal/picasso/commit/9caabbb9db4522f36b56e9e5314b9f370183b3bd))

### Features

- **tooltip:** show tooltip on both label and control ([#2102](https://github.com/toptal/picasso/issues/2102)) ([87553c1](https://github.com/toptal/picasso/commit/87553c17fd349bb83cd810c59a90b31b3f88f4b4))

## [9.2.4](https://github.com/toptal/picasso/compare/@toptal/picasso@9.2.3...@toptal/picasso@9.2.4) (2021-06-18)

### Bug Fixes

- **AppUpdateNotification:** [ER-12060] Fix non-intractable action buttons ([#2103](https://github.com/toptal/picasso/issues/2103)) ([9de2732](https://github.com/toptal/picasso/commit/9de2732fb2d1c31f21c938a35c5869a752fb3305))

## [9.2.3](https://github.com/toptal/picasso/compare/@toptal/picasso@9.2.2...@toptal/picasso@9.2.3) (2021-06-18)

**Note:** Version bump only for package @toptal/picasso

## [9.2.2](https://github.com/toptal/picasso/compare/@toptal/picasso@9.2.1...@toptal/picasso@9.2.2) (2021-06-10)

### Bug Fixes

- **TreeView:** fix tree view node selection ([#2098](https://github.com/toptal/picasso/issues/2098)) ([f07a4d8](https://github.com/toptal/picasso/commit/f07a4d88d245eca3af175cfb5b17bc72bf7c272c))

## [9.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso@9.2.0...@toptal/picasso@9.2.1) (2021-06-10)

### Bug Fixes

- **picasso:** pin d3-array version ([#2097](https://github.com/toptal/picasso/issues/2097)) ([3dd9196](https://github.com/toptal/picasso/commit/3dd919681edbc99d695dabfc1dce2f9b33ef1e01))

# [9.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@9.1.1...@toptal/picasso@9.2.0) (2021-06-02)

### Features

- **CategoriesChart:** add categories chart ([#2024](https://github.com/toptal/picasso/issues/2024)) ([c0860fb](https://github.com/toptal/picasso/commit/c0860fb7a0c8153ad7d62f9d6684abff6c7455ad))

## [9.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@9.1.0...@toptal/picasso@9.1.1) (2021-06-01)

### Bug Fixes

- **TagSelector:** reduce height ([#2091](https://github.com/toptal/picasso/issues/2091)) ([339172f](https://github.com/toptal/picasso/commit/339172ffea8cb0f9330ef705f9c4e8c192e90ed1))

# [9.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@9.0.2...@toptal/picasso@9.1.0) (2021-05-31)

### Features

- **Tag:** add styles for tag content overflow ([#2048](https://github.com/toptal/picasso/issues/2048)) ([8b4abd0](https://github.com/toptal/picasso/commit/8b4abd08b35118c263f3c606e8c8fcc4cd915e37))

## [9.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso@9.0.1...@toptal/picasso@9.0.2) (2021-05-28)

### Bug Fixes

- show tooltip on disabled radio button ([#2089](https://github.com/toptal/picasso/issues/2089)) ([0ac30d1](https://github.com/toptal/picasso/commit/0ac30d1cc5c1cf037f98c8eff8b50f4a47bf9419))

## [9.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso@9.0.0...@toptal/picasso@9.0.1) (2021-05-24)

### Bug Fixes

- move dependenties to picasso from lab ([#2085](https://github.com/toptal/picasso/issues/2085)) ([f6d447a](https://github.com/toptal/picasso/commit/f6d447ae5eee3d559c1d1891bbecb446f701a516))

# [9.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.8.0...@toptal/picasso@9.0.0) (2021-05-24)

### Features

- migrate stable components from lab to picasso ([#2081](https://github.com/toptal/picasso/issues/2081)) ([1070a04](https://github.com/toptal/picasso/commit/1070a046a5860841e35481ac63ae9b1c4d5dfe8c))
- **FileInput:** implement multiple file input ([#2077](https://github.com/toptal/picasso/issues/2077)) ([b3ed80d](https://github.com/toptal/picasso/commit/b3ed80dc14d4a042cca57e5d3d914e8de299303f))
- **FileList:** [TEA-2545] Implement internal file list component ([#2067](https://github.com/toptal/picasso/issues/2067)) ([87c2f3a](https://github.com/toptal/picasso/commit/87c2f3ae2d138c2156db3b3f79f09166e6cd0632))
- **Page:** make naming consistent ([#2078](https://github.com/toptal/picasso/issues/2078)) ([a679bab](https://github.com/toptal/picasso/commit/a679bab9bc6af46963b6866ab8e918ca318a9ecc))
- **Page:** rename Head to Helmet ([#2079](https://github.com/toptal/picasso/issues/2079)) ([12837d7](https://github.com/toptal/picasso/commit/12837d7159d832c7787914819e5d70afbf58479b))

### BREAKING CHANGES

- stable components were moved from lab to picasso
- **FileInput:** The API of the `FileInput` component was changed and the migration requires manual intervention:

* Modified properties:
  - `value`: Instead of a `File` object, an array of [FileUpload](https://github.com/toptal/picasso/blob/f8bf6379dffc3c6b9d21fef5349e7c6d0df8da72/packages/picasso/src/FileInput/types.ts) objects should be provided.
  - `onChange`: This callback is now called when one or more files are selected and should be added to the component state.
* Removed properties:
  - `width`: The new component has a fixed width.
  - `progress` and `error`: Both properties are now handled on a per-file basis and should be included in the objects passed to the `value` property (see [FileUpload](https://github.com/toptal/picasso/blob/f8bf6379dffc3c6b9d21fef5349e7c6d0df8da72/packages/picasso/src/FileInput/types.ts) interface).
  - `status`: The new component doesn't have a global status label. You can use the `hint` property for instructions.
* New properties:
  - `hint`: Form field hint that can be used for instructions.
  - `maxFiles`: Limit the number of files that can be added to the component state.
  - `onRemove`: Callback called when a file is removed and should be excluded from the component state.

# [8.8.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.7.2...@toptal/picasso@8.8.0) (2021-05-21)

### Features

- **FileList:** [TEA-2545] Implement internal file list component ([#2067](https://github.com/toptal/picasso/issues/2067)) ([#2082](https://github.com/toptal/picasso/issues/2082)) ([4bd327b](https://github.com/toptal/picasso/commit/4bd327b0fc0b439fcd35b37abb58a603797ddc20))

## [8.7.2](https://github.com/toptal/picasso/compare/@toptal/picasso@8.7.1...@toptal/picasso@8.7.2) (2021-05-17)

### Bug Fixes

- **Modal:** fix width and height of top aligned modal on small screens ([#2075](https://github.com/toptal/picasso/issues/2075)) ([eba896c](https://github.com/toptal/picasso/commit/eba896ce89c555f47d2212301a55135ab477e9f9))

## [8.7.1](https://github.com/toptal/picasso/compare/@toptal/picasso@8.7.0...@toptal/picasso@8.7.1) (2021-05-17)

### Bug Fixes

- **modal:** the content is not scrollable on mobile ([#2072](https://github.com/toptal/picasso/issues/2072)) ([56bef03](https://github.com/toptal/picasso/commit/56bef036a89618ee040385bfe3a905ffccf0e8ff))

# [8.7.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.6.0...@toptal/picasso@8.7.0) (2021-05-14)

### Features

- **FileList:** [TEA-2545] Implement internal file list component ([#2067](https://github.com/toptal/picasso/issues/2067)) ([1dfbc86](https://github.com/toptal/picasso/commit/1dfbc86a285f5ba42397e7fc7bac17798c4c6e91))

# [8.6.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.5.3...@toptal/picasso@8.6.0) (2021-05-14)

### Features

- **Typography:** update green color ([#2071](https://github.com/toptal/picasso/issues/2071)) ([6591aac](https://github.com/toptal/picasso/commit/6591aac722c0567d116f003dab9d168ccd1362c2))

## [8.5.3](https://github.com/toptal/picasso/compare/@toptal/picasso@8.5.2...@toptal/picasso@8.5.3) (2021-05-13)

### Bug Fixes

- reappearing tooltip after moving mouse within boundaries of triggered button ([#2069](https://github.com/toptal/picasso/issues/2069)) ([9cd7b12](https://github.com/toptal/picasso/commit/9cd7b12ac18d903b0a685918f51a0c4166b32586))

## [8.5.2](https://github.com/toptal/picasso/compare/@toptal/picasso@8.5.1...@toptal/picasso@8.5.2) (2021-05-13)

**Note:** Version bump only for package @toptal/picasso

## [8.5.1](https://github.com/toptal/picasso/compare/@toptal/picasso@8.5.0...@toptal/picasso@8.5.1) (2021-05-13)

### Bug Fixes

- **Select:** close menu on second click ([#2065](https://github.com/toptal/picasso/issues/2065)) ([ce9ddb3](https://github.com/toptal/picasso/commit/ce9ddb3ddc465b01afdcb9a227d8949073308c2f))

# [8.5.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.4.1...@toptal/picasso@8.5.0) (2021-05-12)

### Features

- **shared:** export used helpers & group colorutils ([#2068](https://github.com/toptal/picasso/issues/2068)) ([b43688f](https://github.com/toptal/picasso/commit/b43688f10cfc569d6c41d4bdd02f6e2c14e1a249))

## [8.4.1](https://github.com/toptal/picasso/compare/@toptal/picasso@8.4.0...@toptal/picasso@8.4.1) (2021-05-11)

### Bug Fixes

- **Modal:** add scrollable shades paddings ([1be0c8d](https://github.com/toptal/picasso/commit/1be0c8d2075a3b7cae6f3681da85d05e93e60f37))

# [8.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.3.1...@toptal/picasso@8.4.0) (2021-05-06)

### Features

- **Icon:** add asterisk solid icon ([#2059](https://github.com/toptal/picasso/issues/2059)) ([830444f](https://github.com/toptal/picasso/commit/830444fce36f2c76312fbce2ce2c44a155e7a3f5))

## [8.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso@8.3.0...@toptal/picasso@8.3.1) (2021-05-04)

### Bug Fixes

- **TypographyOverflow:** fix initial render perf issue ([#2061](https://github.com/toptal/picasso/issues/2061)) ([f2d3d7f](https://github.com/toptal/picasso/commit/f2d3d7fc23a252a19a94f254700559585bd18c12))

# [8.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.2.0...@toptal/picasso@8.3.0) (2021-05-04)

### Bug Fixes

- **dropdown:** render popper only when opened ([#2060](https://github.com/toptal/picasso/issues/2060)) ([7d56a5b](https://github.com/toptal/picasso/commit/7d56a5b5da163267985b0aa4d0a80a628d6d804e))

### Features

- **menu:** add drilldown mode ([#2041](https://github.com/toptal/picasso/issues/2041)) ([d047431](https://github.com/toptal/picasso/commit/d04743196024be5130f651ec66ef1e4a34b058e6))

# [8.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.1.1...@toptal/picasso@8.2.0) (2021-05-04)

### Features

- **ApplicationUpdateNotification:** [FX-1875] Add a new component ([#2055](https://github.com/toptal/picasso/issues/2055)) ([a1091b1](https://github.com/toptal/picasso/commit/a1091b1cc1b44685fbaffe02aea0d45c5de1f620))

## [8.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@8.1.0...@toptal/picasso@8.1.1) (2021-04-30)

### Bug Fixes

- **select:** fix indexing for grouped options ([#2058](https://github.com/toptal/picasso/issues/2058)) ([72ac94e](https://github.com/toptal/picasso/commit/72ac94e402d38d923e29804b8c310c259c8e326c))

# [8.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.0.0...@toptal/picasso@8.1.0) (2021-04-29)

### Features

- **Notification:** [FX-1872] Add showCustom for useNotifications ([#2054](https://github.com/toptal/picasso/issues/2054)) ([8c35e44](https://github.com/toptal/picasso/commit/8c35e44d034cc44f1371883f49e65e8101c75fa6))

# [8.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@7.4.0...@toptal/picasso@8.0.0) (2021-04-29)

### Features

- **button:** make children required ([#2049](https://github.com/toptal/picasso/issues/2049)) ([d38f7ea](https://github.com/toptal/picasso/commit/d38f7ea871c16aa2808eddcebc7be0ab56713bdf))

### BREAKING CHANGES

- **button:** use Button.Circular for buttons without text

# [7.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@7.3.1...@toptal/picasso@7.4.0) (2021-04-28)

### Features

- add grid support for radio and checkbox group ([#2042](https://github.com/toptal/picasso/issues/2042)) ([2563a0c](https://github.com/toptal/picasso/commit/2563a0cf809b9ee51e9c4dc0b35dc183e2444f1d))

## [7.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso@7.3.0...@toptal/picasso@7.3.1) (2021-04-28)

**Note:** Version bump only for package @toptal/picasso

# [7.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@7.2.0...@toptal/picasso@7.3.0) (2021-04-23)

### Features

- **select:** show loader instead of options for Select ([#2032](https://github.com/toptal/picasso/issues/2032)) ([cce8b7e](https://github.com/toptal/picasso/commit/cce8b7e2ad25a371dfed591ae6379b55eac445f2))

# [7.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@7.1.0...@toptal/picasso@7.2.0) (2021-04-21)

### Features

- **Icon:** add icons to talent portfolio modal ([#2040](https://github.com/toptal/picasso/issues/2040)) ([44fe4d3](https://github.com/toptal/picasso/commit/44fe4d3d869c641ae6aad6156d5cf88e5a9eec32))

# [7.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@7.0.3...@toptal/picasso@7.1.0) (2021-04-21)

### Features

- **select:** [TEA-2501] add grouped options ([#2033](https://github.com/toptal/picasso/issues/2033)) ([f330405](https://github.com/toptal/picasso/commit/f3304054787c65023e326e3eb123363cd7f9336c))

## [7.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso@7.0.2...@toptal/picasso@7.0.3) (2021-04-15)

**Note:** Version bump only for package @toptal/picasso

## [7.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso@7.0.1...@toptal/picasso@7.0.2) (2021-04-14)

**Note:** Version bump only for package @toptal/picasso

## [7.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso@7.0.0...@toptal/picasso@7.0.1) (2021-04-09)

**Note:** Version bump only for package @toptal/picasso

# [7.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@6.2.2...@toptal/picasso@7.0.0) (2021-04-05)

### Features

- **Table:** add appearance and spacing variants ([d140fb7](https://github.com/toptal/picasso/commit/d140fb727c8d1985619778d769e32af2d505ead7))

### BREAKING CHANGES

- **Table:** Updated appearance and props schema

## [6.2.2](https://github.com/toptal/picasso/compare/@toptal/picasso@6.2.1...@toptal/picasso@6.2.2) (2021-03-30)

**Note:** Version bump only for package @toptal/picasso

## [6.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso@6.2.0...@toptal/picasso@6.2.1) (2021-03-30)

**Note:** Version bump only for package @toptal/picasso

# [6.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.9...@toptal/picasso@6.2.0) (2021-03-27)

### Features

- **icon:** add time-convert icon ([#2008](https://github.com/toptal/picasso/issues/2008)) ([ed62c8a](https://github.com/toptal/picasso/commit/ed62c8a2a8deab588c86d730871bf6d801c2ff73))

## [6.1.9](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.8...@toptal/picasso@6.1.9) (2021-03-25)

### Bug Fixes

- readme not being published to npm ([#2006](https://github.com/toptal/picasso/issues/2006)) ([1b82c73](https://github.com/toptal/picasso/commit/1b82c7382acbc4d17423c28e42f1dadf773abe11))

## [6.1.8](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.7...@toptal/picasso@6.1.8) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso

## [6.1.7](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.6...@toptal/picasso@6.1.7) (2021-03-24)

### Bug Fixes

- prepublish ([#2004](https://github.com/toptal/picasso/issues/2004)) ([800db08](https://github.com/toptal/picasso/commit/800db08bd0f47fb2b3f0752e6e5b3952ae503723))

## [6.1.6](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.5...@toptal/picasso@6.1.6) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso

## [6.1.5](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.4...@toptal/picasso@6.1.5) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso

## [6.1.4](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.3...@toptal/picasso@6.1.4) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso

## [6.1.3](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.2...@toptal/picasso@6.1.3) (2021-03-23)

### Bug Fixes

- **select:** fix background color ([#1987](https://github.com/toptal/picasso/issues/1987)) ([2b2feea](https://github.com/toptal/picasso/commit/2b2feeaecf0f071cb873bf85f75fb136ccf14949))

## [6.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.1...@toptal/picasso@6.1.2) (2021-03-22)

**Note:** Version bump only for package @toptal/picasso

## [6.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.0...@toptal/picasso@6.1.1) (2021-03-18)

**Note:** Version bump only for package @toptal/picasso

# [6.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.6...@toptal/picasso@6.1.0) (2021-03-18)

### Features

- **tabs:** add scroll buttons ([#1980](https://github.com/toptal/picasso/issues/1980)) ([3f705e7](https://github.com/toptal/picasso/commit/3f705e7f158c3142d4bb49f3345ccbf0d26fc614))

## [6.0.6](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.5...@toptal/picasso@6.0.6) (2021-03-16)

### Bug Fixes

- **Autocomplete:** loading test case ([#1972](https://github.com/toptal/picasso/issues/1972)) ([6df7f0a](https://github.com/toptal/picasso/commit/6df7f0ace3c95ca73cc71e7501d4c2bb1902ca6c))

## [6.0.5](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.4...@toptal/picasso@6.0.5) (2021-03-16)

**Note:** Version bump only for package @toptal/picasso

## [6.0.4](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.3...@toptal/picasso@6.0.4) (2021-03-15)

### Bug Fixes

- versions dependency between packages ([#1981](https://github.com/toptal/picasso/issues/1981)) ([ca4ab84](https://github.com/toptal/picasso/commit/ca4ab84934204323c8842991fe382745f56b5ff6))

## [6.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.2...@toptal/picasso@6.0.3) (2021-03-11)

**Note:** Version bump only for package @toptal/picasso

## [6.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.1...@toptal/picasso@6.0.2) (2021-03-11)

### Bug Fixes

- **ButtonAction:** make button transparent ([#1964](https://github.com/toptal/picasso/issues/1964)) ([9a30c7b](https://github.com/toptal/picasso/commit/9a30c7b646c5e1971601c5203bb824731f7a26fc))

## [6.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.0...@toptal/picasso@6.0.1) (2021-03-09)

### Bug Fixes

- **TopBarMenu:** [TEA-2354] Improve responsiveness ([#1955](https://github.com/toptal/picasso/issues/1955)) ([1f7a646](https://github.com/toptal/picasso/commit/1f7a646dd96afae5208696947f67bd9bcab18c00))

# [6.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.14.2...@toptal/picasso@6.0.0) (2021-03-08)

### chore

- **tooltip:** compute arrow based on compact prop ([41a39c0](https://github.com/toptal/picasso/commit/41a39c07da609dc8657834f38d9794fc0bf5680a))

### Reverts

- Revert "chore(tooltip): adjust arrows and borders (#1952)" ([cb6a549](https://github.com/toptal/picasso/commit/cb6a549f30efe1bc70504bada464e0f7388d3125)), closes [#1952](https://github.com/toptal/picasso/issues/1952)

### BREAKING CHANGES

- **tooltip:** removed arrow prop

## [5.14.2](https://github.com/toptal/picasso/compare/@toptal/picasso@5.14.1...@toptal/picasso@5.14.2) (2021-03-05)

### Bug Fixes

- **outlinedinput:** make disabled input text readable on Safari 14 ([#1950](https://github.com/toptal/picasso/issues/1950)) ([c85647e](https://github.com/toptal/picasso/commit/c85647e3137166d19a29e58f8b9896794a7b8a2b))

## [5.14.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.14.0...@toptal/picasso@5.14.1) (2021-03-04)

### Bug Fixes

- **PromptModal:** rendering on mobile ([#1945](https://github.com/toptal/picasso/issues/1945)) ([3217711](https://github.com/toptal/picasso/commit/3217711cbc4b80ac330521674046c44ead84f0c8))

# [5.14.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.13.0...@toptal/picasso@5.14.0) (2021-03-04)

### Features

- **outlinedinput:** improve disabled input accessibility ([#1944](https://github.com/toptal/picasso/issues/1944)) ([8c53c52](https://github.com/toptal/picasso/commit/8c53c52731947c964c5b1c864dd5efd02ad811b5))

# [5.13.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.12.4...@toptal/picasso@5.13.0) (2021-03-04)

### Features

- **TableCell:** add rowSpan property ([#1943](https://github.com/toptal/picasso/issues/1943)) ([e7f735b](https://github.com/toptal/picasso/commit/e7f735b72a43398447a9e4640f9fffb7b3b5bc29))

## [5.12.4](https://github.com/toptal/picasso/compare/@toptal/picasso@5.12.3...@toptal/picasso@5.12.4) (2021-03-03)

**Note:** Version bump only for package @toptal/picasso

## [5.12.3](https://github.com/toptal/picasso/compare/@toptal/picasso@5.12.2...@toptal/picasso@5.12.3) (2021-03-02)

### Bug Fixes

- **PageArticle:** make smaller padding for smaller screens ([#1941](https://github.com/toptal/picasso/issues/1941)) ([c74d603](https://github.com/toptal/picasso/commit/c74d6031a5b9cae00298fc18f20807a25e6be3fe))

## [5.12.2](https://github.com/toptal/picasso/compare/@toptal/picasso@5.12.1...@toptal/picasso@5.12.2) (2021-03-02)

**Note:** Version bump only for package @toptal/picasso

## [5.12.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.12.0...@toptal/picasso@5.12.1) (2021-03-01)

### Bug Fixes

- **autocomplete:** fix focus on input reset ([#1930](https://github.com/toptal/picasso/issues/1930)) ([be492b5](https://github.com/toptal/picasso/commit/be492b5b7b89dc7efe9eaab6333fec73ea3c0f0d))

# [5.12.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.11.1...@toptal/picasso@5.12.0) (2021-02-26)

### Features

- allow passing data-testid to icons ([#1934](https://github.com/toptal/picasso/issues/1934)) ([29bd3c6](https://github.com/toptal/picasso/commit/29bd3c69de3cb8d2984a514961831e79c4aa5ab0))

## [5.11.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.11.0...@toptal/picasso@5.11.1) (2021-02-25)

**Note:** Version bump only for package @toptal/picasso

# [5.11.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.12...@toptal/picasso@5.11.0) (2021-02-25)

### Features

- cross platform package builds ([#1925](https://github.com/toptal/picasso/issues/1925)) ([21f30be](https://github.com/toptal/picasso/commit/21f30beeb360fcc67c88d70af5c3234d8dcfe213))

## [5.10.12](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.11...@toptal/picasso@5.10.12) (2021-02-25)

### Bug Fixes

- **Notification:** remove custom variant ([#1924](https://github.com/toptal/picasso/issues/1924)) ([235d8f4](https://github.com/toptal/picasso/commit/235d8f4f18f7ac61493489a0df3de22036ff03db))

## [5.10.11](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.10...@toptal/picasso@5.10.11) (2021-02-25)

**Note:** Version bump only for package @toptal/picasso

## [5.10.10](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.9...@toptal/picasso@5.10.10) (2021-02-18)

### Bug Fixes

- multiline radio, checkbox and switch label alignment ([#1890](https://github.com/toptal/picasso/issues/1890)) ([f7f4aa0](https://github.com/toptal/picasso/commit/f7f4aa0effa5b7218ae2fd171186eb9c2aa37a2a))

## [5.10.9](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.8...@toptal/picasso@5.10.9) (2021-02-16)

### Bug Fixes

- **ButtonAction + ButtonCircular:** type as overridable component ([#1918](https://github.com/toptal/picasso/issues/1918)) ([2256e54](https://github.com/toptal/picasso/commit/2256e545130e39abf0e45b4e387c44ab52a776de))

## [5.10.8](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.7...@toptal/picasso@5.10.8) (2021-02-15)

### Bug Fixes

- **ScrollMenu:** fix scroll menu error when no item selected ([#1909](https://github.com/toptal/picasso/issues/1909)) ([4bf871d](https://github.com/toptal/picasso/commit/4bf871d5a0008d8eb8385b87ae07bbd96c230deb))

## [5.10.7](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.6...@toptal/picasso@5.10.7) (2021-02-15)

**Note:** Version bump only for package @toptal/picasso

## [5.10.6](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.5...@toptal/picasso@5.10.6) (2021-02-12)

### Bug Fixes

- **Select:** make select to close on item click ([#1905](https://github.com/toptal/picasso/issues/1905)) ([dff9157](https://github.com/toptal/picasso/commit/dff91579d1f710b7625c32c96d38596f00fed532))

## [5.10.5](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.4...@toptal/picasso@5.10.5) (2021-02-11)

**Note:** Version bump only for package @toptal/picasso

## [5.10.4](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.3...@toptal/picasso@5.10.4) (2021-02-11)

### Bug Fixes

- **Sidebar:** make expanded sub menu with wrapper ([#1906](https://github.com/toptal/picasso/issues/1906)) ([c96fdff](https://github.com/toptal/picasso/commit/c96fdff06cfb6733a80ae972245335e55803e052))

## [5.10.3](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.2...@toptal/picasso@5.10.3) (2021-02-10)

**Note:** Version bump only for package @toptal/picasso

## [5.10.2](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.1...@toptal/picasso@5.10.2) (2021-02-10)

### Bug Fixes

- **Link:** fix visited state ([#1903](https://github.com/toptal/picasso/issues/1903)) ([d8c31ed](https://github.com/toptal/picasso/commit/d8c31ed38bf017ca59e4e46680fe940f522aacdd))

## [5.10.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.0...@toptal/picasso@5.10.1) (2021-02-09)

### Bug Fixes

- **ScrollMenu:** fix scrolling behaviour ([#1882](https://github.com/toptal/picasso/issues/1882)) ([6982a29](https://github.com/toptal/picasso/commit/6982a297602b7de626ac66da46819e88e38c5111))

# [5.10.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.9.0...@toptal/picasso@5.10.0) (2021-02-08)

### Features

- **NativeSelect:** extract native select ([#1863](https://github.com/toptal/picasso/issues/1863)) ([34b5739](https://github.com/toptal/picasso/commit/34b57397a6d361fe448f92f5a25adf54982ade5f))

# [5.9.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.8.1...@toptal/picasso@5.9.0) (2021-02-08)

### Features

- **Link:** add active and visited outline ([#1893](https://github.com/toptal/picasso/issues/1893)) ([906762a](https://github.com/toptal/picasso/commit/906762a51466165b7e028707d8fa5c4b6a013c57))

## [5.8.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.8.0...@toptal/picasso@5.8.1) (2021-02-03)

**Note:** Version bump only for package @toptal/picasso

# [5.8.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.7.0...@toptal/picasso@5.8.0) (2021-02-03)

### Features

- **InputAdornment:** add stopPropagation prop ([#1883](https://github.com/toptal/picasso/issues/1883)) ([c17f4cd](https://github.com/toptal/picasso/commit/c17f4cd94ce5891e94e45129057b3550b13c1d7b))

# [5.7.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.6.0...@toptal/picasso@5.7.0) (2021-02-01)

### Features

- **Icon:** add Referrals Dashboard icon ([#1876](https://github.com/toptal/picasso/issues/1876)) ([3fbef89](https://github.com/toptal/picasso/commit/3fbef89896f1ee39d493167a704064327576f822))

# [5.6.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.5.2...@toptal/picasso@5.6.0) (2021-01-29)

### Features

- **Icon:** add Archive icon ([#1873](https://github.com/toptal/picasso/issues/1873)) ([0db836f](https://github.com/toptal/picasso/commit/0db836f6cb82c2265aa8caa946ead4aca534896e))

## [5.5.2](https://github.com/toptal/picasso/compare/@toptal/picasso@5.5.1...@toptal/picasso@5.5.2) (2021-01-29)

**Note:** Version bump only for package @toptal/picasso

## [5.5.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.5.0...@toptal/picasso@5.5.1) (2021-01-28)

**Note:** Version bump only for package @toptal/picasso

# [5.5.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.9...@toptal/picasso@5.5.0) (2021-01-25)

### Features

- **Typography:** add option to inherit weight ([#1862](https://github.com/toptal/picasso/issues/1862)) ([146d3a4](https://github.com/toptal/picasso/commit/146d3a44926ed515c5cc284f3dbd2d459efd39bd))

## [5.4.9](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.8...@toptal/picasso@5.4.9) (2021-01-21)

**Note:** Version bump only for package @toptal/picasso

## [5.4.8](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.7...@toptal/picasso@5.4.8) (2021-01-21)

### Bug Fixes

- **Input:** fix autocomplete edges non-clickable ([#1855](https://github.com/toptal/picasso/issues/1855)) ([772607a](https://github.com/toptal/picasso/commit/772607a0ac6b8f66359b784f5834370a72bc5d83))

## [5.4.7](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.6...@toptal/picasso@5.4.7) (2021-01-20)

### Bug Fixes

- **FileInput:** not opening file picker ([#1859](https://github.com/toptal/picasso/issues/1859)) ([ac4451c](https://github.com/toptal/picasso/commit/ac4451cd3e71cbf62a252ec522455d346a39b3ab))

## [5.4.6](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.5...@toptal/picasso@5.4.6) (2021-01-20)

**Note:** Version bump only for package @toptal/picasso

## [5.4.5](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.4...@toptal/picasso@5.4.5) (2021-01-20)

**Note:** Version bump only for package @toptal/picasso

## [5.4.4](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.3...@toptal/picasso@5.4.4) (2021-01-18)

**Note:** Version bump only for package @toptal/picasso

## [5.4.3](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.2...@toptal/picasso@5.4.3) (2021-01-18)

**Note:** Version bump only for package @toptal/picasso

## [5.4.2](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.1...@toptal/picasso@5.4.2) (2021-01-18)

**Note:** Version bump only for package @toptal/picasso

## [5.4.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.0...@toptal/picasso@5.4.1) (2021-01-18)

### Bug Fixes

- **amount:** expose Amount formatter and extend Amount component ([#1842](https://github.com/toptal/picasso/issues/1842)) ([77f2358](https://github.com/toptal/picasso/commit/77f23582fe79f0ddf9044e5eacf97acc28e46211))

# [5.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.3.0...@toptal/picasso@5.4.0) (2021-01-15)

### Features

- **helpbox:** add prop width to the content ([#1843](https://github.com/toptal/picasso/issues/1843)) ([ebe98fd](https://github.com/toptal/picasso/commit/ebe98fd1480d68076b984c0a7be06e79f574b0a1))

# [5.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.2.0...@toptal/picasso@5.3.0) (2021-01-13)

### Features

- **icon:** add career icons ([#1837](https://github.com/toptal/picasso/issues/1837)) ([4557c5b](https://github.com/toptal/picasso/commit/4557c5b0fd3ea17deed3a35dc436663ad310097b))

# [5.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.1.4...@toptal/picasso@5.2.0) (2021-01-07)

### Features

- **TypographyOverflow:** tooltip variants ([#1823](https://github.com/toptal/picasso/issues/1823)) ([777796c](https://github.com/toptal/picasso/commit/777796c6162c52d3a47f9e761e34c57824739efc))

## [5.1.4](https://github.com/toptal/picasso/compare/@toptal/picasso@5.1.3...@toptal/picasso@5.1.4) (2021-01-07)

### Bug Fixes

- **Tooltip:** fix non-working delay prop ([#1827](https://github.com/toptal/picasso/issues/1827)) ([7120a93](https://github.com/toptal/picasso/commit/7120a9335d38b52968709eb53dfc8a62d6b996eb))
- changelog links ([#1828](https://github.com/toptal/picasso/issues/1828)) ([f87f43d](https://github.com/toptal/picasso/commit/f87f43d776572340ebd358207e2992092b61e70f))

## [5.1.3](https://github.com/toptal/picasso/compare/@toptal/picasso@5.1.2...@toptal/picasso@5.1.3) (2021-01-05)

**Note:** Version bump only for package @toptal/picasso

## [5.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso@5.1.1...@toptal/picasso@5.1.2) (2020-12-31)

**Note:** Version bump only for package @toptal/picasso

## [5.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.1.0...@toptal/picasso@5.1.1) (2020-12-29)

**Note:** Version bump only for package @toptal/picasso

# [5.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.0.1...@toptal/picasso@5.1.0) (2020-12-29)

### Features

- **icon:** add talent referral icon ([#1817](https://github.com/toptal/picasso/issues/1817)) ([152549e](https://github.com/toptal/picasso/commit/152549e5d294e29148070da6f8429372d75eedc8))

## [5.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.0.0...@toptal/picasso@5.0.1) (2020-12-29)

### Bug Fixes

- **PageArticle:** reference to picasso package ([#1816](https://github.com/toptal/picasso/issues/1816)) ([dad13d5](https://github.com/toptal/picasso/commit/dad13d504afd29699fd9a6df85625edb35cf2af1))

# [5.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.117.1...@toptal/picasso@5.0.0) (2020-12-22)

## Introduction to BASE 2.0

### By Aleksandar Djuric

After the official launch of Talent Portal, the team received feedback through UserVoice related to better readability and ergonomics. At that point, Talent Portal was the first product that fully leaned on the first version of BASE, or BASE v1.

We took a deep dive into the analysis and listed out observations. Analysis can be found [here](https://toptal-core.atlassian.net/l/c/5KKKmANF).

After analysis, the design team started testing different solutions that were the origin of the evolution of BASE v1 into BASE v2. The goal was to change and build up confidence and approval from our talent audience, regarding implementation of updates that we listed out as possible solutions. Documentation regarding the test can be found [here](https://toptal-core.atlassian.net/l/c/2cdeaDu5).

### What is BASE v2?

Every interface language has its updates. Version 2 is just another step in our iterative process. We built the technical foundation on the design front where we have an easy way to update components according to user feedback. How technology changes and how the mindset of people using our products changes, our UI and UX are going to follow it, so that we make sure we have world-class product experience in place.

### Important changes:

- **Toning down interface with better contrast and readability.** Reducing heavy saturated header and unrecognizable sidebar.

- **Changing form elements to follow the corner radius of buttons (in other words making them consistent).** Due to previous leadership, we had this inconsistency in place that didn’t really have a lot of value in place. Consistent corner radius and rounded corners in general help with usability. With new VP Brand Strategy settling up in Toptal, we decided it is the right time to make them consistent. Here are two good sources on why this holds a lot of value:

  - [https://uxdesign.cc/make-sense-of-rounded-corners-on-buttons-dfc8e13ea7f7](https://uxdesign.cc/make-sense-of-rounded-corners-on-buttons-dfc8e13ea7f7)

  - [https://ux.stackexchange.com/questions/11150/how-do-rounded-corners-affect-usability](https://ux.stackexchange.com/questions/11150/how-do-rounded-corners-affect-usability)

- **Creating documentation for every component.** This is currently being worked on and we are on the good track to finish more than 85% of it by the end of 2020. Proper documentation will help designers as owners to know how to use the component the right way, but also other partners in the process — such as engineering, content, product or even stakeholders.

### Features

- **Alert**

  - added Alert.Inline component

    ![Alert Inline](https://user-images.githubusercontent.com/2836281/103081159-0e4f4900-45e0-11eb-81b1-894645718db8.png)

  - refactored Alert to use BASE 2.0 components

- **Autocomplete**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
  - added option description
  - added checkmark for selected options
  - removed checkmark and updated padding
  - fixed that adornment/icon click was not focusing the component
  - options list does not open on focus anymore. Users should press Space/Enter/ArrowUp/ArrowDown to open it now
- **Button**
  - aligned with BASE 2.0 design
  - added `flexShrink: 0`
- **Button.Action**

  - added a new component

    ![Button.Action](https://user-images.githubusercontent.com/2836281/103081204-245d0980-45e0-11eb-9ce4-709e73a32bef.png)

- **Button.Circular**

  - added a new component

    ![Button.Circular](https://user-images.githubusercontent.com/2836281/103081218-2fb03500-45e0-11eb-9352-7682a9dbc6d5.png)

- **Button.Group**
  - allow nesting `Button` components
- **Checkbox**
  - aligned with BASE 2.0 design
  - fix `Checkbox.Group` with nested `Checkbox`
  - set pointer by default, arrow for disabled
- **Container**
  - added `rounded` property
- **Drawer**
  - aligned with BASE 2.0 design
- **Datepicker**
  - set text cursor by default, arrow for disabled, pointer for dates and buttons inside dropdown
- **FileInput**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
  - fix adornment/icon click is focusing the component
- **Form**
  - exported `FORM_ERROR` constant from `picasso-forms`
  - if you return a string message from `onSubmit`, the message will be displayed as an error flash notification
  - spacing between form input components is decreased
  - added form config for setting required decoration (`asterisk` vs `(optional)`)
- **Form.Label**
  - added prop `requiredDecoration` to show `asterisk` or `(optional)`, but the prefered way - `(optional)`
- **Form.SubmitButton**
  - added 2 new button types - `circular` and `action`
- **Helpbox**
  - aligned with BASE 2.0 design
  - modified internal padding - set to `medium`
  - added rounded corners
- **Indicator**
  - aligned colors with BASE 2.0 design
  - `green` color changed to use `darker green` color
- **Input**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
  - set text cursor by default, arrow for disabled
- **Modal**
  - aligned with BASE 2.0 design
  - no close on backdrop click
  - added rounded corners
  - changed a style of the close button
  - added scroll shades for the end of the content
  - increased content paddings
  - fixed modal close button position
  - adjusted modal action spacing
- **MonthSelect**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
- **Notification**

  - aligned with BASE 2.0 design
  - added border radius, margin and shadows
  - content width increased
  - left-aligned content
  - icon size reduced

    | Before                                                                                                                       | After                                                                                                                       |
    | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
    | ![Notification before](https://user-images.githubusercontent.com/2836281/103081241-3d65ba80-45e0-11eb-8149-7dbaa838f995.png) | ![Notification after](https://user-images.githubusercontent.com/2836281/103081260-45bdf580-45e0-11eb-9588-d5f5852bf1c9.png) |
    |                                                                                                                              |                                                                                                                             |

- **NumberInput**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
  - changed icons to `ArrowUpMinor16` and `ArrowDownMinor16`
  - fixed adornment/icon click was not focusing the component
- **OverviewBlock**
  - aligned with BASE 2.0 design
  - changed background color to white
  - changed paddings, added vertical separators
  - added `OverviewBlock.Row` component to support multiple-line layout for blocks
- **OverviewBlock.Group**
  - added `align` and `blockWidth` props
- **Page.Article**
  - added a new component
- **Page.Header**
  - aligned with BASE 2.0 design
  - decreased height
- **PromptModal**
  - fixed operations on unmounted component
- **Radio**
  - aligned with BASE 2.0 design
  - changed hover & focus styles
  - set pointer by default, arrow for disabled
- **Radio.Group**
  - removed overriding of internal paddings inside `Form.Field`
- **Sidebar**

  - aligned with BASE 2.0 design
  - made width narrower
  - changed background color to `grey lighter`
  - increased top offset
  - induced grey background on the left side of the page

    | Before                                                                                                                  | After                                                                                                                   |
    | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
    | ![Sidebar before](https://user-images.githubusercontent.com/2836281/103081284-52424e00-45e0-11eb-8913-a7c1708da657.png) | ![Sidebar after](https://user-images.githubusercontent.com/17337276/103614563-1352b780-4f53-11eb-8285-30615c30c889.png) |
    |                                                                                                                         |                                                                                                                         |

- **Sidebar.Item**
  - changed the left margin for collapsible and non-collapsible items
  - added additional horizontal margins to align with BASE 2.0
  - fixed some issues with text-overflow for items in the collapsible menus
- **Select**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
  - fixed issue with multiple highlighted options
  - added option description
  - added checkmark for selected options
  - changed the color of the selected option to black
  - changed arrow icons
  - added dedicated search input
  - disabled input functionality for the select input, instead added Search input inside the options list
  - added property `searchPlaceholder` to set placeholder for the added Search input inside options list. Default value `Search`
  - `searchThreshold` default value is set to 10 instead of 4 previously
  - fixed cursor when hovering disabled component
  - options list does not open on focus anymore. Users should press Space/Enter/ArrowUp/ArrowDown to open it
  - open options list on key down for arrow up and arrow down for Native Select
  - set pointer cursor by default, arrow for disabled
- **Subheader**
  - aligned with BASE 2.0 design
  - removed left padding
- **Subheader.Breadcrumbs**

  - not part of Subheader anymore and Breadcrumbs decided to make as a separate component in scope of picasso-lab

    ```
    import { Breadcrumbs } from '@toptal/picasso-lab'
    ```

- **Switch**

  - added a new component

    ![Switch](https://user-images.githubusercontent.com/2836281/103081319-67b77800-45e0-11eb-9a8e-d492751e3867.png)

- **Tag.Rectangular**

  - added a new component

    ![Tag.Rectangular](https://user-images.githubusercontent.com/2836281/103081336-71d97680-45e0-11eb-8004-06e34593cb23.png)

    ![Tag.Rectangular indicator](https://user-images.githubusercontent.com/2836281/103081356-79991b00-45e0-11eb-983b-0552327c84b7.png)

- **TagSelector**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
  - options list does not open on focus anymore. Users should press Space/Enter/ArrowUp/ArrowDown to open it
- **Timepicker**
  - set default cursor by default, pointer for icon
- **Tooltip**
  - prevent tooltip overflow by default
  - fixed positioning inside a dropdown
  - uncontrolled `Tooltip` is getting closed after second click/touch on children element
  - allow click events to propagate

### BREAKING CHANGES

- **Accordion**

  - aligned borders with BASE 2.0
  - Accordion: `bordered` prop is renamed to `borders`, which has 3 new values - `all`, `middle` and `none`

    Accordion borders:

    - `bordered: true` -> `all` (default value)
    - `bordered: false` -> `none`
    - `middle` is a new variant

- **Button**

  - variants have been changed and circular is extracted to separate component. Here is migration path:

    Button variants:

    - `primary-blue` -> `primary` (default value)
    - `primary-red` -> `negative`
    - `primary-green` -> `positive`
    - `secondary-blue, secondary-red, secondary-green` -> `secondary`
    - `flat` -> `secondary`
    - `flat-white` -> `transparent`
    - `secondary-white` -> `transparent`

  - `<Button circular />` was replaced with `<Button.Circular />` with dedicated variants only for circular button: `primary, flat and transparent`

- **Colors**
  - `grey.lighter` changed to `#f3f4f6`
  - `grey.light` changed to `#e5e7ea`
  - added new colors `grey.lighter2` and `grey.light2`, which have old color values of `grey.lighter` (`#ebeced`) and `grey.light` (`#d8d9dc`)
- **Checkbox**
  - `required` prop changed to `requiredDecoration`, which now supports two options: asterisk or optional
- **Form.Label**
  - `required` prop changed to `requiredDecoration`, which now supports two options: asterisk or optional
- **Label**
  - renamed to `Tag`
  - removed white variant
  - added blue variant
- **Modal**
  - `disableBackdropClick` is set by default now and can't be modified
  - set base `font-size` to `1rem`
- **Notification**
  - removed `variant`, `elevated`, `fullWidth` and `icon` props
- **Page.BannerMessage**
  - component is removed
- **Page.Content**
  - padding is reduced
  - removed horizontal padding, now you should use `Page.Article` component
- **Page.Header**
  - set the default Page.Header variant to dark. If you need a `light` variant - set `variant='light'`.
  - renamed to `Page.TopBar`
- **Page.HeaderMenu**
  - renamed to `Page.TopBarMenu`
- **PromptModal**

  - variant prop has changed its values to `positive` or `negative`

    PromptModal variants:

    - `green` -> `positive` (default value)
    - `red` -> `negative`
    - `blue` -> removed

- **Select**
  - `onSearchChange` is deprecated and will be removed in the next Picasso version. Select component should not be used with dynamic options anymore. Please use Autocomplete instead for such case
- **Subheader**
  - renamed to `PageHead`
- **Sidebar**
  - increased horizontal padding
  - background becomes gray lighter if there is a `Sidebar` on a page
- **Sidebar.Logo**
  - increased left padding
- **Tooltip**
  - `preventOverflow` property of Tooltip component changed default value from `false` to `true`
- **UserBadge**
  - avatar size is reduced

* `useModals` is removed, instead use `useModal`
* `showPrompt` is removed, instead use `showModal` in combination with `PromptModal`
* `useModal` expect you to add `Modal` or `PromptModal` in your component in explicit way
* for mutliple modals create declare multiple hooks, one per Modal

  ```
  import { useModal } from '@toptal/picasso/utils'

  ...

  const {showModal, hideModal, isOpen } = useModal()

  ...

  const handleClick = () => showModal()

  ...

  <Modal open={isOpen} onClose={hideModal} />
  ```

## [4.117.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.117.0...@toptal/picasso@4.117.1) (2020-12-15)

### Bug Fixes

- **picasso-forms:** scroll to any field with error ([#1779](https://github.com/toptal/picasso/issues/1779)) ([4ab2533](https://github.com/toptal/picasso/commit/4ab2533481770c52d8228609bfeec4505c847bd3))

# [4.117.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.116.0...@toptal/picasso@4.117.0) (2020-12-15)

### Features

- **Icon:** add commission icon ([#1785](https://github.com/toptal/picasso/issues/1785)) ([2f83ad0](https://github.com/toptal/picasso/commit/2f83ad09060ee5f9975f182e0c4096f195a07af2))

# [4.116.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.115.2...@toptal/picasso@4.116.0) (2020-12-14)

### Features

- [SPT-1202] Add tooltip delay on the typography overflow ([#1778](https://github.com/toptal/picasso/issues/1778)) ([0b77ffa](https://github.com/toptal/picasso/commit/0b77ffab2dbd23a55da0b15fb2141d6b525759a1))

## [4.115.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.115.1...@toptal/picasso@4.115.2) (2020-12-09)

**Note:** Version bump only for package @toptal/picasso

## [4.115.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.115.0...@toptal/picasso@4.115.1) (2020-11-30)

### Bug Fixes

- **Modal:** change Modal width size em to rem ([#1744](https://github.com/toptal/picasso/issues/1744)) ([4ec467a](https://github.com/toptal/picasso/commit/4ec467ad98729452577db02f45ccd989f531406e))

# [4.115.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.114.0...@toptal/picasso@4.115.0) (2020-11-30)

### Features

- **icons:** add TriangleLeftMinorSolid and TriangleRightMinorSolid16 ([#1707](https://github.com/toptal/picasso/issues/1707)) ([b4324bc](https://github.com/toptal/picasso/commit/b4324bcc441c55b9d3f20e9edbf00cb4191fd8b7))

# [4.114.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.113.1...@toptal/picasso@4.114.0) (2020-11-26)

### Features

- **icon:** new icon scheduledPayment ([#1725](https://github.com/toptal/picasso/issues/1725)) ([9b1e461](https://github.com/toptal/picasso/commit/9b1e461036dcec851d6daf3910d0e3ef473f0b1c))

## [4.113.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.113.0...@toptal/picasso@4.113.1) (2020-11-20)

### Bug Fixes

- **Select:** use white background for input ([#1697](https://github.com/toptal/picasso/issues/1697)) ([12627ad](https://github.com/toptal/picasso/commit/12627adaf2f807a241b31da03fcf219569bbffea))

# [4.113.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.112.1...@toptal/picasso@4.113.0) (2020-11-17)

### Features

- [PRO-1604] Expose input outline ref prop ([#1682](https://github.com/toptal/picasso/issues/1682)) ([b3250ce](https://github.com/toptal/picasso/commit/b3250ce5f2372230844fec5310b3cb2262187241))

## [4.112.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.112.0...@toptal/picasso@4.112.1) (2020-11-13)

**Note:** Version bump only for package @toptal/picasso

# [4.112.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.111.0...@toptal/picasso@4.112.0) (2020-11-12)

### Features

- **Tooltip:** add new placement variants ([#1678](https://github.com/toptal/picasso/issues/1678)) ([649b2f6](https://github.com/toptal/picasso/commit/649b2f6e27841cbecd1d14a5dc6566b5b827586e))

# [4.111.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.110.2...@toptal/picasso@4.111.0) (2020-11-10)

### Features

- update staging banner color and favicon ([#1668](https://github.com/toptal/picasso/issues/1668)) ([432915d](https://github.com/toptal/picasso/commit/432915dcddf320cd0554a283316a86839fb637da))

## [4.110.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.110.1...@toptal/picasso@4.110.2) (2020-11-10)

**Note:** Version bump only for package @toptal/picasso

## [4.110.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.110.0...@toptal/picasso@4.110.1) (2020-11-10)

**Note:** Version bump only for package @toptal/picasso

# [4.110.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.9...@toptal/picasso@4.110.0) (2020-11-09)

### Features

- **icons:** add award icon ([#1666](https://github.com/toptal/picasso/issues/1666)) ([03bb25d](https://github.com/toptal/picasso/commit/03bb25d545b6a9f9c64ab6559652b86275001e12))

## [4.109.9](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.8...@toptal/picasso@4.109.9) (2020-11-06)

**Note:** Version bump only for package @toptal/picasso

## [4.109.8](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.7...@toptal/picasso@4.109.8) (2020-11-04)

### Bug Fixes

- **Input:** update multiline limit text ([#1475](https://github.com/toptal/picasso/issues/1475)) ([f1d7f50](https://github.com/toptal/picasso/commit/f1d7f50bbe2bddf991b8a4e955895a2638aaafba))

## [4.109.7](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.6...@toptal/picasso@4.109.7) (2020-11-02)

**Note:** Version bump only for package @toptal/picasso

## [4.109.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.5...@toptal/picasso@4.109.6) (2020-11-02)

**Note:** Version bump only for package @toptal/picasso

## [4.109.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.4...@toptal/picasso@4.109.5) (2020-10-29)

### Bug Fixes

- **button:** add styles for transparent disabled button ([#1650](https://github.com/toptal/picasso/issues/1650)) ([3b5b170](https://github.com/toptal/picasso/commit/3b5b1704d4a2431f702e40469f2346944b0de195))

## [4.109.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.3...@toptal/picasso@4.109.4) (2020-10-27)

**Note:** Version bump only for package @toptal/picasso

## [4.109.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.2...@toptal/picasso@4.109.3) (2020-10-27)

**Note:** Version bump only for package @toptal/picasso

## [4.109.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.1...@toptal/picasso@4.109.2) (2020-10-21)

**Note:** Version bump only for package @toptal/picasso

## [4.109.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.0...@toptal/picasso@4.109.1) (2020-10-21)

**Note:** Version bump only for package @toptal/picasso

# [4.109.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.108.3...@toptal/picasso@4.109.0) (2020-10-15)

### Features

- **UserBadge:** extend `title` by adding `renderTitle` prop ([#1622](https://github.com/toptal/picasso/issues/1622)) ([6011e26](https://github.com/toptal/picasso/commit/6011e26187c46752f868c03b4a4aab7859a29c00))

## [4.108.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.108.2...@toptal/picasso@4.108.3) (2020-10-13)

### Bug Fixes

- **tooltip:** revert the enter delay changes to interactive tooltip ([#1618](https://github.com/toptal/picasso/issues/1618)) ([b429576](https://github.com/toptal/picasso/commit/b4295769b9cc16eb3e898a28b2ac63da976dac87)), closes [#1617](https://github.com/toptal/picasso/issues/1617)

## [4.108.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.108.1...@toptal/picasso@4.108.2) (2020-10-13)

### Bug Fixes

- **tooltip:** get rid of blinking from interactive tooltips ([#1617](https://github.com/toptal/picasso/issues/1617)) ([91086ee](https://github.com/toptal/picasso/commit/91086eefb89115b5d761d30f4e7cd3bbcd8ada83))

## [4.108.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.108.0...@toptal/picasso@4.108.1) (2020-10-12)

### Bug Fixes

- **Autocomplete:** fixed menu placement for custom width ([#1615](https://github.com/toptal/picasso/issues/1615)) ([e7fb696](https://github.com/toptal/picasso/commit/e7fb6967700e145e75d9ebcad8e0ef68d986b32e))

# [4.108.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.107.0...@toptal/picasso@4.108.0) (2020-10-12)

### Features

- **icons:** update org structure icons, add pod ([#1614](https://github.com/toptal/picasso/issues/1614)) ([d01a5a0](https://github.com/toptal/picasso/commit/d01a5a0dd523759f661edbd2e5b8395a01b51851))

# [4.107.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.106.0...@toptal/picasso@4.107.0) (2020-10-12)

### Features

- **autocomplete:** add menuWidth prop ([#1612](https://github.com/toptal/picasso/issues/1612)) ([2e24c3f](https://github.com/toptal/picasso/commit/2e24c3f1fe149d360108e763ed2c1fe9a6833487))

# [4.106.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.105.2...@toptal/picasso@4.106.0) (2020-10-08)

### Features

- **icon:** add org structure icons ([#1607](https://github.com/toptal/picasso/issues/1607)) ([b77d21c](https://github.com/toptal/picasso/commit/b77d21cb04b2464d085de003c1d3bbe5d6b31e2e))

## [4.105.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.105.1...@toptal/picasso@4.105.2) (2020-10-07)

### Bug Fixes

- autocomplete custom render example ([#1605](https://github.com/toptal/picasso/issues/1605)) ([46581fc](https://github.com/toptal/picasso/commit/46581fc40eabed06eea36609e6ceccc3a6b09fc6))

## [4.105.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.105.0...@toptal/picasso@4.105.1) (2020-10-07)

**Note:** Version bump only for package @toptal/picasso

# [4.105.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.104.0...@toptal/picasso@4.105.0) (2020-10-06)

### Features

- **icon:** add phoneDown16 icon ([#1602](https://github.com/toptal/picasso/issues/1602)) ([bd6d7a6](https://github.com/toptal/picasso/commit/bd6d7a68f4bdb5c78e3337852a2b04da2d896c41))

# [4.104.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.103.1...@toptal/picasso@4.104.0) (2020-10-02)

### Features

- **icons:** add RepresentativesSolid icons ([#1596](https://github.com/toptal/picasso/issues/1596)) ([cabc4e6](https://github.com/toptal/picasso/commit/cabc4e61303872674dc89536b24951698bc468c9))

## [4.103.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.103.0...@toptal/picasso@4.103.1) (2020-10-01)

### Bug Fixes

- fix value is not set when options dynamic ([#1591](https://github.com/toptal/picasso/issues/1591)) ([53a6241](https://github.com/toptal/picasso/commit/53a624192b7df90f5236d83d86cbcfd703055c2d))

# [4.103.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.102.0...@toptal/picasso@4.103.0) (2020-09-30)

### Features

- **icon:** add abstract icon ([#1594](https://github.com/toptal/picasso/issues/1594)) ([a7cf59a](https://github.com/toptal/picasso/commit/a7cf59a64bdba6195c940e06fbd2943c7b677ba7))

# [4.102.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.101.2...@toptal/picasso@4.102.0) (2020-09-30)

### Features

- **icon:** add confluence icon ([#1592](https://github.com/toptal/picasso/issues/1592)) ([efeb5f0](https://github.com/toptal/picasso/commit/efeb5f0ca919b0486f8cd06c4f98e72abcfb1a43))

## [4.101.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.101.1...@toptal/picasso@4.101.2) (2020-09-28)

### Bug Fixes

- default tooltip delay ([#1579](https://github.com/toptal/picasso/issues/1579)) ([df58e02](https://github.com/toptal/picasso/commit/df58e02abbcc4932ba584b0b8fce135a34152e34))

## [4.101.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.101.0...@toptal/picasso@4.101.1) (2020-09-25)

### Bug Fixes

- **ScrollMenu:** calculation in useLayoutEffect ([#1580](https://github.com/toptal/picasso/issues/1580)) ([2186a20](https://github.com/toptal/picasso/commit/2186a206395fad5f8d40d42e601dcc36ca144248))

# [4.101.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.100.1...@toptal/picasso@4.101.0) (2020-09-24)

### Features

- **Tooltip:** add maxWidth prop ([#1553](https://github.com/toptal/picasso/issues/1553)) ([bc9ad59](https://github.com/toptal/picasso/commit/bc9ad599cd4930dd88bf227205e25c648c1bce69))

## [4.100.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.100.0...@toptal/picasso@4.100.1) (2020-09-24)

### Bug Fixes

- **Select:** fix select behavior on-blur ([#1583](https://github.com/toptal/picasso/issues/1583)) ([e381ff2](https://github.com/toptal/picasso/commit/e381ff2cbc478babf81eae1820db7d983685a91d))

# [4.100.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.99.2...@toptal/picasso@4.100.0) (2020-09-24)

### Features

- **icons:** add rank icons ([#1582](https://github.com/toptal/picasso/issues/1582)) ([2208b74](https://github.com/toptal/picasso/commit/2208b747d988114608bd9a0ebe2c08cdd0282d3d))

## [4.99.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.99.1...@toptal/picasso@4.99.2) (2020-09-23)

### Bug Fixes

- **AccountSelect:** fix grid in the story for mobile ([#1574](https://github.com/toptal/picasso/issues/1574)) ([e9c4458](https://github.com/toptal/picasso/commit/e9c44585987fd2778993819306c265655f3a4146))

## [4.99.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.99.0...@toptal/picasso@4.99.1) (2020-09-18)

### Bug Fixes

- **tooltip:** trigger immediately on touch ([#1565](https://github.com/toptal/picasso/issues/1565)) ([5a8947b](https://github.com/toptal/picasso/commit/5a8947ba13f0217ee9339e3207f8d5aaac021446))

# [4.99.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.98.1...@toptal/picasso@4.99.0) (2020-09-17)

### Bug Fixes

- **tooltip:** fix compact size variant for tooltip component ([#1566](https://github.com/toptal/picasso/issues/1566)) ([93fae41](https://github.com/toptal/picasso/commit/93fae4172fe1695f88d658787ea6f4928255e7e0))

### Features

- **Modal:** add alignment prop ([#1568](https://github.com/toptal/picasso/issues/1568)) ([5e37748](https://github.com/toptal/picasso/commit/5e37748d9da5a528ba641348bb4f073e249d0070))

## [4.98.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.98.0...@toptal/picasso@4.98.1) (2020-09-14)

### Bug Fixes

- **Modal:** detect focus inside tooltip correctly if there are many ([59ebdff](https://github.com/toptal/picasso/commit/59ebdff726d7d98d5cf944ae8f27f018e928883e))

# [4.98.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.97.2...@toptal/picasso@4.98.0) (2020-09-10)

### Features

- **icon:** add services icon ([#1562](https://github.com/toptal/picasso/issues/1562)) ([91a39c8](https://github.com/toptal/picasso/commit/91a39c83ff8a8970abffa0fef9c2da24e347bea5))

## [4.97.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.97.1...@toptal/picasso@4.97.2) (2020-09-09)

**Note:** Version bump only for package @toptal/picasso

## [4.97.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.97.0...@toptal/picasso@4.97.1) (2020-09-04)

### Bug Fixes

- **Select:** fix scrolling for Select ([#1547](https://github.com/toptal/picasso/issues/1547)) ([ee893f5](https://github.com/toptal/picasso/commit/ee893f545fa7679cbc88256900342fdc459fde5b))

# [4.97.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.96.0...@toptal/picasso@4.97.0) (2020-09-04)

### Features

- **Autocomplete:** pass event in Autocomplete onSelect ([#1549](https://github.com/toptal/picasso/issues/1549)) ([ed47c51](https://github.com/toptal/picasso/commit/ed47c514edfec8023df277a1cb915eb7526959a0))

# [4.96.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.95.0...@toptal/picasso@4.96.0) (2020-09-03)

### Features

- **icon:** add timesheet icon ([#1546](https://github.com/toptal/picasso/issues/1546)) ([2e0b42c](https://github.com/toptal/picasso/commit/2e0b42c4889ccafd2cdb2d15b7fe692ea3d14ab8))

# [4.95.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.94.3...@toptal/picasso@4.95.0) (2020-09-02)

### Features

- **tooltip:** add compact size for tooltip component ([#1532](https://github.com/toptal/picasso/issues/1532)) ([3ed94f3](https://github.com/toptal/picasso/commit/3ed94f3fa1cadc33d83652baadb32e69d7becf2b))

## [4.94.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.94.2...@toptal/picasso@4.94.3) (2020-09-02)

### Reverts

- Revert "fix(Select): fix scrolling for Select (#1539)" (#1544) ([5acdaf7](https://github.com/toptal/picasso/commit/5acdaf73aaad6aa2ecca9ed74ed59c700b9ced34)), closes [#1539](https://github.com/toptal/picasso/issues/1539) [#1544](https://github.com/toptal/picasso/issues/1544)

## [4.94.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.94.1...@toptal/picasso@4.94.2) (2020-09-02)

### Bug Fixes

- **Select:** fix scrolling for Select ([#1539](https://github.com/toptal/picasso/issues/1539)) ([e9ba8e4](https://github.com/toptal/picasso/commit/e9ba8e470e258934f71e04eb7962f8c49bb43052))

## [4.94.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.94.0...@toptal/picasso@4.94.1) (2020-09-02)

**Note:** Version bump only for package @toptal/picasso

# [4.94.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.6...@toptal/picasso@4.94.0) (2020-09-02)

### Features

- **Link:** add rel="noopener" to target="\_blank" ([#1482](https://github.com/toptal/picasso/issues/1482)) ([2c7729e](https://github.com/toptal/picasso/commit/2c7729eb57d007df3dcfc1f70dbd41f3014febf2))

## [4.93.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.5...@toptal/picasso@4.93.6) (2020-09-01)

### Reverts

- Revert "fix: remove onMouseEnter (#1524)" (#1538) ([2bea39a](https://github.com/toptal/picasso/commit/2bea39af37131472484afc3b513a541f1b888407)), closes [#1524](https://github.com/toptal/picasso/issues/1524) [#1538](https://github.com/toptal/picasso/issues/1538)

## [4.93.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.4...@toptal/picasso@4.93.5) (2020-09-01)

### Bug Fixes

- **treeview:** fix issue with treeView on safari ([#1464](https://github.com/toptal/picasso/issues/1464)) ([3fd7606](https://github.com/toptal/picasso/commit/3fd76064733cf05851f4cf4d161a7f9cb5e61cd5))

## [4.93.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.3...@toptal/picasso@4.93.4) (2020-09-01)

### Bug Fixes

- remove onMouseEnter ([#1524](https://github.com/toptal/picasso/issues/1524)) ([e75378a](https://github.com/toptal/picasso/commit/e75378a12c21aef9b9a1d01c66b6826fc93d163e))

## [4.93.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.2...@toptal/picasso@4.93.3) (2020-09-01)

### Bug Fixes

- **OutlinedInput:** add tabIndex -1 to reset button ([#1534](https://github.com/toptal/picasso/issues/1534)) ([c98509f](https://github.com/toptal/picasso/commit/c98509fc72d129c2bcd77a4d45aba09e294c1f86))

## [4.93.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.1...@toptal/picasso@4.93.2) (2020-09-01)

**Note:** Version bump only for package @toptal/picasso

## [4.93.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.0...@toptal/picasso@4.93.1) (2020-08-31)

**Note:** Version bump only for package @toptal/picasso

# [4.93.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.92.1...@toptal/picasso@4.93.0) (2020-08-27)

### Features

- **NumberInput:** add start adornment ([#1501](https://github.com/toptal/picasso/issues/1501)) ([cc0e22a](https://github.com/toptal/picasso/commit/cc0e22a284ba899a0e6a4e8e6927a6305a213373))

## [4.92.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.92.0...@toptal/picasso@4.92.1) (2020-08-26)

**Note:** Version bump only for package @toptal/picasso

# [4.92.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.91.0...@toptal/picasso@4.92.0) (2020-08-26)

### Features

- **icon:** add light blue to icon color variants ([#1508](https://github.com/toptal/picasso/issues/1508)) ([b24210a](https://github.com/toptal/picasso/commit/b24210a28318cf3c39307da6f236c1a2dcb933a9))

# [4.91.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.90.0...@toptal/picasso@4.91.0) (2020-08-25)

### Features

- **tooltip:** add delay prop to the Tooltip component ([#1462](https://github.com/toptal/picasso/issues/1462)) ([65a235e](https://github.com/toptal/picasso/commit/65a235e1edc3c158ebab1df89faf6b662c20d087))

# [4.90.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.89.0...@toptal/picasso@4.90.0) (2020-08-24)

### Features

- **ExpandableRow:** allow rendering without initial transition ([#1494](https://github.com/toptal/picasso/issues/1494)) ([603ae31](https://github.com/toptal/picasso/commit/603ae31879765b407be2f3bb826bf3aa764b6fc7))

# [4.89.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.88.0...@toptal/picasso@4.89.0) (2020-08-20)

### Features

- **Slider:** add options to hide thumb and track highlight ([#1495](https://github.com/toptal/picasso/issues/1495)) ([adf27e4](https://github.com/toptal/picasso/commit/adf27e426a4dd1c21a133418b9009376cd26caf0))

# [4.88.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.87.1...@toptal/picasso@4.88.0) (2020-08-17)

### Features

- **indicator:** add green and light-grey Indicator colors ([#1489](https://github.com/toptal/picasso/issues/1489)) ([bb8f72e](https://github.com/toptal/picasso/commit/bb8f72e55ef038e5359ca1b9add7acf1d8e0d5dd))

## [4.87.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.87.0...@toptal/picasso@4.87.1) (2020-08-14)

**Note:** Version bump only for package @toptal/picasso

# [4.87.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.86.1...@toptal/picasso@4.87.0) (2020-08-13)

### Features

- **Select:** add noOptionText to Select props ([#1473](https://github.com/toptal/picasso/issues/1473)) ([164354a](https://github.com/toptal/picasso/commit/164354a371fd7307a833e3be086863ec8cebcad3))

## [4.86.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.86.0...@toptal/picasso@4.86.1) (2020-08-12)

**Note:** Version bump only for package @toptal/picasso

# [4.86.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.85.0...@toptal/picasso@4.86.0) (2020-08-12)

### Features

- **icon:** add reset icon ([#1477](https://github.com/toptal/picasso/issues/1477)) ([dd48b07](https://github.com/toptal/picasso/commit/dd48b078c8141f0679207a64cd8281ab1f6c7791))

# [4.85.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.84.2...@toptal/picasso@4.85.0) (2020-08-11)

### Features

- **TagSelector:** add noOptionText to TagSelector props ([#1466](https://github.com/toptal/picasso/issues/1466)) ([5cf4bfc](https://github.com/toptal/picasso/commit/5cf4bfcade283601dad56f185ada98861454a765))

## [4.84.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.84.1...@toptal/picasso@4.84.2) (2020-08-11)

**Note:** Version bump only for package @toptal/picasso

## [4.84.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.84.0...@toptal/picasso@4.84.1) (2020-08-10)

**Note:** Version bump only for package @toptal/picasso

# [4.84.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.83.0...@toptal/picasso@4.84.0) (2020-08-10)

### Features

- add disable portal for slider ([#1467](https://github.com/toptal/picasso/issues/1467)) ([08b4460](https://github.com/toptal/picasso/commit/08b4460ba2ebac7b26a82d35bb75e8fd48436c6e))

# [4.83.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.82.3...@toptal/picasso@4.83.0) (2020-08-10)

### Features

- **icon:** add component icon ([#1470](https://github.com/toptal/picasso/issues/1470)) ([b9e8eab](https://github.com/toptal/picasso/commit/b9e8eabf7c6520e32e131b5938db677b06b8b2e9))

## [4.82.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.82.2...@toptal/picasso@4.82.3) (2020-08-06)

### Bug Fixes

- **Select:** fix scrolling on hover of the bottom element ([#1461](https://github.com/toptal/picasso/issues/1461)) ([908cfe4](https://github.com/toptal/picasso/commit/908cfe40758cb2ed1b819672df0c6b460a2c7072))

## [4.82.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.82.1...@toptal/picasso@4.82.2) (2020-08-05)

### Bug Fixes

- the menu is not visible for disabled select ([#1459](https://github.com/toptal/picasso/issues/1459)) ([b8be7c0](https://github.com/toptal/picasso/commit/b8be7c0e9c11a96c58104499e3ceac35b8819b80))

## [4.82.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.82.0...@toptal/picasso@4.82.1) (2020-08-03)

### Bug Fixes

- show the tooltip for disabled checkbox ([#1456](https://github.com/toptal/picasso/issues/1456)) ([2ede2fb](https://github.com/toptal/picasso/commit/2ede2fbfd703bf73c56c4cc0b2e0ba9c9867ae73))

# [4.82.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.81.0...@toptal/picasso@4.82.0) (2020-08-03)

### Features

- **icon:** add gift icon ([#1457](https://github.com/toptal/picasso/issues/1457)) ([f6bcf3b](https://github.com/toptal/picasso/commit/f6bcf3ba767abea464cdff60d86337504a9286b1))

# [4.81.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.80.0...@toptal/picasso@4.81.0) (2020-07-31)

### Features

- **forms:** add CheckboxGroup ([#1448](https://github.com/toptal/picasso/issues/1448)) ([61e8570](https://github.com/toptal/picasso/commit/61e8570bf0842f3e55dc0ecc8b45cd85a9891bef))

# [4.80.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.79.3...@toptal/picasso@4.80.0) (2020-07-24)

### Features

- **icon:** add link icon ([#1445](https://github.com/toptal/picasso/issues/1445)) ([4248b13](https://github.com/toptal/picasso/commit/4248b139a410de2a6ebd3153a87e24dad993f98f))

## [4.79.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.79.2...@toptal/picasso@4.79.3) (2020-07-23)

### Bug Fixes

- **Slider:** add missing field in ValueLabelProps interface ([#1443](https://github.com/toptal/picasso/issues/1443)) ([612fdc5](https://github.com/toptal/picasso/commit/612fdc56a87715cd6f9e601645878e2f5b192e69))

## [4.79.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.79.1...@toptal/picasso@4.79.2) (2020-07-23)

### Bug Fixes

- **Modal:** background moving when modal is open ([#1439](https://github.com/toptal/picasso/issues/1439)) ([1588184](https://github.com/toptal/picasso/commit/1588184f625cfc26edd36074dfb7fb47dcb68279))

## [4.79.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.79.0...@toptal/picasso@4.79.1) (2020-07-16)

### Bug Fixes

- prompt modal submit button when loading is not disabled ([#1430](https://github.com/toptal/picasso/issues/1430)) ([41d0d46](https://github.com/toptal/picasso/commit/41d0d46b5b119e85e05871c830a73dcc12f6bb01))

# [4.79.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.78.1...@toptal/picasso@4.79.0) (2020-07-15)

### Features

- [TEA-1430] add eye crossed icons ([#1435](https://github.com/toptal/picasso/issues/1435)) ([f57bde6](https://github.com/toptal/picasso/commit/f57bde6a0b1dfae5ae208282aa206295de42c132))

## [4.78.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.78.0...@toptal/picasso@4.78.1) (2020-07-15)

### Bug Fixes

- export static props to be able to extend via styled ([#1434](https://github.com/toptal/picasso/issues/1434)) ([0aaffd2](https://github.com/toptal/picasso/commit/0aaffd2a0b73c80025028ce76f868d13e3fbd522))

# [4.78.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.77.2...@toptal/picasso@4.78.0) (2020-07-15)

### Features

- add text selection on focus to Select component ([#1433](https://github.com/toptal/picasso/issues/1433)) ([244e17e](https://github.com/toptal/picasso/commit/244e17ecae59a4ba6744effe5f7b088ad9119f62))

## [4.77.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.77.1...@toptal/picasso@4.77.2) (2020-07-14)

### Bug Fixes

- ignore titleCase for Autocomplete options ([#1432](https://github.com/toptal/picasso/issues/1432)) ([e35899e](https://github.com/toptal/picasso/commit/e35899e1ecc1148f2b049d24594574af6005125a))

## [4.77.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.77.0...@toptal/picasso@4.77.1) (2020-07-14)

### Bug Fixes

- ignore titleCase for Select options ([#1431](https://github.com/toptal/picasso/issues/1431)) ([5b24f3e](https://github.com/toptal/picasso/commit/5b24f3e7c4f5ccfff5400de7d233dedebcaa2002))

# [4.77.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.76.1...@toptal/picasso@4.77.0) (2020-07-14)

### Features

- add dispute and pause icons ([#1427](https://github.com/toptal/picasso/issues/1427)) ([c06cb46](https://github.com/toptal/picasso/commit/c06cb4645f1205a44e8b370b93664a977bc5ea74))

## [4.76.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.76.0...@toptal/picasso@4.76.1) (2020-07-13)

### Bug Fixes

- **TableSectionHead:** [BXFE-486] Add colspan ([#1424](https://github.com/toptal/picasso/issues/1424)) ([d2ccdf8](https://github.com/toptal/picasso/commit/d2ccdf85602eb8be5fe092fc3decb6f49bbf1bc6))

# [4.76.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.75.0...@toptal/picasso@4.76.0) (2020-07-13)

### Features

- use AP-style title case for components ([#1422](https://github.com/toptal/picasso/issues/1422)) ([b64ed4c](https://github.com/toptal/picasso/commit/b64ed4cdb50c9d306c1c492332e4db498ab0cb72))

# [4.75.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.7...@toptal/picasso@4.75.0) (2020-07-10)

### Features

- **tablesectionhead:** bxfe-486 Implement Table Section Head ([#1423](https://github.com/toptal/picasso/issues/1423)) ([e6dec1c](https://github.com/toptal/picasso/commit/e6dec1c9adb3f8e702bdb5cc3dd5e78d457688fb))

## [4.74.7](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.6...@toptal/picasso@4.74.7) (2020-07-03)

### Bug Fixes

- remove tooltip blur delay ([#1413](https://github.com/toptal/picasso/issues/1413)) ([1826f18](https://github.com/toptal/picasso/commit/1826f1858c6c6dbfc793300b062723b247d0ef8e))

## [4.74.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.5...@toptal/picasso@4.74.6) (2020-07-01)

### Bug Fixes

- **Grid:** fix for classes prop in Grid components ([#1408](https://github.com/toptal/picasso/issues/1408)) ([f6bc2e2](https://github.com/toptal/picasso/commit/f6bc2e2f8f2552f03077500516a3a7c07616113c))

## [4.74.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.4...@toptal/picasso@4.74.5) (2020-07-01)

### Bug Fixes

- add white Container variant ([#1405](https://github.com/toptal/picasso/issues/1405)) ([bdd613a](https://github.com/toptal/picasso/commit/bdd613a7b6f315b7ef716e96687d34a76784b2d5))

## [4.74.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.3...@toptal/picasso@4.74.4) (2020-07-01)

### Bug Fixes

- typings in type declarations for picasso-shared ([#1402](https://github.com/toptal/picasso/issues/1402)) ([4129e7c](https://github.com/toptal/picasso/commit/4129e7c04526f7f83a2e1074bd76f9a0ae3d5184))

## [4.74.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.2...@toptal/picasso@4.74.3) (2020-06-29)

### Bug Fixes

- enable the first option in NativeSelect if enableReset is true ([#1395](https://github.com/toptal/picasso/issues/1395)) ([1a48eb6](https://github.com/toptal/picasso/commit/1a48eb661a86c14edcf5e4a8a0e99be0427cef1b))

## [4.74.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.1...@toptal/picasso@4.74.2) (2020-06-24)

### Bug Fixes

- **FormField:** align the top margin with the base design ([#1391](https://github.com/toptal/picasso/issues/1391)) ([fbd1455](https://github.com/toptal/picasso/commit/fbd14558cf1b12046fffe9168f71146dc0fabf78))

## [4.74.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.0...@toptal/picasso@4.74.1) (2020-06-22)

**Note:** Version bump only for package @toptal/picasso

# [4.74.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.73.1...@toptal/picasso@4.74.0) (2020-06-22)

### Features

- set default tooltip delay to .5 seconds ([#1386](https://github.com/toptal/picasso/issues/1386)) ([7a5b374](https://github.com/toptal/picasso/commit/7a5b374ee1c97e6242c23574aa57e1d17425e753))

## [4.73.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.73.0...@toptal/picasso@4.73.1) (2020-06-22)

### Bug Fixes

- documentation for Button ([#1387](https://github.com/toptal/picasso/issues/1387)) ([e53beec](https://github.com/toptal/picasso/commit/e53beec52a02f5ae57a5a46aba46fb9d611bda5e))

# [4.73.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.72.0...@toptal/picasso@4.73.0) (2020-06-16)

### Features

- **Avatar:** limit initials to 3 and fix size ([#1377](https://github.com/toptal/picasso/issues/1377)) ([6a46923](https://github.com/toptal/picasso/commit/6a46923e820024d3949c623444d92f08e345a8fc))

# [4.72.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.71.0...@toptal/picasso@4.72.0) (2020-06-12)

### Features

- add topcall icons ([#1380](https://github.com/toptal/picasso/issues/1380)) ([fd4f29e](https://github.com/toptal/picasso/commit/fd4f29ea390edfb1228f6e7dffb1dcb1a9097096))

# [4.71.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.70.0...@toptal/picasso@4.71.0) (2020-06-11)

### Features

- add global component props overriding ([#1357](https://github.com/toptal/picasso/issues/1357)) ([c251d5b](https://github.com/toptal/picasso/commit/c251d5b09353d407b2332b177921a0d4dad54470))

# [4.70.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.69.4...@toptal/picasso@4.70.0) (2020-06-09)

### Features

- **TagSelector:** add custom label render ([#1367](https://github.com/toptal/picasso/issues/1367)) ([3f2f8fb](https://github.com/toptal/picasso/commit/3f2f8fb3ea08de60ef2bed1b11aa28c798e542b9))

## [4.69.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.69.3...@toptal/picasso@4.69.4) (2020-06-09)

### Bug Fixes

- **input:** set background color to white ([#1369](https://github.com/toptal/picasso/issues/1369)) ([9083580](https://github.com/toptal/picasso/commit/90835807bf2ad4a2bb0413dac3984fb4a03c5c69)), closes [#1368](https://github.com/toptal/picasso/issues/1368)

## [4.69.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.69.2...@toptal/picasso@4.69.3) (2020-06-08)

**Note:** Version bump only for package @toptal/picasso

## [4.69.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.69.1...@toptal/picasso@4.69.2) (2020-06-08)

### Bug Fixes

- **button:** eliminate circular dependency on utils ([#1363](https://github.com/toptal/picasso/issues/1363)) ([8ce21cf](https://github.com/toptal/picasso/commit/8ce21cf8ab6773deb5c8a65e02827df10d091fbc))

## [4.69.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.69.0...@toptal/picasso@4.69.1) (2020-06-04)

### Bug Fixes

- **modal:** fix modal height on iPhone ([#1353](https://github.com/toptal/picasso/issues/1353)) ([9724ba8](https://github.com/toptal/picasso/commit/9724ba89200964c72710f7b571bb45430ce923e6))

# [4.69.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.68.0...@toptal/picasso@4.69.0) (2020-06-04)

### Features

- add company icon ([#1356](https://github.com/toptal/picasso/issues/1356)) ([3e6fad0](https://github.com/toptal/picasso/commit/3e6fad00f6227fed72a8a6a9b382aa7e8817b353))

# [4.68.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.67.0...@toptal/picasso@4.68.0) (2020-06-03)

### Features

- forward all props for Indicator ([#1347](https://github.com/toptal/picasso/issues/1347)) ([331bbd6](https://github.com/toptal/picasso/commit/331bbd6e7ac298cfb90412a5f0ecb70f9523fc78))

# [4.67.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.66.1...@toptal/picasso@4.67.0) (2020-06-03)

### Features

- add titleCase configuration for Picasso ([#1354](https://github.com/toptal/picasso/issues/1354)) ([072add9](https://github.com/toptal/picasso/commit/072add9e2e7a65bc16aabf327136ab6899750503))

## [4.66.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.66.0...@toptal/picasso@4.66.1) (2020-06-02)

**Note:** Version bump only for package @toptal/picasso

# [4.66.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.65.0...@toptal/picasso@4.66.0) (2020-06-01)

### Features

- add full-screen size for modal ([#1342](https://github.com/toptal/picasso/issues/1342)) ([3f57fb5](https://github.com/toptal/picasso/commit/3f57fb588311c9f46050f9235286fecaff66a7f2))

# [4.65.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.64.1...@toptal/picasso@4.65.0) (2020-05-29)

### Features

- add question icons ([#1341](https://github.com/toptal/picasso/issues/1341)) ([cc77594](https://github.com/toptal/picasso/commit/cc775948b9dfbfe3672e62535d8b5a3b6c9be5d6))

## [4.64.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.64.0...@toptal/picasso@4.64.1) (2020-05-28)

### Bug Fixes

- **popper:** fix width calculation for Popper ([#1338](https://github.com/toptal/picasso/issues/1338)) ([46aeb4d](https://github.com/toptal/picasso/commit/46aeb4daab47fa0cbe526ef27f14a993ebd2faa2))

# [4.64.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.63.4...@toptal/picasso@4.64.0) (2020-05-26)

### Features

- add disabled state for TagSelector ([#1325](https://github.com/toptal/picasso/issues/1325)) ([6d9bb06](https://github.com/toptal/picasso/commit/6d9bb06bfef1a6ed023cac2eebde60fb2904f6f4))

## [4.63.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.63.3...@toptal/picasso@4.63.4) (2020-05-26)

### Bug Fixes

- add width for Numberinput ([#1328](https://github.com/toptal/picasso/issues/1328)) ([3a6da4f](https://github.com/toptal/picasso/commit/3a6da4f9fb2b43aab7097fb819562b981ff67cd3))

## [4.63.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.63.2...@toptal/picasso@4.63.3) (2020-05-25)

### Bug Fixes

- **popper:** disable compact mode for Autocomplete and Select ([#1320](https://github.com/toptal/picasso/issues/1320)) ([4f08250](https://github.com/toptal/picasso/commit/4f08250c9e8f34d5e678cc6e9bd5bc6d7b15b774))

## [4.63.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.63.1...@toptal/picasso@4.63.2) (2020-05-22)

### Bug Fixes

- **forms:** fix wrong references in types in picass-forms ([#1330](https://github.com/toptal/picasso/issues/1330)) ([c4aab7b](https://github.com/toptal/picasso/commit/c4aab7bd8e51888119d7a7697385239acbf33cdc))

## [4.63.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.63.0...@toptal/picasso@4.63.1) (2020-05-22)

### Bug Fixes

- **autocomplete:** add `isSelect` argument for keyboard selection ([#1331](https://github.com/toptal/picasso/issues/1331)) ([46b7d53](https://github.com/toptal/picasso/commit/46b7d53ef55a9b6b483895c8ad1b4f3430a23de6))

# [4.63.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.62.1...@toptal/picasso@4.63.0) (2020-05-21)

### Features

- update logo ([#1324](https://github.com/toptal/picasso/issues/1324)) ([10a43ae](https://github.com/toptal/picasso/commit/10a43ae3624ded54e713681217643affa80bdea9))

## [4.62.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.62.0...@toptal/picasso@4.62.1) (2020-05-21)

**Note:** Version bump only for package @toptal/picasso

# [4.62.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.61.0...@toptal/picasso@4.62.0) (2020-05-19)

### Features

- **Select:** [FX-959] Add onSearchChange handler ([#1318](https://github.com/toptal/picasso/issues/1318)) ([8e4bc28](https://github.com/toptal/picasso/commit/8e4bc289a156ac55b0163cb2b5eb56635951204c))

# [4.61.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.60.1...@toptal/picasso@4.61.0) (2020-05-19)

### Features

- ignore onClick for loading buttons ([#1319](https://github.com/toptal/picasso/issues/1319)) ([6984218](https://github.com/toptal/picasso/commit/69842186c1702009fca345cea59af6cbac311716))

## [4.60.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.60.0...@toptal/picasso@4.60.1) (2020-05-18)

### Bug Fixes

- **autocomplete:** fix size of the dropdown for full width autocomplete ([#1317](https://github.com/toptal/picasso/issues/1317)) ([ddab612](https://github.com/toptal/picasso/commit/ddab6122d6931863949458b49b98ee147a887811))

# [4.60.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.59.0...@toptal/picasso@4.60.0) (2020-05-18)

### Features

- add TagSelector, DatePicker in picasso-forms ([#1297](https://github.com/toptal/picasso/issues/1297)) ([0e8f2dc](https://github.com/toptal/picasso/commit/0e8f2dcb47f44e19ac4d72914b8a90576d70381c))

# [4.59.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.58.1...@toptal/picasso@4.59.0) (2020-05-15)

### Features

- **icon:** add report icon ([#1314](https://github.com/toptal/picasso/issues/1314)) ([19e401a](https://github.com/toptal/picasso/commit/19e401aa180139f3ca0ec2415405039dcee2252f))

## [4.58.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.58.0...@toptal/picasso@4.58.1) (2020-05-14)

### Bug Fixes

- **select:** forget highlighted option on toggle ([#1312](https://github.com/toptal/picasso/issues/1312)) ([8a5fa83](https://github.com/toptal/picasso/commit/8a5fa8333e15b77673ea1afa6d1e24ca42f93296))

# [4.58.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.57.1...@toptal/picasso@4.58.0) (2020-05-14)

### Features

- **icon:** change single and multi icons ([#1308](https://github.com/toptal/picasso/issues/1308)) ([1c4aee6](https://github.com/toptal/picasso/commit/1c4aee60c5de8350583a8ebbbfc938e16c485d39))

## [4.57.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.57.0...@toptal/picasso@4.57.1) (2020-05-14)

### Bug Fixes

- add picasso/utils import alias ([#1305](https://github.com/toptal/picasso/issues/1305)) ([905f808](https://github.com/toptal/picasso/commit/905f80867f940dd7971a8bb7454a5dc73a42818f))

# [4.57.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.56.3...@toptal/picasso@4.57.0) (2020-05-13)

### Features

- **icon:** add eye and ownerDefault icons ([#1306](https://github.com/toptal/picasso/issues/1306)) ([aed40a0](https://github.com/toptal/picasso/commit/aed40a07f31fd93b92818f8603fff89c4ca48001))

## [4.56.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.56.2...@toptal/picasso@4.56.3) (2020-05-13)

### Bug Fixes

- **select:** do not highlight first option ([#1301](https://github.com/toptal/picasso/issues/1301)) ([cd111e1](https://github.com/toptal/picasso/commit/cd111e1af429cc85471443d94a649ec5a7902ef8))

## [4.56.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.56.1...@toptal/picasso@4.56.2) (2020-05-13)

### Bug Fixes

- some types in picasso-forms by adding ts checks in examples ([#1304](https://github.com/toptal/picasso/issues/1304)) ([1b89f8f](https://github.com/toptal/picasso/commit/1b89f8f86f1ae1d59e51e08387efef2c158fe794))

## [4.56.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.56.0...@toptal/picasso@4.56.1) (2020-05-13)

### Bug Fixes

- add yarn deduplicate package ([#1299](https://github.com/toptal/picasso/issues/1299)) ([c6e5ea3](https://github.com/toptal/picasso/commit/c6e5ea387ef517aa894d975a73bf3f6fb20490a3))

# [4.56.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.55.4...@toptal/picasso@4.56.0) (2020-05-13)

### Features

- **icon:** add CMS icons ([#1302](https://github.com/toptal/picasso/issues/1302)) ([d370ba8](https://github.com/toptal/picasso/commit/d370ba8eb149c911708d9225a3eb06b1f2ea47f9))

## [4.55.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.55.3...@toptal/picasso@4.55.4) (2020-05-12)

**Note:** Version bump only for package @toptal/picasso

## [4.55.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.55.2...@toptal/picasso@4.55.3) (2020-05-12)

### Bug Fixes

- **Select:** fix scrolling on hover of boundary elements ([#1292](https://github.com/toptal/picasso/issues/1292)) ([9d28a9b](https://github.com/toptal/picasso/commit/9d28a9b7594b236e3da5ee1fde6952198b7dbc4e))

## [4.55.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.55.1...@toptal/picasso@4.55.2) (2020-05-12)

**Note:** Version bump only for package @toptal/picasso

## [4.55.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.55.0...@toptal/picasso@4.55.1) (2020-05-11)

### Bug Fixes

- add missing picasso utils exports ([#1295](https://github.com/toptal/picasso/issues/1295)) ([a38f71a](https://github.com/toptal/picasso/commit/a38f71ae363f08d7f82d4eb77d9224b37d600a60))

# [4.55.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.54.0...@toptal/picasso@4.55.0) (2020-05-11)

### Features

- **Icon:** add player icon ([#1288](https://github.com/toptal/picasso/issues/1288)) ([20a3e5b](https://github.com/toptal/picasso/commit/20a3e5bc93f1d9dc5daaf656e292ce520fa0c1a4))

# [4.54.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.53.2...@toptal/picasso@4.54.0) (2020-05-09)

### Features

- **icon:** add profileCrossed icon ([#1291](https://github.com/toptal/picasso/issues/1291)) ([0758503](https://github.com/toptal/picasso/commit/0758503ff36a79e5c1ea9effdc7aa0883e166c31))

## [4.53.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.53.1...@toptal/picasso@4.53.2) (2020-05-08)

### Bug Fixes

- **tablebody:** stripe all children ([#1290](https://github.com/toptal/picasso/issues/1290)) ([c0848b1](https://github.com/toptal/picasso/commit/c0848b105cf19b3d2289e3e1aaa12cf1eed835b1))

## [4.53.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.53.0...@toptal/picasso@4.53.1) (2020-05-08)

### Bug Fixes

- **autocomplete:** remove highlighted selection on change ([#1289](https://github.com/toptal/picasso/issues/1289)) ([bdaba64](https://github.com/toptal/picasso/commit/bdaba64f7d7afc266991e5c9036a6eabc294ddd2))

# [4.53.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.52.4...@toptal/picasso@4.53.0) (2020-05-07)

### Features

- **autocomplete:** allow not auto-selecting first option ([#1284](https://github.com/toptal/picasso/issues/1284)) ([b62e899](https://github.com/toptal/picasso/commit/b62e89993a959da5258b66837e65b4009b371d44))

## [4.52.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.52.3...@toptal/picasso@4.52.4) (2020-05-07)

### Bug Fixes

- **Picasso:** simplify theme override ([#1283](https://github.com/toptal/picasso/issues/1283)) ([56a3999](https://github.com/toptal/picasso/commit/56a3999b53e3c934255a9d13b86d87cba6620296))

## [4.52.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.52.2...@toptal/picasso@4.52.3) (2020-05-06)

### Bug Fixes

- **Select:** make Select a generic ([#1279](https://github.com/toptal/picasso/issues/1279)) ([f75810f](https://github.com/toptal/picasso/commit/f75810f97081e7fc59ae1f0df56994f38dd9baed))

## [4.52.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.52.1...@toptal/picasso@4.52.2) (2020-05-06)

**Note:** Version bump only for package @toptal/picasso

## [4.52.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.52.0...@toptal/picasso@4.52.1) (2020-05-04)

**Note:** Version bump only for package @toptal/picasso

# [4.52.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.10...@toptal/picasso@4.52.0) (2020-04-30)

### Features

- **Picasso:** add theme property ([#1262](https://github.com/toptal/picasso/issues/1262)) ([1ca7d44](https://github.com/toptal/picasso/commit/1ca7d44ee1716afcd5fddb038b4ac21fe7e35334))

## [4.51.10](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.9...@toptal/picasso@4.51.10) (2020-04-30)

### Bug Fixes

- **Accordion:** [FX-873] Add custom summary example, buttons line height ([#1271](https://github.com/toptal/picasso/issues/1271)) ([ea439c3](https://github.com/toptal/picasso/commit/ea439c3422b723aff0e0d6b0b9825d167ac0e87d))

## [4.51.9](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.8...@toptal/picasso@4.51.9) (2020-04-28)

**Note:** Version bump only for package @toptal/picasso

## [4.51.8](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.7...@toptal/picasso@4.51.8) (2020-04-28)

### Bug Fixes

- **Autocomplete:** pass input name property to Input component ([#1264](https://github.com/toptal/picasso/issues/1264)) ([bdca6d8](https://github.com/toptal/picasso/commit/bdca6d8bd2a32224c5cb949e62411280ee082b78))

## [4.51.7](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.6...@toptal/picasso@4.51.7) (2020-04-27)

### Bug Fixes

- **checkboxgroup:** typings and style issues ([#1261](https://github.com/toptal/picasso/issues/1261)) ([93f6c65](https://github.com/toptal/picasso/commit/93f6c65963bfcdd84cbd66020e019a43ebea604a))

## [4.51.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.5...@toptal/picasso@4.51.6) (2020-04-27)

**Note:** Version bump only for package @toptal/picasso

## [4.51.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.4...@toptal/picasso@4.51.5) (2020-04-24)

**Note:** Version bump only for package @toptal/picasso

## [4.51.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.3...@toptal/picasso@4.51.4) (2020-04-23)

**Note:** Version bump only for package @toptal/picasso

## [4.51.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.2...@toptal/picasso@4.51.3) (2020-04-22)

**Note:** Version bump only for package @toptal/picasso

## [4.51.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.1...@toptal/picasso@4.51.2) (2020-04-20)

### Bug Fixes

- **Input:** fix issue with multiline limit ([#1242](https://github.com/toptal/picasso/issues/1242)) ([d79b247](https://github.com/toptal/picasso/commit/d79b247ac4f2c05a8d6e4a7e5ac390ea6cc6ef26))

## [4.51.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.0...@toptal/picasso@4.51.1) (2020-04-17)

### Bug Fixes

- **dropdown:** fix closing dropdown by item click on mobile ([#1241](https://github.com/toptal/picasso/issues/1241)) ([04bfe31](https://github.com/toptal/picasso/commit/04bfe3163b152c7a2b7a98e671fd10ec6ba1e4ac)), closes [#786](https://github.com/toptal/picasso/issues/786)

# [4.51.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.50.2...@toptal/picasso@4.51.0) (2020-04-16)

### Features

- **select:** add checkmarks in multiple mode ([#1233](https://github.com/toptal/picasso/issues/1233)) ([bc42c63](https://github.com/toptal/picasso/commit/bc42c63a20c02824f4d61c2f10a418a16cae2741))

## [4.50.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.50.1...@toptal/picasso@4.50.2) (2020-04-16)

### Bug Fixes

- **tooltip:** get rid of the modifier warning ([#1228](https://github.com/toptal/picasso/issues/1228)) ([3766719](https://github.com/toptal/picasso/commit/37667191c2808450dadb3f93aa51cc86ddb9018e)), closes [re#1227](https://github.com/re/issues/1227)

## [4.50.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.50.0...@toptal/picasso@4.50.1) (2020-04-15)

### Bug Fixes

- export environment types for banner ([#1238](https://github.com/toptal/picasso/issues/1238)) ([4957f01](https://github.com/toptal/picasso/commit/4957f01ab8d780ffae53a302b50e156a20ad944c))

# [4.50.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.49.3...@toptal/picasso@4.50.0) (2020-04-15)

### Features

- add time icons ([#1237](https://github.com/toptal/picasso/issues/1237)) ([fcef14d](https://github.com/toptal/picasso/commit/fcef14ddcd21394b7b538c53a758952dfe822690))

## [4.49.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.49.2...@toptal/picasso@4.49.3) (2020-04-15)

### Bug Fixes

- **Select:** randomize id attribute value in forms ([#1225](https://github.com/toptal/picasso/issues/1225)) ([0f7b56b](https://github.com/toptal/picasso/commit/0f7b56b7103aa88acc56c9e0a6b3e09bf5936022))

## [4.49.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.49.1...@toptal/picasso@4.49.2) (2020-04-09)

**Note:** Version bump only for package @toptal/picasso

## [4.49.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.49.0...@toptal/picasso@4.49.1) (2020-04-09)

### Bug Fixes

- wrong ellipsis at Checkbox and Radio on overflow in Safari ([#1220](https://github.com/toptal/picasso/issues/1220)) ([e076c90](https://github.com/toptal/picasso/commit/e076c90a35d7026eafbb5bfe487a7027f918cc59))

# [4.49.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.48.3...@toptal/picasso@4.49.0) (2020-04-08)

### Features

- **autocomplete:** add extra `onFocus`/`onBlur` event handlers ([#1218](https://github.com/toptal/picasso/issues/1218)) ([04ae414](https://github.com/toptal/picasso/commit/04ae414a24146f45f51a9224e4bf07579088d32e))

## [4.48.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.48.2...@toptal/picasso@4.48.3) (2020-04-06)

**Note:** Version bump only for package @toptal/picasso

## [4.48.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.48.1...@toptal/picasso@4.48.2) (2020-04-06)

### Bug Fixes

- **Autocomplete:** prevent browser autofilling by default ([#1210](https://github.com/toptal/picasso/issues/1210)) ([7ed5d01](https://github.com/toptal/picasso/commit/7ed5d01e86a0146b6254a8a4b4e3fdbece138ee0))

## [4.48.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.48.0...@toptal/picasso@4.48.1) (2020-04-02)

### Bug Fixes

- **Sidebar:** speedup sidebar menu and menu items performance ([#1205](https://github.com/toptal/picasso/issues/1205)) ([0658ec0](https://github.com/toptal/picasso/commit/0658ec041dd4e415b714a0b1d76ee78a178268be))

# [4.48.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.47.3...@toptal/picasso@4.48.0) (2020-04-02)

### Features

- add TestingPicasso component ([#1171](https://github.com/toptal/picasso/issues/1171)) ([f2d4687](https://github.com/toptal/picasso/commit/f2d4687463f9838d4070ac6f8b7c590243b7018a))

## [4.47.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.47.2...@toptal/picasso@4.47.3) (2020-04-02)

### Bug Fixes

- **Select:** disable browser autofill by default ([#1200](https://github.com/toptal/picasso/issues/1200)) ([03b970f](https://github.com/toptal/picasso/commit/03b970f992456c3b65343c83a0bf8031cad1a614))

## [4.47.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.47.1...@toptal/picasso@4.47.2) (2020-04-01)

### Bug Fixes

- **tagselector:** pass `getKey` function to Autocomplete ([#1201](https://github.com/toptal/picasso/issues/1201)) ([be706ff](https://github.com/toptal/picasso/commit/be706ffae1e0812dca7aa92be95ed66fde051bfb))

## [4.47.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.47.0...@toptal/picasso@4.47.1) (2020-03-30)

### Bug Fixes

- **tooltip:** disable long press trigger on touch screens ([#1190](https://github.com/toptal/picasso/issues/1190)) ([636965a](https://github.com/toptal/picasso/commit/636965ad024efa0d62177b65be17f1f1870d62d4)), closes [#1175](https://github.com/toptal/picasso/issues/1175)

# [4.47.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.46.1...@toptal/picasso@4.47.0) (2020-03-30)

### Features

- **tab:** add icon prop to tab component ([#1189](https://github.com/toptal/picasso/issues/1189)) ([17136a1](https://github.com/toptal/picasso/commit/17136a1e1369cabadf7c3b137e13413514eb853f))

## [4.46.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.46.0...@toptal/picasso@4.46.1) (2020-03-30)

### Bug Fixes

- lint errors ([#1191](https://github.com/toptal/picasso/issues/1191)) ([2d830ac](https://github.com/toptal/picasso/commit/2d830ac37b63e5642ccc2c9a0016458dbdd6f7a6))

# [4.46.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.45.1...@toptal/picasso@4.46.0) (2020-03-27)

### Features

- **pagebanner:** extend with compound components ([#1183](https://github.com/toptal/picasso/issues/1183)) ([79c91a6](https://github.com/toptal/picasso/commit/79c91a61a30652803fabbbfce4643f75df3d3aa2))

## [4.45.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.45.0...@toptal/picasso@4.45.1) (2020-03-26)

### Bug Fixes

- **FormControl:** make label smaller by control width ([#1188](https://github.com/toptal/picasso/issues/1188)) ([9d19225](https://github.com/toptal/picasso/commit/9d192256498145ef78dd3b25642a2b131297907b))

# [4.45.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.11...@toptal/picasso@4.45.0) (2020-03-26)

### Features

- add ellipsis on control label overflow ([#1185](https://github.com/toptal/picasso/issues/1185)) ([a38be02](https://github.com/toptal/picasso/commit/a38be02d7a940df73dd6ee4a297ffd694cff71cb))

## [4.44.11](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.10...@toptal/picasso@4.44.11) (2020-03-25)

**Note:** Version bump only for package @toptal/picasso

## [4.44.10](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.9...@toptal/picasso@4.44.10) (2020-03-25)

**Note:** Version bump only for package @toptal/picasso

## [4.44.9](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.8...@toptal/picasso@4.44.9) (2020-03-25)

### Bug Fixes

- fix popper on header ([#1174](https://github.com/toptal/picasso/issues/1174)) ([8b8c3fd](https://github.com/toptal/picasso/commit/8b8c3fda0e9f455d0f2d36dc8a9ac4f01ba5f314))

## [4.44.8](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.7...@toptal/picasso@4.44.8) (2020-03-24)

### Bug Fixes

- make use notifications functions identity stable ([#1178](https://github.com/toptal/picasso/issues/1178)) ([0b224f8](https://github.com/toptal/picasso/commit/0b224f873c5beac5345dd25742d8da073a8945ef))

## [4.44.7](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.6...@toptal/picasso@4.44.7) (2020-03-23)

**Note:** Version bump only for package @toptal/picasso

## [4.44.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.5...@toptal/picasso@4.44.6) (2020-03-20)

### Bug Fixes

- **page.banner:** fix icon alignment ([#1177](https://github.com/toptal/picasso/issues/1177)) ([59b9170](https://github.com/toptal/picasso/commit/59b9170dbfa84a80395c099012ccf0bd93493c4c))

## [4.44.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.4...@toptal/picasso@4.44.5) (2020-03-20)

### Bug Fixes

- **Select:** improve rendering performance ([#1172](https://github.com/toptal/picasso/issues/1172)) ([4a56adb](https://github.com/toptal/picasso/commit/4a56adb7d736af7f2d487381d9bb417c7b14268c))

## [4.44.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.3...@toptal/picasso@4.44.4) (2020-03-19)

**Note:** Version bump only for package @toptal/picasso

## [4.44.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.2...@toptal/picasso@4.44.3) (2020-03-18)

**Note:** Version bump only for package @toptal/picasso

## [4.44.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.1...@toptal/picasso@4.44.2) (2020-03-17)

### Bug Fixes

- **pageheader:** update color of light variant ([#1170](https://github.com/toptal/picasso/issues/1170)) ([ffb4004](https://github.com/toptal/picasso/commit/ffb4004e56571facd3d3b0f95470e16a20f10160))

## [4.44.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.0...@toptal/picasso@4.44.1) (2020-03-16)

**Note:** Version bump only for package @toptal/picasso

# [4.44.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.43.0...@toptal/picasso@4.44.0) (2020-03-12)

### Features

- **slider:** show marks ([#1160](https://github.com/toptal/picasso/issues/1160)) ([e5056ff](https://github.com/toptal/picasso/commit/e5056ff748eaa4a4e0d5435879aae912a5a12787))

# [4.43.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.42.5...@toptal/picasso@4.43.0) (2020-03-11)

### Features

- add leftContent to PageHeader ([#1156](https://github.com/toptal/picasso/issues/1156)) ([afa9bd0](https://github.com/toptal/picasso/commit/afa9bd0b17390ec9628f5811384fbbbfdd11c4c7))

## [4.42.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.42.4...@toptal/picasso@4.42.5) (2020-03-11)

### Bug Fixes

- **Page:** [FX-823] Fix viewport scaling ([#1159](https://github.com/toptal/picasso/issues/1159)) ([a037d1b](https://github.com/toptal/picasso/commit/a037d1bead309b4422df2f7ff07c65b2c36b3a85))

## [4.42.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.42.3...@toptal/picasso@4.42.4) (2020-03-09)

### Bug Fixes

- **slider:** get rid of error about incorrect class override ([#1154](https://github.com/toptal/picasso/issues/1154)) ([81d8962](https://github.com/toptal/picasso/commit/81d89622f7553cb06ae7a4f06769b43cbcdc9ab8))

## [4.42.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.42.2...@toptal/picasso@4.42.3) (2020-03-06)

**Note:** Version bump only for package @toptal/picasso

## [4.42.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.42.1...@toptal/picasso@4.42.2) (2020-03-06)

### Bug Fixes

- **slider:** fix accessibility of setting value by click on the line ([#1152](https://github.com/toptal/picasso/issues/1152)) ([a1476cf](https://github.com/toptal/picasso/commit/a1476cf829d0dcd437ba7ff45634cc4637ede9cd)), closes [#1151](https://github.com/toptal/picasso/issues/1151)

## [4.42.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.42.0...@toptal/picasso@4.42.1) (2020-03-05)

**Note:** Version bump only for package @toptal/picasso

# [4.42.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.41.0...@toptal/picasso@4.42.0) (2020-03-04)

### Features

- prevent slider tooltip overflow ([#1141](https://github.com/toptal/picasso/issues/1141)) ([1ad08e9](https://github.com/toptal/picasso/commit/1ad08e924421825868a32b975d508098bfc6f4c1))

# [4.41.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.40.1...@toptal/picasso@4.41.0) (2020-03-04)

### Features

- list component ([#1139](https://github.com/toptal/picasso/issues/1139)) ([1c1edc7](https://github.com/toptal/picasso/commit/1c1edc78db8d341ff150a756cae880c61915390e))

## [4.40.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.40.0...@toptal/picasso@4.40.1) (2020-03-03)

### Bug Fixes

- **modal:** avoid circular dependency between modal and useModals hook ([#1145](https://github.com/toptal/picasso/issues/1145)) ([7764a4e](https://github.com/toptal/picasso/commit/7764a4e4c8f6e9abfcf60e24e08997aec438d708)), closes [#1144](https://github.com/toptal/picasso/issues/1144)

# [4.40.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.39.0...@toptal/picasso@4.40.0) (2020-03-03)

### Features

- **Form.Field:** [FX-793] Add final-form field props ([#1143](https://github.com/toptal/picasso/issues/1143)) ([fbed95c](https://github.com/toptal/picasso/commit/fbed95ce7402f09095ffe30a5cd15c70b4c408e7))

# [4.39.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.38.0...@toptal/picasso@4.39.0) (2020-02-28)

### Features

- **use-modals:** implement hideAllModals ([#1137](https://github.com/toptal/picasso/issues/1137)) ([8c45a41](https://github.com/toptal/picasso/commit/8c45a410fb538d6e3271869b277517680264d008))

# [4.38.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.37.0...@toptal/picasso@4.38.0) (2020-02-27)

### Features

- add role for reset button ([#1136](https://github.com/toptal/picasso/issues/1136)) ([00446bd](https://github.com/toptal/picasso/commit/00446bd04a5d22ca99d0d5cace63a01e317db8e9))

# [4.37.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.36.0...@toptal/picasso@4.37.0) (2020-02-26)

### Features

- support test environment at root component ([#1133](https://github.com/toptal/picasso/issues/1133)) ([9e3baaa](https://github.com/toptal/picasso/commit/9e3baaa6b3c23479a46695d0d5a85a702df83038))

# [4.36.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.35.2...@toptal/picasso@4.36.0) (2020-02-26)

### Features

- **input:** new prop to enable manual resize for multiline ([#1134](https://github.com/toptal/picasso/issues/1134)) ([a29388b](https://github.com/toptal/picasso/commit/a29388bdc5aaa16d073085481ccde7e309667b62))

## [4.35.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.35.1...@toptal/picasso@4.35.2) (2020-02-24)

**Note:** Version bump only for package @toptal/picasso

## [4.35.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.35.0...@toptal/picasso@4.35.1) (2020-02-20)

### Bug Fixes

- add environment prop to picasso root component ([#1120](https://github.com/toptal/picasso/issues/1120)) ([3282f58](https://github.com/toptal/picasso/commit/3282f580dcf4acf938e49086112d4aca2a66efee))

# [4.35.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.34.2...@toptal/picasso@4.35.0) (2020-02-20)

### Features

- add test utils ([#1123](https://github.com/toptal/picasso/issues/1123)) ([eddc6df](https://github.com/toptal/picasso/commit/eddc6df73c7be5071012a227e1932b607964f6bc))

## [4.34.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.34.1...@toptal/picasso@4.34.2) (2020-02-20)

### Bug Fixes

- **autocomplete:** onOtherOptionSelect invoke on enter ([#1121](https://github.com/toptal/picasso/issues/1121)) ([a2f8eed](https://github.com/toptal/picasso/commit/a2f8eedabbf64db77638158cd01203f20cec203e))

## [4.34.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.34.0...@toptal/picasso@4.34.1) (2020-02-19)

### Bug Fixes

- run validation on change instead of blur ([#1114](https://github.com/toptal/picasso/issues/1114)) ([edd2b2e](https://github.com/toptal/picasso/commit/edd2b2eb10b4cd00e927f9ea9708af0f7c82caee))

# [4.34.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.33.1...@toptal/picasso@4.34.0) (2020-02-19)

### Features

- disable responsive ui ([#1113](https://github.com/toptal/picasso/issues/1113)) ([cdf111f](https://github.com/toptal/picasso/commit/cdf111f0f50f704406c2cd1a88246458a610a2b7))

## [4.33.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.33.0...@toptal/picasso@4.33.1) (2020-02-18)

### Bug Fixes

- **Tooltip:** remove opacity ([#1117](https://github.com/toptal/picasso/issues/1117)) ([2e9fae8](https://github.com/toptal/picasso/commit/2e9fae8a38074a17ce928aeb36a278ec64403d71))

# [4.33.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.32.1...@toptal/picasso@4.33.0) (2020-02-17)

### Features

- **YearSelect:** allow descending order of years ([#1115](https://github.com/toptal/picasso/issues/1115)) ([65589cc](https://github.com/toptal/picasso/commit/65589cc5988ac420f2e0f5cb68d8d9cbcd8d5b95))

## [4.32.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.32.0...@toptal/picasso@4.32.1) (2020-02-13)

**Note:** Version bump only for package @toptal/picasso

# [4.32.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.6...@toptal/picasso@4.32.0) (2020-02-13)

### Features

- upgrade material-ui to 4.9.2 ([#1101](https://github.com/toptal/picasso/issues/1101)) ([3082e50](https://github.com/toptal/picasso/commit/3082e5081999e673b120d21e4a902cc300d2f922))

## [4.31.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.5...@toptal/picasso@4.31.6) (2020-02-12)

**Note:** Version bump only for package @toptal/picasso

## [4.31.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.3...@toptal/picasso@4.31.5) (2020-02-12)

**Note:** Version bump only for package @toptal/picasso

## [4.31.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.3...@toptal/picasso@4.31.4) (2020-02-12)

**Note:** Version bump only for package @toptal/picasso

## [4.31.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.2...@toptal/picasso@4.31.3) (2020-02-10)

### Bug Fixes

- follow up fix for autocomplete with null options ([#1100](https://github.com/toptal/picasso/issues/1100)) ([3876529](https://github.com/toptal/picasso/commit/3876529e631f30a3a04373577f390978ca2f0222))

## [4.31.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.1...@toptal/picasso@4.31.2) (2020-02-10)

### Bug Fixes

- allow null options for the Autocomplete ([#1091](https://github.com/toptal/picasso/issues/1091)) ([26b8809](https://github.com/toptal/picasso/commit/26b8809ed4616ebff86d41e36e5bc2f706e21f55))

## [4.31.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.0...@toptal/picasso@4.31.1) (2020-02-10)

### Bug Fixes

- **Accordion:** make className optional in details ([#1097](https://github.com/toptal/picasso/issues/1097)) ([814a509](https://github.com/toptal/picasso/commit/814a509f08b8e9f4591c2c1bd05d0fe7ee185463))

# [4.31.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.30.1...@toptal/picasso@4.31.0) (2020-02-05)

### Features

- add PageHead component ([#1064](https://github.com/toptal/picasso/issues/1064)) ([17a896e](https://github.com/toptal/picasso/commit/17a896e00a12f37d73f2943370742c98f4e1520c))

## [4.30.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.30.0...@toptal/picasso@4.30.1) (2020-02-05)

### Bug Fixes

- **TagSelector:** fix placeholder input width, align endAdornment ([#1054](https://github.com/toptal/picasso/issues/1054)) ([2b1f90a](https://github.com/toptal/picasso/commit/2b1f90ac0f0405ed25425516d3fa897fc2bb5f92))

# [4.30.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.29.0...@toptal/picasso@4.30.0) (2020-02-05)

### Features

- support wide desktop screen ([#1063](https://github.com/toptal/picasso/issues/1063)) ([0c9eb83](https://github.com/toptal/picasso/commit/0c9eb8366ecb8576143c63bf5a8777103b3e00d9))

# [4.29.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.28.0...@toptal/picasso@4.29.0) (2020-02-04)

### Features

- add focus state to checkbox and radio ([#1069](https://github.com/toptal/picasso/issues/1069)) ([5e714e0](https://github.com/toptal/picasso/commit/5e714e060aac5882be94c93ffc4ef92fc4891673))

# [4.28.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.27.0...@toptal/picasso@4.28.0) (2020-02-04)

### Features

- **Select:** [FX-742] Add threshold for enabling search ([#1065](https://github.com/toptal/picasso/issues/1065)) ([33534db](https://github.com/toptal/picasso/commit/33534dbc8e92ed1b79ea693dfe6e7f1b97759eaa))

# [4.27.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.26.1...@toptal/picasso@4.27.0) (2020-02-04)

### Features

- **popper:** expose popper container props to inputs ([#1050](https://github.com/toptal/picasso/issues/1050)) ([345d732](https://github.com/toptal/picasso/commit/345d7328b1ce915cc259807a55493f7b1e64ba03))

## [4.26.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.26.0...@toptal/picasso@4.26.1) (2020-02-03)

**Note:** Version bump only for package @toptal/picasso

# [4.26.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.25.0...@toptal/picasso@4.26.0) (2020-02-03)

### Features

- **Pagination:** renders null when activePage is bigger than totalPages ([#1040](https://github.com/toptal/picasso/issues/1040)) ([059757c](https://github.com/toptal/picasso/commit/059757c43a6d25002808f82a41591ec54dbba127))

# [4.25.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.24.1...@toptal/picasso@4.25.0) (2020-02-03)

### Features

- **Input:** hide input when type is hidden ([#1042](https://github.com/toptal/picasso/issues/1042)) ([87a5df2](https://github.com/toptal/picasso/commit/87a5df27e32da16115e382533f7efb5a6fa75efe))

## [4.24.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.24.0...@toptal/picasso@4.24.1) (2020-01-31)

**Note:** Version bump only for package @toptal/picasso

# [4.24.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.23.0...@toptal/picasso@4.24.0) (2020-01-30)

### Features

- [FX-698] Prepare forms examples ([#1057](https://github.com/toptal/picasso/issues/1057)) ([86da7ba](https://github.com/toptal/picasso/commit/86da7ba568d15aea619e9dfc8236285cf85741ff))

# [4.23.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.22.0...@toptal/picasso@4.23.0) (2020-01-30)

### Features

- [FX-728] Create FormFileInput ([#1049](https://github.com/toptal/picasso/issues/1049)) ([7c97b7b](https://github.com/toptal/picasso/commit/7c97b7b3a15f34350beecc1f52fbaea9296808d3))

# [4.22.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.21.0...@toptal/picasso@4.22.0) (2020-01-29)

### Features

- **icons:** add long arrow left and right ([#1053](https://github.com/toptal/picasso/issues/1053)) ([417a575](https://github.com/toptal/picasso/commit/417a57592e33dd286422454597848a6cdbda00e2)), closes [#1052](https://github.com/toptal/picasso/issues/1052)

# [4.21.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.20.0...@toptal/picasso@4.21.0) (2020-01-24)

### Features

- **logo:** replace the logo with the 2020 design ([#1044](https://github.com/toptal/picasso/issues/1044)) ([ff58ddb](https://github.com/toptal/picasso/commit/ff58ddb8592b36db6f421348053e57133d267dac))

# [4.20.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.19.2...@toptal/picasso@4.20.0) (2020-01-24)

### Features

- [FX-726] Add Form.Radio ([#1046](https://github.com/toptal/picasso/issues/1046)) ([6753d39](https://github.com/toptal/picasso/commit/6753d39250bc832224566184867936962d97b92f))

## [4.19.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.19.1...@toptal/picasso@4.19.2) (2020-01-24)

### Bug Fixes

- **Select:** issue with options stuck in Chrome when reset ([#1047](https://github.com/toptal/picasso/issues/1047)) ([3f8378b](https://github.com/toptal/picasso/commit/3f8378b5b8368e0207fcc6bc6c12875ffea3d38f))

## [4.19.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.19.0...@toptal/picasso@4.19.1) (2020-01-23)

### Bug Fixes

- **Tooltip:** export props type ([#1041](https://github.com/toptal/picasso/issues/1041)) ([0c2abd4](https://github.com/toptal/picasso/commit/0c2abd4f8cb347bbf71a010a01c47d5e074e7692))

# [4.19.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.18.0...@toptal/picasso@4.19.0) (2020-01-22)

### Features

- **Select:** add reset button ([#1035](https://github.com/toptal/picasso/issues/1035)) ([9f64150](https://github.com/toptal/picasso/commit/9f6415021124c9ddeb57db9eb0f2f42a208e6eb2))

# [4.18.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.17.0...@toptal/picasso@4.18.0) (2020-01-21)

### Features

- **Modal:** [FX-711] Make fullscreen on small screens ([#1034](https://github.com/toptal/picasso/issues/1034)) ([bcc43e2](https://github.com/toptal/picasso/commit/bcc43e2d0961d3f870dc6a42b547b080d41edb36))

# [4.17.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.16.0...@toptal/picasso@4.17.0) (2020-01-21)

### Features

- **Autocomplete:** [FX-353] Add reset button ([#1025](https://github.com/toptal/picasso/issues/1025)) ([207135b](https://github.com/toptal/picasso/commit/207135bbf194ff8efe82c95ed4579d61354f82aa))

# [4.16.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.15.0...@toptal/picasso@4.16.0) (2020-01-20)

### Features

- **icons:** add support for white color ([#1023](https://github.com/toptal/picasso/issues/1023)) ([feedf12](https://github.com/toptal/picasso/commit/feedf12d823446115797bfc19ea9990480798345))
- **input:** add autoFocus prop explicitly to docs ([#1020](https://github.com/toptal/picasso/issues/1020)) ([ab8ce47](https://github.com/toptal/picasso/commit/ab8ce47a205fd6d9c974dd3cd5cae825cca8be18))
- **input:** tweak TextArea counter position ([#1012](https://github.com/toptal/picasso/issues/1012)) ([7788386](https://github.com/toptal/picasso/commit/778838692ff572950dd43b8a2bc0a64681562281))
- **PageBanner:** handle text whitespaces ([#1022](https://github.com/toptal/picasso/issues/1022)) ([d173afe](https://github.com/toptal/picasso/commit/d173afe35dcbce3a07871636407f9dfe363ceb73))

# [4.15.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.14.0...@toptal/picasso@4.15.0) (2020-01-13)

### Features

- **UserBadge:** add support for custom name rendering ([#1005](https://github.com/toptal/picasso/issues/1005)) ([cad2f99](https://github.com/toptal/picasso/commit/cad2f99e0520c934bb1d15dc8d17e4092ff3bd73))

# [4.14.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.13.3...@toptal/picasso@4.14.0) (2020-01-09)

### Features

- add NumberInput component ([#998](https://github.com/toptal/picasso/issues/998)) ([57b3862](https://github.com/toptal/picasso/commit/57b3862fab18edc131a7a6b0da634b1f5cb057d9))

## [4.13.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.13.2...@toptal/picasso@4.13.3) (2020-01-09)

**Note:** Version bump only for package @toptal/picasso

## [4.13.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.13.1...@toptal/picasso@4.13.2) (2020-01-09)

### Bug Fixes

- **PromptModal:** [FX-696] Fix warning after submit ([#1002](https://github.com/toptal/picasso/issues/1002)) ([c7a8d08](https://github.com/toptal/picasso/commit/c7a8d08f4faf27b28d271460e766723316a3a1c8))

## [4.13.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.13.0...@toptal/picasso@4.13.1) (2020-01-07)

**Note:** Version bump only for package @toptal/picasso

# [4.13.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.12.0...@toptal/picasso@4.13.0) (2020-01-02)

### Features

- **checkbox:** add CheckboxGroup component ([#995](https://github.com/toptal/picasso/issues/995)) ([4710280](https://github.com/toptal/picasso/commit/4710280265b53004a8c3facfa95dbbdda0aadc76))

# [4.12.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.11.0...@toptal/picasso@4.12.0) (2020-01-02)

### Features

- **helpbox:** some tweaks ([#994](https://github.com/toptal/picasso/issues/994)) ([b4de027](https://github.com/toptal/picasso/commit/b4de0270426af6072dfea87493a08e2ab061c022))

# [4.11.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.10.1...@toptal/picasso@4.11.0) (2019-12-27)

### Features

- **DatePicker:** [FX-631] Calendar to be rendered in Popper ([#989](https://github.com/toptal/picasso/issues/989)) ([a395cc7](https://github.com/toptal/picasso/commit/a395cc74e7449f2b2db2eba27c65f45ba00ac38a))

## [4.10.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.10.0...@toptal/picasso@4.10.1) (2019-12-26)

**Note:** Version bump only for package @toptal/picasso

# [4.10.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.9.0...@toptal/picasso@4.10.0) (2019-12-26)

### Features

- **select:** add custom menu width ([#987](https://github.com/toptal/picasso/issues/987)) ([d2b64d4](https://github.com/toptal/picasso/commit/d2b64d4d3e5a79b725da0d2a226aded3df98ff35))

# [4.9.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.9...@toptal/picasso@4.9.0) (2019-12-25)

### Features

- **menuitem:** change text wrap to normal ([#986](https://github.com/toptal/picasso/issues/986)) ([81eb1ab](https://github.com/toptal/picasso/commit/81eb1ab043283d553da04fa3bc69443effdeccb9))

## [4.8.9](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.8...@toptal/picasso@4.8.9) (2019-12-24)

**Note:** Version bump only for package @toptal/picasso

## [4.8.8](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.7...@toptal/picasso@4.8.8) (2019-12-24)

**Note:** Version bump only for package @toptal/picasso

## [4.8.7](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.6...@toptal/picasso@4.8.7) (2019-12-20)

**Note:** Version bump only for package @toptal/picasso

## [4.8.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.5...@toptal/picasso@4.8.6) (2019-12-20)

### Bug Fixes

- **Select:** allow changing dynamic options ([#977](https://github.com/toptal/picasso/issues/977)) ([18cf418](https://github.com/toptal/picasso/commit/18cf418b36c9c39b0dc2635f1e168c1d733ee555))

## [4.8.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.4...@toptal/picasso@4.8.5) (2019-12-17)

### Bug Fixes

- **Popper:** fix dynamic placement of Popper ([#957](https://github.com/toptal/picasso/issues/957)) ([9b53759](https://github.com/toptal/picasso/commit/9b537593d8bba656bf5a4d23c24ef90fbf99daca))

## [4.8.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.3...@toptal/picasso@4.8.4) (2019-12-16)

### Bug Fixes

- create Popper component ([#956](https://github.com/toptal/picasso/issues/956)) ([18eaa09](https://github.com/toptal/picasso/commit/18eaa09468917673bf8d5689b1d6e4ff2f38a4f6))

## [4.8.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.2...@toptal/picasso@4.8.3) (2019-12-13)

### Bug Fixes

- **notification:** overflow ([#964](https://github.com/toptal/picasso/issues/964)) ([336f044](https://github.com/toptal/picasso/commit/336f044a090bc4886286945fb03696f94d9f5a02))

## [4.8.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.1...@toptal/picasso@4.8.2) (2019-12-13)

### Bug Fixes

- **input:** document rowsMax prop ([#963](https://github.com/toptal/picasso/issues/963)) ([333c4c3](https://github.com/toptal/picasso/commit/333c4c36ca01d9ce7c61662bc631cbd37d215338))

## [4.8.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.0...@toptal/picasso@4.8.1) (2019-12-12)

### Bug Fixes

- [FX-653] Fix em-related sizes in components ([#958](https://github.com/toptal/picasso/issues/958)) ([726799c](https://github.com/toptal/picasso/commit/726799c02a11e4f23b7bc211eeb5c51a101ae2ce))

# [4.8.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.7.1...@toptal/picasso@4.8.0) (2019-12-12)

### Features

- **sidebar:** add collapsible behaviour ([#954](https://github.com/toptal/picasso/issues/954)) ([cd145f1](https://github.com/toptal/picasso/commit/cd145f1ed27391df82d4d0a3e35e2cca4ea82044))

## [4.7.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.7.0...@toptal/picasso@4.7.1) (2019-12-11)

### Bug Fixes

- **RadioGroup:** pass correct classes to MUI component ([#955](https://github.com/toptal/picasso/issues/955)) ([e0e269c](https://github.com/toptal/picasso/commit/e0e269c6d5565cf7e238ea06e03bb44dd90c2926))

# [4.7.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.6.0...@toptal/picasso@4.7.0) (2019-12-10)

### Features

- **Label:** add colors ([#950](https://github.com/toptal/picasso/issues/950)) ([cde15ba](https://github.com/toptal/picasso/commit/cde15ba6b5432f572cf3bc349ae12e8bc38ac22f))

# [4.6.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.5.2...@toptal/picasso@4.6.0) (2019-12-10)

### Features

- **slider:** add tooltip and range features ([#948](https://github.com/toptal/picasso/issues/948)) ([1ad8675](https://github.com/toptal/picasso/commit/1ad8675d855b37d78834915f698b4e0446c67206))

## [4.5.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.5.1...@toptal/picasso@4.5.2) (2019-12-10)

### Bug Fixes

- correct typings for withClasses HOC ([#949](https://github.com/toptal/picasso/issues/949)) ([053d6f5](https://github.com/toptal/picasso/commit/053d6f5eb7dcc9ad6d4ac3d81b702c3bf958322d))

## [4.5.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.5.0...@toptal/picasso@4.5.1) (2019-12-10)

### Bug Fixes

- **Modal:** use SvgClose16 icon to close Modal ([#951](https://github.com/toptal/picasso/issues/951)) ([d107bf5](https://github.com/toptal/picasso/commit/d107bf5fbd3e37cd52bdc1bdb087762c074e995f))

# [4.5.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.4.0...@toptal/picasso@4.5.0) (2019-12-09)

### Features

- **DatePicker:** [FX-608] Add default icon ([#944](https://github.com/toptal/picasso/issues/944)) ([9b0240f](https://github.com/toptal/picasso/commit/9b0240f4ecda048198774be588da7ec25c59f883))

# [4.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.3.2...@toptal/picasso@4.4.0) (2019-12-09)

### Features

- [BIL-789] extend NotificationProvider with createPortal ([#777](https://github.com/toptal/picasso/issues/777)) ([eaa69c8](https://github.com/toptal/picasso/commit/eaa69c8ac1f31cc623bcd7ce5a4fc768d836fe65))

## [4.3.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.3.1...@toptal/picasso@4.3.2) (2019-12-05)

**Note:** Version bump only for package @toptal/picasso

## [4.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.3.0...@toptal/picasso@4.3.1) (2019-12-05)

### Bug Fixes

- fix tree-shaking ([#941](https://github.com/toptal/picasso/issues/941)) ([6a9d2a0](https://github.com/toptal/picasso/commit/6a9d2a02f8c692e3b061a026d3cc5d748e9f2263))

# [4.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.2.0...@toptal/picasso@4.3.0) (2019-12-05)

### Features

- **Input:** small size variant ([#932](https://github.com/toptal/picasso/issues/932)) ([b5a049c](https://github.com/toptal/picasso/commit/b5a049c0b7659e5885674482ae75a64487d5122b))

# [4.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.1.1...@toptal/picasso@4.2.0) (2019-12-04)

### Features

- **Typography:** add lineThrough prop ([#936](https://github.com/toptal/picasso/issues/936)) ([f3b7f20](https://github.com/toptal/picasso/commit/f3b7f20d1be72915a29aaae73f5670be89926e4e))

## [4.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.1.0...@toptal/picasso@4.1.1) (2019-12-03)

**Note:** Version bump only for package @toptal/picasso

# [4.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.0.0...@toptal/picasso@4.1.0) (2019-12-03)

### Features

- **RadioGroup:** add horizontal prop ([#918](https://github.com/toptal/picasso/issues/918)) ([b2ac0f0](https://github.com/toptal/picasso/commit/b2ac0f01c3ae6505035eb1e2cd67d07a44b05ae0))

# 4.0.0 (2019-12-03)

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

# [3.45.0](https://github.com/toptal/picasso/compare/v3.44.0...v3.45.0) (2019-11-28)

### Features

- **Indicator:** add Indicator component ([#890](https://github.com/toptal/picasso/issues/890)) ([d298320](https://github.com/toptal/picasso/commit/d298320))

# [3.44.0](https://github.com/toptal/picasso/compare/v3.43.0...v3.44.0) (2019-11-22)

### Features

- **radio:** change label from string to ReactElement ([#891](https://github.com/toptal/picasso/issues/891)) ([21a8d36](https://github.com/toptal/picasso/commit/21a8d36))

# [3.43.0](https://github.com/toptal/picasso/compare/v3.42.0...v3.43.0) (2019-11-20)

### Features

- **button:** add secondary-green variant ([#883](https://github.com/toptal/picasso/issues/883)) ([c7ebde7](https://github.com/toptal/picasso/commit/c7ebde7))

# [3.42.0](https://github.com/toptal/picasso/compare/v3.41.0...v3.42.0) (2019-11-20)

### Features

- **icon:** add social icons ([#880](https://github.com/toptal/picasso/issues/880)) ([b4b7174](https://github.com/toptal/picasso/commit/b4b7174))

# [3.41.0](https://github.com/toptal/picasso/compare/v3.40.0...v3.41.0) (2019-11-14)

### Features

- **Table:** [FX-585] Add expandable rows ([#856](https://github.com/toptal/picasso/issues/856)) ([db058ee](https://github.com/toptal/picasso/commit/db058ee))

# [3.40.0](https://github.com/toptal/picasso/compare/v3.39.1...v3.40.0) (2019-11-13)

### Features

- **icon:** add guests icon ([#849](https://github.com/toptal/picasso/issues/849)) ([827566d](https://github.com/toptal/picasso/commit/827566d))

## [3.39.1](https://github.com/toptal/picasso/compare/v3.39.0...v3.39.1) (2019-11-12)

### Bug Fixes

- **TagSelector:** fix placeholder on loading ([#851](https://github.com/toptal/picasso/issues/851)) ([b2252cc](https://github.com/toptal/picasso/commit/b2252cc))

# [3.39.0](https://github.com/toptal/picasso/compare/v3.38.0...v3.39.0) (2019-11-08)

### Features

- **Accordion:** [FX-571] Align expand icon to the top ([#842](https://github.com/toptal/picasso/issues/842)) ([3266cc0](https://github.com/toptal/picasso/commit/3266cc0))

# [3.38.0](https://github.com/toptal/picasso/compare/v3.37.0...v3.38.0) (2019-11-08)

### Features

- create PageBanner component ([#835](https://github.com/toptal/picasso/issues/835)) ([a881c61](https://github.com/toptal/picasso/commit/a881c61))

# [3.37.0](https://github.com/toptal/picasso/compare/v3.36.1...v3.37.0) (2019-11-08)

### Features

- **TagSelector:** make TagSelector a controlled component ([#837](https://github.com/toptal/picasso/issues/837)) ([86fa5f3](https://github.com/toptal/picasso/commit/86fa5f3))

## [3.36.1](https://github.com/toptal/picasso/compare/v3.36.0...v3.36.1) (2019-11-07)

### Bug Fixes

- **Button:** accept all props of the component passed in the as property ([#834](https://github.com/toptal/picasso/issues/834)) ([753b953](https://github.com/toptal/picasso/commit/753b953))

# [3.36.0](https://github.com/toptal/picasso/compare/v3.35.0...v3.36.0) (2019-11-05)

### Features

- **SidebarItem:** [FX-510] Add 'as' type definitions ([#836](https://github.com/toptal/picasso/issues/836)) ([3db4216](https://github.com/toptal/picasso/commit/3db4216))

# [3.35.0](https://github.com/toptal/picasso/compare/v3.34.0...v3.35.0) (2019-11-01)

### Features

- **Input:** [FX-570] Add entered counter type ([#831](https://github.com/toptal/picasso/issues/831)) ([15dee54](https://github.com/toptal/picasso/commit/15dee54))

# [3.34.0](https://github.com/toptal/picasso/compare/v3.33.2...v3.34.0) (2019-10-30)

### Features

- **Tooltip:** allow controlling listeners ([#819](https://github.com/toptal/picasso/issues/819)) ([c5f757f](https://github.com/toptal/picasso/commit/c5f757f))

## [3.33.2](https://github.com/toptal/picasso/compare/v3.33.1...v3.33.2) (2019-10-28)

### Bug Fixes

- fix MUI version to 4.3 ([#826](https://github.com/toptal/picasso/issues/826)) ([1d3acc1](https://github.com/toptal/picasso/commit/1d3acc1))

## [3.33.1](https://github.com/toptal/picasso/compare/v3.33.0...v3.33.1) (2019-10-28)

### Bug Fixes

- **Helpbox:** render Helpbox.Content as a div element ([#821](https://github.com/toptal/picasso/issues/821)) ([f4ddfd7](https://github.com/toptal/picasso/commit/f4ddfd7)), closes [#789](https://github.com/toptal/picasso/issues/789)

# [3.33.0](https://github.com/toptal/picasso/compare/v3.32.0...v3.33.0) (2019-10-24)

### Features

- **Button:** add transparent variants ([#815](https://github.com/toptal/picasso/issues/815)) ([a2dda67](https://github.com/toptal/picasso/commit/a2dda67))

# [3.32.0](https://github.com/toptal/picasso/compare/v3.31.2...v3.32.0) (2019-10-21)

### Features

- **PromptModal:** improve api and error handling ([#805](https://github.com/toptal/picasso/issues/805)) ([e03f158](https://github.com/toptal/picasso/commit/e03f158))

## [3.31.2](https://github.com/toptal/picasso/compare/v3.31.1...v3.31.2) (2019-10-21)

### Bug Fixes

- **Autocomplete:** not show other option when matches with option ([#807](https://github.com/toptal/picasso/issues/807)) ([ba3520c](https://github.com/toptal/picasso/commit/ba3520c))

## [3.31.1](https://github.com/toptal/picasso/compare/v3.31.0...v3.31.1) (2019-10-18)

### Bug Fixes

- issue with content growing flexbox children element ([#804](https://github.com/toptal/picasso/issues/804)) ([f2eb6a8](https://github.com/toptal/picasso/commit/f2eb6a8))

# [3.31.0](https://github.com/toptal/picasso/compare/v3.30.0...v3.31.0) (2019-10-18)

### Features

- **Input:** add limit prop ([#803](https://github.com/toptal/picasso/issues/803)) ([8beab39](https://github.com/toptal/picasso/commit/8beab39))

# [3.30.0](https://github.com/toptal/picasso/compare/v3.29.1...v3.30.0) (2019-10-17)

### Features

- [FX-481] Autocomplete cleanup ([#799](https://github.com/toptal/picasso/issues/799)) ([960b749](https://github.com/toptal/picasso/commit/960b749))

## [3.29.1](https://github.com/toptal/picasso/compare/v3.29.0...v3.29.1) (2019-10-17)

### Bug Fixes

- **Modal:** fix scrollbar settings and spacing ([#800](https://github.com/toptal/picasso/issues/800)) ([a8155a3](https://github.com/toptal/picasso/commit/a8155a3))

# [3.29.0](https://github.com/toptal/picasso/compare/v3.28.0...v3.29.0) (2019-10-16)

### Features

- **DatePicker:** add possibility to use input props ([#785](https://github.com/toptal/picasso/issues/785)) ([a27bf1c](https://github.com/toptal/picasso/commit/a27bf1c))

# [3.28.0](https://github.com/toptal/picasso/compare/v3.27.0...v3.28.0) (2019-10-16)

### Features

- **Notification:** add notification acitons ([#767](https://github.com/toptal/picasso/issues/767)) ([c059d90](https://github.com/toptal/picasso/commit/c059d90))

# [3.27.0](https://github.com/toptal/picasso/compare/v3.26.1...v3.27.0) (2019-10-16)

### Features

- **Autocomplete:** add enableAutofill option ([#798](https://github.com/toptal/picasso/issues/798)) ([3de9683](https://github.com/toptal/picasso/commit/3de9683))
- **select:** add support for multiple selections ([#797](https://github.com/toptal/picasso/issues/797)) ([903b593](https://github.com/toptal/picasso/commit/903b593))

## [3.26.1](https://github.com/toptal/picasso/compare/v3.26.0...v3.26.1) (2019-10-14)

### Bug Fixes

- **ShowMore:** add props spreading to ShowMore component ([#793](https://github.com/toptal/picasso/issues/793)) ([e0f840f](https://github.com/toptal/picasso/commit/e0f840f))

# [3.26.0](https://github.com/toptal/picasso/compare/v3.25.1...v3.26.0) (2019-10-14)

### Features

- **icon:** add star solid ([#794](https://github.com/toptal/picasso/issues/794)) ([5c7884c](https://github.com/toptal/picasso/commit/5c7884c))

## [3.25.1](https://github.com/toptal/picasso/compare/v3.25.0...v3.25.1) (2019-10-14)

### Bug Fixes

- **icons:** glitch ([#784](https://github.com/toptal/picasso/issues/784)) ([1c200ed](https://github.com/toptal/picasso/commit/1c200ed))

# [3.25.0](https://github.com/toptal/picasso/compare/v3.24.5...v3.25.0) (2019-10-14)

### Features

- [FX-486] Add useScreens hook ([#773](https://github.com/toptal/picasso/issues/773)) ([78065df](https://github.com/toptal/picasso/commit/78065df))

## [3.24.5](https://github.com/toptal/picasso/compare/v3.24.4...v3.24.5) (2019-10-11)

### Bug Fixes

- **docs:** minor docs fix ([#788](https://github.com/toptal/picasso/issues/788)) ([61e428b](https://github.com/toptal/picasso/commit/61e428b))

## [3.24.4](https://github.com/toptal/picasso/compare/v3.24.3...v3.24.4) (2019-10-10)

### Bug Fixes

- **UserBadge:** [FX-179] Fix image squashing on IE11 ([#782](https://github.com/toptal/picasso/issues/782)) ([7020d7f](https://github.com/toptal/picasso/commit/7020d7f))
- modal overlay for autocomplete and dropdown ([#775](https://github.com/toptal/picasso/issues/775)) ([87f648f](https://github.com/toptal/picasso/commit/87f648f))

## [3.24.3](https://github.com/toptal/picasso/compare/v3.24.2...v3.24.3) (2019-10-09)

### Bug Fixes

- **Input:** [Fx-176] Fix icons in adornment in IE11 ([#778](https://github.com/toptal/picasso/issues/778)) ([383b53c](https://github.com/toptal/picasso/commit/383b53c))

## [3.24.2](https://github.com/toptal/picasso/compare/v3.24.1...v3.24.2) (2019-10-09)

### Bug Fixes

- **Button:** [FX-173] Fix styles for buttons in IE11 ([#770](https://github.com/toptal/picasso/issues/770)) ([e5e0aaf](https://github.com/toptal/picasso/commit/e5e0aaf))

## [3.24.1](https://github.com/toptal/picasso/compare/v3.24.0...v3.24.1) (2019-10-08)

### Bug Fixes

- [FX-173] Fix infinite loop of loading font in IE11 and Edge ([#769](https://github.com/toptal/picasso/issues/769)) ([30ffd96](https://github.com/toptal/picasso/commit/30ffd96))

# [3.24.0](https://github.com/toptal/picasso/compare/v3.23.0...v3.24.0) (2019-10-08)

### Features

- [FX-501] Make Sidebar and Top Header responsive for medium size ([#757](https://github.com/toptal/picasso/issues/757)) ([3045d2a](https://github.com/toptal/picasso/commit/3045d2a))

# [3.23.0](https://github.com/toptal/picasso/compare/v3.22.0...v3.23.0) (2019-10-07)

### Features

- [FX-502] Add grey variant to Container and Helpbox ([#747](https://github.com/toptal/picasso/issues/747)) ([d453f06](https://github.com/toptal/picasso/commit/d453f06))

# [3.22.0](https://github.com/toptal/picasso/compare/v3.21.1...v3.22.0) (2019-10-07)

### Features

- **Tabs:** add variant prop ([#720](https://github.com/toptal/picasso/issues/720)) ([a00ac45](https://github.com/toptal/picasso/commit/a00ac45))

## [3.21.1](https://github.com/toptal/picasso/compare/v3.21.0...v3.21.1) (2019-10-07)

### Bug Fixes

- **Autocomplete:** [FX-492] Extend the api with other option ([#760](https://github.com/toptal/picasso/issues/760)) ([780cd4f](https://github.com/toptal/picasso/commit/780cd4f))

# [3.21.0](https://github.com/toptal/picasso/compare/v3.20.0...v3.21.0) (2019-10-07)

### Features

- **userbadge:** new size xxsmall ([#751](https://github.com/toptal/picasso/issues/751)) ([d99cb6a](https://github.com/toptal/picasso/commit/d99cb6a))

# [3.20.0](https://github.com/toptal/picasso/compare/v3.19.0...v3.20.0) (2019-10-07)

### Features

- **PromptModal:** add PromptModal and showPrompt ([#753](https://github.com/toptal/picasso/issues/753)) ([a7c7c48](https://github.com/toptal/picasso/commit/a7c7c48))

# [3.19.0](https://github.com/toptal/picasso/compare/v3.18.0...v3.19.0) (2019-10-04)

### Features

- add DatePicker ([#736](https://github.com/toptal/picasso/issues/736)) ([9d0f506](https://github.com/toptal/picasso/commit/9d0f506))

# [3.18.0](https://github.com/toptal/picasso/compare/v3.17.4...v3.18.0) (2019-10-04)

### Features

- **Modal:** add sizes ([#756](https://github.com/toptal/picasso/issues/756)) ([49fb70d](https://github.com/toptal/picasso/commit/49fb70d))

## [3.17.4](https://github.com/toptal/picasso/compare/v3.17.3...v3.17.4) (2019-10-04)

### Bug Fixes

- **dropdown:** popper scrolling away ([#732](https://github.com/toptal/picasso/issues/732)) ([211dca8](https://github.com/toptal/picasso/commit/211dca8))

## [3.17.3](https://github.com/toptal/picasso/compare/v3.17.2...v3.17.3) (2019-10-03)

### Bug Fixes

- font loader for FF ([#750](https://github.com/toptal/picasso/issues/750)) ([5ba7ab0](https://github.com/toptal/picasso/commit/5ba7ab0))

## [3.17.2](https://github.com/toptal/picasso/compare/v3.17.1...v3.17.2) (2019-10-03)

### Bug Fixes

- **Typography:** add underline ([#744](https://github.com/toptal/picasso/issues/744)) ([8e63282](https://github.com/toptal/picasso/commit/8e63282))

## [3.17.1](https://github.com/toptal/picasso/compare/v3.17.0...v3.17.1) (2019-10-02)

### Bug Fixes

- **Input:** add ability to disable autofill for input ([#739](https://github.com/toptal/picasso/issues/739)) ([75c742c](https://github.com/toptal/picasso/commit/75c742c))

# [3.17.0](https://github.com/toptal/picasso/compare/v3.16.1...v3.17.0) (2019-10-02)

### Features

- **Autocomplete:** add error prop ([#742](https://github.com/toptal/picasso/issues/742)) ([9235f92](https://github.com/toptal/picasso/commit/9235f92))

## [3.16.1](https://github.com/toptal/picasso/compare/v3.16.0...v3.16.1) (2019-10-02)

### Bug Fixes

- **DropdownArrow:** added sizes for dropdown ([#741](https://github.com/toptal/picasso/issues/741)) ([a1e72dc](https://github.com/toptal/picasso/commit/a1e72dc))

# [3.16.0](https://github.com/toptal/picasso/compare/v3.15.2...v3.16.0) (2019-10-02)

### Features

- **Modal:** [FX-497] Change useModal hook api ([#737](https://github.com/toptal/picasso/issues/737)) ([f46fcc3](https://github.com/toptal/picasso/commit/f46fcc3))

## [3.15.2](https://github.com/toptal/picasso/compare/v3.15.1...v3.15.2) (2019-10-02)

### Bug Fixes

- **Menu:** refresh submenus in drill down ([#731](https://github.com/toptal/picasso/issues/731)) ([7905e7a](https://github.com/toptal/picasso/commit/7905e7a))

## [3.15.1](https://github.com/toptal/picasso/compare/v3.15.0...v3.15.1) (2019-09-30)

### Bug Fixes

- **EnvironmentBanner:** banner no longer steals clicks ([#726](https://github.com/toptal/picasso/issues/726)) ([f4ee655](https://github.com/toptal/picasso/commit/f4ee655)), closes [#725](https://github.com/toptal/picasso/issues/725)

# [3.15.0](https://github.com/toptal/picasso/compare/v3.14.0...v3.15.0) (2019-09-27)

### Features

- **Autocomplate:** icon, startAdornment, endAdornment ([#717](https://github.com/toptal/picasso/issues/717)) ([072e745](https://github.com/toptal/picasso/commit/072e745))

# [3.14.0](https://github.com/toptal/picasso/compare/v3.13.0...v3.14.0) (2019-09-26)

### Features

- **icon:** update color prop ([#712](https://github.com/toptal/picasso/issues/712)) ([f20cc41](https://github.com/toptal/picasso/commit/f20cc41))

# [3.13.0](https://github.com/toptal/picasso/compare/v3.12.2...v3.13.0) (2019-09-26)

### Features

- [FX-344] Activate tree-shaking for Picasso ([#714](https://github.com/toptal/picasso/issues/714)) ([349af61](https://github.com/toptal/picasso/commit/349af61))

## [3.12.2](https://github.com/toptal/picasso/compare/v3.12.1...v3.12.2) (2019-09-26)

### Bug Fixes

- **Menu:** fix arrow navigation ([#718](https://github.com/toptal/picasso/issues/718)) ([d5a2f70](https://github.com/toptal/picasso/commit/d5a2f70))

## [3.12.1](https://github.com/toptal/picasso/compare/v3.12.0...v3.12.1) (2019-09-25)

### Bug Fixes

- **sidebar & page header menu:** dropdown offsets ([#713](https://github.com/toptal/picasso/issues/713)) ([bd552cc](https://github.com/toptal/picasso/commit/bd552cc))

# [3.12.0](https://github.com/toptal/picasso/compare/v3.11.6...v3.12.0) (2019-09-24)

### Features

- **link:** add color prop ([#700](https://github.com/toptal/picasso/issues/700)) ([827684a](https://github.com/toptal/picasso/commit/827684a))

## [3.11.6](https://github.com/toptal/picasso/compare/v3.11.5...v3.11.6) (2019-09-24)

### Bug Fixes

- **TableCell:** children prop should be optional ([#687](https://github.com/toptal/picasso/issues/687)) ([a8f1729](https://github.com/toptal/picasso/commit/a8f1729))

## [3.11.5](https://github.com/toptal/picasso/compare/v3.11.4...v3.11.5) (2019-09-24)

### Bug Fixes

- **MenuItem:** remove useless class that provides a warning ([#711](https://github.com/toptal/picasso/issues/711)) ([66e466b](https://github.com/toptal/picasso/commit/66e466b))

## [3.11.4](https://github.com/toptal/picasso/compare/v3.11.3...v3.11.4) (2019-09-23)

### Bug Fixes

- **Picasso:** fix usePicassoRoot hook ([#710](https://github.com/toptal/picasso/issues/710)) ([2992ffc](https://github.com/toptal/picasso/commit/2992ffc))

## [3.11.3](https://github.com/toptal/picasso/compare/v3.11.2...v3.11.3) (2019-09-23)

### Bug Fixes

- **Autocomplete:** allow disabling default chrome autocomplete ([#706](https://github.com/toptal/picasso/issues/706)) ([05ed206](https://github.com/toptal/picasso/commit/05ed206))

## [3.11.2](https://github.com/toptal/picasso/compare/v3.11.1...v3.11.2) (2019-09-20)

### Bug Fixes

- **PageHeader:** title optional prop ([#704](https://github.com/toptal/picasso/issues/704)) ([98d0b06](https://github.com/toptal/picasso/commit/98d0b06))

## [3.11.1](https://github.com/toptal/picasso/compare/v3.11.0...v3.11.1) (2019-09-20)

### Bug Fixes

- **Page:** add flex to the Page.Content to simplify page layout ([#676](https://github.com/toptal/picasso/issues/676)) ([ddefacb](https://github.com/toptal/picasso/commit/ddefacb))

# [3.11.0](https://github.com/toptal/picasso/compare/v3.10.1...v3.11.0) (2019-09-19)

### Features

- **Menu:** [FX-436] drill-down functionality ([#684](https://github.com/toptal/picasso/issues/684)) ([3219579](https://github.com/toptal/picasso/commit/3219579)), closes [#2](https://github.com/toptal/picasso/issues/2) [#3](https://github.com/toptal/picasso/issues/3)

## [3.10.1](https://github.com/toptal/picasso/compare/v3.10.0...v3.10.1) (2019-09-19)

### Bug Fixes

- **utils:** expose controlled and uncontrolled mode hooks ([#697](https://github.com/toptal/picasso/issues/697)) ([583545f](https://github.com/toptal/picasso/commit/583545f))

# [3.10.0](https://github.com/toptal/picasso/compare/v3.9.0...v3.10.0) (2019-09-19)

### Features

- **Modal:** add useModal hook ([#694](https://github.com/toptal/picasso/issues/694)) ([bf2270f](https://github.com/toptal/picasso/commit/bf2270f))

# [3.9.0](https://github.com/toptal/picasso/compare/v3.8.7...v3.9.0) (2019-09-19)

### Features

- **autocomplete:** add custom renderer for an option ([#690](https://github.com/toptal/picasso/issues/690)) ([ab566df](https://github.com/toptal/picasso/commit/ab566df))

## [3.8.7](https://github.com/toptal/picasso/compare/v3.8.6...v3.8.7) (2019-09-18)

### Bug Fixes

- **Sidebar:** fix auto-closing on small screens ([#695](https://github.com/toptal/picasso/issues/695)) ([428ca2f](https://github.com/toptal/picasso/commit/428ca2f))

## [3.8.6](https://github.com/toptal/picasso/compare/v3.8.5...v3.8.6) (2019-09-18)

### Bug Fixes

- **autocomplete:** remove debouncing ([#682](https://github.com/toptal/picasso/issues/682)) ([6100769](https://github.com/toptal/picasso/commit/6100769))

## [3.8.5](https://github.com/toptal/picasso/compare/v3.8.4...v3.8.5) (2019-09-17)

### Bug Fixes

- **Accordion:** support inline components in content ([#688](https://github.com/toptal/picasso/issues/688)) ([59b0b61](https://github.com/toptal/picasso/commit/59b0b61))

## [3.8.4](https://github.com/toptal/picasso/compare/v3.8.3...v3.8.4) (2019-09-17)

### Bug Fixes

- visal test build image ([#691](https://github.com/toptal/picasso/issues/691)) ([a3f6ceb](https://github.com/toptal/picasso/commit/a3f6ceb))

## [3.8.3](https://github.com/toptal/picasso/compare/v3.8.2...v3.8.3) (2019-09-17)

### Bug Fixes

- **Modal:** fix close icon with content ([#686](https://github.com/toptal/picasso/issues/686)) ([1a15f24](https://github.com/toptal/picasso/commit/1a15f24))

## [3.8.2](https://github.com/toptal/picasso/compare/v3.8.1...v3.8.2) (2019-09-17)

### Bug Fixes

- **Icon:** [FX-456] Update miss-aligned icons inside viewbox ([#685](https://github.com/toptal/picasso/issues/685)) ([4bc7fa2](https://github.com/toptal/picasso/commit/4bc7fa2))

## [3.8.1](https://github.com/toptal/picasso/compare/v3.8.0...v3.8.1) (2019-09-16)

### Bug Fixes

- **Sidebar:** fix position on small screens ([#680](https://github.com/toptal/picasso/issues/680)) ([b862fa9](https://github.com/toptal/picasso/commit/b862fa9))

# [3.8.0](https://github.com/toptal/picasso/compare/v3.7.1...v3.8.0) (2019-09-13)

### Features

- add EnvironmentBanner component ([#674](https://github.com/toptal/picasso/issues/674)) ([f32ded0](https://github.com/toptal/picasso/commit/f32ded0))
- **Page:** make responsive page ([#656](https://github.com/toptal/picasso/issues/656)) ([4ff7a06](https://github.com/toptal/picasso/commit/4ff7a06))

## [3.7.1](https://github.com/toptal/picasso/compare/v3.7.0...v3.7.1) (2019-09-13)

### Bug Fixes

- **Menu:** export static props for Menu to fix ts type check ([#677](https://github.com/toptal/picasso/issues/677)) ([83d5908](https://github.com/toptal/picasso/commit/83d5908))

# [3.7.0](https://github.com/toptal/picasso/compare/v3.6.1...v3.7.0) (2019-09-12)

### Features

- add ThumbsUp and ThumbsDown icons ([#675](https://github.com/toptal/picasso/issues/675)) ([d4411c1](https://github.com/toptal/picasso/commit/d4411c1))

## [3.6.1](https://github.com/toptal/picasso/compare/v3.6.0...v3.6.1) (2019-09-12)

### Bug Fixes

- **Dropdown:** disable autofocus by default ([#657](https://github.com/toptal/picasso/issues/657)) ([7e29a8c](https://github.com/toptal/picasso/commit/7e29a8c)), closes [#664](https://github.com/toptal/picasso/issues/664) [#666](https://github.com/toptal/picasso/issues/666) [#667](https://github.com/toptal/picasso/issues/667) [#668](https://github.com/toptal/picasso/issues/668) [#669](https://github.com/toptal/picasso/issues/669) [#669](https://github.com/toptal/picasso/issues/669) [#666](https://github.com/toptal/picasso/issues/666) [#668](https://github.com/toptal/picasso/issues/668) [#667](https://github.com/toptal/picasso/issues/667) [#663](https://github.com/toptal/picasso/issues/663) [#654](https://github.com/toptal/picasso/issues/654) [#661](https://github.com/toptal/picasso/issues/661) [#655](https://github.com/toptal/picasso/issues/655) [#653](https://github.com/toptal/picasso/issues/653) [#666](https://github.com/toptal/picasso/issues/666) [#667](https://github.com/toptal/picasso/issues/667) [#668](https://github.com/toptal/picasso/issues/668) [#669](https://github.com/toptal/picasso/issues/669) [#669](https://github.com/toptal/picasso/issues/669) [#666](https://github.com/toptal/picasso/issues/666) [#668](https://github.com/toptal/picasso/issues/668) [#667](https://github.com/toptal/picasso/issues/667) [#663](https://github.com/toptal/picasso/issues/663) [#654](https://github.com/toptal/picasso/issues/654) [#661](https://github.com/toptal/picasso/issues/661) [#655](https://github.com/toptal/picasso/issues/655) [#653](https://github.com/toptal/picasso/issues/653)

# [3.6.0](https://github.com/toptal/picasso/compare/v3.5.0...v3.6.0) (2019-09-12)

### Features

- **Icon:** filter and sort icons ([#664](https://github.com/toptal/picasso/issues/664)) ([8dc3698](https://github.com/toptal/picasso/commit/8dc3698)), closes [#666](https://github.com/toptal/picasso/issues/666) [#667](https://github.com/toptal/picasso/issues/667) [#668](https://github.com/toptal/picasso/issues/668) [#669](https://github.com/toptal/picasso/issues/669) [#669](https://github.com/toptal/picasso/issues/669) [#666](https://github.com/toptal/picasso/issues/666) [#668](https://github.com/toptal/picasso/issues/668) [#667](https://github.com/toptal/picasso/issues/667) [#663](https://github.com/toptal/picasso/issues/663) [#654](https://github.com/toptal/picasso/issues/654) [#661](https://github.com/toptal/picasso/issues/661) [#655](https://github.com/toptal/picasso/issues/655) [#653](https://github.com/toptal/picasso/issues/653)

# [3.5.0](https://github.com/toptal/picasso/compare/v3.4.1...v3.5.0) (2019-09-11)

### Bug Fixes

- add read/write rights for jenkins user for release ([#669](https://github.com/toptal/picasso/issues/669)) ([298dc26](https://github.com/toptal/picasso/commit/298dc26))
- fix release by adding ci env variable ([#666](https://github.com/toptal/picasso/issues/666)) ([6a002fe](https://github.com/toptal/picasso/commit/6a002fe))
- fix release ci build ([#668](https://github.com/toptal/picasso/issues/668)) ([d6f891b](https://github.com/toptal/picasso/commit/d6f891b))
- fix release ci job ([#667](https://github.com/toptal/picasso/issues/667)) ([1e97ae5](https://github.com/toptal/picasso/commit/1e97ae5))
- **autocomplete:** auto highlight first option ([#663](https://github.com/toptal/picasso/issues/663)) ([31552a0](https://github.com/toptal/picasso/commit/31552a0))
- **autocomplete:** fix diverse issues ([#654](https://github.com/toptal/picasso/issues/654)) ([c46dda6](https://github.com/toptal/picasso/commit/c46dda6))
- **autocomplete:** fix missing details ([#661](https://github.com/toptal/picasso/issues/661)) ([1bbe9ed](https://github.com/toptal/picasso/commit/1bbe9ed))
- **Sidebar:** [FX-384] Fix minWidth for Sidebar, add page sidebar tutorial ([#655](https://github.com/toptal/picasso/issues/655)) ([b673d8d](https://github.com/toptal/picasso/commit/b673d8d))

### Features

- allow 'defaultExpanded' prop for SidebarItem for plugging to re… ([#653](https://github.com/toptal/picasso/issues/653)) ([7088e16](https://github.com/toptal/picasso/commit/7088e16))

## [3.4.1](https://github.com/toptal/picasso/compare/v3.4.0...v3.4.1) (2019-09-03)

### Bug Fixes

- remove spacing on the left from an iconless sidebar menu item ([#640](https://github.com/toptal/picasso/issues/640)) ([65a5b43](https://github.com/toptal/picasso/commit/65a5b43))

# [3.4.0](https://github.com/toptal/picasso/compare/v3.3.0...v3.4.0) (2019-09-03)

### Features

- make Picasso publicly accessible ([#637](https://github.com/toptal/picasso/issues/637)) ([c3f1b43](https://github.com/toptal/picasso/commit/c3f1b43))

# [3.3.0](https://github.com/toptal/picasso/compare/v3.2.2...v3.3.0) (2019-09-02)

### Features

- **Link:** extend `as` prop type definition ([#626](https://github.com/toptal/picasso/issues/626)) ([85a5952](https://github.com/toptal/picasso/commit/85a5952))

## [3.2.2](https://github.com/toptal/picasso/compare/v3.2.1...v3.2.2) (2019-08-30)

### Bug Fixes

- **tagselector:** fix input style override ([#636](https://github.com/toptal/picasso/issues/636)) ([b2e1492](https://github.com/toptal/picasso/commit/b2e1492))

## [3.2.1](https://github.com/toptal/picasso/compare/v3.2.0...v3.2.1) (2019-08-28)

### Bug Fixes

- master release job increase timeout ([#635](https://github.com/toptal/picasso/issues/635)) ([6d26ef0](https://github.com/toptal/picasso/commit/6d26ef0))

# [3.2.0](https://github.com/toptal/picasso/compare/v3.1.1...v3.2.0) (2019-08-28)

### Features

- add tagselector component ([#617](https://github.com/toptal/picasso/issues/617)) ([378bc19](https://github.com/toptal/picasso/commit/378bc19))

## [3.1.1](https://github.com/toptal/picasso/compare/v3.1.0...v3.1.1) (2019-08-28)

### Bug Fixes

- [FX-391] Fix loading fonts multiple times if many Picasso roots ([#633](https://github.com/toptal/picasso/issues/633)) ([c687fc3](https://github.com/toptal/picasso/commit/c687fc3))

# [3.1.0](https://github.com/toptal/picasso/compare/v3.0.1...v3.1.0) (2019-08-27)

### Features

- **Button:** add augmentation with as prop ([#630](https://github.com/toptal/picasso/issues/630)) ([fb3682e](https://github.com/toptal/picasso/commit/fb3682e))

## [3.0.1](https://github.com/toptal/picasso/compare/v3.0.0...v3.0.1) (2019-08-27)

### Bug Fixes

- [FX-386] Export missing props to unlock styled components typing ([#627](https://github.com/toptal/picasso/issues/627)) ([83ed4ae](https://github.com/toptal/picasso/commit/83ed4ae))

# [3.0.0](https://github.com/toptal/picasso/compare/v2.27.1...v3.0.0) (2019-08-23)

### Bug Fixes

- **Accordion:** fix Accordion styles ([#592](https://github.com/toptal/picasso/issues/592)) ([c2636b9](https://github.com/toptal/picasso/commit/c2636b9))
- **Accordion:** fix an issue with no children rendered ([b9d198e](https://github.com/toptal/picasso/commit/b9d198e))
- **CssBaseline:** [FX-368] Use our own css baseline ([#595](https://github.com/toptal/picasso/issues/595)) ([bf9052c](https://github.com/toptal/picasso/commit/bf9052c))
- **Grid:** divide Picasso grid spacing according to MUI ([#586](https://github.com/toptal/picasso/issues/586)) ([41b9783](https://github.com/toptal/picasso/commit/41b9783))
- **paper:** fix default text color ([#594](https://github.com/toptal/picasso/issues/594)) ([5522976](https://github.com/toptal/picasso/commit/5522976))
- **Select:** issues after upgrade to MUI v4 ([#590](https://github.com/toptal/picasso/issues/590)) ([7c34698](https://github.com/toptal/picasso/commit/7c34698))
- **Slider:** [FX-378] Move Slider from lab to core ([#596](https://github.com/toptal/picasso/issues/596)) ([58e33b9](https://github.com/toptal/picasso/commit/58e33b9))
- **Table:** adjust cell paddings ([#591](https://github.com/toptal/picasso/issues/591)) ([550d901](https://github.com/toptal/picasso/commit/550d901))
- **Tabs:** after upgrade to v4 ([#593](https://github.com/toptal/picasso/issues/593)) ([07dcef8](https://github.com/toptal/picasso/commit/07dcef8))
- fix disabled state for Checkbox and Radio ([#587](https://github.com/toptal/picasso/issues/587)) ([bc73cea](https://github.com/toptal/picasso/commit/bc73cea))
- **Tooltip:** issues after upgrade to v4 ([#581](https://github.com/toptal/picasso/issues/581)) ([65676e0](https://github.com/toptal/picasso/commit/65676e0))
- **Typography:** fix typography, baseline visual issues ([#585](https://github.com/toptal/picasso/issues/585)) ([68e8aec](https://github.com/toptal/picasso/commit/68e8aec))

### chore

- **TextField:** remove deprecated props and rename to Input ([#606](https://github.com/toptal/picasso/issues/606)) ([1d63602](https://github.com/toptal/picasso/commit/1d63602))
- rename `justifyContent` prop in Grid to match Container ([#600](https://github.com/toptal/picasso/issues/600)) ([8da9a02](https://github.com/toptal/picasso/commit/8da9a02))
- **Icon:** delete deprecated icon components ([#598](https://github.com/toptal/picasso/issues/598)) ([b37be08](https://github.com/toptal/picasso/commit/b37be08))
- **Icon:** remove deprecated prop `size` from icons ([#599](https://github.com/toptal/picasso/issues/599)) ([033a5ac](https://github.com/toptal/picasso/commit/033a5ac))

### Features

- [FX-377] Forward refs for all components ([#612](https://github.com/toptal/picasso/issues/612)) ([677af2e](https://github.com/toptal/picasso/commit/677af2e))
- [FX-377] Proxy ref from forwardRef to FileInput ([#621](https://github.com/toptal/picasso/issues/621)) ([54668a3](https://github.com/toptal/picasso/commit/54668a3))
- upgrade MUI to v4 ([29d14bd](https://github.com/toptal/picasso/commit/29d14bd))

### BREAKING CHANGES

- **TextField:** TextField component to Input
- **Slider:** Slider component has been moved from `@toptal/picasso/lab` to `@toptal/picasso`
- rename `justify` prop in `Grid` to `justifyContent`
- **Icon:** remove deprecated prop `size` from icons
- **Icon:** icon components deprecated in v2 have been fully removed in v3. To obtain support migrating these components, check: https://toptal-core.atlassian.net/wiki/x/boACG

## [2.27.1](https://github.com/toptal/picasso/compare/v2.27.0...v2.27.1) (2019-08-23)

### Bug Fixes

- **Checkbox:** adjust multiline label ([#615](https://github.com/toptal/picasso/issues/615)) ([90cfb2a](https://github.com/toptal/picasso/commit/90cfb2a))

# [2.27.0](https://github.com/toptal/picasso/compare/v2.26.4...v2.27.0) (2019-08-21)

### Features

- **Label:** add `white`variant to Label ([#607](https://github.com/toptal/picasso/issues/607)) ([5b62a0d](https://github.com/toptal/picasso/commit/5b62a0d))

## [2.26.4](https://github.com/toptal/picasso/compare/v2.26.3...v2.26.4) (2019-08-20)

### Bug Fixes

- **breakpoints:** fix useScreenSize hook ([#611](https://github.com/toptal/picasso/issues/611)) ([86a2caa](https://github.com/toptal/picasso/commit/86a2caa))

## [2.26.3](https://github.com/toptal/picasso/compare/v2.26.2...v2.26.3) (2019-08-19)

### Bug Fixes

- **autocomplete:** fix onchange event firing too often ([d9f3dcf](https://github.com/toptal/picasso/commit/d9f3dcf))
- **autocomplete:** fix onchange event firing too often ([aea8e4c](https://github.com/toptal/picasso/commit/aea8e4c))

## [2.26.2](https://github.com/toptal/picasso/compare/v2.26.1...v2.26.2) (2019-08-16)

### Bug Fixes

- **components:** reduce deprecation noise ([#597](https://github.com/toptal/picasso/issues/597)) ([e251579](https://github.com/toptal/picasso/commit/e251579))

## [2.26.1](https://github.com/toptal/picasso/compare/v2.26.0...v2.26.1) (2019-08-14)

### Bug Fixes

- [FX-370] Fix disabled label opacity for Radio and Checkbox ([#588](https://github.com/toptal/picasso/issues/588)) ([661bb1f](https://github.com/toptal/picasso/commit/661bb1f))

# [2.26.0](https://github.com/toptal/picasso/compare/v2.25.0...v2.26.0) (2019-08-13)

### Features

- **Slider:** add Slider component ([#576](https://github.com/toptal/picasso/issues/576)) ([c5d70f6](https://github.com/toptal/picasso/commit/c5d70f6))

# [2.25.0](https://github.com/toptal/picasso/compare/v2.24.0...v2.25.0) (2019-08-12)

### Features

- **Sidebar:** add dark variant ([#575](https://github.com/toptal/picasso/issues/575)) ([41744a9](https://github.com/toptal/picasso/commit/41744a9))

# [2.24.0](https://github.com/toptal/picasso/compare/v2.23.3...v2.24.0) (2019-08-09)

### Features

- **Sidebar:** implement Sidebar component ([#574](https://github.com/toptal/picasso/issues/574)) ([80f0add](https://github.com/toptal/picasso/commit/80f0add))

## [2.23.3](https://github.com/toptal/picasso/compare/v2.23.2...v2.23.3) (2019-08-07)

### Bug Fixes

- **textfield:** add new placeholder color to palette ([#573](https://github.com/toptal/picasso/issues/573)) ([b18bea4](https://github.com/toptal/picasso/commit/b18bea4))

## [2.23.2](https://github.com/toptal/picasso/compare/v2.23.1...v2.23.2) (2019-08-02)

### Bug Fixes

- **Autocomplete:** allow to pass any value to Autocomplete ([#568](https://github.com/toptal/picasso/issues/568)) ([c2c04d8](https://github.com/toptal/picasso/commit/c2c04d8))

## [2.23.1](https://github.com/toptal/picasso/compare/v2.23.0...v2.23.1) (2019-08-01)

### Performance Improvements

- use transpileOnly for ts-loader ([#567](https://github.com/toptal/picasso/issues/567)) ([842245e](https://github.com/toptal/picasso/commit/842245e))

# [2.23.0](https://github.com/toptal/picasso/compare/v2.22.0...v2.23.0) (2019-08-01)

### Features

- **Notification:** [FX-349] Add notifications stream ([#564](https://github.com/toptal/picasso/issues/564)) ([49e3b79](https://github.com/toptal/picasso/commit/49e3b79))

# [2.22.0](https://github.com/toptal/picasso/compare/v2.21.0...v2.22.0) (2019-07-31)

### Features

- **Autocomplete:** update autocomplete to accept Select options ([#562](https://github.com/toptal/picasso/issues/562)) ([493eac0](https://github.com/toptal/picasso/commit/493eac0))

# [2.21.0](https://github.com/toptal/picasso/compare/v2.20.0...v2.21.0) (2019-07-30)

### Features

- **Button:** add flat-white variant ([#565](https://github.com/toptal/picasso/issues/565)) ([ebcb4d5](https://github.com/toptal/picasso/commit/ebcb4d5))

# [2.20.0](https://github.com/toptal/picasso/compare/v2.19.1...v2.20.0) (2019-07-29)

### Features

- add MonthSelect and YearSelect components ([#557](https://github.com/toptal/picasso/issues/557)) ([0809c99](https://github.com/toptal/picasso/commit/0809c99))

## [2.19.1](https://github.com/toptal/picasso/compare/v2.19.0...v2.19.1) (2019-07-24)

### Bug Fixes

- update vulnerable dependencies to the latest versions ([#553](https://github.com/toptal/picasso/issues/553)) ([a47a89f](https://github.com/toptal/picasso/commit/a47a89f))

# [2.19.0](https://github.com/toptal/picasso/compare/v2.18.3...v2.19.0) (2019-07-22)

### Features

- **icon:** add ui guidelines and performance icons ([#559](https://github.com/toptal/picasso/issues/559)) ([0f3e7be](https://github.com/toptal/picasso/commit/0f3e7be))

## [2.18.3](https://github.com/toptal/picasso/compare/v2.18.2...v2.18.3) (2019-07-19)

### Bug Fixes

- **MenuItem:** allow to use MenuItem as react-router link ([#558](https://github.com/toptal/picasso/issues/558)) ([da4f7fe](https://github.com/toptal/picasso/commit/da4f7fe))

## [2.18.2](https://github.com/toptal/picasso/compare/v2.18.1...v2.18.2) (2019-07-19)

### Bug Fixes

- **Picasso:** refactor reset styles and portal destination ([#556](https://github.com/toptal/picasso/issues/556)) ([7138341](https://github.com/toptal/picasso/commit/7138341))

## [2.18.1](https://github.com/toptal/picasso/compare/v2.18.0...v2.18.1) (2019-07-16)

### Bug Fixes

- **Accordion:** adjust accordion styles for single item ([#551](https://github.com/toptal/picasso/issues/551)) ([11bd998](https://github.com/toptal/picasso/commit/11bd998))

# [2.18.0](https://github.com/toptal/picasso/compare/v2.17.0...v2.18.0) (2019-07-15)

### Features

- **typography:** add dark-grey color ([#510](https://github.com/toptal/picasso/issues/510)) ([b316dbe](https://github.com/toptal/picasso/commit/b316dbe))

# [2.17.0](https://github.com/toptal/picasso/compare/v2.16.1...v2.17.0) (2019-07-10)

### Bug Fixes

- **ShowMore:** remove icon leftover after its rotation ([#541](https://github.com/toptal/picasso/issues/541)) ([db912fd](https://github.com/toptal/picasso/commit/db912fd))

### Features

- **Dropdown:** add `onOpen` and `onClose` event handlers ([#538](https://github.com/toptal/picasso/issues/538)) ([cb4d055](https://github.com/toptal/picasso/commit/cb4d055))

## [2.16.1](https://github.com/toptal/picasso/compare/v2.16.0...v2.16.1) (2019-07-10)

### Bug Fixes

- **notification:** close icon margin ([#540](https://github.com/toptal/picasso/issues/540)) ([93b5669](https://github.com/toptal/picasso/commit/93b5669))

# [2.16.0](https://github.com/toptal/picasso/compare/v2.15.0...v2.16.0) (2019-07-10)

### Features

- **Link:** add invert prop ([#535](https://github.com/toptal/picasso/issues/535)) ([d5ae4ee](https://github.com/toptal/picasso/commit/d5ae4ee))

# [2.15.0](https://github.com/toptal/picasso/compare/v2.14.0...v2.15.0) (2019-07-09)

### Features

- **Label:** update colors and add disabled state ([#536](https://github.com/toptal/picasso/issues/536)) ([371ac62](https://github.com/toptal/picasso/commit/371ac62))

# [2.14.0](https://github.com/toptal/picasso/compare/v2.13.0...v2.14.0) (2019-07-08)

### Features

- **Helpbox:** implement Helpbox component ([#530](https://github.com/toptal/picasso/issues/530)) ([5afe038](https://github.com/toptal/picasso/commit/5afe038))

# [2.13.0](https://github.com/toptal/picasso/compare/v2.12.0...v2.13.0) (2019-07-05)

### Features

- **Autocomplete:** [FX-143] Add Autocomplete component ([#525](https://github.com/toptal/picasso/issues/525)) ([7f46aff](https://github.com/toptal/picasso/commit/7f46aff))

# [2.12.0](https://github.com/toptal/picasso/compare/v2.11.0...v2.12.0) (2019-07-05)

### Features

- spread native attributes ([#526](https://github.com/toptal/picasso/issues/526)) ([c0fe629](https://github.com/toptal/picasso/commit/c0fe629))

# [2.11.0](https://github.com/toptal/picasso/compare/v2.10.1...v2.11.0) (2019-07-04)

### Features

- **showmore:** add showmore component ([#502](https://github.com/toptal/picasso/issues/502)) ([7fa5db4](https://github.com/toptal/picasso/commit/7fa5db4))

## [2.10.1](https://github.com/toptal/picasso/compare/v2.10.0...v2.10.1) (2019-07-04)

### Bug Fixes

- **OutlinedInput:** spread props for TextField support ([#528](https://github.com/toptal/picasso/issues/528)) ([e4a8967](https://github.com/toptal/picasso/commit/e4a8967))

# [2.10.0](https://github.com/toptal/picasso/compare/v2.9.1...v2.10.0) (2019-07-03)

### Bug Fixes

- **icon:** update svg for Check icon ([#524](https://github.com/toptal/picasso/issues/524)) ([a7dfb40](https://github.com/toptal/picasso/commit/a7dfb40))

### Features

- **FileInput:** implement FileInput component ([#513](https://github.com/toptal/picasso/issues/513)) ([dd04ed0](https://github.com/toptal/picasso/commit/dd04ed0))

## [2.9.1](https://github.com/toptal/picasso/compare/v2.9.0...v2.9.1) (2019-07-01)

### Bug Fixes

- **button:** invalid markup ([#518](https://github.com/toptal/picasso/issues/518)) ([fd3d48d](https://github.com/toptal/picasso/commit/fd3d48d))

# [2.9.0](https://github.com/toptal/picasso/compare/v2.8.0...v2.9.0) (2019-06-29)

### Features

- **icon:** update whole icon library ([#491](https://github.com/toptal/picasso/issues/491)) ([1a224fd](https://github.com/toptal/picasso/commit/1a224fd))

# [2.8.0](https://github.com/toptal/picasso/compare/v2.7.5...v2.8.0) (2019-06-28)

### Features

- **Container:** add bordered prop ([#512](https://github.com/toptal/picasso/issues/512)) ([1d881fd](https://github.com/toptal/picasso/commit/1d881fd))

## [2.7.5](https://github.com/toptal/picasso/compare/v2.7.4...v2.7.5) (2019-06-28)

### Bug Fixes

- **button.group:** fix button style for secondary variant ([#475](https://github.com/toptal/picasso/issues/475)) ([a70c9ad](https://github.com/toptal/picasso/commit/a70c9ad))

## [2.7.4](https://github.com/toptal/picasso/compare/v2.7.3...v2.7.4) (2019-06-27)

### Bug Fixes

- **Table:** sync styles with base ([#504](https://github.com/toptal/picasso/issues/504)) ([aa8e710](https://github.com/toptal/picasso/commit/aa8e710))

## [2.7.3](https://github.com/toptal/picasso/compare/v2.7.2...v2.7.3) (2019-06-27)

### Bug Fixes

- **page-header:** prevent header from moving when dropdown is open ([#506](https://github.com/toptal/picasso/issues/506)) ([ed7337a](https://github.com/toptal/picasso/commit/ed7337a)), closes [#505](https://github.com/toptal/picasso/issues/505)

## [2.7.2](https://github.com/toptal/picasso/compare/v2.7.1...v2.7.2) (2019-06-25)

### Bug Fixes

- **TextField** pass native attributes correctly to the input ([#500](https://github.com/toptal/picasso/issues/500)) ([738cf93](https://github.com/toptal/picasso/commit/738cf93))

## [2.7.1](https://github.com/toptal/picasso/compare/v2.7.0...v2.7.1) (2019-06-24)

### Bug Fixes

- **accordion:** fix styles and editor docs ([#495](https://github.com/toptal/picasso/issues/495)) ([9adad1e](https://github.com/toptal/picasso/commit/9adad1e))

# [2.7.0](https://github.com/toptal/picasso/compare/v2.6.0...v2.7.0) (2019-06-24)

### Features

- **page-header-menu:** replace organization property with meta ([#487](https://github.com/toptal/picasso/issues/487)) ([de3882f](https://github.com/toptal/picasso/commit/de3882f))

# [2.6.0](https://github.com/toptal/picasso/compare/v2.5.0...v2.6.0) (2019-06-21)

### Features

- **accordion:** update styles accordingly with base ([#473](https://github.com/toptal/picasso/issues/473)) ([b984bca](https://github.com/toptal/picasso/commit/b984bca))

# [2.5.0](https://github.com/toptal/picasso/compare/v2.4.0...v2.5.0) (2019-06-21)

### Features

- **tabs:** add tabs component ([#478](https://github.com/toptal/picasso/issues/478)) ([479755d](https://github.com/toptal/picasso/commit/479755d))

# [2.4.0](https://github.com/toptal/picasso/compare/v2.3.0...v2.4.0) (2019-06-18)

### Features

- **TextField** add support of native input attributes ([#481](https://github.com/toptal/picasso/issues/481)) ([c2f882c](https://github.com/toptal/picasso/commit/c2f882c))

# [2.3.0](https://github.com/toptal/picasso/compare/v2.2.0...v2.3.0) (2019-06-18)

### Features

- **icon:** add crosshair icon ([#480](https://github.com/toptal/picasso/issues/480)) ([3d0937c](https://github.com/toptal/picasso/commit/3d0937c))

# [2.2.0](https://github.com/toptal/picasso/compare/v2.1.5...v2.2.0) (2019-06-14)

### Features

- **typography:** add yellow and light grey colors ([#467](https://github.com/toptal/picasso/issues/467)) ([56de5e6](https://github.com/toptal/picasso/commit/56de5e6)), closes [#464](https://github.com/toptal/picasso/issues/464)

## [2.1.5](https://github.com/toptal/picasso/compare/v2.1.4...v2.1.5) (2019-06-13)

### Bug Fixes

- **modal:** pass paperProps to enable custom styling of Modal dialog ([#465](https://github.com/toptal/picasso/issues/465)) ([cadcd68](https://github.com/toptal/picasso/commit/cadcd68))

## [2.1.4](https://github.com/toptal/picasso/compare/v2.1.3...v2.1.4) (2019-06-12)

### Bug Fixes

- **ci:** refactor release scripts ([#461](https://github.com/toptal/picasso/issues/461)) ([ae24f2a](https://github.com/toptal/picasso/commit/ae24f2a))

## [2.1.3](https://github.com/toptal/picasso/compare/v2.1.2...v2.1.3) (2019-06-12)

### Bug Fixes

- **ci:** fix incorrect generating of package.json ([#460](https://github.com/toptal/picasso/issues/460)) ([69718cb](https://github.com/toptal/picasso/commit/69718cb))

## [2.1.2](https://github.com/toptal/picasso/compare/v2.1.1...v2.1.2) (2019-06-12)

### Bug Fixes

- **ci:** allow installing picasso with git reference ([#458](https://github.com/toptal/picasso/issues/458)) ([8e0d7d2](https://github.com/toptal/picasso/commit/8e0d7d2))

## [2.1.1](https://github.com/toptal/picasso/compare/v2.1.0...v2.1.1) (2019-06-12)

### Bug Fixes

- **typography:** remove dropped bold font weight from typing ([#454](https://github.com/toptal/picasso/issues/454)) ([a27fd13](https://github.com/toptal/picasso/commit/a27fd13)), closes [#453](https://github.com/toptal/picasso/issues/453)

# [2.1.0](https://github.com/toptal/picasso/compare/v2.0.2...v2.1.0) (2019-06-10)

### Features

- **grid:** add wrap option ([#449](https://github.com/toptal/picasso/issues/449)) ([fa7f5a8](https://github.com/toptal/picasso/commit/fa7f5a8))

## [2.0.2](https://github.com/toptal/picasso/compare/v2.0.1...v2.0.2) (2019-06-10)

### Bug Fixes

- allow using Label and Link with Tooltip ([#432](https://github.com/toptal/picasso/issues/432)) ([d7fe5e7](https://github.com/toptal/picasso/commit/d7fe5e7))

## [2.0.1](https://github.com/toptal/picasso/compare/v2.0.0...v2.0.1) (2019-06-07)

### Bug Fixes

- **docs:** adjust changelog after major upgrade ([#448](https://github.com/toptal/picasso/issues/448)) ([dada27c](https://github.com/toptal/picasso/commit/dada27c))

# [2.0.0](https://github.com/toptal/picasso/compare/v1.9.3...v2.0.0) (2019-06-07)

### Bug Fixes

- **avatar:** change `Avatar` size for the `large` variant ([#416](https://github.com/toptal/picasso/issues/416)) ([68dd6ac](https://github.com/toptal/picasso/commit/68dd6ac))
- **dropdown:** change dropdown shadow elevation ([#433](https://github.com/toptal/picasso/issues/433)) ([235fba7](https://github.com/toptal/picasso/commit/235fba7))
- **loader:** change all `Loader` variant sizes ([#435](https://github.com/toptal/picasso/issues/435)) ([8e499cc](https://github.com/toptal/picasso/commit/8e499cc))
- **modal:** change design of `Modal` ([#343](https://github.com/toptal/picasso/issues/343)) ([8140e51](https://github.com/toptal/picasso/commit/8140e51))
- **radio:** change design of `Radio` and `Checkbox` components ([#369](https://github.com/toptal/picasso/issues/369)) ([50d8607](https://github.com/toptal/picasso/commit/50d8607))
- **stepper:** change `Stepper` margins and icon connector ([#437](https://github.com/toptal/picasso/issues/437)) ([b9043d4](https://github.com/toptal/picasso/commit/b9043d4))
- **table:** change design of `Table` component ([#365](https://github.com/toptal/picasso/issues/365)) ([d9f8090](https://github.com/toptal/picasso/commit/d9f8090))
- **text-field:** change design of `TextField` component ([#368](https://github.com/toptal/picasso/issues/368)) ([e288baf](https://github.com/toptal/picasso/commit/e288baf))
- **tooltip:** change size of an arrow and text for `Tooltip` ([#436](https://github.com/toptal/picasso/issues/436)) ([0091c7a](https://github.com/toptal/picasso/commit/0091c7a))
- **user-badge:** change `UserBadge` outer spacing ([#333](https://github.com/toptal/picasso/issues/333)) ([750e332](https://github.com/toptal/picasso/commit/750e332))

### Features

- **button:** add new variants for buttons ([3216787](https://github.com/toptal/picasso/commit/3216787))
- **colors:** change names and design of all colors ([#387](https://github.com/toptal/picasso/issues/387)) ([496dcdb](https://github.com/toptal/picasso/commit/496dcdb))
- **form:** add `Form.Error` component ([#410](https://github.com/toptal/picasso/issues/410)) ([cb329d7](https://github.com/toptal/picasso/commit/cb329d7))
- **form:** add new `Form.Label` component ([#372](https://github.com/toptal/picasso/issues/372)) ([f12e5f9](https://github.com/toptal/picasso/commit/f12e5f9))
- **label:** add ability to add `Icon` to `Label` component ([#396](https://github.com/toptal/picasso/issues/396)) ([1a10390](https://github.com/toptal/picasso/commit/1a10390))
- **page-header:** support enterprise variant for header ([#392](https://github.com/toptal/picasso/issues/392)) ([d0f9f61](https://github.com/toptal/picasso/commit/d0f9f61))
- **page-header-menu:** wrap header Menu to Page.HeaderMenu ([#406](https://github.com/toptal/picasso/issues/406)) ([0df9391](https://github.com/toptal/picasso/commit/0df9391))
- **pagination:** change design of `Pagination` component ([#412](https://github.com/toptal/picasso/issues/412)) ([989932a](https://github.com/toptal/picasso/commit/989932a))
- **select:** add ability to add icon to `Select` component ([#371](https://github.com/toptal/picasso/issues/371)) ([8b37458](https://github.com/toptal/picasso/commit/8b37458))
- **typography:** add new typography variants and colors ([#356](https://github.com/toptal/picasso/issues/356)) ([70dfb17](https://github.com/toptal/picasso/commit/70dfb17))

### BREAKING CHANGES

#### Select

- removed `variant` prop
- removed `label` prop

> You can check [Select](https://picasso.toptal.net/?path=/story/forms-folder--select) documentation.

#### Stepper

- stepper connector and margins were adjusted to larger
  size.

> You can check [Stepper](https://picasso.toptal.net/?path=/story/components-folder--stepper#default) documentation.

#### Tooltip

- font size and pointing arrow size were adjusted for
  `Tooltip` window.

> You can check [Tooltip](https://picasso.toptal.net/?path=/story/overlays-folder--tooltip#default) documentation.

#### Loader

- all sizes of `Loader` variants were adjusted. If you
  had any static elements counting with size of a `Loader` please adjust
  spacings accordingly.

New size list:

- _Small_ `20` => `16`
- _Medium_ `40` => `32`
- _Large_ `80` => `64`

> You can check [Loader](https://picasso.toptal.net/?path=/story/components-folder--loader#sizes) documentation.

#### Avatar

- large `Avatar` is now a bit smaller. Please check your
  layouts if you were directly using this variant.

> You can check [Avatar](https://picasso.toptal.net/?path=/story/components-folder--avatar#sizes) documentation.

#### Pagination

- pagination design and layout has been completely
  revamped. Now the layout is much skinner and smaller and using default
  buttons from UI kit. Please check your layouts.

> You can check [Pagination](https://picasso.toptal.net/?path=/story/components-folder--pagination#default) documentation.

#### UserBadge

- `children` is now wrapped to special component
  which is exported as `Page.HeaderMenu` which accepts aggregated props
  for `UserBadge` component. You should replace direct usage of `UserBadge`
  inside `Header` with this new component.

- UserBadge outer spacing is now reduced, therefore check
  your layouts which are using UserBadge as standalone component.

#### Page.Header

- header height has been adjusted and now is larger.
  Check any elements which had fixed positions on layout if they need to
  be adjusted to support new height of `Header`

- `zIndex` has been changed to `1100`

> You can check [Header](https://picasso.toptal.net/?path=/story/layout-folder--page#default) documentation.

#### Colors

- all colors shades which were specified as numbers, were
  dropped and replaced with more semantic names.

New shade list:

- `100` => `lighter`
- `200` => `light`
- `300` => `main`
- `400` => `dark`
- `500` => `darker`

> You can check [Colors](https://picasso.toptal.net/?path=/story/utils-folder--colors) documentation.

- most of the colors were updated to the correct HEX
  representations. Please use only those colors which are listed inside
  documentation!

#### TextField

- spacing and size of TextField and Select has been
  changed.
- `label` prop on `TextField` has been renamed to
  `placeholder`. Achieving form field labels is now done by composing
  field from new `Label` and `Hint` components.
- removed `inputLabelProps` prop

> You can check [Form](https://picasso.toptal.net/?path=/story/forms-folder--form#form-field) documentation.

#### Table

- decrease font size and paddings inside all `Table`
  components. Layout of whole table is a bit skinnier now.

> You can check the full result in [Table](https://picasso.toptal.net/?path=/story/components-folder--table#plain-table) documentation.

#### Modal

- replaced `Title` and `CloseIcon` inside modal window
  which makes layout and spacings a bit smaller now.

> You can check result in [Modal](https://picasso.toptal.net/?path=/story/overlays-folder--modal)
> documentation.

#### Typography

- rename old `variant` type and introduce more semantic names for every variant.

New variant list:

- `heading`
- `body`

New size list:

- `small`
- `medium`
- `large`
- `xlarge`
- `inherit`

> You can check all variants inside [Typography](https://picasso.toptal.net/?path=/story/components-folder--typography)
> documentation.

- all old variant names except `body` are now removed currently `Typography` styles are achieved with `variant`, `weight` and
  `color` prop.

- remove all old `color` variants and rename them to more
  semantic names.

* `primary` => `blue`
* `success` => `green`
* `error` => `red`
* `muted` => `grey`
* _New color:_ `black`

#### Button

- rename old `variant` type and introduce more semantic
  names for every variant

New variant list:

- `flat`
- `primary-blue`
- `primary-red`
- `primary-green`
- `secondary-blue`
- `secondary-red`
- `secondary-white`

> You can check full list of variants in [Button](https://picasso.toptal.net/?path=/story/components-folder--button#variants)
> section of our documentation.

- remove `primary` variant and add multiple variants
  with different intents.

> `primary` => `primary-blue`

- remove `secondary` variant and add multiple variants
  with different intents.

> `secondary` => `secondary-blue`

- remove `success` variant and combine it with
  primary variant.

> `success` => `primary-green`

- remove `error` variant and combine it with `primary`
  and `secondary` variant.

> `error` => `primary-red`

- **_New Variant_** - `secondary-red`

- remove `basic` variant

#### AccountSelect

- layout has been changed

## [1.9.3](https://github.com/toptal/picasso/compare/v1.9.2...v1.9.3) (2019-06-06)

### Bug Fixes

- **ci:** run kill temploy job with cron ([#440](https://github.com/toptal/picasso/issues/440)) ([6018bae](https://github.com/toptal/picasso/commit/6018bae))

## [1.9.2](https://github.com/toptal/picasso/compare/v1.9.1...v1.9.2) (2019-06-04)

### Bug Fixes

- **ci:** post temploy comments only for PRs ([#429](https://github.com/toptal/picasso/issues/429)) ([53dac88](https://github.com/toptal/picasso/commit/53dac88))

## [1.9.1](https://github.com/toptal/picasso/compare/v1.9.0...v1.9.1) (2019-06-04)

### Bug Fixes

- **ci:** change folder structure of picasso docs ([#423](https://github.com/toptal/picasso/issues/423)) ([c9b961d](https://github.com/toptal/picasso/commit/c9b961d))

# [1.9.0](https://github.com/toptal/picasso/compare/v1.8.1...v1.9.0) (2019-06-03)

### Features

- **amount:** `amount` component to render currencies ([#418](https://github.com/toptal/picasso/issues/418)) ([b485826](https://github.com/toptal/picasso/commit/b485826))

## [1.8.1](https://github.com/toptal/picasso/compare/v1.8.0...v1.8.1) (2019-05-30)

### Bug Fixes

- **container:** add missing values to the `justifyContent` enum ([#409](https://github.com/toptal/picasso/issues/409)) ([b519782](https://github.com/toptal/picasso/commit/b519782))

# [1.8.0](https://github.com/toptal/picasso/compare/v1.7.4...v1.8.0) (2019-05-29)

### Features

- **icon:** add extra product icons ([#395](https://github.com/toptal/picasso/issues/395)) ([a5ee200](https://github.com/toptal/picasso/commit/a5ee200))

## [1.7.4](https://github.com/toptal/picasso/compare/v1.7.3...v1.7.4) (2019-05-28)

### Bug Fixes

- **button:** accept and proxy 'type' prop ([#373](https://github.com/toptal/picasso/issues/373)) ([395295d](https://github.com/toptal/picasso/commit/395295d))

## [1.7.3](https://github.com/toptal/picasso/compare/v1.7.2...v1.7.3) (2019-05-28)

### Bug Fixes

- **textfield:** add missing props ([#388](https://github.com/toptal/picasso/issues/388)) ([dc10b30](https://github.com/toptal/picasso/commit/dc10b30))

## [1.7.2](https://github.com/toptal/picasso/compare/v1.7.1...v1.7.2) (2019-05-28)

### Bug Fixes

- **radio:** fix interface definition for radio group ([#383](https://github.com/toptal/picasso/issues/383)) ([20de87c](https://github.com/toptal/picasso/commit/20de87c))

## [1.7.1](https://github.com/toptal/picasso/compare/v1.7.0...v1.7.1) (2019-05-27)

### Bug Fixes

- **header:** add proper zIndex on Page.Header ([#385](https://github.com/toptal/picasso/issues/385)) ([0d3d9f1](https://github.com/toptal/picasso/commit/0d3d9f1))

# [1.7.0](https://github.com/toptal/picasso/compare/v1.6.0...v1.7.0) (2019-05-27)

### Features

- **page-header:** add logoLink to PageHeader component ([#360](https://github.com/toptal/picasso/issues/360)) ([14e9a77](https://github.com/toptal/picasso/commit/14e9a77)), closes [#354](https://github.com/toptal/picasso/issues/354)

# [1.6.0](https://github.com/toptal/picasso/compare/v1.5.2...v1.6.0) (2019-05-17)

### Bug Fixes

- **textfield:** add autoFocus to TextField ([305b99e](https://github.com/toptal/picasso/commit/305b99e))

### Features

- **dropdown:** implement dropdown component ([834ef6a](https://github.com/toptal/picasso/commit/834ef6a))

## [1.5.2](https://github.com/toptal/picasso/compare/v1.5.1...v1.5.2) (2019-05-16)

### Bug Fixes

- **docs:** add contribution guide ([#277](https://github.com/toptal/picasso/issues/277)) ([f6d322d](https://github.com/toptal/picasso/commit/f6d322d))

## [1.5.1](https://github.com/toptal/picasso/compare/v1.5.0...v1.5.1) (2019-05-15)

### Bug Fixes

- **ci:** copy package.json to root and refactor releases ([#334](https://github.com/toptal/picasso/issues/334)) ([7610fd8](https://github.com/toptal/picasso/commit/7610fd8))

# [1.5.0](https://github.com/toptal/picasso/compare/v1.4.1...v1.5.0) (2019-05-15)

### Bug Fixes

- **ci:** update package.json with correct version after release ([#319](https://github.com/toptal/picasso/issues/319)) ([dbaf6ff](https://github.com/toptal/picasso/commit/dbaf6ff))

### Features

- trigger manual minor version change ([3e2f032](https://github.com/toptal/picasso/commit/3e2f032))

## [1.4.2](https://github.com/toptal/picasso/compare/v1.4.1...v1.4.2) (2019-05-15)

### Bug Fixes

- **ci:** update package.json with correct version after release ([#319](https://github.com/toptal/picasso/issues/319)) ([dbaf6ff](https://github.com/toptal/picasso/commit/dbaf6ff))

## [1.4.1](https://github.com/toptal/picasso/compare/v1.4.0...v1.4.1) (2019-05-15)

### Bug Fixes

- icons vertical alignment for Notification component ([#315](https://github.com/toptal/picasso/issues/315)) ([c3d6a7f](https://github.com/toptal/picasso/commit/c3d6a7f))

# [1.4.0](https://github.com/toptal/picasso/compare/v1.3.1...v1.4.0) (2019-05-14)

### Features

- **loader:** adjust color accordingly with BASE ([#317](https://github.com/toptal/picasso/issues/317)) ([88b4f12](https://github.com/toptal/picasso/commit/88b4f12))

## [1.3.1](https://github.com/toptal/picasso/compare/v1.3.0...v1.3.1) (2019-05-14)

### Bug Fixes

- Make some props not required for TextField, Select components ([#299](https://github.com/toptal/picasso/issues/299)) ([f97c7ce](https://github.com/toptal/picasso/commit/f97c7ce))

# [1.3.0](https://github.com/toptal/picasso/compare/v1.2.4...v1.3.0) (2019-05-13)

### Features

- **link:** adjust Link component and add docs ([#303](https://github.com/toptal/picasso/issues/303)) ([70313a9](https://github.com/toptal/picasso/commit/70313a9))

## [1.2.4](https://github.com/toptal/picasso/compare/v1.2.3...v1.2.4) (2019-05-13)

### Bug Fixes

- **docs:** fix layout tutorial example ([#310](https://github.com/toptal/picasso/issues/310)) ([82a0cc6](https://github.com/toptal/picasso/commit/82a0cc6))

## [1.2.3](https://github.com/toptal/picasso/compare/v1.2.2...v1.2.3) (2019-05-13)

### Bug Fixes

- **bash:** pascal case on linux ([#306](https://github.com/toptal/picasso/issues/306)) ([be55fb4](https://github.com/toptal/picasso/commit/be55fb4))

## [1.2.2](https://github.com/toptal/picasso/compare/v1.2.1...v1.2.2) (2019-05-10)

### Bug Fixes

- **storybook:** wrong Icon import path ([#309](https://github.com/toptal/picasso/issues/309)) ([b762249](https://github.com/toptal/picasso/commit/b762249)), closes [#308](https://github.com/toptal/picasso/issues/308)

## [1.2.1](https://github.com/toptal/picasso/compare/v1.2.0...v1.2.1) (2019-05-10)

### Bug Fixes

- [FX-154] Fix padding after removing padding for root ([#307](https://github.com/toptal/picasso/issues/307)) ([4fd84cb](https://github.com/toptal/picasso/commit/4fd84cb))

# [1.2.0](https://github.com/toptal/picasso/compare/v1.1.0...v1.2.0) (2019-05-10)

### Features

- **page-header:** [FX-154] Make PageHeader sticky ([#301](https://github.com/toptal/picasso/issues/301)) ([20fd7c0](https://github.com/toptal/picasso/commit/20fd7c0))

# [1.1.0](https://github.com/toptal/picasso/compare/v1.0.0...v1.1.0) (2019-05-09)

### Features

- **notification:** new notification component ([#275](https://github.com/toptal/picasso/issues/275)) ([cd5bc1d](https://github.com/toptal/picasso/commit/cd5bc1d))

# [1.0.0](https://github.com/toptal/picasso/compare/v0.3.1...v1.0.0) (2019-05-09)

### chore

- **timesheet:** migrate components into billing frontend ([#268](https://github.com/toptal/picasso/issues/268)) ([40e7583](https://github.com/toptal/picasso/commit/40e7583))

### BREAKING CHANGES

- **timesheet:** component removal

## [0.3.1](https://github.com/toptal/picasso/compare/v0.3.0...v0.3.1) (2019-05-08)

### Bug Fixes

- **ci:** fix pkgRoot while publishing to NPM ([d720b2f](https://github.com/toptal/picasso/commit/d720b2f))

# [0.3.0](https://github.com/toptal/picasso/compare/v0.2.0...v0.3.0) (2019-05-08)

### Features

- add title prop to UserBadge ([#267](https://github.com/toptal/picasso/issues/267)) ([247620b](https://github.com/toptal/picasso/commit/247620b))

# [0.2.0](https://github.com/toptal/picasso/compare/v0.1.0...v0.2.0) (2019-05-07)

### Bug Fixes

- **button:** pass icon.props.className in button component child icon ([#273](https://github.com/toptal/picasso/issues/273)) ([d4bb8bd](https://github.com/toptal/picasso/commit/d4bb8bd))
- **picasso:** expose types and `link` component ([#280](https://github.com/toptal/picasso/issues/280)) ([5ef3029](https://github.com/toptal/picasso/commit/5ef3029))

### Features

- add color property for Typography ([#261](https://github.com/toptal/picasso/issues/261)) ([f253a26](https://github.com/toptal/picasso/commit/f253a26))
- **button:** add circular style for the component ([#271](https://github.com/toptal/picasso/issues/271)) ([b645323](https://github.com/toptal/picasso/commit/b645323))
- **icon:** new notification icons ([#274](https://github.com/toptal/picasso/issues/274)) ([a2a3b45](https://github.com/toptal/picasso/commit/a2a3b45))
- [FX-141] Add Menu component ([#258](https://github.com/toptal/picasso/issues/258)) ([ccb55d4](https://github.com/toptal/picasso/commit/ccb55d4))
- initialize first semantic release ([d7ef6e4](https://github.com/toptal/picasso/commit/d7ef6e4))

# Changelog

## v0.1.0-beta.19 (25/04/2019)

_No changelog for this release._

---

## v0.1.0-beta.18 (25/04/2019)

#### Chore

- [**Chore**] chore(docs): Speedup storybook builds on CI [#237](https://github.com/toptal/picasso/pull/237)

---

## v0.1.0-beta.17 (25/04/2019)

#### CI

- [**CI**] Fix docker problems with latest chromium [#240](https://github.com/toptal/picasso/pull/240)

#### Chore

- [**Chore**] Add issue templates for picasso board [#235](https://github.com/toptal/picasso/pull/235)
- [**Chore**][fx-147] Group components doc pages by area of usage [#232](https://github.com/toptal/picasso/pull/232)

---

## v0.1.0-beta.16 (24/04/2019)

#### Chore

- [**Chore**] Update edited icons from Talent Onboarding Wizard [#220](https://github.com/toptal/picasso/pull/220)

#### WIP

- [**WIP**][fx-52] Add IE11 support for Storybook [#233](https://github.com/toptal/picasso/pull/233)

#### depfu

- [**depfu**] Update ts-loader: 5.3.3 → 5.4.3 (minor) [#234](https://github.com/toptal/picasso/pull/234)
- [**depfu**] Update react-ace: 6.4.0 → 6.5.0 (minor) [#229](https://github.com/toptal/picasso/pull/229)
- [**depfu**] Update @typescript-eslint/parser: 1.6.0 → 1.7.0 (minor) [#228](https://github.com/toptal/picasso/pull/228)
- [**depfu**] Update @typescript-eslint/eslint-plugin: 1.6.0 → 1.7.0 (minor) [#225](https://github.com/toptal/picasso/pull/225)
- [**depfu**] Update @types/react: 16.8.13 → 16.8.14 (patch) [#224](https://github.com/toptal/picasso/pull/224)
- [**depfu**] Update typescript: 3.4.3 → 3.4.4 (patch) [#222](https://github.com/toptal/picasso/pull/222)

---

## v0.1.0-beta.15 (19/04/2019)

#### closed

- [**closed**][fx-134] Add List example and Icon prop docs [#219](https://github.com/toptal/picasso/pull/219)

---

## v0.1.0-beta.14 (19/04/2019)

#### BREAKING CHANGE

- [**BREAKING CHANGE**][**chore**] [FX-6] Simplify Loader component api [#207](https://github.com/toptal/picasso/pull/207)

#### Bugfix

- [**Bugfix**] Fix root height [#218](https://github.com/toptal/picasso/pull/218)

#### Chore

- [**Chore**] Remove prop-types as we don't use them anymore after move all components to TS [#216](https://github.com/toptal/picasso/pull/216)
- [**Chore**][fx-44] Initial alias setup for types and components [#209](https://github.com/toptal/picasso/pull/209)
- [**Chore**][fx-9] Automate adding icons process [#199](https://github.com/toptal/picasso/pull/199)

#### Feature

- [**Feature**][fx-17] Add icons from Talent Onboarding Wizard project [#213](https://github.com/toptal/picasso/pull/213)
- [**Feature**][fx-145] Add Stepper variant without labels and full-width [#204](https://github.com/toptal/picasso/pull/204)

#### closed

- [**closed**] Enable TS type definitions in build [#200](https://github.com/toptal/picasso/pull/200)

#### depfu

- [**depfu**] Update all of storybook: 5.0.9 → 5.0.10 (patch) [#217](https://github.com/toptal/picasso/pull/217)
- [**depfu**] Update @types/prop-types: 15.7.0 → 15.7.1 (patch) [#214](https://github.com/toptal/picasso/pull/214)
- [**depfu**] Update all of storybook: 5.0.8 → 5.0.9 (patch) [#212](https://github.com/toptal/picasso/pull/212)
- [**depfu**] Update eslint-plugin-import: 2.17.1 → 2.17.2 (patch) [#211](https://github.com/toptal/picasso/pull/211)
- [**depfu**] Upgrade yargs: 12.0.5 → 13.2.2 (major) [#206](https://github.com/toptal/picasso/pull/206)
- [**depfu**] Upgrade ts-jest: 23.10.5 → 24.0.2 (major) [#205](https://github.com/toptal/picasso/pull/205)
- [**depfu**] Update react-markdown: 4.0.6 → 4.0.8 (patch) [#203](https://github.com/toptal/picasso/pull/203)
- [**depfu**] Upgrade raw-loader: 1.0.0 → 2.0.0 (major) [#197](https://github.com/toptal/picasso/pull/197)
- [**depfu**] Update all of storybook: 5.0.7 → 5.0.8 (patch) [#202](https://github.com/toptal/picasso/pull/202)
- [**depfu**] Update eslint-plugin-import: 2.16.0 → 2.17.1 (minor) [#201](https://github.com/toptal/picasso/pull/201)
- [**depfu**] Update @svgr/cli: 4.1.0 → 4.2.0 (minor) [#195](https://github.com/toptal/picasso/pull/195)
- [**depfu**] Upgrade react-testing-library: 5.9.0 → 6.1.2 (major) [#198](https://github.com/toptal/picasso/pull/198)
- [**depfu**] Upgrade storybook-readme: 4.0.5 → 5.0.2 (major) [#196](https://github.com/toptal/picasso/pull/196)
- [**depfu**] Update all of storybook: 5.0.6 → 5.0.7 (patch) [#194](https://github.com/toptal/picasso/pull/194)
- [**depfu**] Update @types/react-dom: 16.8.3 → 16.8.4 (patch) [#193](https://github.com/toptal/picasso/pull/193)

---

## v0.1.0-beta.13 (15/04/2019)

#### Bugfix

- [**Bugfix**][fx-62] Fix vertical alignment for icons inline [#160](https://github.com/toptal/picasso/pull/160)
- [**Bugfix**] Fix Button usage in Timesheets [#153](https://github.com/toptal/picasso/pull/153)

#### Chore

- [**Chore**] Initial change of rest and style, classname props [#161](https://github.com/toptal/picasso/pull/161)
- [**Chore**][fx-76] Align size props in between components [#183](https://github.com/toptal/picasso/pull/183)
- [**Chore**] Add dependency badge to README [#172](https://github.com/toptal/picasso/pull/172)
- [**Chore**][fx-67] Use Icons directly, remove IconLibrary [#157](https://github.com/toptal/picasso/pull/157)
- [**Chore**] Change shadows according to new design specs [#152](https://github.com/toptal/picasso/pull/152)

#### Feature

- [**Feature**][fx-16] Component stepper [#190](https://github.com/toptal/picasso/pull/190)
- [**Feature**][fx-123] Component user badge [#156](https://github.com/toptal/picasso/pull/156)

#### depfu

- [**depfu**] Update jest-environment-puppeteer: 4.1.0 → 4.1.1 (patch) [#192](https://github.com/toptal/picasso/pull/192)
- [**depfu**] Update jest-puppeteer: 4.1.0 → 4.1.1 (patch) [#191](https://github.com/toptal/picasso/pull/191)
- [**depfu**] Upgrade prettier-standard: 8.0.1 → 9.1.1 (major) [#189](https://github.com/toptal/picasso/pull/189)
- [**depfu**] Upgrade jest-puppeteer: 3.9.1 → 4.1.0 (major) [#188](https://github.com/toptal/picasso/pull/188)
- [**depfu**] Upgrade hygen: 2.1.2 → 4.0.2 (major) [#187](https://github.com/toptal/picasso/pull/187)
- [**depfu**] Upgrade eslint-config-prettier: 3.6.0 → 4.1.0 (major) [#186](https://github.com/toptal/picasso/pull/186)
- [**depfu**] Upgrade jest: 23.6.0 → 24.7.1 (major) [#185](https://github.com/toptal/picasso/pull/185)
- [**depfu**] Upgrade @types/jest: 23.3.14 → 24.0.11 (major) [#184](https://github.com/toptal/picasso/pull/184)
- [**depfu**] Upgrade eslint-plugin-react: 7.11.1 → 7.12.4 (minor) [#182](https://github.com/toptal/picasso/pull/182)
- [**depfu**] Update typescript: 3.3.3333 → 3.4.3 (minor) [#181](https://github.com/toptal/picasso/pull/181)
- [**depfu**] Update regenerator-runtime: 0.13.1 → 0.13.2 (minor) [#180](https://github.com/toptal/picasso/pull/180)
- [**depfu**] Update puppeteer: 1.13.0 → 1.14.0 (minor) [#179](https://github.com/toptal/picasso/pull/179)
- [**depfu**] Update jest-environment-puppeteer: 4.0.0 → 4.1.0 (minor) [#178](https://github.com/toptal/picasso/pull/178)
- [**depfu**] Update eslint-plugin-promise: 4.0.1 → 4.1.1 (minor) [#177](https://github.com/toptal/picasso/pull/177)
- [**depfu**] Update eslint: 5.15.1 → 5.16.0 (minor) [#176](https://github.com/toptal/picasso/pull/176)
- [**depfu**] Update copy-to-clipboard: 3.0.8 → 3.1.0 (minor) [#175](https://github.com/toptal/picasso/pull/175)
- [**depfu**] Update @typescript-eslint/parser: 1.4.2 → 1.6.0 (minor) [#174](https://github.com/toptal/picasso/pull/174)
- [**depfu**] Update @typescript-eslint/eslint-plugin: 1.4.2 → 1.6.0 (minor) [#173](https://github.com/toptal/picasso/pull/173)
- [**depfu**] Update @babel/standalone: 7.3.4 → 7.4.3 (minor) [#171](https://github.com/toptal/picasso/pull/171)
- [**depfu**] Update react-storybook-addon-chapters: 3.1.1 → 3.1.3 (patch) [#170](https://github.com/toptal/picasso/pull/170)
- [**depfu**] Update @types/puppeteer: 1.12.2 → 1.12.3 (patch) [#158](https://github.com/toptal/picasso/pull/158)
- [**depfu**] Update all of react: 16.8.4 → 16.8.6 (patch) [#168](https://github.com/toptal/picasso/pull/168)
- [**depfu**] Update @types/react-dom: 16.8.2 → 16.8.3 (patch) [#162](https://github.com/toptal/picasso/pull/162)
- [**depfu**] Update @material-ui/core: 3.9.2 → 3.9.3 (patch) [#167](https://github.com/toptal/picasso/pull/167)
- [**depfu**] Update @types/react: 16.8.8 → 16.8.13 (patch) [#166](https://github.com/toptal/picasso/pull/166)
- [**depfu**] Update jest-puppeteer: 3.9.0 → 3.9.1 (patch) [#169](https://github.com/toptal/picasso/pull/169)
- [**depfu**] Update all of storybook: 5.0.5 → 5.0.6 (patch) [#154](https://github.com/toptal/picasso/pull/154)
- [**depfu**] Update @storybook/theming: 5.0.5 → 5.0.6 (patch) [#155](https://github.com/toptal/picasso/pull/155)

---

## v0.1.0-beta.12 (08/04/2019)

#### Bugfix

- [**Bugfix**][fx-121] Add support for Safari with clip-path [#150](https://github.com/toptal/picasso/pull/150)
- [**Bugfix**][fx-59] Add custom CssBaseline to add height 100vh to root tags [#141](https://github.com/toptal/picasso/pull/141)

#### CI

- [**CI**][inf] Improve build status reporting [#139](https://github.com/toptal/picasso/pull/139)

#### Chore

- [**Chore**][fx-73] Timesheets. Fix link for show more, replace with button [#151](https://github.com/toptal/picasso/pull/151)
- [**Chore**] Migrate Checkbox to TS [#149](https://github.com/toptal/picasso/pull/149)
- [**Chore**] Migrate Buttongroup to TS [#148](https://github.com/toptal/picasso/pull/148)
- [**Chore**] Migrate Button to TS [#145](https://github.com/toptal/picasso/pull/145)
- [**Chore**] Ugrade to the latest docgen package [#138](https://github.com/toptal/picasso/pull/138)
- [**Chore**][fx-81] Make lowercase for subcomponent names [#137](https://github.com/toptal/picasso/pull/137)

#### Feature

- [**Feature**][fx-121] Add avatar component [#147](https://github.com/toptal/picasso/pull/147)
- [**Feature**][fx-13] Add Paper component [#143](https://github.com/toptal/picasso/pull/143)
- [**Feature**][fx-61] Add option to make select dynamic in width size [#142](https://github.com/toptal/picasso/pull/142)
- [**Feature**][fx-14] Add Image component [#146](https://github.com/toptal/picasso/pull/146)
- [**Feature**][fx-73] Add show more to Timesheets [#136](https://github.com/toptal/picasso/pull/136)

---

## v0.1.0-beta.11 (29/03/2019)

#### Chore

- [**Chore**][fx-101] Migrate accordion to TSX [#133](https://github.com/toptal/picasso/pull/133)
- [**Chore**] Upgrade storybook to 5.0.5 [#134](https://github.com/toptal/picasso/pull/134)
- [**Chore**] Fix minor issues [#127](https://github.com/toptal/picasso/pull/127)
- [**Chore**] Selectable table example implemented with hooks [#128](https://github.com/toptal/picasso/pull/128)
- [**Chore**][fx-75] Refactor to use children props where possible [#129](https://github.com/toptal/picasso/pull/129)
- [**Chore**][fx-114] Migrate MenuItem to TSX [#132](https://github.com/toptal/picasso/pull/132)
- [**Chore**][fx-74] Fix positive/negative to success/error copies [#125](https://github.com/toptal/picasso/pull/125)

#### Feature

- [**Feature**][fx-64] Add Timesheets widget [#131](https://github.com/toptal/picasso/pull/131)
- [**Feature**][fx-77] Remove color for Radio [#135](https://github.com/toptal/picasso/pull/135)
- [**Feature**] Initial Table components [#124](https://github.com/toptal/picasso/pull/124)
- [**Feature**][tact-69] Change footer's paddings [#126](https://github.com/toptal/picasso/pull/126)

---

## v0.1.0-beta.10 (20/03/2019)

#### closed

- [**closed**] Changes toward davinci standard [#123](https://github.com/toptal/picasso/pull/123)

---

## v0.1.0-beta.9 (18/03/2019)

#### Bugfix

- [**Bugfix**][fx-66] Fix Icon mangled names inside prod build [#122](https://github.com/toptal/picasso/pull/122)

#### Chore

- [**Chore**] Update visual tests steps documentation [#121](https://github.com/toptal/picasso/pull/121)

---

## v0.1.0-beta.8 (15/03/2019)

#### Bugfix

- [**Bugfix**] Center Toptal logo vertically in header [#115](https://github.com/toptal/picasso/pull/115)

#### Chore

- [**Chore**] Add markdown prop description support [#120](https://github.com/toptal/picasso/pull/120)
- [**Chore**] Adjust support info [#118](https://github.com/toptal/picasso/pull/118)
- [**Chore**][fx-7] Add story sections anchor link [#117](https://github.com/toptal/picasso/pull/117)
- [**Chore**] Add hard-source-webpack-plugin to cache for development sources between webpack builds [#119](https://github.com/toptal/picasso/pull/119)
- [**Chore**] Add createStyles to style files and implement withStyles [#116](https://github.com/toptal/picasso/pull/116)

---

## v0.1.0-beta.7 (13/03/2019)

#### Bugfix

- [**Bugfix**] Fix checkbox alignment [#113](https://github.com/toptal/picasso/pull/113)

#### Chore

- [**Chore**] Storybook 5 [#114](https://github.com/toptal/picasso/pull/114)

---

## v0.1.0-beta.6 (12/03/2019)

#### Chore

- [**Chore**][fx-45] Prepare tsconfig for storybook [#111](https://github.com/toptal/picasso/pull/111)
- [**Chore**] Add symlink yarn command and document linking [#110](https://github.com/toptal/picasso/pull/110)
- [**Chore**] Add support info [#112](https://github.com/toptal/picasso/pull/112)

---

## v0.1.0-beta.5 (11/03/2019)

#### Chore

- [**Chore**][fx-18] Restructure Form examples [#108](https://github.com/toptal/picasso/pull/108)
- [**Chore**] Change logo [#109](https://github.com/toptal/picasso/pull/109)

#### Feature

- [**Feature**] Add Tooltip component [#104](https://github.com/toptal/picasso/pull/104)

---

## v0.1.0-beta.4 (08/03/2019)

_No changelog for this release._

---

## v0.1.0-beta.3 (08/03/2019)

#### CI

- [**CI**] Fix jenkins workspace concurrecy [#105](https://github.com/toptal/picasso/pull/105)

#### Chore

- [**Chore**] Add types file in Page folder [#103](https://github.com/toptal/picasso/pull/103)
- [**Chore**] Fix hot reload [#107](https://github.com/toptal/picasso/pull/107)

#### Feature

- [**Feature**][fx-42] Migrate manual props docs to auto-generated [#101](https://github.com/toptal/picasso/pull/101)
- [**Feature**][fx-18] Add Form.Field and Form.Hint components [#100](https://github.com/toptal/picasso/pull/100)

---

## v0.1.0-beta.2 (07/03/2019)

#### Chore

- [**Chore**][**do not merge**] Speed up webpack build [#102](https://github.com/toptal/picasso/pull/102)
- [**Chore**][fx-20] Add breakpoints [#98](https://github.com/toptal/picasso/pull/98)
- [**Chore**] Change PR template, adjust version badge [#97](https://github.com/toptal/picasso/pull/97)

#### Feature

- [**Feature**][fx-19] Add Page container component [#95](https://github.com/toptal/picasso/pull/95)
- [**Feature**][fx-20] Add grid component [#94](https://github.com/toptal/picasso/pull/94)
- [**Feature**][fx-18] Add full width option for TextField [#99](https://github.com/toptal/picasso/pull/99)
- [**Feature**] Add Modal component [#92](https://github.com/toptal/picasso/pull/92)
- [**Feature**][fx-48] Add CssBaseline component to provider [#96](https://github.com/toptal/picasso/pull/96)

---

## v0.1.0-beta.1 (04/03/2019)

#### Chore

- [**Chore**] Release BETA version [#93](https://github.com/toptal/picasso/pull/93)
- [**Chore**] Rename Spacer to Container [#91](https://github.com/toptal/picasso/pull/91)

#### closed

- [**closed**] Add component prop documentation auto generation [#88](https://github.com/toptal/picasso/pull/88)

---

## v0.1.0-alpha.32 (01/03/2019)

#### Chore

- [**Chore**] Handle full user like imports in source code examples [#90](https://github.com/toptal/picasso/pull/90)

---

## v0.1.0-alpha.31 (28/02/2019)

#### Chore

- [**Chore**] Upgrade material ui package [#89](https://github.com/toptal/picasso/pull/89)

#### Feature

- [**Feature**] Add Footer component [#87](https://github.com/toptal/picasso/pull/87)

---

## v0.1.0-alpha.30 (27/02/2019)

#### Bugfix

- [**Bugfix**] Fix select component caret color [#85](https://github.com/toptal/picasso/pull/85)

#### Chore

- [**Chore**] Picas 71 docs for components [#86](https://github.com/toptal/picasso/pull/86)
- [**Chore**] Prop types documentation [#80](https://github.com/toptal/picasso/pull/80)

#### Feature

- [**Feature**] Add Header component [#84](https://github.com/toptal/picasso/pull/84)

#### closed

- [**closed**] Fix readme for adding svg to Picasso [#83](https://github.com/toptal/picasso/pull/83)

---

## v0.1.0-alpha.29 (25/02/2019)

#### Bugfix

- [**Bugfix**] Fix userback integration [#79](https://github.com/toptal/picasso/pull/79)

#### Chore

- [**Chore**] Fix hygen component generation template in favor of the new visual tests structure [#77](https://github.com/toptal/picasso/pull/77)
- [**Chore**][**do not merge**] Move -examples to .examples [#78](https://github.com/toptal/picasso/pull/78)

#### Feature

- [**Feature**] Add logo component [#82](https://github.com/toptal/picasso/pull/82)

#### closed

- [**closed**] Fix some issues with component generator template [#81](https://github.com/toptal/picasso/pull/81)

---

## v0.1.0-alpha.28 (22/02/2019)

#### Specs

- [**Specs**] Integrate storybook visual testing [#67](https://github.com/toptal/picasso/pull/67)

---

## v0.1.0-alpha.27 (22/02/2019)

#### Bugfix

- [**Bugfix**] Fix Picasso main js [#75](https://github.com/toptal/picasso/pull/75)

---

## v0.1.0-alpha.26 (21/02/2019)

_No changelog for this release._

---

## v0.1.0-alpha.25 (21/02/2019)

#### Bugfix

- [**Bugfix**] Move Userback integration into Storybook iframe [#76](https://github.com/toptal/picasso/pull/76)

#### closed

- [**closed**] Fix text field icon padding [#74](https://github.com/toptal/picasso/pull/74)

---

## v0.1.0-alpha.24 (21/02/2019)

#### Bugfix

- [**Bugfix**] Set precise size of TextFiel and Select components [#72](https://github.com/toptal/picasso/pull/72)

#### CI

- [**CI**] Publish Visual Tests on CI [#73](https://github.com/toptal/picasso/pull/73)

---

## v0.1.0-alpha.23 (20/02/2019)

#### closed

- [**closed**] Fix alignment for the caret icon for Select [#71](https://github.com/toptal/picasso/pull/71)
- [**closed**] Fix design issues with text fields [#70](https://github.com/toptal/picasso/pull/70)

---

## v0.1.0-alpha.22 (19/02/2019)

#### CI

- [**CI**] Refactor visual tests CI scripts [#69](https://github.com/toptal/picasso/pull/69)

#### closed

- [**closed**] Minor design issues with select [#68](https://github.com/toptal/picasso/pull/68)
