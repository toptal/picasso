# Change Log

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
