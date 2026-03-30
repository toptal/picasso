# @toptal/base-tailwind

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
