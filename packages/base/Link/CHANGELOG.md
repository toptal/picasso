# @toptal/picasso-link

## 3.0.7

### Patch Changes

- [#4797](https://github.com/toptal/picasso/pull/4797) [`c90ccde`](https://github.com/toptal/picasso/commit/c90ccdefa944fc3576bcccb060bb68119a7807e6) Thanks [@sashuk](https://github.com/sashuk)!
- stop using deprecated way of specifying default component property values (`.defaultProps` will not be supported in the future, please see [this React issue](https://github.com/facebook/react/issues/29233) for details)

## 3.0.6

### Patch Changes

- Updated dependencies [[`dae5bce`](https://github.com/toptal/picasso/commit/dae5bce794a5c4f6406449c83a6e425cfcafff0f)]:
  - @toptal/picasso-typography@4.0.4

## 3.0.5

### Patch Changes

- Updated dependencies [[`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447)]:
  - @toptal/picasso-utils@3.1.0
  - @toptal/picasso-typography@4.0.3

## 3.0.4

### Patch Changes

- Updated dependencies [[`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498)]:
  - @toptal/picasso-utils@3.0.0
  - @toptal/picasso-typography@4.0.2

## 3.0.3

### Patch Changes

- [#4565](https://github.com/toptal/picasso/pull/4565) [`78656d5`](https://github.com/toptal/picasso/commit/78656d5876ea450bc142760dc1b95181378549e6) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- add pointer cursor to Link when only onClick is provided

## 3.0.2

### Patch Changes

- [#4547](https://github.com/toptal/picasso/pull/4547) [`2984ddf`](https://github.com/toptal/picasso/commit/2984ddf167dfc3a08ab7e978ef31ebfc69eae163) Thanks [@OleksandrNechai](https://github.com/OleksandrNechai)!

### Link

- fix: protect Link from unexpected input

## 3.0.1

### Patch Changes

- Updated dependencies [[`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d)]:
  - @toptal/picasso-utils@2.0.0
  - @toptal/picasso-typography@4.0.1

## 3.0.0

### Major Changes

- [#4500](https://github.com/toptal/picasso/pull/4500) [`3ed8c02`](https://github.com/toptal/picasso/commit/3ed8c0271982a82dd9cdc6b967c63656afd3654f) Thanks [@ruslan-sed](https://github.com/ruslan-sed)!
- update version of `@toptal/picasso-tailwind-merge` peer dependency

### Patch Changes

- Updated dependencies [[`3ed8c02`](https://github.com/toptal/picasso/commit/3ed8c0271982a82dd9cdc6b967c63656afd3654f)]:
  - @toptal/picasso-typography@4.0.0

## 2.0.0

### Major Changes

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### Link

- migrated `Link` to not use MUI and only use Tailwind CSS instead

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- add @toptal/picasso-tailwind-merge as peer dependency, it now needs to be provided by the project consuming the package

### Patch Changes

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### Link

- update line-height to match the previous MUI implementation
- Updated dependencies [[`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685)]:
  - @toptal/picasso-typography@3.0.0

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
