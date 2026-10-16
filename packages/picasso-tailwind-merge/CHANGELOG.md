# @toptal/picasso-tailwind-merge

## 102.0.0

### Major Changes

- [#5070](https://github.com/toptal/picasso/pull/5070) [`2394ce1`](https://github.com/toptal/picasso/commit/2394ce152aa7df810f1eddcb0e9170e6d285fe53) Thanks [@azebich](https://github.com/azebich)!

### All packages

- ship every package as `102.0.0` for the React 19 release; later releases version packages separately again. Packages on `100.x` skip `101`, which Calendar, DatePicker and Switch already shipped
- the re-baseline itself changes no API or behavior. See each changelog and the [React 19 migration guide](https://github.com/toptal/picasso/blob/master/docs/migration-to-react-19.md)

- [#5070](https://github.com/toptal/picasso/pull/5070) [`2394ce1`](https://github.com/toptal/picasso/commit/2394ce152aa7df810f1eddcb0e9170e6d285fe53) Thanks [@azebich](https://github.com/azebich)!

### TailwindMerge

- upgrade `tailwind-merge` to `^3.6.0`, the line that knows Tailwind v4's classes
- the `shadow-0` to `shadow-24` scale counts as box shadows, so `shadow-none` and arbitrary shadows resolve against it instead of ignoring it, and shadow colors coexist with it instead of erasing it
- a consumer `className` now wins for v4-only utilities that were passed through: `min-h-auto`, `max-h-auto`, `outline-hidden` (over `outline-none`), two-axis `translate-*`, `border-2` against `border-x`/`border-y`, `shrink-<number>` and the trailing `!` important syntax
- `bg-linear-to-*` no longer conflicts with `bg-<color>`, which could drop `Modal.Content`'s scroll shades. Tailwind 3's `bg-gradient-to-*` now does, so use `bg-linear-to-*`
- `twMerge` and `twJoin` keep their signatures
- remove the unused react-transition-group dependency

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

## 2.0.5

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-utils@4.0.1

## 2.0.4

### Patch Changes

- Updated dependencies [[`e93f40b`](https://github.com/toptal/picasso/commit/e93f40bf03c4ea943ff9561c2dd032125a05ffc1)]:
  - @toptal/picasso-utils@4.0.0

## 2.0.3

### Patch Changes

- Updated dependencies [[`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447)]:
  - @toptal/picasso-utils@3.1.0

## 2.0.2

### Patch Changes

- Updated dependencies [[`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498)]:
  - @toptal/picasso-utils@3.0.0

## 2.0.1

### Patch Changes

- Updated dependencies [[`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d)]:
  - @toptal/picasso-utils@2.0.0

## 2.0.0

### Major Changes

- [#4500](https://github.com/toptal/picasso/pull/4500) [`3ed8c02`](https://github.com/toptal/picasso/commit/3ed8c0271982a82dd9cdc6b967c63656afd3654f) Thanks [@ruslan-sed](https://github.com/ruslan-sed)!
- this update should have been performed previously but was inadvertently missed

## 1.2.0

### Minor Changes

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- extend tailwind merge config with custom font-weight and text-align values

## 1.1.0

### Minor Changes

- [#4377](https://github.com/toptal/picasso/pull/4377) [`9bd24fbde266515ac9d4baa98e0b5625616b7e22`](https://github.com/toptal/picasso/commit/9bd24fbde266515ac9d4baa98e0b5625616b7e22) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- remove peer dependency on picasso-tailwind

## 1.0.1

### Patch Changes

- [#4321](https://github.com/toptal/picasso/pull/4321) [`d03712b77511528d0139da4b5ef74e797d64446c`](https://github.com/toptal/picasso/commit/d03712b77511528d0139da4b5ef74e797d64446c) Thanks [@ruslan-sed](https://github.com/ruslan-sed)!
- initial release

- Updated dependencies [[`d03712b`](https://github.com/toptal/picasso/commit/d03712b77511528d0139da4b5ef74e797d64446c)]:
  - @toptal/picasso-tailwind@2.5.1
