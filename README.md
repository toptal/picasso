<div align="center"><img src="https://user-images.githubusercontent.com/437214/54037817-b4da1800-41c7-11e9-81f5-59ed43e38500.png" height="80px" /></div>

<br/>

[Check out documentation](https://picasso.toptal.net)

<br/>

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![](https://img.shields.io/npm/v/@toptal/picasso?color=green&logo=toptal)](https://www.npmjs.com/package/@toptal/picasso)
[![#-frontend-exp-core](https://img.shields.io/badge/slack-%23--frontend--exp--core-green.svg)](https://slack.com)

## Installation instructions

```
yarn add @toptal/picasso
```

Have an issue with the bundle size? - [Check tree-shaking section](#tree-shaking)

## Start using library

```jsx
import Picasso, { Button } from '@toptal/picasso'
...

render () {
  return (
    <Picasso>
      <Button>Hello world!</Button>
    </Picasso>
  )
}
```

ℹ️ **_[`Picasso`](/?path=/story/components-folder--picasso) component rendered at root level is required for library theme configuration and theme to work properly._**

## Running storybook

In order to run storybook you need to execute `yarn start` which will spin up storybook server on http://localhost:9001

### Running visual tests

To preserve same visual test results we need to always run/update snapshots inside docker to have consistency with CI. Visual tests use `puppeteer` and `chromium`.

In order to run visual tests you need to first build `picasso` docker image.

`yarn test:visual` - Running visual tests

[Need to fix broken visual tests?](https://github.com/toptal/picasso/blob/master/docs/contribution/visual-testing.md#fixing-broken-visual-tests-inside-a-pr)

### Running yarn commands inside docker image

In order to run `yarn` commands we need to mount current `components` directory to docker, so command will be executed against current working directory not the one built inside image.

```bash
./bin/run-in-docker yarn lint
```

## Project commands

| Command                     | Description                                                               |
| --------------------------- | ------------------------------------------------------------------------- |
| **yarn lint**               | Lint all files                                                            |
| **yarn test**               | Run unit tests                                                            |
| **yarn test -u**            | Update jest snapshots to current version                                  |
| **yarn test:watch**         | Run unit tests in watch mode                                              |
| **yarn test-ci**            | Run unit tests at ci                                                      |
| **yarn test:visual**        | Run visual regression tests in Docker                                     |
| **yarn test:visual -u**     | Update visual regression snapshots in docker                              |
| **yarn start**              | Start storybook instance and inspect components                           |
| **yarn release:pre**        | Bump pre-release version in `package.json` and create new version git tag |
| **yarn generate:component** | Generate a new component template                                         |
| **yarn generate:example**   | Generate a new component component code example                           |
| **yarn build**              | Build the library                                                         |
| **yarn build:storybook**    | Build Storybook as static website                                         |
| **yarn symlink**            | Symlink current version of library for development                        |
| **yarn symlink:off**        | Un-symlink current version of library for development                     |

## Icons

### Add Icon

In Picasso, we keep icons in `svg` format and transform them into react components to make usage in react projects easier. This transformation is processed by the [`svgr`](https://github.com/smooth-code/svgr) tool.

To add a new Icon to Picasso library please follow these steps:

1. Prepare your SVG:
   - Make sure that it has `viewBox` attribute specified
   - Make sure that `viewBox` size is `0 0 16 16` (be careful this isn't just a simple value set!)
   - Make sure all paths are expanded and strokes are not used
2. Add your SVG file(s) to the Picasso project:
   > packages/picasso/src/Icon/svg/[your_icon_name].svg
3. Run the command

   ```
   yarn generate:icons
   ```

   This command will prepare corresponding react components for your icons
   and add export statements to `packages/picasso/src/Icon/index.ts`

After Picasso will be released with your changes you can start using your Icon as described in the [Icons section](https://picasso.toptal.net/?path=/story/components-folder--icon#icon).

## Adding new packages

1. Create a new folder under `/packages` and add to it:

   - `package.json` by running `lerna add`. Specify `Toptal` as the author and `src/index.ts` in the `main` key
   - `tsconfig.build.json` using this template with paths to the `node_modules` of any used packages from the `/packages` directory

   ```
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

   ```
   # Change Log
   All notable changes to this project will be documented in this file.
   See [Conventional Commits](https://conventionalcommits.org)   for commit guidelines.

   ```

2. Add the new folder and `CHANGELOG.md` to `/Dockerfile` to the list of directories that use `RUN chmod a+rw`

3. Add the new package to:

   - the `paths` key in `/tsconfig.json`
   - the `alias` key in `/.storybook/webpack.config.js`
   - the `imports` variable in `/.storybook/components/CodeExample/CodeExample.tsx`

## Linking with other projects

In order to develop or debug Picasso in parallel with your project without the need to publish new Picasso versions, you need to link Picasso to your project. And once finished unlink it.
Please use custom `yarn symlink TARGET_PROJECT_PATH` script that will create links for all Picasso packages, `react` and `@types/react` (**please don't use default `yarn link` script, it is not enough**). React has to be linked due to restriction of only single React instance used in the project [[1]](https://github.com/facebook/react/issues/14257#issuecomment-439967377) [[2]](https://github.com/facebook/react/issues/13991#issuecomment-463486871). React typings are also have to be linked because of the type incompatiblity issues.

### Link

To link Picasso follow these steps:

1. Checkout Picasso project from [Github](https://github.com/toptal/picasso)
2. Install Picasso dependencies with `yarn install`
3. Build Picasso with `yarn build:dist`
4. Link target project to local Picasso by running `yarn symlink TARGET_PROJECT_PATH` from Picasso root folder (e.g. `yarn symlink ~/projects/staff-portal`)

From that point you can rebuild local Picasso with `yarn build:dist` and it'll be automatically updated in your target project.

### Unlink

To unlink target project from local Picasso use `yarn symlink:off TARGET_PROJECT_PATH` (e.g. `yarn symlink:off ~/projects/staff-portal`)

### Tree shaking

If you use [davinci](https://github.com/toptal/davinci) to manage your application - tree shaking works by default when you build your project in the `production` mode.

In other cases when you use custom webpack build configuration you should check these three things to make sure you will have Picasso tree-shaked:

1. You run your build in `production` mode
2. You are not transforming your ES modules into `commonjs` during the build process. Usually, it's default behavior of popular babel presets - [modules configuration](https://babeljs.io/docs/en/babel-preset-env#modules)
3. You have `sideEffects` prop in your `package.json` set to `false` value or don't have it at all

Have a happy tree shaking! :)

```

```

```

```
