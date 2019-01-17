![](https://img.shields.io/badge/npm-0.1.0--alpha.6-orange.svg)
[![#-frontend-exp-core](https://img.shields.io/badge/slack-%23--frontend--exp--core-green.svg)](https://toptal-core.slack.com/app_redirect?channel=CERF5NHT3)

# 🎨 Picasso (a.k.a. Toptal UI components library)

<div align="center"><img src="https://user-images.githubusercontent.com/324488/51291294-e542d880-1a06-11e9-875d-ad009cb42e3c.png" height="300" /></div>

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

## Docker

Picasso needs `puppeteer` and `chromium` in order to run its visual tests. To have consistency between machines and CI we need to run them inside Docker.

### Building picasso image

`docker build -t picasso .` - Alternatively you can run `yarn docker:build`

ℹ️ **_Note: You can run any yarn command_**

### Running visual tests

To preserve same visual test results we need to always run/update snapshots inside to docker to have same results on CI.
In order to run visual tests you need to first build `picasso` docker image.

`yarn test-visual` - Running visual tests

`yarn test-visual -u` - Updating to current snapshots

### Running yarn commands inside docker image

In order to run `yarn` commands we need to mount current `components` directory to docker, so command will be executed against current working directory not the one built inside image.

```
docker run -t -i --rm -e -v ${PWD}/components:/app/components NPM_TOKEN=$NPM_TOKEN picasso:latest yarn lint
```

## Project commands

| Command                       | Description                                                         |
| ----------------------------- | ------------------------------------------------------------------- |
| **yarn lint**                 | Lint all files                                                      |
| **yarn lint:path pathToFile** | Lint specific file                                                  |
| **yarn test**                 | Run unit tests                                                      |
| **yarn test -u**              | Update jest snapshots to current version                            |
| **yarn test:watch**           | Run unit tests in watch mode                                        |
| **yarn test:visual**          | Run visual regression tests in Docker                               |
| **yarn test:visual -u**       | Update visual regression snapshots in docker                        |
| **yarn storybook**            | Start storybook instance and inspect components                     |
| **yarn release:alpha**        | Bump alpha version in `package.json` and create new version git tag |
| **yarn generate:component**   | Generate a new component template                                   |
| **yarn build:docker**         | Build docker image                                                  |
| **yarn build:es**             | Build ES6 version of library                                        |
| **yarn build:es2015**         | Build ES2015 version of library                                     |
| **yarn build:storybook**      | Build Storybook as static website                                   |
| **yarn symlink**              | Symlink current version of library for development                  |
