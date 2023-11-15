# Change Log

## 5.6.3

### Patch Changes

- [#3968](https://github.com/toptal/picasso/pull/3968) [`d7be9d7b5`](https://github.com/toptal/picasso/commit/d7be9d7b5a2481872c6a254ee1733ef905da5a7a) Thanks [@dependabot](https://github.com/apps/dependabot)!
- update dependencies (`globby`)

## 5.6.2

### Patch Changes

- [#3917](https://github.com/toptal/picasso/pull/3917) [`7fe49a8e7`](https://github.com/toptal/picasso/commit/7fe49a8e766099e0f87caf0d76c4ffd982e20140) Thanks [@dmaklygin](https://github.com/dmaklygin)!
- fix eslint issues

## 5.6.1

### Patch Changes

- [#3895](https://github.com/toptal/picasso/pull/3895) [`a9f5c85b6`](https://github.com/toptal/picasso/commit/a9f5c85b65b123826d4420acae4b3f897101e814) Thanks [@sashuk](https://github.com/sashuk)!

### Spacings

- add BASE ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md)) and responsive ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/19-responsive-component-spacing-properties.md)) spacing to Picasso's theme and to `picasso-shared`

### Codemod

- add `spacing-values` codemod. Please run the codemod (`npx @toptal/picasso-codemod@latest v39.3.0`) to replace spacing property values of `Container` and `Dropdown` components with BASE-aligned property values according to the https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md. Property values that do not have BASE counterpart or are complex expressions have to be updated manually (non-BASE values have to be replaced with BASE ones after consulting with Design Team), codemod outputs the list of such cases for convenience. Run linter or prettier to align updated code with project code style.

- update peer dependencies for `@toptal/picasso` and `@toptal/picasso-shared`
- rename the codemod for spacings

## 5.6.0

### Minor Changes

