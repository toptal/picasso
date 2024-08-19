# @toptal/picasso-avatar

## 5.0.2

### Patch Changes

- Updated dependencies [[`13863c9`](https://github.com/toptal/picasso/commit/13863c98aa0b73e202b0b46f6bdedbfb9de66177)]:
  - @toptal/picasso-image@2.0.0

## 5.0.1

### Patch Changes

- Updated dependencies [[`941aaa8`](https://github.com/toptal/picasso/commit/941aaa827318acc969968b1b770ddb5bb63471a7)]:
  - @toptal/picasso-icons@1.6.0
  - @toptal/picasso-logo@1.0.9

## 5.0.0

### Major Changes

- [#4409](https://github.com/toptal/picasso/pull/4409) [`0351ab2`](https://github.com/toptal/picasso/commit/0351ab22db1dad0b1de81d37e4d0365b3eb5ad3f) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Container

- migrate to TailwindCSS, material-ui@4 is no longer required for this package
- make "@toptal/picasso-tailwind-merge": "^1.1.1" a peer dependency
- the "@toptal/picasso-tailwind" package has been updated to the latest version in peerDependencies

### Picasso, AccountSelect, Alert, ApplicationUpdateNotification, Autocomplete, Avatar, Button, Calendar, Carousel, Checkbox, DatePicker, Drawer, Dropzone, EmptyState, FileInput, Form, Helpbox, Input, InputAdornment, List, Menu, Note, Notification, NumberInput, OverviewBlock, Page, Pagination, PromptModal, Quote, Rating, Section, Select, Tabs, Timeline, TreeView, Forms, QueryBuilder, RichTextEditor, AnalyticsCharts

- the "@toptal/picasso-tailwind" package has been updated to the latest version in peerDependencies

### Patch Changes

- Updated dependencies [[`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`c06cf2c`](https://github.com/toptal/picasso/commit/c06cf2c21d6cd294ef4903613268e747670f252b), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`0351ab2`](https://github.com/toptal/picasso/commit/0351ab22db1dad0b1de81d37e4d0365b3eb5ad3f)]:
  - @toptal/picasso-typography@3.0.0
  - @toptal/picasso-container@2.0.0

## 4.0.0

### Major Changes

- [#4400](https://github.com/toptal/picasso/pull/4400) [`a7c226f`](https://github.com/toptal/picasso/commit/a7c226f33753682c001e31b76aa72e9e8172d5a4) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Avatar, AvatarGroup

- add `showEmblem` prop to Avatar and AvatarGroup to enable display of Toptal logo
- remove `variant` prop because we no longer display avatar as `portrait` or `landscape`
- these changes are the result of the design update that can be tracked [here](https://www.figma.com/design/bUFkua511v5UOOpn08KSZO/Library-2.0?node-id=15794-15305&t=pLpfBxoMagKCtLIi-4)

### Patch Changes

- Updated dependencies [[`cd00880`](https://github.com/toptal/picasso/commit/cd008802e9701bb6574b3354f9d6e95c6ffc61ed)]:
  - @toptal/picasso-icons@1.5.0
  - @toptal/picasso-logo@1.0.8

## 3.0.0

### Major Changes

- [#4385](https://github.com/toptal/picasso/pull/4385) [`1c99af999c8a242e1035a5416a5d63411a0abaf2`](https://github.com/toptal/picasso/commit/1c99af999c8a242e1035a5416a5d63411a0abaf2) Thanks [@ruslan-sed](https://github.com/ruslan-sed)!
- migrate `Avatar` to `TailwindCSS`

## 2.0.6

### Patch Changes

- Updated dependencies [[`f267743`](https://github.com/toptal/picasso/commit/f2677435e4e43253d87d5bb4105f0bb540dca56e)]:
  - @toptal/picasso-icons@1.4.0
  - @toptal/picasso-logo@1.0.7

## 2.0.5

### Patch Changes

- Updated dependencies [[`87ace4e`](https://github.com/toptal/picasso/commit/87ace4e92a7ec66d5312ac62cefffc41cb0899a0)]:
  - @toptal/picasso-icons@1.3.0
  - @toptal/picasso-logo@1.0.6

## 2.0.4

### Patch Changes

- Updated dependencies [[`2820f38`](https://github.com/toptal/picasso/commit/2820f38931f1b2736c4ad20b5609ca562da0d515)]:
  - @toptal/picasso-typography@2.0.2

## 2.0.3

### Patch Changes

- Updated dependencies [[`978ae36`](https://github.com/toptal/picasso/commit/978ae36fa8e0306ecbffdddf1a725dc0997c3d6e)]:
  - @toptal/picasso-icons@1.2.0
  - @toptal/picasso-logo@1.0.5

## 2.0.2

### Patch Changes

- Updated dependencies [[`d599529`](https://github.com/toptal/picasso/commit/d599529bcb283c367b63c612fee81394e66c9740)]:
  - @toptal/picasso-shared@15.0.0
  - @toptal/picasso-utils@1.0.3
  - @toptal/picasso-container@1.0.3
  - @toptal/picasso-typography@2.0.1
  - @toptal/picasso-icons@1.1.1
  - @toptal/picasso-image@1.0.3
  - @toptal/picasso-logo@1.0.4

## 2.0.1

### Patch Changes

- Updated dependencies [[`c7560ae`](https://github.com/toptal/picasso/commit/c7560aed9dd41bb458c5532608ddd542890523e5)]:
  - @toptal/picasso-icons@1.1.0
  - @toptal/picasso-logo@1.0.3

## 2.0.0

### Major Changes

- [#4200](https://github.com/toptal/picasso/pull/4200) [`4ee1ebdafd9e5830d5ec6007620186d5a61befee`](https://github.com/toptal/picasso/commit/4ee1ebdafd9e5830d5ec6007620186d5a61befee) Thanks [@mkrl](https://github.com/mkrl)!
- added a `tailwindcss` dependency (tailwindcss is now required to make this package work)

### Patch Changes

- Updated dependencies [[`4ee1ebd`](https://github.com/toptal/picasso/commit/4ee1ebdafd9e5830d5ec6007620186d5a61befee)]:
  - @toptal/picasso-typography@2.0.0

## 1.0.4

### Patch Changes

- [#4224](https://github.com/toptal/picasso/pull/4224) [`c05387de5636ed094365d1eff67b955d84b81c61`](https://github.com/toptal/picasso/commit/c05387de5636ed094365d1eff67b955d84b81c61) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- revert types for compound components

## 1.0.3

### Patch Changes

- [#4216](https://github.com/toptal/picasso/pull/4216) [`3512588b06c3660471a68500275321c640278cf0`](https://github.com/toptal/picasso/commit/3512588b06c3660471a68500275321c640278cf0) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- update types for the compound component

## 1.0.2

### Patch Changes

- Updated dependencies [[`a1d523092cc4de6cb376156435b99b1e483f39b9`](https://github.com/toptal/picasso/commit/a1d523092cc4de6cb376156435b99b1e483f39b9)]:
  - @toptal/picasso-shared@14.0.1
  - @toptal/picasso-utils@1.0.2
  - @toptal/picasso-container@1.0.2
  - @toptal/picasso-typography@1.0.2
  - @toptal/picasso-icons@1.0.2
  - @toptal/picasso-image@1.0.2
  - @toptal/picasso-logo@1.0.2

## 1.0.1

### Patch Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages
- Updated dependencies [[`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30)]:
  - @toptal/picasso-shared@14.0.0
  - @toptal/picasso-typography@1.0.1
  - @toptal/picasso-container@1.0.1
  - @toptal/picasso-icons@1.0.1
  - @toptal/picasso-image@1.0.1
  - @toptal/picasso-utils@1.0.1
  - @toptal/picasso-logo@1.0.1
