<div align="center"><img src="https://user-images.githubusercontent.com/437214/54037817-b4da1800-41c7-11e9-81f5-59ed43e38500.png" height="80px" /></div>

<br/>

![](https://img.shields.io/badge/npm-0.1.0--beta.5-yellow.svg)
[![#-frontend-exp-core](https://img.shields.io/badge/slack-%23--frontend--exp--core-green.svg)](https://toptal-core.slack.com/app_redirect?channel=CERF5NHT3)

## Installation instructions

In order to include the library to your project you need to install it from NPM. As Picasso is hosted on private NPM repository you need to have `NPM_TOKEN` present. You can obtain new token on [npmjs.com](https://www.npmjs.com/settings/talbot/tokens) with credentials from LastPass. Then you can use [.envrc](.envrc.example) file in synergy with [direnv](https://direnv.net/) to automatically expose `$NPM_TOKEN` for Picasso.

`yarn add @toptal/picasso`

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

ℹ️ **_`Picasso` component rendered at root level is required for library theme configuration and theme to work properly._**

## Running storybook

In order to run storybook you need to execute `yarn storybook` which will spin up storybook server on http://localhost:9001

### Running visual tests

To preserve same visual test results we need to always run/update snapshots inside docker to have consistency with CI. Visual tests use `puppeteer` and `chromium`.

In order to run visual tests you need to first build `picasso` docker image.

`yarn test-visual` - Running visual tests

`yarn test-visual -u` - Updating to current snapshots

### Running yarn commands inside docker image

In order to run `yarn` commands we need to mount current `components` directory to docker, so command will be executed against current working directory not the one built inside image.

```
docker run -t -i --rm -e -v ${PWD}/components:/app/components NPM_TOKEN=$NPM_TOKEN picasso:latest yarn lint
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
| **yarn release:pre**          | Bump pre-release version in `package.json` and create new version git tag |
| **yarn generate:component**   | Generate a new component template                                         |
| **yarn generate:example**     | Generate a new component component code example                           |
| **yarn build**                | Build the library                                                         |
| **yarn build:storybook**      | Build Storybook as static website                                         |
| **yarn symlink**              | Symlink current version of library for development                        |
| **yarn symlink:off**          | Un-symlink current version of library for development                     |

## Icons

### Add Icon

To add a new Icon to Picasso library please follow these steps:

1. Prepare your SVG:
   - Pass it through the [SVG optimizer service](https://jakearchibald.github.io/svgomg/)
   - Remove `width, height` attributes from the `<svg>` tag
   - Remove `fill, stroke` attributes from the `<svg>` tag
   - Make sure that it has `viewBox` attribute specified
2. Add your SVG file to the Picasso project:
   > /components/Icons/svg/[your_icon_name].svg
3. Run the command

   ```
   yarn build:svg
   ```

   to prepare corresponding react component for your icon

4. Export your just created react component in the index file
   > /components/Icons/index.ts
   ```
   ...
   export { default as [your_icon_name]} from './[your_icon_name]'
   ...
   export { default } from './IconsLibrary'
   ```

After Picasso will be released with your changes you can start using your Icon as described [here](https://picasso.toptal.net/?selectedKind=Icons&selectedStory=Icons).

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
