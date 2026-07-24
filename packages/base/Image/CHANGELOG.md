# @toptal/picasso-image

## 100.0.0

### Major Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Raise the `react` and `react-dom` peer-dependency floor to React 17.

  - raise the `react` and `react-dom` peer-dependency floor from `>=16.12.0` to `>=17.0.0` across all Picasso packages — **React 16 is no longer supported**. Picasso components now depend on `@base-ui/react`, which requires React 17+ (`^17 || ^18 || ^19`), so React 16 could no longer be honored in practice.
  - this is a peer-range change only — no runtime or API changes. Existing upper bounds are untouched: packages currently capped at `<19.0.0` stay capped (lifting that cap to admit React 19 is tracked separately in PF-2236 / PF-2262).
  - consumer action: ensure `react` and `react-dom` resolve to `>=17`. [PF-2237]

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Re-baseline the entire Picasso library to a single unified major version (v100) as part of the @base-ui/react modernization.
  - all Picasso packages are released together at v100.0.0 as one unified version.
  - no API or behavior change comes from this re-baseline itself; see each package's changelog for the specific modernization changes it received.

### Patch Changes

- Updated dependencies [[`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5)]:
  - @toptal/picasso-utils@100.0.0
  - @toptal/picasso-tailwind@100.0.0
  - @toptal/picasso-tailwind-merge@100.0.0

## 3.0.6

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-utils@4.0.1

## 3.0.5

### Patch Changes

- Updated dependencies [[`e93f40b`](https://github.com/toptal/picasso/commit/e93f40bf03c4ea943ff9561c2dd032125a05ffc1)]:
  - @toptal/picasso-utils@4.0.0

## 3.0.4

### Patch Changes

- [#4797](https://github.com/toptal/picasso/pull/4797) [`c90ccde`](https://github.com/toptal/picasso/commit/c90ccdefa944fc3576bcccb060bb68119a7807e6) Thanks [@sashuk](https://github.com/sashuk)!
- stop using deprecated way of specifying default component property values (`.defaultProps` will not be supported in the future, please see [this React issue](https://github.com/facebook/react/issues/29233) for details)

## 3.0.3

### Patch Changes

- Updated dependencies [[`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447)]:
  - @toptal/picasso-utils@3.1.0

## 3.0.2

### Patch Changes

- Updated dependencies [[`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498)]:
  - @toptal/picasso-utils@3.0.0

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

- [#4483](https://github.com/toptal/picasso/pull/4483) [`13863c9`](https://github.com/toptal/picasso/commit/13863c98aa0b73e202b0b46f6bdedbfb9de66177) Thanks [@mkrl](https://github.com/mkrl)!

### Image

- migrated to Tailwind CSS
- added `@toptal/picasso-tailwind` as a peer dependency to `@toptal/picasso-image`

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
