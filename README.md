<div align="center"><img src="https://user-images.githubusercontent.com/437214/54037817-b4da1800-41c7-11e9-81f5-59ed43e38500.png" height="80px" /></div>

<br/>


![](https://img.shields.io/badge/npm-0.1.0--beta.16-yellow.svg)
[![Depfu](https://badges.depfu.com/badges/5334b0c5b6255a3e8b0199b2a5411667/count.svg)](https://depfu.com/repos/toptal/picasso?project_id=7646)
[![#-frontend-exp-core](https://img.shields.io/badge/slack-%23--frontend--exp--core-green.svg)](https://toptal-core.slack.com/app_redirect?channel=CERF5NHT3)

## Installation instructions

In order to include the library to your project you need to install it from NPM. As Picasso is hosted on private NPM repository you need to have `NPM_TOKEN` present. You can obtain new token on [npmjs.com](https://www.npmjs.com/settings/talbot/tokens) with credentials from LastPass. Then you can use [.envrc](.envrc.example) file in synergy with [direnv](https://direnv.net/) to automatically expose `$NPM_TOKEN` for Picasso.

```
yarn add @toptal/picasso
```

## Start using library

```
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

In order to run storybook you need to execute `yarn storybook` which will spin up storybook server on http://localhost:9001

### Running visual tests

To preserve same visual test results we need to always run/update snapshots inside docker to have consistency with CI. Visual tests use `puppeteer` and `chromium`.

In order to run visual tests you need to first build `picasso` docker image.

`yarn test:visual` - Running visual tests

### Fixing broken visual tests inside a PR

In order to have a good tracking on visual changes which were applied in each PR, we run visual snapshot comparision inside each pull request. `Jenkins` is automatically trying to take snapshot of each component and compare the result to a previous state. Logic behind this is similar as running `jest` snapshots, therefore when your PR has failing visual tests you need to update them.

1. Check the report on jenkins which are linked to the PR status.
2. Manually check the differences by eye and ensure that the current state of the screenshot is the expected state.
3. After the engineer is sure that the current changes are legitimate run `yarn test:visual -u` on your local machine.
4. Command should re-generate snapshots which are different against previous version.
5. Commit generated `.png` files to the PR.
6. Visual tests job should be green now.

`yarn test:visual -u` - Updating to current snapshots

### Running yarn commands inside docker image

In order to run `yarn` commands we need to mount current `components` directory to docker, so command will be executed against current working directory not the one built inside image.

```
./bin/run-in-docker yarn lint
```

## Project commands

| Command                       | Description                                                               |
| ----------------------------- | ------------------------------------------------------------------------- |
| **yarn lint**                 | Lint all files                                                            |
| **yarn lint:path pathToFile** | Lint specific file                                                        |
| **yarn test**                 | Run unit tests                                                            |
| **yarn test -u**              | Update jest snapshots to current version                                  |
| **yarn test:watch**           | Run unit tests in watch mode                                              |
| **yarn test:visual**          | Run visual regression tests in Docker                                     |
| **yarn test:visual -u**       | Update visual regression snapshots in docker                              |
| **yarn storybook**            | Start storybook instance and inspect components                           |
| **storybook:cache**           | Start storybook instance and inspect components with webpack cache        |
| **yarn release:pre**          | Bump pre-release version in `package.json` and create new version git tag |
| **yarn generate:component**   | Generate a new component template                                         |
| **yarn generate:example**     | Generate a new component component code example                           |
| **yarn build**                | Build the library                                                         |
| **yarn build:storybook**      | Build Storybook as static website                                         |
| **yarn symlink**              | Symlink current version of library for development                        |
| **yarn symlink:off**          | Un-symlink current version of library for development                     |

## Icons

### Add Icon

In Picasso, we keep icons in `svg` format and transform them into react components to make usage in react projects easier. This transformation is processed by the [`svgr`](https://github.com/smooth-code/svgr) tool.

To add a new Icon to Picasso library please follow these steps:

1. Prepare your SVG:
   - Make sure that it has `viewBox` attribute specified
2. Add your SVG file(s) to the Picasso project:
   > /components/Icon/svg/[your_icon_name].svg
3. Run the command

   ```
   yarn generate:icons
   ```

   This command will prepare corresponding react components for your icons
   and add export statements to `/components/Icon/index.ts`

After Picasso will be released with your changes you can start using your Icon as described in the [Icons section](https://picasso.toptal.net/?path=/story/components-folder--icon#icon).

## Linking with other projects

In order to develop or debug Picasso in parallel with your project without the need to publish new Picasso versions, you need to link Picasso to your project. And once finished unlink it.
You will probably notice that linking process links `@toptal/picasso` and `react`. It is due to React restriction of only once instance used in the project [[1]](https://github.com/facebook/react/issues/14257#issuecomment-439967377) [[2]](https://github.com/facebook/react/issues/13991#issuecomment-463486871), so we link to Picasso's `react` version.

### Link

To link Picasso follow these steps:

In Picasso project directory:

1. Checkout Picasso project from [Github](https://github.com/toptal/picasso)
2. Install Picasso dependencies with `yarn install`
3. Build Picasso with `yarn build` or `yarn build:watch` if you want to trigger build on file change
4. Create a link with `yarn symlink` (creates Picasso and React link)

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
