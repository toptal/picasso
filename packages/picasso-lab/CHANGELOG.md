# Change Log

## 27.0.0

### Patch Changes

- Updated dependencies [[`2845cd0d`](https://github.com/toptal/picasso/commit/2845cd0d753fc91c836c2b793f194b3868de69e9)]:
  - @toptal/picasso@17.4.0

## 26.0.5

### Patch Changes

- Updated dependencies [[`16574dee`](https://github.com/toptal/picasso/commit/16574dee549095cc06deccccdbcfb4c7a073a601), [`16574dee`](https://github.com/toptal/picasso/commit/16574dee549095cc06deccccdbcfb4c7a073a601)]:
  - @toptal/picasso-provider@0.6.0
  - @toptal/picasso@17.3.3
  - @toptal/picasso-shared@7.2.2

## 26.0.4

### Patch Changes

- [#2383](https://github.com/toptal/picasso/pull/2383) [`3141521b`](https://github.com/toptal/picasso/commit/3141521ba1bd5eb6aaee9ae2749eb490959e6e7b) Thanks [@TomasSlama](https://github.com/TomasSlama)! - Update `picasso-provider` to the latest version

- Updated dependencies [[`3141521b`](https://github.com/toptal/picasso/commit/3141521ba1bd5eb6aaee9ae2749eb490959e6e7b)]:
  - @toptal/picasso@17.3.2
  - @toptal/picasso-shared@7.2.1

## 26.0.3

### Patch Changes

- [#2357](https://github.com/toptal/picasso/pull/2357) [`f209b7c2`](https://github.com/toptal/picasso/commit/f209b7c2e7e4242965147a0af9a771fd69307940) Thanks [@vvmarulin](https://github.com/vvmarulin)! - ---

  ### DatePicker

  - fix active month for range datepicker when value is changed
  - fix value reset of range datepicker when the input value is deleted

## 26.0.2

### Patch Changes

- [#2370](https://github.com/toptal/picasso/pull/2370) [`574db0fc`](https://github.com/toptal/picasso/commit/574db0fc37cfa305005e65bce2abe311cde75271) Thanks [@bogdanalexe90](https://github.com/bogdanalexe90)! - fix(section): [SPC-1575] allow ellipsis in title and subtitle content

- Updated dependencies [[`574db0fc`](https://github.com/toptal/picasso/commit/574db0fc37cfa305005e65bce2abe311cde75271)]:
  - @toptal/picasso@17.3.1

## 26.0.1

### Patch Changes

- [#2367](https://github.com/toptal/picasso/pull/2367) [`19210b22`](https://github.com/toptal/picasso/commit/19210b224168449c23ac408db19ed323c1c33350) Thanks [@sanex3339](https://github.com/sanex3339)! - ## DatePicker

  Fixed missing reset of `input` value when clicking on `reset` button
  Fixed cases when `popup` can overlap `input` during the page scroll

## 26.0.0

### Minor Changes

- [#2362](https://github.com/toptal/picasso/pull/2362) [`df144e2d`](https://github.com/toptal/picasso/commit/df144e2d5defed03aeabb89cb1654f3d7ace7bfa) Thanks [@denieler](https://github.com/denieler)! - Deleting the fixed version of the reference to `picasso-provider` package to allow more flexible version management for `picasso-provider` package in projects.

### Patch Changes

- Updated dependencies [[`df144e2d`](https://github.com/toptal/picasso/commit/df144e2d5defed03aeabb89cb1654f3d7ace7bfa)]:
  - @toptal/picasso@17.3.0
  - @toptal/picasso-shared@7.2.0

## 25.0.1

### Patch Changes

- [#2358](https://github.com/toptal/picasso/pull/2358) [`1fbc72dd`](https://github.com/toptal/picasso/commit/1fbc72ddc07c7b4c51a45c62c69dd7e32acb2937) Thanks [@ascrazy](https://github.com/ascrazy)! - ## Timeline

  Allow for falsey values in `Timeline`'s children to make conditional rendering possible

- Updated dependencies [[`11744a28`](https://github.com/toptal/picasso/commit/11744a28c81e36d01af4111bae2a70e33427ffa2)]:
  - @toptal/picasso@17.2.2

## 25.0.0

### Patch Changes

- Updated dependencies [[`9fcad1bb`](https://github.com/toptal/picasso/commit/9fcad1bb62f2c23825cc7fc52ade8c098fbcd491), [`1aebe81f`](https://github.com/toptal/picasso/commit/1aebe81f2bc4a80145b20ea3c0447ae052c71fa4)]:
  - @toptal/picasso@17.2.0

## 24.0.0

### Patch Changes

- Updated dependencies [[`4370e2d8`](https://github.com/toptal/picasso/commit/4370e2d84c3768719a530c621eefae835e163e73)]:
  - @toptal/picasso@17.1.0

## 23.0.0

### Minor Changes

- [#2295](https://github.com/toptal/picasso/pull/2295) [`b9859b6c`](https://github.com/toptal/picasso/commit/b9859b6c246f582d336250b7df45e6c284902299) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - Updated sizes in Typography components to comply with new changes introduced in `@toptal/picasso@17.0.0`

  Changed components:

  - `EmptyStateCollection`

  ```diff
  -<Typography size='small'>{children}</Typography>
  +<Typography size='xsmall'>{children}</Typography>
  ```

  - `EmptyStatePage`

  ```diff
  <Typography
  - size='small'
  + size='xsmall'
    as={typeof children === 'string' ? 'p' : 'div'}
  >
    {children}
  </Typography>
  ```

  - `NoteSubtitle`

  ```diff
  -<Typography color='dark-grey' size='small'>
  +<Typography color='dark-grey' size='xsmall'>
    {children}
  </Typography>
  ```

  - `OverviewBlock`

  ```diff
  -<Typography size='xsmall' weight='semibold' color={color.label}>
  +<Typography size='xxsmall' weight='semibold' color={color.label}>
    {titleCase ? toTitleCase(label) : label}
  </Typography>
  ```

### Patch Changes

- Updated dependencies [[`ce7be40f`](https://github.com/toptal/picasso/commit/ce7be40fbfb04536058cc94b03ccf86f7125529b), [`b9859b6c`](https://github.com/toptal/picasso/commit/b9859b6c246f582d336250b7df45e6c284902299), [`6446e620`](https://github.com/toptal/picasso/commit/6446e620808fed2a411fc124821c4cc896add734)]:
  - @toptal/picasso@17.0.0
  - @toptal/picasso-provider@0.5.0
  - @toptal/picasso-shared@7.1.1

## 22.0.0

### Patch Changes

- Updated dependencies [[`9f6579ad`](https://github.com/toptal/picasso/commit/9f6579ad97304aaa39ef3a388fda6b0ac1a4c2f6), [`ee92ee0c`](https://github.com/toptal/picasso/commit/ee92ee0cdb2aa0d4b679b25cb1b34be48d5c7a71)]:
  - @toptal/picasso@16.4.0
  - @toptal/picasso-shared@7.1.0

## 21.0.0

### Patch Changes

- Updated dependencies [[`7c9cc79b`](https://github.com/toptal/picasso/commit/7c9cc79b007f546c310684000cbbc6b1870516a9), [`bc7427db`](https://github.com/toptal/picasso/commit/bc7427dbf53fef3e1f1a60c0d9edf57c997ce019)]:
  - @toptal/picasso@16.3.0

## 20.0.0

### Patch Changes

- [#2285](https://github.com/toptal/picasso/pull/2285) [`be64ee77`](https://github.com/toptal/picasso/commit/be64ee77b10b683ec04a4ca9a702b94e6590f9a4) Thanks [@LashaJini](https://github.com/LashaJini)! - Bump of the @toptal/package

- Updated dependencies [[`be64ee77`](https://github.com/toptal/picasso/commit/be64ee77b10b683ec04a4ca9a702b94e6590f9a4), [`1c5807b1`](https://github.com/toptal/picasso/commit/1c5807b12b35bc85d7700cacd1519a267eb7280f)]:
  - @toptal/picasso@16.2.0

## 19.0.0

### Patch Changes

- Updated dependencies [[`ba2ddd61`](https://github.com/toptal/picasso/commit/ba2ddd610e44ac0b6776436858ec3976343f5d65)]:
  - @toptal/picasso@16.1.0

## 18.0.0

### Major Changes

- [#2298](https://github.com/toptal/picasso/pull/2298) [`516d173e`](https://github.com/toptal/picasso/commit/516d173ebec9922c8a6e4408d08ab4205e989cc6) Thanks [@sanex3339](https://github.com/sanex3339)! - feat(DatePicker): reworked `parseInputValue` property. Now it allows passing custom parser for `DatePicker`'s input value to process custom input value, like, human-readable dates

### Patch Changes

- Updated dependencies [[`4953df3d`](https://github.com/toptal/picasso/commit/4953df3d2642c704b404ff565e63c3d53b415832)]:
  - @toptal/picasso@16.0.0

## 17.0.0

### Patch Changes

- Updated dependencies [[`0dcd4178`](https://github.com/toptal/picasso/commit/0dcd4178c581d7b390834e2f34c9cb661771c841)]:
  - @toptal/picasso@15.2.0

## 16.0.0

### Patch Changes

- Updated dependencies [[`36fc6c72`](https://github.com/toptal/picasso/commit/36fc6c72f1edd39314f6ca1ac559a28c8ffc5b8c), [`3d484420`](https://github.com/toptal/picasso/commit/3d48442096da95eabdbf74b3975fea9050a794bd)]:
  - @toptal/picasso@15.1.0

## 15.0.0

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

- [#2260](https://github.com/toptal/picasso/pull/2260) [`a6b335db`](https://github.com/toptal/picasso/commit/a6b335dbb4acabd90a75bb18f8ffb20d8d5fb265) Thanks [@sanex3339](https://github.com/sanex3339)! - Normalize `minDate`/`maxDate` before comparison

- Updated dependencies [[`88b091e2`](https://github.com/toptal/picasso/commit/88b091e2be71bb5aeae51a051d3653ccb10512bc), [`6619b3d8`](https://github.com/toptal/picasso/commit/6619b3d8011b1dae26032a4144e3228d07dc9544), [`f081e380`](https://github.com/toptal/picasso/commit/f081e3800513ba85c5c5f7a077b2c472db18c867)]:
  - @toptal/picasso@15.0.0

## 14.0.0

### Patch Changes

- Updated dependencies [[`78312c45`](https://github.com/toptal/picasso/commit/78312c45170ae975f7c30385f06fa64161cbf29b), [`d225d195`](https://github.com/toptal/picasso/commit/d225d1956f3cc8ae3507a836f7e4667bf3aaa729)]:
  - @toptal/picasso@14.1.0

## 13.0.0

### Patch Changes

- Updated dependencies [[`95b61597`](https://github.com/toptal/picasso/commit/95b6159716cef8deeae5bfd816c540ea6d7352a3)]:
  - @toptal/picasso@14.0.0

## 12.0.0

### Patch Changes

- Updated dependencies [[`34e990a3`](https://github.com/toptal/picasso/commit/34e990a3fe6d66bb204d1d468c505ebe0b8fd127), [`b2332734`](https://github.com/toptal/picasso/commit/b2332734ba730e9c001638bee47d6ce1f3b87a22), [`dedc9057`](https://github.com/toptal/picasso/commit/dedc905704f93a3a2f3f024c850f5db55599fdcb)]:
  - @toptal/picasso-provider@0.4.0
  - @toptal/picasso@13.7.0
  - @toptal/picasso-shared@7.0.2

## 11.0.0

### Patch Changes

- Updated dependencies [[`e00c54e7`](https://github.com/toptal/picasso/commit/e00c54e7c56d660c986ae5e096dc6da67ccd48e9)]:
  - @toptal/picasso@13.6.0

## 10.0.0

### Patch Changes

- Updated dependencies [[`07e80d4e`](https://github.com/toptal/picasso/commit/07e80d4ee4275a8717c422c82d062519e232d6dc), [`d8cb590b`](https://github.com/toptal/picasso/commit/d8cb590b7e181acf0e5534913f13af0655caac62)]:
  - @toptal/picasso@13.5.0

## 9.3.1

### Patch Changes

- [#2218](https://github.com/toptal/picasso/pull/2218) [`6a7073f0`](https://github.com/toptal/picasso/commit/6a7073f012bdc60b1ef95f30d0731204802731e4) Thanks [@TomasSlama](https://github.com/TomasSlama)! - Update storybook to latest version and make some small adjusments in components to work properly in the new Storybook.

- Updated dependencies [[`6a7073f0`](https://github.com/toptal/picasso/commit/6a7073f012bdc60b1ef95f30d0731204802731e4)]:
  - @toptal/picasso@13.4.2

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [9.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@9.2.1...@toptal/picasso-lab@9.3.0) (2021-11-09)

### Features

- **section:** add with header bar variant ([#2208](https://github.com/toptal/picasso/issues/2208)) ([49f8d41](https://github.com/toptal/picasso/commit/49f8d415adc3e523069531da290f2986f76bf4b1))

## [9.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@9.2.0...@toptal/picasso-lab@9.2.1) (2021-11-09)

**Note:** Version bump only for package @toptal/picasso-lab

# [9.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@9.1.0...@toptal/picasso-lab@9.2.0) (2021-11-08)

### Features

- **datepicker:** add support for custom value ([#2203](https://github.com/toptal/picasso/issues/2203)) ([15e0823](https://github.com/toptal/picasso/commit/15e0823eaf548ab5e3955f6dc30bb75167d0f3be))

# [9.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@9.0.3...@toptal/picasso-lab@9.1.0) (2021-10-22)

### Features

- **Typography:** add new size of Typography ([#2196](https://github.com/toptal/picasso/issues/2196)) ([905088b](https://github.com/toptal/picasso/commit/905088bf84f6efd1904fd6c9211bfb090d576481))

## [9.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@9.0.2...@toptal/picasso-lab@9.0.3) (2021-10-18)

**Note:** Version bump only for package @toptal/picasso-lab

## [9.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@9.0.1...@toptal/picasso-lab@9.0.2) (2021-10-14)

**Note:** Version bump only for package @toptal/picasso-lab

## [9.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@9.0.0...@toptal/picasso-lab@9.0.1) (2021-10-14)

**Note:** Version bump only for package @toptal/picasso-lab

# [9.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@8.0.0...@toptal/picasso-lab@9.0.0) (2021-10-14)

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

# [8.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.4.0...@toptal/picasso-lab@8.0.0) (2021-10-13)

### Features

- **Typography:** update line heights and colors to match BASE 2.0 ([#2184](https://github.com/toptal/picasso/issues/2184)) ([aacd827](https://github.com/toptal/picasso/commit/aacd8271dd6c6ef5093fef78d4a419c48b046db5))

### BREAKING CHANGES

- **Typography:** - Changed line-height of small heading and body

* Removed blue color from Typography
* Removed blue color from OverviewBlock

# [7.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.3.6...@toptal/picasso-lab@7.4.0) (2021-09-27)

### Features

- **Icon:** [SPB-2461] add transfer icon ([#2177](https://github.com/toptal/picasso/issues/2177)) ([caee460](https://github.com/toptal/picasso/commit/caee460457267392067879b29746535fcc118543))

## [7.3.6](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.3.5...@toptal/picasso-lab@7.3.6) (2021-09-16)

**Note:** Version bump only for package @toptal/picasso-lab

## [7.3.5](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.3.4...@toptal/picasso-lab@7.3.5) (2021-09-09)

### Bug Fixes

- **picasso:** add explicit dependency on debounce ([#2161](https://github.com/toptal/picasso/issues/2161)) ([7471191](https://github.com/toptal/picasso/commit/7471191f2e7f6e3953e3066d627fc25209dda9c4))

## [7.3.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.3.3...@toptal/picasso-lab@7.3.4) (2021-09-08)

**Note:** Version bump only for package @toptal/picasso-lab

## [7.3.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.3.2...@toptal/picasso-lab@7.3.3) (2021-09-06)

### Bug Fixes

- updated TypographyOverflow click event for tooltip ([#2152](https://github.com/toptal/picasso/issues/2152)) ([3438039](https://github.com/toptal/picasso/commit/3438039980686378a8da4fd9b4c7fee14d51e79b))

## [7.3.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.3.1...@toptal/picasso-lab@7.3.2) (2021-09-01)

### Bug Fixes

- **Section:** removes header padding when collapsed ([#2147](https://github.com/toptal/picasso/issues/2147)) ([a78de93](https://github.com/toptal/picasso/commit/a78de93dee9ff1e7c119ba81c9a5b6baca99136d))

## [7.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.3.0...@toptal/picasso-lab@7.3.1) (2021-08-15)

### Bug Fixes

- fix path of generated component ([#2127](https://github.com/toptal/picasso/issues/2127)) ([fa175e6](https://github.com/toptal/picasso/commit/fa175e6cfa27cced19c4cc920b7d5380be6ef614))

# [7.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.2.0...@toptal/picasso-lab@7.3.0) (2021-08-13)

### Features

- **Note:** add Note component ([#2128](https://github.com/toptal/picasso/issues/2128)) ([0376992](https://github.com/toptal/picasso/commit/0376992c3448a0fb98f40206bf1212ceb14d68e6))

# [7.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.1.3...@toptal/picasso-lab@7.2.0) (2021-08-09)

### Features

- add title size for section component ([#2125](https://github.com/toptal/picasso/issues/2125)) ([beba047](https://github.com/toptal/picasso/commit/beba04777dcd40508872d1c6ea7ee4c55562a7e1))

## [7.1.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.1.2...@toptal/picasso-lab@7.1.3) (2021-07-28)

### Bug Fixes

- [SPC-1154] removing additional padding on bottom of bordered sections ([#2120](https://github.com/toptal/picasso/issues/2120)) ([0e2794f](https://github.com/toptal/picasso/commit/0e2794fbf7f8ad4e860ea87b51460f25d0ff27e6))

## [7.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.1.1...@toptal/picasso-lab@7.1.2) (2021-07-27)

**Note:** Version bump only for package @toptal/picasso-lab

## [7.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.1.0...@toptal/picasso-lab@7.1.1) (2021-07-06)

### Bug Fixes

- **TypographyOverflow:** improve performance ([#2110](https://github.com/toptal/picasso/issues/2110)) ([e9bc3a5](https://github.com/toptal/picasso/commit/e9bc3a5fc6e3fffc061bea2abc03d92c14271ce8))

# [7.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@7.0.0...@toptal/picasso-lab@7.1.0) (2021-06-28)

### Features

- **Section:** add block variant ([#2106](https://github.com/toptal/picasso/issues/2106)) ([e30ca10](https://github.com/toptal/picasso/commit/e30ca10c7c7692dd6300a1b992571599690eba88))

# [7.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@6.2.0...@toptal/picasso-lab@7.0.0) (2021-06-25)

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

# [6.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@6.1.0...@toptal/picasso-lab@6.2.0) (2021-06-11)

### Features

- **Section:** make collapsible ([#2094](https://github.com/toptal/picasso/issues/2094)) ([b48aa15](https://github.com/toptal/picasso/commit/b48aa15c2b806f5288e2c2d129ff8a54d8fb75de))

# [6.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@6.0.2...@toptal/picasso-lab@6.1.0) (2021-06-11)

### Features

- **drawer:** add all types of the drawer ([#2099](https://github.com/toptal/picasso/issues/2099)) ([29ec08d](https://github.com/toptal/picasso/commit/29ec08d04ba600c03bb5b5dc97186fde92a97e44))

## [6.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@6.0.1...@toptal/picasso-lab@6.0.2) (2021-06-08)

### Bug Fixes

- **Drawer:** fix incorrect z-index of the Drawer ([#2093](https://github.com/toptal/picasso/issues/2093)) ([ff90e4a](https://github.com/toptal/picasso/commit/ff90e4a5ce3f743c32fac5a9a4b6846b49a0510e))

## [6.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@6.0.0...@toptal/picasso-lab@6.0.1) (2021-05-24)

### Bug Fixes

- move dependenties to picasso from lab ([#2085](https://github.com/toptal/picasso/issues/2085)) ([f6d447a](https://github.com/toptal/picasso/commit/f6d447ae5eee3d559c1d1891bbecb446f701a516))

# [6.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@5.3.0...@toptal/picasso-lab@6.0.0) (2021-05-24)

### Features

- migrate stable components from lab to picasso ([#2081](https://github.com/toptal/picasso/issues/2081)) ([1070a04](https://github.com/toptal/picasso/commit/1070a046a5860841e35481ac63ae9b1c4d5dfe8c))

### BREAKING CHANGES

- stable components were moved from lab to picasso

# [5.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@5.2.2...@toptal/picasso-lab@5.3.0) (2021-05-14)

### Features

- **Typography:** update green color ([#2071](https://github.com/toptal/picasso/issues/2071)) ([6591aac](https://github.com/toptal/picasso/commit/6591aac722c0567d116f003dab9d168ccd1362c2))

## [5.2.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@5.2.1...@toptal/picasso-lab@5.2.2) (2021-05-12)

### Bug Fixes

- **list:** render ListItem as div to avoid nested paragraph warning ([#2066](https://github.com/toptal/picasso/issues/2066)) ([836cc20](https://github.com/toptal/picasso/commit/836cc2033e784cb8858ed795748292b81d8feb23))

## [5.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@5.2.0...@toptal/picasso-lab@5.2.1) (2021-05-11)

### Bug Fixes

- **Modal:** add scrollable shades paddings ([1be0c8d](https://github.com/toptal/picasso/commit/1be0c8d2075a3b7cae6f3681da85d05e93e60f37))

# [5.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@5.1.4...@toptal/picasso-lab@5.2.0) (2021-05-10)

### Features

- **ProgressBar:** [TEA-2569] Introduce ProgressBar component ([#2063](https://github.com/toptal/picasso/issues/2063)) ([7eff9dd](https://github.com/toptal/picasso/commit/7eff9dde32d4e4075f5cbe1d2ad94563e127d927))

## [5.1.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@5.1.3...@toptal/picasso-lab@5.1.4) (2021-05-04)

### Bug Fixes

- **TypographyOverflow:** fix initial render perf issue ([#2061](https://github.com/toptal/picasso/issues/2061)) ([f2d3d7f](https://github.com/toptal/picasso/commit/f2d3d7fc23a252a19a94f254700559585bd18c12))

## [5.1.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@5.1.2...@toptal/picasso-lab@5.1.3) (2021-04-28)

**Note:** Version bump only for package @toptal/picasso-lab

## [5.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@5.1.1...@toptal/picasso-lab@5.1.2) (2021-04-19)

### Bug Fixes

- **TypographyOverflow:** fix for long names ([#2035](https://github.com/toptal/picasso/issues/2035)) ([9219bda](https://github.com/toptal/picasso/commit/9219bda1e82fa9d978b8655e057619da043b2840))

## [5.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@5.1.0...@toptal/picasso-lab@5.1.1) (2021-04-12)

**Note:** Version bump only for package @toptal/picasso-lab

# [5.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@5.0.0...@toptal/picasso-lab@5.1.0) (2021-04-08)

### Features

- **Section:** prevent rendering empty header ([#2019](https://github.com/toptal/picasso/issues/2019)) ([43e87dd](https://github.com/toptal/picasso/commit/43e87dd4d7eab9b762ecebdc649699fe9f3b1f42))

# [5.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@4.0.11...@toptal/picasso-lab@5.0.0) (2021-04-05)

### Features

- **Table:** add appearance and spacing variants ([d140fb7](https://github.com/toptal/picasso/commit/d140fb727c8d1985619778d769e32af2d505ead7))

### BREAKING CHANGES

- **Table:** Updated appearance and props schema

## [4.0.11](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@4.0.10...@toptal/picasso-lab@4.0.11) (2021-03-31)

**Note:** Version bump only for package @toptal/picasso-lab

## [4.0.10](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@4.0.9...@toptal/picasso-lab@4.0.10) (2021-03-30)

**Note:** Version bump only for package @toptal/picasso-lab

## [4.0.9](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@4.0.8...@toptal/picasso-lab@4.0.9) (2021-03-30)

**Note:** Version bump only for package @toptal/picasso-lab

## [4.0.8](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@4.0.7...@toptal/picasso-lab@4.0.8) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso-lab

## [4.0.7](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@4.0.6...@toptal/picasso-lab@4.0.7) (2021-03-24)

### Bug Fixes

- prepublish ([#2004](https://github.com/toptal/picasso/issues/2004)) ([800db08](https://github.com/toptal/picasso/commit/800db08bd0f47fb2b3f0752e6e5b3952ae503723))

## [4.0.6](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@4.0.5...@toptal/picasso-lab@4.0.6) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso-lab

## [4.0.5](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@4.0.4...@toptal/picasso-lab@4.0.5) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso-lab

## [4.0.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@4.0.3...@toptal/picasso-lab@4.0.4) (2021-03-22)

**Note:** Version bump only for package @toptal/picasso-lab

## [4.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@4.0.2...@toptal/picasso-lab@4.0.3) (2021-03-16)

**Note:** Version bump only for package @toptal/picasso-lab

## [4.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@4.0.1...@toptal/picasso-lab@4.0.2) (2021-03-15)

### Bug Fixes

- versions dependency between packages ([#1981](https://github.com/toptal/picasso/issues/1981)) ([ca4ab84](https://github.com/toptal/picasso/commit/ca4ab84934204323c8842991fe382745f56b5ff6))

## [4.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@4.0.0...@toptal/picasso-lab@4.0.1) (2021-03-12)

### Bug Fixes

- **TypographyOverflow:** handle external className ([#1969](https://github.com/toptal/picasso/issues/1969)) ([446df04](https://github.com/toptal/picasso/commit/446df04ad1e412cf0c4b6a2f8c17199285ec941a))

# [4.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.7.3...@toptal/picasso-lab@4.0.0) (2021-03-08)

### chore

- **tooltip:** compute arrow based on compact prop ([41a39c0](https://github.com/toptal/picasso/commit/41a39c07da609dc8657834f38d9794fc0bf5680a))

### Reverts

- Revert "chore(tooltip): adjust arrows and borders (#1952)" ([cb6a549](https://github.com/toptal/picasso/commit/cb6a549f30efe1bc70504bada464e0f7388d3125)), closes [#1952](https://github.com/toptal/picasso/issues/1952)

### BREAKING CHANGES

- **tooltip:** removed arrow prop

## [3.7.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.7.2...@toptal/picasso-lab@3.7.3) (2021-03-04)

**Note:** Version bump only for package @toptal/picasso-lab

## [3.7.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.7.1...@toptal/picasso-lab@3.7.2) (2021-03-03)

### Bug Fixes

- **Drawer:** use the correct font ([#1942](https://github.com/toptal/picasso/issues/1942)) ([216ca92](https://github.com/toptal/picasso/commit/216ca920963011af90c75759fa9d94ea7546a793))

## [3.7.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.7.0...@toptal/picasso-lab@3.7.1) (2021-03-02)

**Note:** Version bump only for package @toptal/picasso-lab

# [3.7.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.6.1...@toptal/picasso-lab@3.7.0) (2021-02-25)

### Features

- cross platform package builds ([#1925](https://github.com/toptal/picasso/issues/1925)) ([21f30be](https://github.com/toptal/picasso/commit/21f30beeb360fcc67c88d70af5c3234d8dcfe213))

## [3.6.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.6.0...@toptal/picasso-lab@3.6.1) (2021-02-25)

**Note:** Version bump only for package @toptal/picasso-lab

# [3.6.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.5.9...@toptal/picasso-lab@3.6.0) (2021-02-23)

### Features

- **section:** add section component ([#1919](https://github.com/toptal/picasso/issues/1919)) ([6b0015d](https://github.com/toptal/picasso/commit/6b0015d046d59e1cbc988e34cc5009dbb6db7cf1))

## [3.5.9](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.5.8...@toptal/picasso-lab@3.5.9) (2021-02-18)

### Bug Fixes

- multiline radio, checkbox and switch label alignment ([#1890](https://github.com/toptal/picasso/issues/1890)) ([f7f4aa0](https://github.com/toptal/picasso/commit/f7f4aa0effa5b7218ae2fd171186eb9c2aa37a2a))

## [3.5.8](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.5.7...@toptal/picasso-lab@3.5.8) (2021-02-16)

### Bug Fixes

- **Drawer:** [FX-1734] Make title optional ([#1912](https://github.com/toptal/picasso/issues/1912)) ([4898797](https://github.com/toptal/picasso/commit/48987972d83384552e8e8330b17e5d3c7524cf22))

## [3.5.7](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.5.6...@toptal/picasso-lab@3.5.7) (2021-02-16)

### Bug Fixes

- **drawer:** allow drawer content to grow to the full height ([#1911](https://github.com/toptal/picasso/issues/1911)) ([91c92b7](https://github.com/toptal/picasso/commit/91c92b70f0686b647d8701cd730de339ea9994f3))

## [3.5.6](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.5.5...@toptal/picasso-lab@3.5.6) (2021-02-15)

**Note:** Version bump only for package @toptal/picasso-lab

## [3.5.5](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.5.4...@toptal/picasso-lab@3.5.5) (2021-02-12)

### Bug Fixes

- **OverviewBlock:** fix usage with Link ([#1875](https://github.com/toptal/picasso/issues/1875)) ([dcc73fe](https://github.com/toptal/picasso/commit/dcc73fedeb31dfa73e5fb34f53917b89e01a0720))

## [3.5.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.5.3...@toptal/picasso-lab@3.5.4) (2021-02-11)

### Bug Fixes

- **OverviewBlock:** type detection for row injection ([#1908](https://github.com/toptal/picasso/issues/1908)) ([ccd3e37](https://github.com/toptal/picasso/commit/ccd3e376aeb74017a57d386ccedf159c0f9fd0bf))

## [3.5.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.5.2...@toptal/picasso-lab@3.5.3) (2021-02-08)

### Bug Fixes

- **Alert:** fix vertical alignment ([#1885](https://github.com/toptal/picasso/issues/1885)) ([d99b037](https://github.com/toptal/picasso/commit/d99b037365172c59a696a492748202fb7462a6af))

## [3.5.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.5.1...@toptal/picasso-lab@3.5.2) (2021-02-05)

**Note:** Version bump only for package @toptal/picasso-lab

## [3.5.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.5.0...@toptal/picasso-lab@3.5.1) (2021-02-04)

### Bug Fixes

- **OverviewBlock:** fix background color ([#1894](https://github.com/toptal/picasso/issues/1894)) ([c375d5b](https://github.com/toptal/picasso/commit/c375d5bf0df2548940ce6a26fa5c9ce040413698))

# [3.5.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.4.1...@toptal/picasso-lab@3.5.0) (2021-02-04)

### Features

- create form rating component ([#1888](https://github.com/toptal/picasso/issues/1888)) ([19c8319](https://github.com/toptal/picasso/commit/19c831919f905832605d61a026cc18c5f707b9e6))

## [3.4.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.4.0...@toptal/picasso-lab@3.4.1) (2021-02-03)

**Note:** Version bump only for package @toptal/picasso-lab

# [3.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.3.2...@toptal/picasso-lab@3.4.0) (2021-02-03)

### Features

- **Rating:** create component ([#1870](https://github.com/toptal/picasso/issues/1870)) ([7e7e475](https://github.com/toptal/picasso/commit/7e7e4754a1e09bc35e2b10469ac4cd6c95f79c2f))

## [3.3.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.3.1...@toptal/picasso-lab@3.3.2) (2021-02-03)

**Note:** Version bump only for package @toptal/picasso-lab

## [3.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.3.0...@toptal/picasso-lab@3.3.1) (2021-01-28)

### Bug Fixes

- **Drawer:** [FX-1671] Fix drawer width on small screens ([#1869](https://github.com/toptal/picasso/issues/1869)) ([3a67112](https://github.com/toptal/picasso/commit/3a6711212b8f944f237b763792291c1d48dc0612))

# [3.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.2.0...@toptal/picasso-lab@3.3.0) (2021-01-21)

### Features

- **TypographyOverflow:** add lines support for TypographyOverflow ([#1851](https://github.com/toptal/picasso/issues/1851)) ([f9b234b](https://github.com/toptal/picasso/commit/f9b234bbfa2545adfff41505c3aa9e7a61676309))

# [3.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.1.5...@toptal/picasso-lab@3.2.0) (2021-01-21)

### Features

- **quote:** create quote component ([#1860](https://github.com/toptal/picasso/issues/1860)) ([11399e4](https://github.com/toptal/picasso/commit/11399e4dced26c46964928ff67bd0b93d8d266ec))

## [3.1.5](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.1.4...@toptal/picasso-lab@3.1.5) (2021-01-20)

**Note:** Version bump only for package @toptal/picasso-lab

## [3.1.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.1.3...@toptal/picasso-lab@3.1.4) (2021-01-18)

**Note:** Version bump only for package @toptal/picasso-lab

## [3.1.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.1.2...@toptal/picasso-lab@3.1.3) (2021-01-18)

### Bug Fixes

- **MediaSkeletonLoader:** size variants ([#1840](https://github.com/toptal/picasso/issues/1840)) ([de9dd52](https://github.com/toptal/picasso/commit/de9dd52bec3cb1674d985e850ade7bbeb023ab6b))

## [3.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.1.1...@toptal/picasso-lab@3.1.2) (2021-01-13)

### Bug Fixes

- **TypographyOverflow:** add Jest support for ResizeObserver ([#1839](https://github.com/toptal/picasso/issues/1839)) ([eb6244e](https://github.com/toptal/picasso/commit/eb6244e91e377d8d3e317b3fb7a8a1d0d57aa155))

## [3.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.1.0...@toptal/picasso-lab@3.1.1) (2021-01-13)

### Bug Fixes

- **TypographyOverflow:** tooltip triggers ([#1834](https://github.com/toptal/picasso/issues/1834)) ([d9479d2](https://github.com/toptal/picasso/commit/d9479d2f48cdf902a6fc53e3f43df4d28a517d5b))

# [3.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.0.3...@toptal/picasso-lab@3.1.0) (2021-01-07)

### Features

- **TypographyOverflow:** tooltip variants ([#1823](https://github.com/toptal/picasso/issues/1823)) ([777796c](https://github.com/toptal/picasso/commit/777796c6162c52d3a47f9e761e34c57824739efc))

## [3.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.0.2...@toptal/picasso-lab@3.0.3) (2021-01-07)

### Bug Fixes

- **Tooltip:** fix non-working delay prop ([#1827](https://github.com/toptal/picasso/issues/1827)) ([7120a93](https://github.com/toptal/picasso/commit/7120a9335d38b52968709eb53dfc8a62d6b996eb))

## [3.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.0.1...@toptal/picasso-lab@3.0.2) (2021-01-07)

### Bug Fixes

- **Tooltip:** fix Tooltip showing measure ([#1824](https://github.com/toptal/picasso/issues/1824)) ([4f89898](https://github.com/toptal/picasso/commit/4f89898f199d1b8c3dca0da5c5b9f52d84263c7a))

## [3.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@3.0.0...@toptal/picasso-lab@3.0.1) (2020-12-29)

**Note:** Version bump only for package @toptal/picasso-lab

# [3.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.39.0...@toptal/picasso-lab@3.0.0) (2020-12-22)

### Features

- v5 ([#1487](https://github.com/toptal/picasso/issues/1487)) ([ee77cde](https://github.com/toptal/picasso/commit/ee77cde12f8f7670f50958ae3973327eb513d9f9))

# [2.39.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.38.2...@toptal/picasso-lab@2.39.0) (2020-12-18)

### Features

- **Drawer:** add width prop to drawer ([#1798](https://github.com/toptal/picasso/issues/1798)) ([d5affa1](https://github.com/toptal/picasso/commit/d5affa1e621a02d8710e9cf5b7f4312496d581e2))

## [2.38.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.38.1...@toptal/picasso-lab@2.38.2) (2020-12-15)

### Bug Fixes

- **OverviewBlock:** fix typecheck in test ([#1791](https://github.com/toptal/picasso/issues/1791)) ([b00f8be](https://github.com/toptal/picasso/commit/b00f8be4e9ad4fb5901a6f6cbd726bb9f1e94c45))

## [2.38.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.38.0...@toptal/picasso-lab@2.38.1) (2020-12-15)

### Bug Fixes

- **OverviewGroup:** fix non selectable text ([#1786](https://github.com/toptal/picasso/issues/1786)) ([b55be16](https://github.com/toptal/picasso/commit/b55be16d5888451c3058838a91ec10c684c96362))

# [2.38.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.37.0...@toptal/picasso-lab@2.38.0) (2020-12-14)

### Features

- **SkeletonLoader:** extend ButtonLoader ([#1750](https://github.com/toptal/picasso/issues/1750)) ([6ccbd00](https://github.com/toptal/picasso/commit/6ccbd0072217e3ff26a818bd4495687322d61f65))

# [2.37.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.36.6...@toptal/picasso-lab@2.37.0) (2020-12-14)

### Features

- [SPT-1202] Add tooltip delay on the typography overflow ([#1778](https://github.com/toptal/picasso/issues/1778)) ([0b77ffa](https://github.com/toptal/picasso/commit/0b77ffab2dbd23a55da0b15fb2141d6b525759a1))

## [2.36.6](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.36.5...@toptal/picasso-lab@2.36.6) (2020-12-07)

### Bug Fixes

- use document.activeElement for focus check ([#1755](https://github.com/toptal/picasso/issues/1755)) ([9141f1a](https://github.com/toptal/picasso/commit/9141f1a08701aa5be6257d354d0d1b674e8a2294))

## [2.36.5](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.36.4...@toptal/picasso-lab@2.36.5) (2020-11-13)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.36.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.36.3...@toptal/picasso-lab@2.36.4) (2020-11-13)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.36.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.36.2...@toptal/picasso-lab@2.36.3) (2020-11-10)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.36.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.36.1...@toptal/picasso-lab@2.36.2) (2020-11-06)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.36.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.36.0...@toptal/picasso-lab@2.36.1) (2020-11-02)

**Note:** Version bump only for package @toptal/picasso-lab

# [2.36.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.35.0...@toptal/picasso-lab@2.36.0) (2020-11-02)

### Features

- alert ([#1649](https://github.com/toptal/picasso/issues/1649)) ([f0d8ca2](https://github.com/toptal/picasso/commit/f0d8ca233254f29c7d1dda0a9f3c6c32e71bf295))

# [2.35.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.34.2...@toptal/picasso-lab@2.35.0) (2020-10-29)

### Features

- accept node instead only text ([#1647](https://github.com/toptal/picasso/issues/1647)) ([48c830b](https://github.com/toptal/picasso/commit/48c830b94f23915b2946df00c50fd70fb722d937))

## [2.34.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.34.1...@toptal/picasso-lab@2.34.2) (2020-10-27)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.34.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.34.0...@toptal/picasso-lab@2.34.1) (2020-10-21)

**Note:** Version bump only for package @toptal/picasso-lab

# [2.34.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.33.0...@toptal/picasso-lab@2.34.0) (2020-10-20)

### Features

- **TypographyOverflow:** add custom tooltipContent ([#1632](https://github.com/toptal/picasso/issues/1632)) ([c06f9f7](https://github.com/toptal/picasso/commit/c06f9f7855186dc13bb6addd9f087337c571e9a8))

# [2.33.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.32.3...@toptal/picasso-lab@2.33.0) (2020-10-16)

### Features

- **EmptyState:** add Page and List empty components ([#1556](https://github.com/toptal/picasso/issues/1556)) ([76e76b3](https://github.com/toptal/picasso/commit/76e76b3f1682ffe7a79553d5a59e85cdab3dc2ef))

## [2.32.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.32.2...@toptal/picasso-lab@2.32.3) (2020-09-23)

### Bug Fixes

- add interactive to TypographyOverflow ([#1578](https://github.com/toptal/picasso/issues/1578)) ([0e6564f](https://github.com/toptal/picasso/commit/0e6564fdb5330cd7be937aa9163f5c8dca4e9206))

## [2.32.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.32.1...@toptal/picasso-lab@2.32.2) (2020-09-18)

### Bug Fixes

- **tooltip:** trigger immediately on touch ([#1565](https://github.com/toptal/picasso/issues/1565)) ([5a8947b](https://github.com/toptal/picasso/commit/5a8947ba13f0217ee9339e3207f8d5aaac021446))

## [2.32.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.32.0...@toptal/picasso-lab@2.32.1) (2020-09-14)

### Bug Fixes

- **Modal:** detect focus inside tooltip correctly if there are many ([59ebdff](https://github.com/toptal/picasso/commit/59ebdff726d7d98d5cf944ae8f27f018e928883e))

# [2.32.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.31.2...@toptal/picasso-lab@2.32.0) (2020-09-10)

### Features

- **Badge:** add Badge and OverlayBadge components ([#1550](https://github.com/toptal/picasso/issues/1550)) ([834a23f](https://github.com/toptal/picasso/commit/834a23f49fd62915a97ea6c886cf40577442011b))

## [2.31.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.31.1...@toptal/picasso-lab@2.31.2) (2020-09-09)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.31.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.31.0...@toptal/picasso-lab@2.31.1) (2020-09-03)

**Note:** Version bump only for package @toptal/picasso-lab

# [2.31.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.30.7...@toptal/picasso-lab@2.31.0) (2020-09-03)

### Features

- **TreeNodeAvatar:** add size variant to component ([#1545](https://github.com/toptal/picasso/issues/1545)) ([ade299e](https://github.com/toptal/picasso/commit/ade299ed061e1ad6217cc95e9fb9eb51f49c8124))

## [2.30.7](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.30.6...@toptal/picasso-lab@2.30.7) (2020-09-01)

### Bug Fixes

- **treeview:** fix issue with treeView on safari ([#1464](https://github.com/toptal/picasso/issues/1464)) ([3fd7606](https://github.com/toptal/picasso/commit/3fd76064733cf05851f4cf4d161a7f9cb5e61cd5))

## [2.30.6](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.30.5...@toptal/picasso-lab@2.30.6) (2020-08-31)

### Bug Fixes

- add missing Header/TypographyLoader props, center them vertically ([#1522](https://github.com/toptal/picasso/issues/1522)) ([bdb3e4e](https://github.com/toptal/picasso/commit/bdb3e4e7c5f3b43bb3e400f707c995f6f9e3c984))

## [2.30.5](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.30.4...@toptal/picasso-lab@2.30.5) (2020-08-31)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.30.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.30.3...@toptal/picasso-lab@2.30.4) (2020-08-31)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.30.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.30.2...@toptal/picasso-lab@2.30.3) (2020-08-27)

### Bug Fixes

- fix input error when size small is passed to date picker ([#1514](https://github.com/toptal/picasso/issues/1514)) ([1849855](https://github.com/toptal/picasso/commit/1849855973a3dbeae65bdb281ce460a8548b80bc))

## [2.30.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.30.1...@toptal/picasso-lab@2.30.2) (2020-08-26)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.30.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.30.0...@toptal/picasso-lab@2.30.1) (2020-08-20)

### Bug Fixes

- **treeview:** adjust zoom to support linear transition ([#1483](https://github.com/toptal/picasso/issues/1483)) ([2e44458](https://github.com/toptal/picasso/commit/2e44458723a608a37d4fe8daf5f3b35fd7e4a26e))

# [2.30.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.29.3...@toptal/picasso-lab@2.30.0) (2020-08-18)

### Features

- **skeletonloader:** implement `MediaSkeletonLoader` ([#1488](https://github.com/toptal/picasso/issues/1488)) ([b0932aa](https://github.com/toptal/picasso/commit/b0932aa49ef6c6c3cc34d2cdee293f20b8c1ad22))

## [2.29.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.29.2...@toptal/picasso-lab@2.29.3) (2020-08-18)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.29.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.29.1...@toptal/picasso-lab@2.29.2) (2020-08-13)

### Bug Fixes

- svg warning in dev tools ([#1481](https://github.com/toptal/picasso/issues/1481)) ([7ee8be2](https://github.com/toptal/picasso/commit/7ee8be2f70833c44e648ca7a740fb023607838a2))

## [2.29.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.29.0...@toptal/picasso-lab@2.29.1) (2020-08-12)

**Note:** Version bump only for package @toptal/picasso-lab

# [2.29.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.28.0...@toptal/picasso-lab@2.29.0) (2020-08-10)

### Features

- button loader ([#1465](https://github.com/toptal/picasso/issues/1465)) ([283ee3a](https://github.com/toptal/picasso/commit/283ee3a931ceab7332b5aee82d0d2166b77b9260))

# [2.28.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.27.0...@toptal/picasso-lab@2.28.0) (2020-08-03)

### Features

- add SkeletonLoader ([#1455](https://github.com/toptal/picasso/issues/1455)) ([da288ad](https://github.com/toptal/picasso/commit/da288ad4105fe225936848efdc5de75c9f808098))

# [2.27.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.26.1...@toptal/picasso-lab@2.27.0) (2020-07-31)

### Features

- **forms:** add CheckboxGroup ([#1448](https://github.com/toptal/picasso/issues/1448)) ([61e8570](https://github.com/toptal/picasso/commit/61e8570bf0842f3e55dc0ecc8b45cd85a9891bef))

## [2.26.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.26.0...@toptal/picasso-lab@2.26.1) (2020-07-23)

### Bug Fixes

- **treeview:** set the TreeView center by default ([#1444](https://github.com/toptal/picasso/issues/1444)) ([d6ab127](https://github.com/toptal/picasso/commit/d6ab127fa1807f8040d26cbaebe3b87c283f918e))

# [2.26.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.25.2...@toptal/picasso-lab@2.26.0) (2020-07-23)

### Features

- add timepicker to picasso-forms ([#1441](https://github.com/toptal/picasso/issues/1441)) ([f55db3d](https://github.com/toptal/picasso/commit/f55db3d7974f7a793a05bafbc97f31c2c3eec682))

## [2.25.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.25.1...@toptal/picasso-lab@2.25.2) (2020-07-23)

### Bug Fixes

- **treeview:** update Tree position when selected node's data is changed ([#1440](https://github.com/toptal/picasso/issues/1440)) ([e150066](https://github.com/toptal/picasso/commit/e1500660775d81dfa4c900bc996a3195c233244e))

## [2.25.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.25.0...@toptal/picasso-lab@2.25.1) (2020-07-22)

### Bug Fixes

- revert simple-react-calendar to deps ([#1442](https://github.com/toptal/picasso/issues/1442)) ([9dd7a63](https://github.com/toptal/picasso/commit/9dd7a63f279575ed283ef8ff9297a52f1bf0000d))

# [2.25.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.24.2...@toptal/picasso-lab@2.25.0) (2020-07-17)

### Features

- **labs:** implement TimePicker component ([#1426](https://github.com/toptal/picasso/issues/1426)) ([a3d89f4](https://github.com/toptal/picasso/commit/a3d89f4db5fdb8732397b84b918ecc850a54a9c2))

## [2.24.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.24.1...@toptal/picasso-lab@2.24.2) (2020-07-15)

### Bug Fixes

- export static props to be able to extend via styled ([#1434](https://github.com/toptal/picasso/issues/1434)) ([0aaffd2](https://github.com/toptal/picasso/commit/0aaffd2a0b73c80025028ce76f868d13e3fbd522))

## [2.24.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.24.0...@toptal/picasso-lab@2.24.1) (2020-07-14)

### Bug Fixes

- ignore titleCase for Select options ([#1431](https://github.com/toptal/picasso/issues/1431)) ([5b24f3e](https://github.com/toptal/picasso/commit/5b24f3e7c4f5ccfff5400de7d233dedebcaa2002))

# [2.24.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.23.1...@toptal/picasso-lab@2.24.0) (2020-07-13)

### Features

- use AP-style title case for components ([#1422](https://github.com/toptal/picasso/issues/1422)) ([b64ed4c](https://github.com/toptal/picasso/commit/b64ed4cdb50c9d306c1c492332e4db498ab0cb72))

## [2.23.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.23.0...@toptal/picasso-lab@2.23.1) (2020-07-08)

### Bug Fixes

- **treeview:** do not scroll to the center by default ([#1421](https://github.com/toptal/picasso/issues/1421)) ([87f05d5](https://github.com/toptal/picasso/commit/87f05d532da906d10e74625cb1ead52354c6363a))

# [2.23.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.22.4...@toptal/picasso-lab@2.23.0) (2020-07-08)

### Features

- update simple-react-calendar ([#1418](https://github.com/toptal/picasso/issues/1418)) ([7c9d59c](https://github.com/toptal/picasso/commit/7c9d59cae7840623404298b10ee6eeec50744f06))

## [2.22.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.22.3...@toptal/picasso-lab@2.22.4) (2020-07-07)

### Bug Fixes

- manually typing within a date interval ([#1419](https://github.com/toptal/picasso/issues/1419)) ([21d109a](https://github.com/toptal/picasso/commit/21d109a9b5969317b7918eb394345939b69e50c3))

## [2.22.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.22.2...@toptal/picasso-lab@2.22.3) (2020-07-02)

### Bug Fixes

- **treeview:** fix treeview appearance on the FF ([#1410](https://github.com/toptal/picasso/issues/1410)) ([4145575](https://github.com/toptal/picasso/commit/4145575f5e49a26477bd3bb17d5fc40a3a359624))

## [2.22.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.22.1...@toptal/picasso-lab@2.22.2) (2020-07-02)

### Bug Fixes

- recursive picasso-lab dependency ([#1412](https://github.com/toptal/picasso/issues/1412)) ([c3a0f8e](https://github.com/toptal/picasso/commit/c3a0f8e9914b3a556bfc003e8131b857af2aa65b))

## [2.22.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.22.0...@toptal/picasso-lab@2.22.1) (2020-07-02)

### Bug Fixes

- **OverviewBlock:** alignment on Firefox ([#1404](https://github.com/toptal/picasso/issues/1404)) ([7307554](https://github.com/toptal/picasso/commit/7307554bfb579cc11eaa53abe2fab383f6ee717a))

# [2.22.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.21.0...@toptal/picasso-lab@2.22.0) (2020-07-01)

### Features

- **treeview:** add a scroll offset for each node ([#1403](https://github.com/toptal/picasso/issues/1403)) ([3712d69](https://github.com/toptal/picasso/commit/3712d6969128344b79d0448d2fe0419c89066919))

# [2.21.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.20.0...@toptal/picasso-lab@2.21.0) (2020-06-29)

### Features

- add timezone property to DatePicker component ([#1392](https://github.com/toptal/picasso/issues/1392)) ([b5b793e](https://github.com/toptal/picasso/commit/b5b793e5c5704877142b722676b0c08ada6361a0))

# [2.20.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.19.0...@toptal/picasso-lab@2.20.0) (2020-06-22)

### Features

- set default tooltip delay to .5 seconds ([#1386](https://github.com/toptal/picasso/issues/1386)) ([7a5b374](https://github.com/toptal/picasso/commit/7a5b374ee1c97e6242c23574aa57e1d17425e753))

# [2.19.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.18.4...@toptal/picasso-lab@2.19.0) (2020-06-22)

### Features

- **treeview:** implement TreeView ([#1379](https://github.com/toptal/picasso/issues/1379)) ([5624bcf](https://github.com/toptal/picasso/commit/5624bcf1b114189d3bf62cb2670fcb55cc636eaf))

## [2.18.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.18.3...@toptal/picasso-lab@2.18.4) (2020-06-16)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.18.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.18.2...@toptal/picasso-lab@2.18.3) (2020-06-12)

### Bug Fixes

- documentation for weekStartsOn ([#1375](https://github.com/toptal/picasso/issues/1375)) ([9092018](https://github.com/toptal/picasso/commit/9092018606ddc02bc028ec5177a91d9abb9a7306))

## [2.18.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.18.1...@toptal/picasso-lab@2.18.2) (2020-06-05)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.18.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.18.0...@toptal/picasso-lab@2.18.1) (2020-06-02)

**Note:** Version bump only for package @toptal/picasso-lab

# [2.18.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.17.0...@toptal/picasso-lab@2.18.0) (2020-05-30)

### Features

- **datepicker:** expose weekstartson prop ([#1344](https://github.com/toptal/picasso/issues/1344)) ([3d0bd08](https://github.com/toptal/picasso/commit/3d0bd081499033d60fd152381b7f1c3b63fcaf2c))

# [2.17.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.16.2...@toptal/picasso-lab@2.17.0) (2020-05-29)

### Features

- **list:** add start props to List component ([#1343](https://github.com/toptal/picasso/issues/1343)) ([336142c](https://github.com/toptal/picasso/commit/336142c15a94ae29ea044be8904b5e4bc37b9251))

## [2.16.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.16.1...@toptal/picasso-lab@2.16.2) (2020-05-27)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.16.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.16.0...@toptal/picasso-lab@2.16.1) (2020-05-25)

### Bug Fixes

- **popper:** disable compact mode for Autocomplete and Select ([#1320](https://github.com/toptal/picasso/issues/1320)) ([4f08250](https://github.com/toptal/picasso/commit/4f08250c9e8f34d5e678cc6e9bd5bc6d7b15b774))

# [2.16.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.15.0...@toptal/picasso-lab@2.16.0) (2020-05-21)

### Features

- update logo ([#1324](https://github.com/toptal/picasso/issues/1324)) ([10a43ae](https://github.com/toptal/picasso/commit/10a43ae3624ded54e713681217643affa80bdea9))

# [2.15.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.14.0...@toptal/picasso-lab@2.15.0) (2020-05-19)

### Features

- **Select:** [FX-959] Add onSearchChange handler ([#1318](https://github.com/toptal/picasso/issues/1318)) ([8e4bc28](https://github.com/toptal/picasso/commit/8e4bc289a156ac55b0163cb2b5eb56635951204c))

# [2.14.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.13.4...@toptal/picasso-lab@2.14.0) (2020-05-18)

### Features

- add TagSelector, DatePicker in picasso-forms ([#1297](https://github.com/toptal/picasso/issues/1297)) ([0e8f2dc](https://github.com/toptal/picasso/commit/0e8f2dcb47f44e19ac4d72914b8a90576d70381c))

## [2.13.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.13.3...@toptal/picasso-lab@2.13.4) (2020-05-15)

### Bug Fixes

- ts check for code examples in picasso-lab ([#1309](https://github.com/toptal/picasso/issues/1309)) ([750aeab](https://github.com/toptal/picasso/commit/750aeab10075719116292658dbb382077fd3731b))

## [2.13.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.13.2...@toptal/picasso-lab@2.13.3) (2020-05-14)

### Bug Fixes

- **datepicker:** make it work on Safari and Firefox ([#1313](https://github.com/toptal/picasso/issues/1313)) ([bece4f5](https://github.com/toptal/picasso/commit/bece4f5032de400c0e1ada4cb33dc0ca73f9045f))

## [2.13.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.13.0...@toptal/picasso-lab@2.13.2) (2020-05-14)

### Bug Fixes

- add picasso/utils import alias ([#1305](https://github.com/toptal/picasso/issues/1305)) ([905f808](https://github.com/toptal/picasso/commit/905f80867f940dd7971a8bb7454a5dc73a42818f))

## [2.13.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.13.0...@toptal/picasso-lab@2.13.1) (2020-05-14)

### Bug Fixes

- add picasso/utils import alias ([#1305](https://github.com/toptal/picasso/issues/1305)) ([905f808](https://github.com/toptal/picasso/commit/905f80867f940dd7971a8bb7454a5dc73a42818f))

# [2.13.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.12.10...@toptal/picasso-lab@2.13.0) (2020-05-12)

### Features

- allow custom value for overview block ([#1300](https://github.com/toptal/picasso/issues/1300)) ([88aedc2](https://github.com/toptal/picasso/commit/88aedc26f25a59187f8fb3659e7b7c2fa737d83f))

## [2.12.10](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.12.9...@toptal/picasso-lab@2.12.10) (2020-05-06)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.12.9](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.12.8...@toptal/picasso-lab@2.12.9) (2020-04-30)

### Bug Fixes

- **Accordion:** [FX-873] Add custom summary example, buttons line height ([#1271](https://github.com/toptal/picasso/issues/1271)) ([ea439c3](https://github.com/toptal/picasso/commit/ea439c3422b723aff0e0d6b0b9825d167ac0e87d))

## [2.12.8](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.12.7...@toptal/picasso-lab@2.12.8) (2020-04-29)

### Bug Fixes

- **datepicker:** remove notice from disable days ([#1269](https://github.com/toptal/picasso/issues/1269)) ([621f7b1](https://github.com/toptal/picasso/commit/621f7b1b0708b758e60ff0d7cb76921496ca5c0a)), closes [#1268](https://github.com/toptal/picasso/issues/1268)

## [2.12.7](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.12.6...@toptal/picasso-lab@2.12.7) (2020-04-28)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.12.6](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.12.5...@toptal/picasso-lab@2.12.6) (2020-04-27)

### Bug Fixes

- do not ship material-ui with picasso-lab ([#1258](https://github.com/toptal/picasso/issues/1258)) ([d7b71a4](https://github.com/toptal/picasso/commit/d7b71a4cefdd6d1f9e3f1a75a3981c24bfe0d414))

## [2.12.5](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.12.4...@toptal/picasso-lab@2.12.5) (2020-04-23)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.12.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.12.3...@toptal/picasso-lab@2.12.4) (2020-04-15)

### Bug Fixes

- **subheader:** bottom border position ([#1235](https://github.com/toptal/picasso/issues/1235)) ([896b66e](https://github.com/toptal/picasso/commit/896b66e6e6d65bbd490230e6bcfb478603f0d238))

## [2.12.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.12.2...@toptal/picasso-lab@2.12.3) (2020-04-14)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.12.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.12.1...@toptal/picasso-lab@2.12.2) (2020-04-10)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.12.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.12.0...@toptal/picasso-lab@2.12.1) (2020-04-08)

**Note:** Version bump only for package @toptal/picasso-lab

# [2.12.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.11.1...@toptal/picasso-lab@2.12.0) (2020-04-06)

### Features

- add drawer component ([#1211](https://github.com/toptal/picasso/issues/1211)) ([9dc2233](https://github.com/toptal/picasso/commit/9dc2233bf5cc276205fadba982ccc452b5099175))

## [2.11.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.11.0...@toptal/picasso-lab@2.11.1) (2020-03-30)

**Note:** Version bump only for package @toptal/picasso-lab

# [2.11.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.10.1...@toptal/picasso-lab@2.11.0) (2020-03-27)

### Features

- **pagebanner:** extend with compound components ([#1183](https://github.com/toptal/picasso/issues/1183)) ([79c91a6](https://github.com/toptal/picasso/commit/79c91a61a30652803fabbbfce4643f75df3d3aa2))

## [2.10.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.10.0...@toptal/picasso-lab@2.10.1) (2020-03-26)

### Bug Fixes

- **FormControl:** make label smaller by control width ([#1188](https://github.com/toptal/picasso/issues/1188)) ([9d19225](https://github.com/toptal/picasso/commit/9d192256498145ef78dd3b25642a2b131297907b))

# [2.10.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.9.0...@toptal/picasso-lab@2.10.0) (2020-03-26)

### Features

- add ellipsis on control label overflow ([#1185](https://github.com/toptal/picasso/issues/1185)) ([a38be02](https://github.com/toptal/picasso/commit/a38be02d7a940df73dd6ee4a297ffd694cff71cb))

# [2.9.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.8.3...@toptal/picasso-lab@2.9.0) (2020-03-20)

### Features

- create Ellipsis component ([#1167](https://github.com/toptal/picasso/issues/1167)) ([f475344](https://github.com/toptal/picasso/commit/f47534474a498d1ce33a781d0be65aafb79533ba))

## [2.8.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.8.2...@toptal/picasso-lab@2.8.3) (2020-03-13)

### Bug Fixes

- list type error ([#1163](https://github.com/toptal/picasso/issues/1163)) ([9a33049](https://github.com/toptal/picasso/commit/9a330498c4831419b8f2b2cba661b911c4f91860))

## [2.8.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.8.1...@toptal/picasso-lab@2.8.2) (2020-03-11)

### Bug Fixes

- **Page:** [FX-823] Fix viewport scaling ([#1159](https://github.com/toptal/picasso/issues/1159)) ([a037d1b](https://github.com/toptal/picasso/commit/a037d1bead309b4422df2f7ff07c65b2c36b3a85))

## [2.8.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.8.0...@toptal/picasso-lab@2.8.1) (2020-03-11)

### Bug Fixes

- datepicker popper position ([#1157](https://github.com/toptal/picasso/issues/1157)) ([0fd14b4](https://github.com/toptal/picasso/commit/0fd14b4fdb06733a6f69ebc1aa7ea7f89008690e))

# [2.8.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.7.0...@toptal/picasso-lab@2.8.0) (2020-03-04)

### Features

- list component ([#1139](https://github.com/toptal/picasso/issues/1139)) ([1c1edc7](https://github.com/toptal/picasso/commit/1c1edc78db8d341ff150a756cae880c61915390e))

# [2.7.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.6.2...@toptal/picasso-lab@2.7.0) (2020-02-28)

### Features

- add Breadcrumbs component ([#1132](https://github.com/toptal/picasso/issues/1132)) ([b294b62](https://github.com/toptal/picasso/commit/b294b62a7bd06a1c0d248da5902bf9e51e1a605e))

## [2.6.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.6.1...@toptal/picasso-lab@2.6.2) (2020-02-28)

### Bug Fixes

- visual tests ([d45c9ff](https://github.com/toptal/picasso/commit/d45c9ffb970e904d7bc9b5ccbe3b4d3d0e288c01))

## [2.6.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.6.0...@toptal/picasso-lab@2.6.1) (2020-02-27)

### Bug Fixes

- **DatePicker:** trigger onChange if input is emptied by user ([#1138](https://github.com/toptal/picasso/issues/1138)) ([9c39370](https://github.com/toptal/picasso/commit/9c39370bb61e907a6201f54ded2d0a8704cef16b))

# [2.6.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.5.0...@toptal/picasso-lab@2.6.0) (2020-02-26)

### Features

- add Subheader component ([#1126](https://github.com/toptal/picasso/issues/1126)) ([8a19bbc](https://github.com/toptal/picasso/commit/8a19bbc38dd2423c9daa2a0dd240c704d0ccbf95))

# [2.5.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.4.0...@toptal/picasso-lab@2.5.0) (2020-02-25)

### Features

- **DatePicker:** add renderDay ([#1128](https://github.com/toptal/picasso/issues/1128)) ([2ebad3c](https://github.com/toptal/picasso/commit/2ebad3cfe1aacb3059a8710fdda1c2fbb6c16eee))

# [2.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.3.0...@toptal/picasso-lab@2.4.0) (2020-02-20)

### Features

- add test utils ([#1123](https://github.com/toptal/picasso/issues/1123)) ([eddc6df](https://github.com/toptal/picasso/commit/eddc6df73c7be5071012a227e1932b607964f6bc))

# [2.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.2.0...@toptal/picasso-lab@2.3.0) (2020-02-19)

### Features

- disable overviewblock outline ([#1119](https://github.com/toptal/picasso/issues/1119)) ([dae5753](https://github.com/toptal/picasso/commit/dae5753faff4dded14edf92f2521524bc324fe27))

# [2.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.1.2...@toptal/picasso-lab@2.2.0) (2020-02-13)

### Features

- upgrade material-ui to 4.9.2 ([#1101](https://github.com/toptal/picasso/issues/1101)) ([3082e50](https://github.com/toptal/picasso/commit/3082e5081999e673b120d21e4a902cc300d2f922))

## [2.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.1.1...@toptal/picasso-lab@2.1.2) (2020-02-12)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.1.0...@toptal/picasso-lab@2.1.1) (2020-02-12)

### Bug Fixes

- **DatePicker:** highlight differently not selectable dates ([#1110](https://github.com/toptal/picasso/issues/1110)) ([8ca8ef5](https://github.com/toptal/picasso/commit/8ca8ef5f02df734d78e54fba860d45c6ddcf25ff))

# [2.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.0.3...@toptal/picasso-lab@2.1.0) (2020-02-04)

### Features

- **popper:** expose popper container props to inputs ([#1050](https://github.com/toptal/picasso/issues/1050)) ([345d732](https://github.com/toptal/picasso/commit/345d7328b1ce915cc259807a55493f7b1e64ba03))

## [2.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.0.2...@toptal/picasso-lab@2.0.3) (2020-01-31)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.0.1...@toptal/picasso-lab@2.0.2) (2020-01-27)

**Note:** Version bump only for package @toptal/picasso-lab

## [2.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@2.0.0...@toptal/picasso-lab@2.0.1) (2020-01-24)

**Note:** Version bump only for package @toptal/picasso-lab

# [2.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.6.6...@toptal/picasso-lab@2.0.0) (2020-01-24)

### Features

- **overviewblock:** refactor CounterBlock to OverviewBlock ([#1045](https://github.com/toptal/picasso/issues/1045)) ([f3e8e6a](https://github.com/toptal/picasso/commit/f3e8e6a1b724b9f4dff3bf0556987beae5864880))

### BREAKING CHANGES

- **overviewblock:** CounterBlock is replaced with OverviewBlock

## [1.6.6](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.6.5...@toptal/picasso-lab@1.6.6) (2020-01-24)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.6.5](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.6.4...@toptal/picasso-lab@1.6.5) (2020-01-24)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.6.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.6.3...@toptal/picasso-lab@1.6.4) (2020-01-23)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.6.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.6.2...@toptal/picasso-lab@1.6.3) (2020-01-22)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.6.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.6.1...@toptal/picasso-lab@1.6.2) (2020-01-21)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.6.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.6.0...@toptal/picasso-lab@1.6.1) (2020-01-21)

**Note:** Version bump only for package @toptal/picasso-lab

# [1.6.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.5.9...@toptal/picasso-lab@1.6.0) (2020-01-20)

### Bug Fixes

- move error handing outside of DatePicker ([#1017](https://github.com/toptal/picasso/issues/1017)) ([73d336a](https://github.com/toptal/picasso/commit/73d336a8e43b5c3456598ff96e1c98a853350a14))
- **counterblock:** hover effect ([#1011](https://github.com/toptal/picasso/issues/1011)) ([3b95422](https://github.com/toptal/picasso/commit/3b9542228be0ce5569feac1071683f9c9ba1caa0))
- **DatePicker:** disable autofill by default ([#1015](https://github.com/toptal/picasso/issues/1015)) ([f25af39](https://github.com/toptal/picasso/commit/f25af39b9d464c887aa1e8d1c4a810428b100bea))

### Features

- **DatePicker:** add mindate property to datepicker ([#1018](https://github.com/toptal/picasso/issues/1018)) ([1371c7f](https://github.com/toptal/picasso/commit/1371c7f30972f9bf44df502b356058002ee048c3))
- **DatePicker:** cover limits ([#1019](https://github.com/toptal/picasso/issues/1019)) ([e27e687](https://github.com/toptal/picasso/commit/e27e68761d47b3def926ed6a9431e746f4093389))

## [1.5.9](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.5.8...@toptal/picasso-lab@1.5.9) (2020-01-13)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.5.8](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.5.7...@toptal/picasso-lab@1.5.8) (2020-01-10)

### Bug Fixes

- **datepicker:** fix resetting to empty value ([#1009](https://github.com/toptal/picasso/issues/1009)) ([4999b54](https://github.com/toptal/picasso/commit/4999b54c8a0dbcf977da5ff1ad59d58ae850026f))

## [1.5.7](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.5.6...@toptal/picasso-lab@1.5.7) (2020-01-09)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.5.6](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.5.5...@toptal/picasso-lab@1.5.6) (2020-01-09)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.5.5](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.5.4...@toptal/picasso-lab@1.5.5) (2020-01-09)

### Bug Fixes

- **datepicker:** fix the picker in Safari ([#1001](https://github.com/toptal/picasso/issues/1001)) ([914a546](https://github.com/toptal/picasso/commit/914a5467eb882615e135159d64bf96a43d39c6c5)), closes [#1000](https://github.com/toptal/picasso/issues/1000)

## [1.5.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.5.3...@toptal/picasso-lab@1.5.4) (2020-01-09)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.5.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.5.2...@toptal/picasso-lab@1.5.3) (2020-01-07)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.5.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.5.1...@toptal/picasso-lab@1.5.2) (2020-01-02)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.5.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.5.0...@toptal/picasso-lab@1.5.1) (2020-01-02)

**Note:** Version bump only for package @toptal/picasso-lab

# [1.5.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.22...@toptal/picasso-lab@1.5.0) (2019-12-27)

### Features

- **DatePicker:** [FX-631] Calendar to be rendered in Popper ([#989](https://github.com/toptal/picasso/issues/989)) ([a395cc7](https://github.com/toptal/picasso/commit/a395cc74e7449f2b2db2eba27c65f45ba00ac38a))

## [1.4.22](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.21...@toptal/picasso-lab@1.4.22) (2019-12-26)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.21](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.20...@toptal/picasso-lab@1.4.21) (2019-12-26)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.20](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.19...@toptal/picasso-lab@1.4.20) (2019-12-25)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.19](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.18...@toptal/picasso-lab@1.4.19) (2019-12-24)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.18](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.17...@toptal/picasso-lab@1.4.18) (2019-12-24)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.17](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.16...@toptal/picasso-lab@1.4.17) (2019-12-20)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.16](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.15...@toptal/picasso-lab@1.4.16) (2019-12-20)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.15](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.14...@toptal/picasso-lab@1.4.15) (2019-12-17)

### Bug Fixes

- upgrade simple-react-calendar to the stable version ([#972](https://github.com/toptal/picasso/issues/972)) ([53b0133](https://github.com/toptal/picasso/commit/53b013369714939dcf60a643505c04452635bc38))

## [1.4.14](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.13...@toptal/picasso-lab@1.4.14) (2019-12-17)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.13](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.12...@toptal/picasso-lab@1.4.13) (2019-12-17)

### Bug Fixes

- upgrade simple-react-calendar ([#969](https://github.com/toptal/picasso/issues/969)) ([2b5b43d](https://github.com/toptal/picasso/commit/2b5b43dde84a481f6109cab981884175dad9b937))

## [1.4.12](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.11...@toptal/picasso-lab@1.4.12) (2019-12-16)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.11](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.10...@toptal/picasso-lab@1.4.11) (2019-12-13)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.10](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.9...@toptal/picasso-lab@1.4.10) (2019-12-13)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.9](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.8...@toptal/picasso-lab@1.4.9) (2019-12-13)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.8](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.7...@toptal/picasso-lab@1.4.8) (2019-12-12)

### Bug Fixes

- **DatePicker:** fix width prop ([#961](https://github.com/toptal/picasso/issues/961)) ([80ed90d](https://github.com/toptal/picasso/commit/80ed90dffd16954643cefefada821dd6cb97883e))

## [1.4.7](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.6...@toptal/picasso-lab@1.4.7) (2019-12-12)

### Bug Fixes

- [FX-653] Fix em-related sizes in components ([#958](https://github.com/toptal/picasso/issues/958)) ([726799c](https://github.com/toptal/picasso/commit/726799c02a11e4f23b7bc211eeb5c51a101ae2ce))

## [1.4.6](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.5...@toptal/picasso-lab@1.4.6) (2019-12-12)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.5](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.4...@toptal/picasso-lab@1.4.5) (2019-12-11)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.4](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.3...@toptal/picasso-lab@1.4.4) (2019-12-10)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.2...@toptal/picasso-lab@1.4.3) (2019-12-10)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.1...@toptal/picasso-lab@1.4.2) (2019-12-10)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.4.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.4.0...@toptal/picasso-lab@1.4.1) (2019-12-10)

**Note:** Version bump only for package @toptal/picasso-lab

# [1.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.3.0...@toptal/picasso-lab@1.4.0) (2019-12-09)

### Features

- **DatePicker:** [FX-608] Add default icon ([#944](https://github.com/toptal/picasso/issues/944)) ([9b0240f](https://github.com/toptal/picasso/commit/9b0240f4ecda048198774be588da7ec25c59f883))

# [1.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.2.3...@toptal/picasso-lab@1.3.0) (2019-12-09)

### Features

- **Datepicker:** general improvements ([#943](https://github.com/toptal/picasso/issues/943)) ([667612a](https://github.com/toptal/picasso/commit/667612a7460c6ee1eebeeb321bf2bf3a70c7bda4))

## [1.2.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.2.2...@toptal/picasso-lab@1.2.3) (2019-12-09)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.2.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.2.1...@toptal/picasso-lab@1.2.2) (2019-12-05)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.2.0...@toptal/picasso-lab@1.2.1) (2019-12-05)

### Bug Fixes

- fix tree-shaking ([#941](https://github.com/toptal/picasso/issues/941)) ([6a9d2a0](https://github.com/toptal/picasso/commit/6a9d2a02f8c692e3b061a026d3cc5d748e9f2263))

# [1.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.1.0...@toptal/picasso-lab@1.2.0) (2019-12-05)

### Features

- **Input:** small size variant ([#932](https://github.com/toptal/picasso/issues/932)) ([b5a049c](https://github.com/toptal/picasso/commit/b5a049c0b7659e5885674482ae75a64487d5122b))

# [1.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.0.3...@toptal/picasso-lab@1.1.0) (2019-12-05)

### Features

- **CounterBlock:** add CounterBlock component ([#935](https://github.com/toptal/picasso/issues/935)) ([33b182b](https://github.com/toptal/picasso/commit/33b182b57063f04542b6af72602a967807a55607))

## [1.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.0.2...@toptal/picasso-lab@1.0.3) (2019-12-04)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.0.1...@toptal/picasso-lab@1.0.2) (2019-12-03)

**Note:** Version bump only for package @toptal/picasso-lab

## [1.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-lab@1.0.0...@toptal/picasso-lab@1.0.1) (2019-12-03)

**Note:** Version bump only for package @toptal/picasso-lab

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
