# @toptal/picasso-typography

## 4.0.2

### Patch Changes

- Updated dependencies [[`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498)]:
  - @toptal/picasso-utils@3.0.0

## 4.0.1

### Patch Changes

- Updated dependencies [[`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d)]:
  - @toptal/picasso-utils@2.0.0

## 4.0.0

### Major Changes

- [#4500](https://github.com/toptal/picasso/pull/4500) [`3ed8c02`](https://github.com/toptal/picasso/commit/3ed8c0271982a82dd9cdc6b967c63656afd3654f) Thanks [@ruslan-sed](https://github.com/ruslan-sed)!
- update version of `@toptal/picasso-tailwind-merge` peer dependency

## 3.0.0

### Major Changes

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- add @toptal/picasso-tailwind-merge as peer dependency, it now needs to be provided by the project consuming the package

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- bump `@toptal/tailwind-merge` to version `1.2.0` to correctly merge classes when using font-weight-inherit and text-align-inherit

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- remove `getTypographyClassName`, `TypographyOptions`, and `typographyStyles`

## 2.0.2

### Patch Changes

- [#4307](https://github.com/toptal/picasso/pull/4307) [`2820f38931f1b2736c4ad20b5609ca562da0d515`](https://github.com/toptal/picasso/commit/2820f38931f1b2736c4ad20b5609ca562da0d515) Thanks [@ruslan-sed](https://github.com/ruslan-sed)!
- replace `classnames` with `twMerge`

## 2.0.1

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-utils@1.0.3

## 2.0.0

### Major Changes

- [#4200](https://github.com/toptal/picasso/pull/4200) [`4ee1ebdafd9e5830d5ec6007620186d5a61befee`](https://github.com/toptal/picasso/commit/4ee1ebdafd9e5830d5ec6007620186d5a61befee) Thanks [@mkrl](https://github.com/mkrl)!
- migrate Typography to TailwindCSS
  - style overrides for Typography have been moved to picasso-provider
  - added utility classes `font-inherit-weight` and `font-inherit-size` to Picasso Tailwind config

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
