# @toptal/picasso-container

## 3.1.5

### Patch Changes

- [#4963](https://github.com/toptal/picasso/pull/4963) [`440f217`](https://github.com/toptal/picasso/commit/440f217c1748d09beeca90e5277d2137d4251897) Thanks [@dulishkovych](https://github.com/dulishkovych)!
  [PF-2031] Upgrade TypeScript to v5.5 and align davinci tooling to v25/v15/v19/v8/v3
  **BREAKING:** the `typescript` peer dependency on every published package moves from `~4.7.0` to `^5.5.0`. Consumers must be on TypeScript 5.5 or newer to install these packages. No other consumer code changes should be required — see "Public type surface" below.
  Picasso now builds against TypeScript 5.5 and pulls its lint/test/codegen infrastructure from `@toptal/davinci-syntax@25`, `@toptal/davinci-engine@15`, `@toptal/davinci-qa@19.1`, `@toptal/davinci-ci@8`, and `@toptal/davinci-code@3` (the stable releases of toptal/davinci#2677). Build, typecheck, and lint all pass clean (0 errors).
  Public type surface:
  - the `OverridableComponent<P>` type in `@toptal/picasso-shared` is rewritten as a single-signature interface `(props: P & { [key: string]: any }) => JSX.Element | null`. declared fields of `P` remain strictly typed at JSX call sites (e.g. `<Button size={42} />` still errors), and any other prop is accepted untyped. this preserves the polymorphic `as`-prop usage pattern and lets `forwardRef<R, P>(...)` assign directly without an escape hatch. trade-off versus the pre-PF-2031 shape: TypeScript no longer pulls prop types FROM the `as` target — `<Button as={Link} to={...} />` does not validate `to` against `Link`'s props. full polymorphic-inheritance typing for the `as` prop is tracked in FF-125.
  Internal type adjustments in `Tagselector`, `Container`, `Menu`, `PromptModal`, and `NumberInput` (not publicly exported) resolve build/lint regressions surfaced by `@typescript-eslint` v8. `OverviewBlock`, `Page`, `Breadcrumbs`, `Button`, `ButtonBase`, `ButtonCircular`, `MenuItem`, `Link`, and `SidebarItem` compile cleanly without source changes under the new `OverridableComponent` shape. `ButtonAction` got a one-line internal fix (an `icon` helper returning `null` where `ReactElement | undefined` was declared) that the stricter declared-prop typing in the new shape surfaced.
- Updated dependencies []:
  - @toptal/picasso-utils@4.0.1

## 3.1.4

### Patch Changes

- Updated dependencies [[`e93f40b`](https://github.com/toptal/picasso/commit/e93f40bf03c4ea943ff9561c2dd032125a05ffc1)]:
  - @toptal/picasso-utils@4.0.0

## 3.1.3

### Patch Changes

- [#4889](https://github.com/toptal/picasso/pull/4889) [`2adb04e`](https://github.com/toptal/picasso/commit/2adb04ec87a955ef8e6bf7631ea50f2e485418f2) Thanks [@OleksandrNechai](https://github.com/OleksandrNechai)!
- remove deprecated defaultProps from Container, MonthSelect, and Select components

## 3.1.2

### Patch Changes

- Updated dependencies [[`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447)]:
  - @toptal/picasso-utils@3.1.0

## 3.1.1

### Patch Changes

- Updated dependencies [[`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498)]:
  - @toptal/picasso-utils@3.0.0

## 3.1.0

### Minor Changes

- [#4548](https://github.com/toptal/picasso/pull/4548) [`b44b4bb`](https://github.com/toptal/picasso/commit/b44b4bbc12075d379a87395c3786736007bedc98) Thanks [@ertrzyiks](https://github.com/ertrzyiks)!
- add wrap property to control flex-wrap

## 3.0.1

### Patch Changes

- Updated dependencies [[`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d)]:
  - @toptal/picasso-utils@2.0.0

## 3.0.0

### Major Changes

- [#4500](https://github.com/toptal/picasso/pull/4500) [`3ed8c02`](https://github.com/toptal/picasso/commit/3ed8c0271982a82dd9cdc6b967c63656afd3654f) Thanks [@ruslan-sed](https://github.com/ruslan-sed)!
- update version of `@toptal/picasso-tailwind-merge` peer dependency

## 2.0.0

### Major Changes

- [#4409](https://github.com/toptal/picasso/pull/4409) [`0351ab2`](https://github.com/toptal/picasso/commit/0351ab22db1dad0b1de81d37e4d0365b3eb5ad3f) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Container

- migrate to TailwindCSS, material-ui@4 is no longer required for this package
- make "@toptal/picasso-tailwind-merge": "^1.1.1" a peer dependency
- the "@toptal/picasso-tailwind" package has been updated to the latest version in peerDependencies

### Picasso, AccountSelect, Alert, ApplicationUpdateNotification, Autocomplete, Avatar, Button, Calendar, Carousel, Checkbox, DatePicker, Drawer, Dropzone, EmptyState, FileInput, Form, Helpbox, Input, InputAdornment, List, Menu, Note, Notification, NumberInput, OverviewBlock, Page, Pagination, PromptModal, Quote, Rating, Section, Select, Tabs, Timeline, TreeView, Forms, QueryBuilder, RichTextEditor, AnalyticsCharts

- the "@toptal/picasso-tailwind" package has been updated to the latest version in peerDependencies

### Minor Changes

- [#4414](https://github.com/toptal/picasso/pull/4414) [`c06cf2c`](https://github.com/toptal/picasso/commit/c06cf2c21d6cd294ef4903613268e747670f252b) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Alert, Helpbox, Container

- all variants except white (in Container only) and transparent now have a 1px border by default.

## 1.0.3

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-utils@1.0.3

## 1.0.2

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-utils@1.0.2

## 1.0.1

### Patch Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages
- Updated dependencies [[`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30)]:
  - @toptal/picasso-utils@1.0.1
