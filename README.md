<div align="center"><img src="https://user-images.githubusercontent.com/437214/54037817-b4da1800-41c7-11e9-81f5-59ed43e38500.png" height="80px" /></div>

<div align="center">

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![#-frontend-exp-core](https://img.shields.io/badge/slack-%23--frontend--exp--core-green.svg)](https://slack.com)

</div>

This repository is the home for all of Toptal's reusable UI, split up into distinct monorepo packages distributed through NPM:

- [@toptal/picasso](./packages/picasso/README.md) - core UI building blocks
- [@toptal/picasso-charts](./packages/picasso-charts/README.md) - reusable charts, based on `recharts`
- [@toptal/picasso-forms](./packages/picasso-forms/README.md) - a form solution, based on `react-final-form`
- [@toptal/picasso-codemod](./packages/picasso-codemod/README.md) - scripts that help developers migrate to the latest version
- [@toptal/picasso-shared](./packages/picasso-shared/README.md) - shared utilities between the packages

## Contributing

Please read our documentation [here](./CONTRIBUTING.md)

## Supported browsers

Picasso guarantees to work in Chrome and it supports other browsers specified in `@toptal/browserslist-config` package.

## Release policy

Changes in peer dependencies, breaking changes in component API or behavior, supported NodeJS version, result in major releases.

Changes in dev dependencies, component HTML structure, or visual changes are not considered as breaking changes and result in minor or patch releases.

## Running storybook

In order to run storybook you need to execute `yarn start` which will spin up storybook server on <http://localhost:9001>.

## Running visual tests locally

### Run Happo locally for Storybook

1. Go to https://happo.io/a/675/account (`toptal-picasso` account)
2. Set environment variable `HAPPO_API_KEY` same as API key (`export HAPPO_API_KEY=...` in Unix)
3. Set environment variable `HAPPO_API_SECRET` same as API secret (`export HAPPO_API_SECRET=...` in Unix)
4. Run `yarn happo (run|debug|compare|…)` depending on you goals

For example, in order to compare two commits (`abc123` and `def456`), follow the steps below

1. Generate report for `abc123` commit via `yarn happo run abc123` and get link to the report (something like https://happo.io/a/675/p/1189/report/abc123)
2. Generate report for `def456` commit via `yarn happo run def456` and get link to the report (something like https://happo.io/a/675/p/1189/report/def456)
3. Compare commits via `yarn happo compare abc123 def456` and get link to the comparison result (something like https://happo.io/a/675/p/1189/compare/abc123/def456)

### Run Happo locally for Cypress

1. Go to https://happo.io/a/675/account (`toptal-picasso` account)
2. Set environment variable `HAPPO_API_KEY` same as API key (export HAPPO_API_KEY=... in Unix)
3. Set environment variable `HAPPO_API_SECRET` same as API secret (`export HAPPO_API_SECRET=...` in Unix)
4. Set environment variable `HAPPO_PROJECT` to match Cypress project (`export HAPPO_PROJECT=Picasso/Cypress` in Unix)
5. Set environment variable `HAPPO_PREVIOUS_SHA`, it should be the sha of the last `master` commit that passed Happo (Picasso/Cypress) check ([documentation for environment variable](https://docs.happo.io/docs/cypress#continuous-integration))
6. Set environment variable `HAPPO_CURRENT_SHA`, it should be [the sha of the commit](https://github.com/toptal/picasso/commits/master/) that is compared to `master` ([documentation for environment variable](https://docs.happo.io/docs/cypress#continuous-integration))
7. Run `yarn test:integration:ci` and get link to the comparison result, something like

```bash
yarn test:integration:ci
...
[HAPPO] https://happo.io/a/675/jobs/1104613
✨  Done in 378.45s.
```

## Project commands

| Command                     | Description                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------- |
| **build:package**           | Build the packages                                                                  |
| **build:package:watch**     | Build all packages in watch mode                                                    |
| **build:storybook**         | Build Storybook as static website                                                   |
| **generate:component**      | Generate a new component template                                                   |
| **generate:example**        | Generate a new component component code example                                     |
| **generate:svg-components** | [Generate JSX components from SVGs](#adding-icons-and-pictograms)                   |
| **generate:icons**          | [Generate JSX components from SVGs (only icons)](#adding-icons-and-pictograms)      |
| **generate:pictograms**     | [Generate JSX components from SVGs (only pictograms)](#adding-icons-and-pictograms) |
| **happo**                   | Run Happo locally and generate report on happo.io                                   |
| **happo:storybook**         | Run Happo for Storybook on CI                                                       |
| **lint**                    | Lint all files                                                                      |
| **start**                   | Start storybook instance and inspect components                                     |
| **test**                    | Run jest and cypress tests                                                          |
| **test:integration**        | Run cypress tests                                                                   |
| **test:integration:open**   | Run cypress in development mode                                                     |
| **test:integration:ci**     | Run cypress in CI mode and run cypress visual tests                                 |
| **test:unit**               | Run unit tests                                                                      |
| **test:unit -u**            | Update jest snapshots                                                               |
| **test:unit:watch**         | Run unit tests in watch mode                                                        |
| **typecheck**               | Validate typescript compilation                                                     |

## Adding icons and pictograms

In Picasso, we keep icons and pictograms in `svg` format and transform them into React components to make usage in React projects easier. This transformation is processed by the [`svgr`](https://github.com/smooth-code/svgr) tool.

Pictograms are stored in a separate package due to their size and use cases.

To add a new icon to `@toptal/picasso` or pictogram to `@toptal/picasso-pictograms` please follow these steps:

1. Prepare your SVG:
   - Make sure that it has `viewBox` attribute specified
   - Make sure that `viewBox` sizes are `0 0 16 16` and `0 0 24 24` for icon (there should always be two icon variants) and `0 0 64 64` for pictogram (be careful this isn't just a simple value set!)
   - Make sure all paths are expanded and strokes are not used (use [this](https://iconly.io/tools/svg-convert-stroke-to-fill) or [this](https://svgomg.net/) online tools)
2. Add your SVG file(s) to the Picasso project:

   ```bash
   packages/base/Icons/src/Icon/svg/[your_icon_name].svg                    # icons
   packages/picasso-pictograms/src/Pictograms/svg/[your_pictogram_name].svg # pictograms
   ```

3. Run the command

   ```bash
   yarn generate:svg-components # runs generation for icons and pictograms
   yarn generate:icons          # generates icons
   yarn generate:pictograms     # generates pictograms
   ```

   This command will prepare corresponding react components and add export statements index files.

After Picasso will be released with your changes you can start using your icons and pictograms as described in the [Icons section](https://picasso.toptal.net/?path=/story/components-folder--icon#icon) and [Pictograms section](https://picasso.toptal.net/?path=/story/picasso-pictograms-pictograms--pictograms).

## Adding new packages

1. Create a new folder under `/packages` and add to it:

   - `package.json` by running `lerna add`. Specify `Toptal` as the author and `src/index.ts` in the `main` key
   - `tsconfig.build.json` using this template with paths to the `node_modules` of any used packages from the `/packages` directory

   ```json
   {
     "extends": "../../tsconfig.build.json",
     "compilerOptions": {
       "outDir": "./build",
       "paths": {
         "@toptal/picasso/*": ["node_modules/@toptal/picasso/src/*"],
         "@toptal/picasso": ["node_modules/@toptal/picasso/src/index"]
       }
     },
     "include": ["./src/**/*"],
     "exclude": [
       "**/*.example.jsx",
       "**/*.example.tsx",
       "**/test.jsx",
       "**/test.tsx"
     ]
   }
   ```

   - `CHANGELOG.md` using this template (All notable changes to the package will be documented in this file automatically)

   ```md
   # Change Log

   All notable changes to this project will be documented in this file.
   ```

2. Add the new package to:

   - the `paths` key in `/tsconfig.json`
   - the `alias` key in `/.storybook/main.js`
   - the `imports` variable in `/.storybook/components/CodeExample/CodeExample.tsx`
   - the new record to Dockerfile

## Linking with other projects

In order to develop or debug Picasso in parallel with your project without the need to publish new Picasso versions, you need to link Picasso to your project. And once finished unlink it.
You will probably notice that linking process links `@toptal/picasso` and `react`. It is due to React restriction of only once instance used in the project [[1]](https://github.com/facebook/react/issues/14257#issuecomment-439967377) [[2]](https://github.com/facebook/react/issues/13991#issuecomment-463486871), so we link to Picasso's `react` version.

### Link

To link Picasso follow these steps:

In Picasso project directory:

1. Checkout Picasso project from [GitHub](https://github.com/toptal/picasso)
2. Install Picasso dependencies with `yarn install`
3. Build Picasso inside Picasso package folder (`./packages/picasso/`) with `yarn build:package`
4. Create a link with running in the root path `yarn symlink` (creates all links to Picasso packages and React link)

In your project directory:

1. Link Picasso and React with `yarn link @toptal/picasso react`
2. Start your project and changes in Picasso will be visible in your project!

### Unlink

To unlink Picasso follow these steps:

In your project directory:

1. Unlink Picasso with `yarn unlink @toptal/picasso react`
2. Re-install dependencies with `yarn install --force`

(Optional) In Picasso project directory:

1. Unlink with `yarn symlink:off`
2. Re-install dependencies with `yarn install --force`

### Tree shaking

If you use [davinci-engine](https://www.npmjs.com/package/@toptal/davinci-engine) to manage your application - tree shaking works by default when you build your project in the `production` mode.

In other cases when you use custom webpack build configuration you should check these three things to make sure you will have Picasso tree-shaked:

1. You run your build in `production` mode
2. You are not transforming your ES modules into `commonjs` during the build process. Usually, it's default behavior of popular babel presets - [modules configuration](https://babeljs.io/docs/en/babel-preset-env#modules)
3. You have `sideEffects` prop in your `package.json` set to `false` value or don't have it at all

Have a happy tree shaking! :)
