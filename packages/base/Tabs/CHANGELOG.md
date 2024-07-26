# @toptal/picasso-tabs

## 3.0.0

### Major Changes

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- migrate to mui/base and TailwindCSS, material-ui@4 is no longer required for this package

  - for horizontal tabs

    - we updated the animation of the active tab
    - we don't have scrollable buttons on side, instead we reuse native browser scrolling

  - update types

  ```diff
  {
  -  value: any
  +  value: string | number | null

  -  onChange: (event: React.ChangeEvent<{}>, value: any) => void
  +  onChange: (event: React.ChangeEvent<{}> | null, value: string | number | null) => null
  }
  ```

- [#4409](https://github.com/toptal/picasso/pull/4409) [`0351ab2`](https://github.com/toptal/picasso/commit/0351ab22db1dad0b1de81d37e4d0365b3eb5ad3f) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Container

- migrate to TailwindCSS, material-ui@4 is no longer required for this package
- make "@toptal/picasso-tailwind-merge": "^1.1.1" a peer dependency
- the "@toptal/picasso-tailwind" package has been updated to the latest version in peerDependencies

### Picasso, AccountSelect, Alert, ApplicationUpdateNotification, Autocomplete, Avatar, Button, Calendar, Carousel, Checkbox, DatePicker, Drawer, Dropzone, EmptyState, FileInput, Form, Helpbox, Input, InputAdornment, List, Menu, Note, Notification, NumberInput, OverviewBlock, Page, Pagination, PromptModal, Quote, Rating, Section, Select, Tabs, Timeline, TreeView, Forms, QueryBuilder, RichTextEditor, AnalyticsCharts

- the "@toptal/picasso-tailwind" package has been updated to the latest version in peerDependencies

### Patch Changes

- Updated dependencies [[`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`c06cf2c`](https://github.com/toptal/picasso/commit/c06cf2c21d6cd294ef4903613268e747670f252b), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`0351ab2`](https://github.com/toptal/picasso/commit/0351ab22db1dad0b1de81d37e4d0365b3eb5ad3f), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685)]:
  - @toptal/picasso-typography@3.0.0
  - @toptal/picasso-container@2.0.0
  - @toptal/picasso-user-badge@3.0.0
  - @toptal/picasso-tailwind-merge@1.2.0
  - @toptal/picasso-typography-overflow@2.0.4

## 2.0.9

### Patch Changes

- Updated dependencies [[`cd00880`](https://github.com/toptal/picasso/commit/cd008802e9701bb6574b3354f9d6e95c6ffc61ed)]:
  - @toptal/picasso-icons@1.5.0
  - @toptal/picasso-user-badge@2.0.8

## 2.0.8

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-user-badge@2.0.7

## 2.0.7

### Patch Changes

- Updated dependencies [[`b2f0d71`](https://github.com/toptal/picasso/commit/b2f0d71869ff4ce899837ca0a57864bc839e1394)]:
  - @toptal/picasso-typography-overflow@2.0.3

## 2.0.6

### Patch Changes

- Updated dependencies [[`f267743`](https://github.com/toptal/picasso/commit/f2677435e4e43253d87d5bb4105f0bb540dca56e)]:
  - @toptal/picasso-icons@1.4.0
  - @toptal/picasso-user-badge@2.0.6

## 2.0.5

### Patch Changes

- Updated dependencies [[`87ace4e`](https://github.com/toptal/picasso/commit/87ace4e92a7ec66d5312ac62cefffc41cb0899a0)]:
  - @toptal/picasso-icons@1.3.0
  - @toptal/picasso-user-badge@2.0.5

## 2.0.4

### Patch Changes

- Updated dependencies [[`2820f38`](https://github.com/toptal/picasso/commit/2820f38931f1b2736c4ad20b5609ca562da0d515)]:
  - @toptal/picasso-typography@2.0.2
  - @toptal/picasso-typography-overflow@2.0.2
  - @toptal/picasso-user-badge@2.0.4

## 2.0.3

### Patch Changes

- Updated dependencies [[`978ae36`](https://github.com/toptal/picasso/commit/978ae36fa8e0306ecbffdddf1a725dc0997c3d6e)]:
  - @toptal/picasso-icons@1.2.0
  - @toptal/picasso-user-badge@2.0.3

## 2.0.2

### Patch Changes

- Updated dependencies [[`d599529`](https://github.com/toptal/picasso/commit/d599529bcb283c367b63c612fee81394e66c9740)]:
  - @toptal/picasso-shared@15.0.0
  - @toptal/picasso-utils@1.0.3
  - @toptal/picasso-user-badge@2.0.2
  - @toptal/picasso-container@1.0.3
  - @toptal/picasso-typography@2.0.1
  - @toptal/picasso-typography-overflow@2.0.1
  - @toptal/picasso-icons@1.1.1

## 2.0.1

### Patch Changes

- Updated dependencies [[`c7560ae`](https://github.com/toptal/picasso/commit/c7560aed9dd41bb458c5532608ddd542890523e5)]:
  - @toptal/picasso-icons@1.1.0
  - @toptal/picasso-user-badge@2.0.1

## 2.0.0

### Major Changes

- [#4200](https://github.com/toptal/picasso/pull/4200) [`4ee1ebdafd9e5830d5ec6007620186d5a61befee`](https://github.com/toptal/picasso/commit/4ee1ebdafd9e5830d5ec6007620186d5a61befee) Thanks [@mkrl](https://github.com/mkrl)!
- added a `tailwindcss` dependency (tailwindcss is now required to make this package work)

### Patch Changes

- Updated dependencies [[`4ee1ebd`](https://github.com/toptal/picasso/commit/4ee1ebdafd9e5830d5ec6007620186d5a61befee), [`4ee1ebd`](https://github.com/toptal/picasso/commit/4ee1ebdafd9e5830d5ec6007620186d5a61befee)]:
  - @toptal/picasso-typography@2.0.0
  - @toptal/picasso-typography-overflow@2.0.0
  - @toptal/picasso-user-badge@2.0.0

## 1.0.5

### Patch Changes

- [#4224](https://github.com/toptal/picasso/pull/4224) [`c05387de5636ed094365d1eff67b955d84b81c61`](https://github.com/toptal/picasso/commit/c05387de5636ed094365d1eff67b955d84b81c61) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- revert types for compound components

- Updated dependencies []:
  - @toptal/picasso-user-badge@1.0.4

## 1.0.4

### Patch Changes

- [#4216](https://github.com/toptal/picasso/pull/4216) [`3512588b06c3660471a68500275321c640278cf0`](https://github.com/toptal/picasso/commit/3512588b06c3660471a68500275321c640278cf0) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- update types for the compound component

- Updated dependencies []:
  - @toptal/picasso-user-badge@1.0.3

## 1.0.3

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-typography-overflow@1.0.3

## 1.0.2

### Patch Changes

- Updated dependencies [[`a1d523092cc4de6cb376156435b99b1e483f39b9`](https://github.com/toptal/picasso/commit/a1d523092cc4de6cb376156435b99b1e483f39b9)]:
  - @toptal/picasso-shared@14.0.1
  - @toptal/picasso-utils@1.0.2
  - @toptal/picasso-user-badge@1.0.2
  - @toptal/picasso-container@1.0.2
  - @toptal/picasso-typography@1.0.2
  - @toptal/picasso-typography-overflow@1.0.2
  - @toptal/picasso-icons@1.0.2

## 1.0.1

### Patch Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages
- Updated dependencies [[`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30)]:
  - @toptal/picasso-shared@14.0.0
  - @toptal/picasso-typography-overflow@1.0.1
  - @toptal/picasso-typography@1.0.1
  - @toptal/picasso-container@1.0.1
  - @toptal/picasso-user-badge@1.0.1
  - @toptal/picasso-icons@1.0.1
  - @toptal/picasso-utils@1.0.1