- [#3890](https://github.com/toptal/picasso/pull/3890) [`17e25b470`](https://github.com/toptal/picasso/commit/17e25b47007948ee31781d35e94644137707c1c8) Thanks [@sashuk](https://github.com/sashuk)!
- add `spacing-values` codemod. Please run the codemod (`npx @toptal/picasso-codemod@latest v39.3.0`) to replace spacing property values of `Container` and `Dropdown` components with BASE-aligned property values according to the https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md. Property values that do not have BASE counterpart or are complex expressions have to be updated manually (non-BASE values have to be replaced with BASE ones after consulting with Design Team), codemod outputs the list of such cases for convenience. Run linter or prettier to align updated code with project code style.

## 5.5.2

### Patch Changes

- [#3607](https://github.com/toptal/picasso/pull/3607) [`e122dee5d`](https://github.com/toptal/picasso/commit/e122dee5d7ec036d3c24234075ac339ea16d469b) Thanks [@dmaklygin](https://github.com/dmaklygin)!
- update version of rich text editor

## 5.5.1

### Patch Changes

- [#3664](https://github.com/toptal/picasso/pull/3664) [`fa984a82b`](https://github.com/toptal/picasso/commit/fa984a82bd3ca1a0357523b80a395c00bbd02acb) Thanks [@dmaklygin](https://github.com/dmaklygin)!

---

- fix version in RichTextEditor codemod

## 5.5.0

### Minor Changes

- [#3637](https://github.com/toptal/picasso/pull/3637) [`d4795a8a5`](https://github.com/toptal/picasso/commit/d4795a8a5fb9f36ae724c0cddf80822701e753cc) Thanks [@dmaklygin](https://github.com/dmaklygin)!

---

- add codemod for replacing RichTextEditor imports

## 5.4.1

### Patch Changes

- [#3634](https://github.com/toptal/picasso/pull/3634) [`601cb08da`](https://github.com/toptal/picasso/commit/601cb08daf623e85acd114b852d26e2e4f1b4cca) Thanks [@dependabot](https://github.com/apps/dependabot)!
- updated dependencies (`globby`)

## 5.4.0

### Minor Changes

- [#3384](https://github.com/toptal/picasso/pull/3384) [`20542bde`](https://github.com/toptal/picasso/commit/20542bdee3b977847ce749026dcfb9a33d4d9500) Thanks [@mkrl](https://github.com/mkrl)! - ---

  - all the Picasso Forms components exported from `picasso-forms` are now available to be directly imported from the root entry point
  - compound usage of `Form` is now deprecated, you can replace the compound `Form` with `FormNonCompound` (in the future compound Form will no longer be available)
  - added a codemod to effortlessly migrate your compound `Form` to separate components `npx @toptal/picasso-codemod v52.2.0/non-compound-forms`

## 5.3.1

### Patch Changes

- [#2806](https://github.com/toptal/picasso/pull/2806) [`81a56673`](https://github.com/toptal/picasso/commit/81a56673a16f0290564d7205f414efebbfd9f7ce) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---
  - Fix format of peerDependency for `react` and `react-dom`

## 5.3.0

### Minor Changes

- [#2747](https://github.com/toptal/picasso/pull/2747) [`2c452cb0`](https://github.com/toptal/picasso/commit/2c452cb0a781613eb4d38be09ffa49423381b39e) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Codemods

  - Add a new codemod for refactoring imports for `Sidebar` to `Page.Sidebar`

## 5.2.1

### Patch Changes

- [#2715](https://github.com/toptal/picasso/pull/2715) [`a365d67d`](https://github.com/toptal/picasso/commit/a365d67d8d27e2f861a4f7d89e31ef4614e41706) Thanks [@separatio](https://github.com/separatio)! - ---

  - Applied prettier formatting to the whole codebase

## 5.2.0

### Minor Changes

- [#2605](https://github.com/toptal/picasso/pull/2605) [`ec1ab713`](https://github.com/toptal/picasso/commit/ec1ab7130b28cac2ba7ad1080cb0859743cececb) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### React 18

  update peerDependencies to support React@18

## 5.1.0

### Minor Changes

- [#2623](https://github.com/toptal/picasso/pull/2623) [`4a706471`](https://github.com/toptal/picasso/commit/4a706471de3922387578652ed283cd3bcd9810d9) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Codemods

  - Add new codemod for refactoring the removed `OverlayBadge` into `Badge`

## 5.0.0

### Major Changes

- [#2569](https://github.com/toptal/picasso/pull/2569) [`e8833df2`](https://github.com/toptal/picasso/commit/e8833df2329c6285840ae02c0d029fe4eebb8247) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Project

  - Update typescript to version 4.6

## 4.4.0

### Minor Changes

- [#2572](https://github.com/toptal/picasso/pull/2572) [`1ba287fa`](https://github.com/toptal/picasso/commit/1ba287fa839146f347d7fba8842368f8cd2bbb0e) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  - Added codemod for removing `varint` prop usage from `Tooltip` component

## 4.3.0

### Minor Changes

- [#2536](https://github.com/toptal/picasso/pull/2536) [`0950255b`](https://github.com/toptal/picasso/commit/0950255bf20899b1e6e22f9fa1e7c5e0c79022e6) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  - Added codemod for replacing `error` prop with `status` for these input components: `Input`, `NumberInput`, `Autocomplete`, `PasswordInput`, `DatePicker`, `TimePicker`, `Select` and `TagSelector`

## 4.2.0

### Minor Changes

- [#2481](https://github.com/toptal/picasso/pull/2481) [`4e9c01c7`](https://github.com/toptal/picasso/commit/4e9c01c722fa138d8d8c820240853f2d206e1b58) Thanks [@augustobmoura](https://github.com/augustobmoura)! - - Addition of a codemod for renaming the components `Rating` and `Form.Rating` to `Rating.Stars` and `Form.Rating.Stars` respectively

## 4.1.0

### Minor Changes

- [#2415](https://github.com/toptal/picasso/pull/2415) [`e13b6a0c`](https://github.com/toptal/picasso/commit/e13b6a0c2d300471a2708f843e4f1b460bacc412) Thanks [@LashaJini](https://github.com/LashaJini)! - - Fix duplication of imports in picasso-lab removal codemod

## 4.0.0

### Major Changes

- [#2409](https://github.com/toptal/picasso/pull/2409) [`163d5609`](https://github.com/toptal/picasso/commit/163d56095fd29689e9700cabbc06fb36692bf710) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  > Tip: execute `yarn lerna exec "yarn remove @toptal/picasso-lab"` to remove `picasso-lab` in all projects

  - Add codemod for replacing `picasso-lab` with `picasso`

## 3.3.0

### Minor Changes

- [#2371](https://github.com/toptal/picasso/pull/2371) [`09b4209`](https://github.com/toptal/picasso/commit/09b4209) Thanks [@denieler](https://github.com/denieler)! - - Add CLI to run codemods without installation the package.

  Example:

  ```
  npx @toptal/picasso-codemod v17.0.0/typography-sizes
  ```

  - Monorepo support for Picasso codemods.

  repo: toptal/picasso

## 3.2.1

### Patch Changes

- [#2341](https://github.com/toptal/picasso/pull/2341) [`469b4764`](https://github.com/toptal/picasso/commit/469b4764f999d2307c4bbed2a97a2ac6e9507b01) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - Fixed invalid size calculation in nested Typography components

## 3.2.0

### Minor Changes

- [#2308](https://github.com/toptal/picasso/pull/2308) [`ce7be40f`](https://github.com/toptal/picasso/commit/ce7be40fbfb04536058cc94b03ccf86f7125529b) Thanks [@LashaJini](https://github.com/LashaJini)! - Codemod for `Container` component borders. Removes `bordered` prop from
  `Container` components which do not require.

  ```bash
  # <TARGET>: any .tsx file you want. Example: src/**/*.tsx
  npx jscodeshift --parser=tsx -t node_modules/@toptal/picasso-codemod/v17.0.0/container-borders/container-borders.ts <TARGET>
  ```

* [#2295](https://github.com/toptal/picasso/pull/2295) [`b9859b6c`](https://github.com/toptal/picasso/commit/b9859b6c246f582d336250b7df45e6c284902299) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - Created codemod to help migrate `Typography | TypographyOverflow | Amount` **size** changes in `@toptal/picasso@17.0.0`

## 3.1.0

### Minor Changes

- [#2300](https://github.com/toptal/picasso/pull/2300) [`4953df3d`](https://github.com/toptal/picasso/commit/4953df3d2642c704b404ff565e63c3d53b415832) Thanks [@TomasSlama](https://github.com/TomasSlama)! - Create codemods to help migrate to `@toptal/picasso@16.0.0`

  Detailed description in [documentation](https://github.com/toptal/picasso/tree/master/packages/picasso-codemod#v1600)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.5](https://github.com/toptal/picasso/compare/@toptal/picasso-codemod@3.0.4...@toptal/picasso-codemod@3.0.5) (2021-09-08)

**Note:** Version bump only for package @toptal/picasso-codemod

## [3.0.4](https://github.com/toptal/picasso/compare/@toptal/picasso-codemod@3.0.3...@toptal/picasso-codemod@3.0.4) (2021-03-30)

**Note:** Version bump only for package @toptal/picasso-codemod

## [3.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso-codemod@3.0.2...@toptal/picasso-codemod@3.0.3) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso-codemod

## [3.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-codemod@3.0.1...@toptal/picasso-codemod@3.0.2) (2021-03-22)

**Note:** Version bump only for package @toptal/picasso-codemod

## [3.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-codemod@2.4.0...@toptal/picasso-codemod@3.0.1) (2021-03-09)

### Bug Fixes

- bump major version of picasso-codemod ([#1962](https://github.com/toptal/picasso/issues/1962)) ([683e8a1](https://github.com/toptal/picasso/commit/683e8a16c1a512a3d85afd47b813b5d95f20b150))

# [2.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso-codemod@2.3.2...@toptal/picasso-codemod@2.4.0) (2021-02-25)

### Features

- cross platform package builds ([#1925](https://github.com/toptal/picasso/issues/1925)) ([21f30be](https://github.com/toptal/picasso/commit/21f30beeb360fcc67c88d70af5c3234d8dcfe213))

## [2.3.2](https://github.com/toptal/picasso/compare/@toptal/picasso-codemod@2.3.1...@toptal/picasso-codemod@2.3.2) (2021-02-03)

**Note:** Version bump only for package @toptal/picasso-codemod

## [2.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso-codemod@2.3.0...@toptal/picasso-codemod@2.3.1) (2021-01-14)

**Note:** Version bump only for package @toptal/picasso-codemod

# [2.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso-codemod@2.2.0...@toptal/picasso-codemod@2.3.0) (2021-01-12)

### Features

- **codemod:** rename Page.Header to Page.TopBar ([#1835](https://github.com/toptal/picasso/issues/1835)) ([573fb5e](https://github.com/toptal/picasso/commit/573fb5e56d776b9b9413532be247c9fc1b51637c))

# [2.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso-codemod@2.1.0...@toptal/picasso-codemod@2.2.0) (2021-01-12)

### Features

- **codemod:** rename Subheader to PageHead ([#1832](https://github.com/toptal/picasso/issues/1832)) ([c74a380](https://github.com/toptal/picasso/commit/c74a380f5f449d398016361b821a1cd259fa1256))

# [2.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso-codemod@2.0.2...@toptal/picasso-codemod@2.1.0) (2021-01-08)

### Features

- **picasso-codemod:** add accordion borders codemod ([#1831](https://github.com/toptal/picasso/issues/1831)) ([4aa1b43](https://github.com/toptal/picasso/commit/4aa1b43a8d3b0ef55b50cfc49b50c4e52d24be5e))

## [2.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso-codemod@2.0.1...@toptal/picasso-codemod@2.0.2) (2020-12-28)

### Bug Fixes

- remove declarations to fix ts errors ([#1814](https://github.com/toptal/picasso/issues/1814)) ([57d9c32](https://github.com/toptal/picasso/commit/57d9c32cc46c26b66b067a2b3285006d025ff897))

## [2.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso-codemod@2.0.0...@toptal/picasso-codemod@2.0.1) (2020-12-24)

**Note:** Version bump only for package @toptal/picasso-codemod

# 2.0.0 (2020-12-22)

### Features

- v5 ([#1487](https://github.com/toptal/picasso/issues/1487)) ([ee77cde](https://github.com/toptal/picasso/commit/ee77cde12f8f7670f50958ae3973327eb513d9f9))
