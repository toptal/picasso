# @toptal/picasso-modal-context

## 102.0.0

### Major Changes

- [#5070](https://github.com/toptal/picasso/pull/5070) [`2394ce1`](https://github.com/toptal/picasso/commit/2394ce152aa7df810f1eddcb0e9170e6d285fe53) Thanks [@azebich](https://github.com/azebich)!

### All packages

- ship every package as `102.0.0` for the React 19 release; later releases version packages separately again. Packages on `100.x` skip `101`, which Calendar, DatePicker and Switch already shipped
- the re-baseline itself changes no API or behavior. See each changelog and the [React 19 migration guide](https://github.com/toptal/picasso/blob/master/docs/migration-to-react-19.md)

### Minor Changes

- [#5070](https://github.com/toptal/picasso/pull/5070) [`2394ce1`](https://github.com/toptal/picasso/commit/2394ce152aa7df810f1eddcb0e9170e6d285fe53) Thanks [@azebich](https://github.com/azebich)!

### All packages

- allow React 19: the `react` and `react-dom` peer ranges become `^17.0.0 || ^18.0.0 || ^19.0.0`, now that the test suites run on React 19 too. The next major stays opted out until it is validated the same way. See the [React 19 migration guide](https://github.com/toptal/picasso/blob/master/docs/migration-to-react-19.md)
- the sources type-check against `@types/react` 17, 18 and 19, including `useRef(null)` refs and the `content` and `children` props of Accordion, Dropdown, Table.ExpandableRow and Tooltip
- the published declarations compile against `@types/react` 18 and 19 with `skipLibCheck: false`: components and hooks declare a `React.ReactElement` return type instead of the global `JSX.Element`, the favicon icons are typed `string`, and the Tailwind presets no longer name Tailwind 3's `CustomThemeConfig`. `react-final-form` still reports errors in its own declarations, and on 19 `react-dropzone` does too

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

### Minor Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Align the `react` and `react-dom` peer-dependency range to a uniform `>=17.0.0 < 19.0.0` across all Picasso packages.
  - previously the base-UI-migrated packages declared an uncapped `react` peer (`>=17.0.0`) while the rest were capped at `< 19.0.0`; this unifies the whole library on one supported range so consumers see a consistent React requirement.
  - react 19 support is intentionally deferred — lifting the `< 19.0.0` cap across all packages, once validated, is tracked in PF-2262.
  - peer-range change only; no runtime or API changes.

### Patch Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### ModalContext

- drop the vestigial `@material-ui/core` peer-dependency (source is a React context provider that imports nothing from MUI). Public API unchanged; behavioral parity.

## 1.0.1

### Patch Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages
