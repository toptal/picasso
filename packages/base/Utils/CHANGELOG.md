# @toptal/picasso-utils

## 3.1.0

### Minor Changes

- [#4738](https://github.com/toptal/picasso/pull/4738) [`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447) Thanks [@diogolessa](https://github.com/diogolessa)!
- replace overflow hidden by overflow clip in Popper

## 3.0.0

### Major Changes

- [#4572](https://github.com/toptal/picasso/pull/4572) [`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### useOnScreen

- change return value of the hook to let component know when the oberver starts observing

```diff
-const isOnScreen = useOnScreen({...})
+const { isOnScreen, isObserved } = useOnScreen({...})
```

## 2.0.0

### Major Changes

- [#4527](https://github.com/toptal/picasso/pull/4527) [`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Utils

- remove the export of "Maybe" type from the Utils package
- the type can be defined directly in your project or imported from private package `@topkit/gql-base-types` if you have access

## 1.0.3

### Patch Changes

- Updated dependencies [[`d599529`](https://github.com/toptal/picasso/commit/d599529bcb283c367b63c612fee81394e66c9740)]:
  - @toptal/picasso-shared@15.0.0

## 1.0.2

### Patch Changes

- Updated dependencies [[`a1d523092cc4de6cb376156435b99b1e483f39b9`](https://github.com/toptal/picasso/commit/a1d523092cc4de6cb376156435b99b1e483f39b9)]:
  - @toptal/picasso-shared@14.0.1

## 1.0.1

### Patch Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages
- Updated dependencies [[`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30)]:
  - @toptal/picasso-shared@14.0.0
