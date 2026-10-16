# @toptal/base-tailwind

## 102.0.0

### Major Changes

- [#5070](https://github.com/toptal/picasso/pull/5070) [`2394ce1`](https://github.com/toptal/picasso/commit/2394ce152aa7df810f1eddcb0e9170e6d285fe53) Thanks [@azebich](https://github.com/azebich)!

### All packages

- ship every package as `102.0.0` for the React 19 release; later releases version packages separately again. Packages on `100.x` skip `101`, which Calendar, DatePicker and Switch already shipped
- the re-baseline itself changes no API or behavior. See each changelog and the [React 19 migration guide](https://github.com/toptal/picasso/blob/master/docs/migration-to-react-19.md)

### Patch Changes

- [#5070](https://github.com/toptal/picasso/pull/5070) [`2394ce1`](https://github.com/toptal/picasso/commit/2394ce152aa7df810f1eddcb0e9170e6d285fe53) Thanks [@azebich](https://github.com/azebich)!

### All packages

- allow React 19: the `react` and `react-dom` peer ranges become `^17.0.0 || ^18.0.0 || ^19.0.0`, now that the test suites run on React 19 too. The next major stays opted out until it is validated the same way. See the [React 19 migration guide](https://github.com/toptal/picasso/blob/master/docs/migration-to-react-19.md)
- the sources type-check against `@types/react` 17, 18 and 19, including `useRef(null)` refs and the `content` and `children` props of Accordion, Dropdown, Table.ExpandableRow and Tooltip
- the published declarations compile against `@types/react` 18 and 19 with `skipLibCheck: false`: components and hooks declare a `React.ReactElement` return type instead of the global `JSX.Element`, the favicon icons are typed `string`, and the Tailwind presets no longer name Tailwind 3's `CustomThemeConfig`. `react-final-form` still reports errors in its own declarations, and on 19 `react-dropzone` does too

## 100.0.0

### Major Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Re-baseline the entire Picasso library to a single unified major version (v100) as part of the @base-ui/react modernization.
  - all Picasso packages are released together at v100.0.0 as one unified version.
  - no API or behavior change comes from this re-baseline itself; see each package's changelog for the specific modernization changes it received.

## 2.0.0

### Major Changes

- [#4898](https://github.com/toptal/picasso/pull/4898) [`e93f40b`](https://github.com/toptal/picasso/commit/e93f40bf03c4ea943ff9561c2dd032125a05ffc1) Thanks [@javier-delgado](https://github.com/javier-delgado)!
  Upgraded Tailwind CSS from v3 to v4:
  - updated `tailwindcss` peer dependency from `^3.4.10` to `^4.2.1`
  - updated deprecated utility classes
  - min node version is 20 or higher

## 1.0.0

### Major Changes

- [#4529](https://github.com/toptal/picasso/pull/4529) [`e7e45d2`](https://github.com/toptal/picasso/commit/e7e45d2349d548bee964db8aebe55c5326725329) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- update tailwindcss to 3.4.10
  - check new TailwindCSS [features](https://tailwindcss.com/blog/tailwindcss-v3-4)

## 0.0.2

### Patch Changes

- [#4453](https://github.com/toptal/picasso/pull/4453) [`608f2f7`](https://github.com/toptal/picasso/commit/608f2f74446cc6dcc4ae3876e5f819388c84741a) Thanks [@sashuk](https://github.com/sashuk)!
- add `@toptal/base-tailwind` package
  - update documentation of `@toptal/picasso-tailwind` and `@toptal/picasso` packages
  - breaking change: `@toptal/picasso-tailwind` no longer extends default Tailwind configuration. The `@toptal/base-tailwind` preset has to be used along with `@toptal/picasso-tailwind` preset in Tailwind configurations in all projects. The `@toptal/base-tailwind` has to be mentioned first in the presets list.
