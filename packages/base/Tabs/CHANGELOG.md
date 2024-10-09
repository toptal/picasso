# @toptal/picasso-tabs

## 5.0.6

### Patch Changes

- Updated dependencies [[`f8cb675`](https://github.com/toptal/picasso/commit/f8cb675a660c22afd128bbdb76c4eeeac9f9ca27)]:
  - @toptal/picasso-icons@1.8.0
  - @toptal/picasso-user-badge@5.1.5

## 5.0.5

### Patch Changes

- Updated dependencies [[`0dda7dc`](https://github.com/toptal/picasso/commit/0dda7dc3dd41aba05055f3d765497831f816cfaa)]:
  - @toptal/picasso-user-badge@5.1.4

## 5.0.4

### Patch Changes

- Updated dependencies [[`0d88ec7`](https://github.com/toptal/picasso/commit/0d88ec7dfab46c4eb02669ee8d69a921e6cac569)]:
  - @toptal/picasso-icons@1.7.0
  - @toptal/picasso-user-badge@5.1.3

## 5.0.3

### Patch Changes

- [#4529](https://github.com/toptal/picasso/pull/4529) [`e7e45d2`](https://github.com/toptal/picasso/commit/e7e45d2349d548bee964db8aebe55c5326725329) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- add `data-component-type='tabs'` to the root

## 5.0.2

### Patch Changes

- Updated dependencies [[`b44b4bb`](https://github.com/toptal/picasso/commit/b44b4bbc12075d379a87395c3786736007bedc98)]:
  - @toptal/picasso-container@3.1.0
  - @toptal/picasso-user-badge@5.1.2

## 5.0.1

### Patch Changes

- Updated dependencies [[`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d)]:
  - @toptal/picasso-utils@2.0.0
  - @toptal/picasso-typography-overflow@4.0.1
  - @toptal/picasso-container@3.0.1
  - @toptal/picasso-icons@1.6.1
  - @toptal/picasso-typography@4.0.1
  - @toptal/picasso-user-badge@5.1.1

## 5.0.0

### Major Changes

- [#4526](https://github.com/toptal/picasso/pull/4526) [`310302a`](https://github.com/toptal/picasso/commit/310302a66ec446973398cee560d38ba9bf716fbd) Thanks [@angelinastavniiciuc](https://github.com/angelinastavniiciuc)!
- revert add `expandIconPlacement` prop to Picasso Accordion

### Patch Changes

- Updated dependencies [[`310302a`](https://github.com/toptal/picasso/commit/310302a66ec446973398cee560d38ba9bf716fbd)]:
  - @toptal/picasso-typography-overflow@4.0.0

## 4.0.8

### Patch Changes

- Updated dependencies [[`2903881`](https://github.com/toptal/picasso/commit/290388118eb10b866f3078eebac26755573d0ca6)]:
  - @toptal/picasso-typography-overflow@3.0.0

## 4.0.7

### Patch Changes

- Updated dependencies [[`9e089cc`](https://github.com/toptal/picasso/commit/9e089cc183a95391f73dc0bf28c59b3c1bfa4758)]:
  - @toptal/picasso-user-badge@5.1.0

## 4.0.6

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-user-badge@5.0.1

## 4.0.5

### Patch Changes

- Updated dependencies [[`3ed8c02`](https://github.com/toptal/picasso/commit/3ed8c0271982a82dd9cdc6b967c63656afd3654f)]:
  - @toptal/picasso-container@3.0.0
  - @toptal/picasso-typography@4.0.0
  - @toptal/picasso-user-badge@5.0.0
  - @toptal/picasso-typography-overflow@2.0.5

## 4.0.4

### Patch Changes

- Updated dependencies [[`fb36465`](https://github.com/toptal/picasso/commit/fb3646581c0be1ded3754978d73e8443514a968d)]:
  - @toptal/picasso-user-badge@4.0.0

## 4.0.3

### Patch Changes

- [#4489](https://github.com/toptal/picasso/pull/4489) [`a5d61c8`](https://github.com/toptal/picasso/commit/a5d61c8f5295a669e480a5baadced66cfe80b711) Thanks [@sashuk](https://github.com/sashuk)!
- fix styles in Badge component
  - add "badge in tab" case to Tabs storybook stories
  - fix font size for Checkbox root

## 4.0.2

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-user-badge@3.0.2

## 4.0.1

### Patch Changes

- [#4484](https://github.com/toptal/picasso/pull/4484) [`30f8a78`](https://github.com/toptal/picasso/commit/30f8a782c340b2148df2876b2cd7b927c6e09142) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- fix value type from `null` to `false` when empty

## 4.0.0

### Major Changes

- [#4471](https://github.com/toptal/picasso/pull/4471) [`e5b6e64`](https://github.com/toptal/picasso/commit/e5b6e64fcb0e5e4d0e5fc45a46230cb706d0d13b) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- revert migration to mui/base

## 3.0.1

### Patch Changes

- Updated dependencies [[`941aaa8`](https://github.com/toptal/picasso/commit/941aaa827318acc969968b1b770ddb5bb63471a7)]:
  - @toptal/picasso-icons@1.6.0
  - @toptal/picasso-user-badge@3.0.1

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
