# Picasso - Toptal UI components library

## Installation instructions
`yarn install`

## Project commands
`yarn lint` - lint all files

`yarn lint:path pathToFile` - lint specific file

`yarn test` - run unit tests

`yarn test:watch` - run unit tests in watch mode

`yarn storybook` - start storybook instance and inspect components

`yarn test-visual` - run visual tests (in order to run these tests you must have `storybook` running in the background)

`yarn test-visual:watch` - run visual tests in watch mode

`yarn release:alpha` - bump alpha version in `package.json` and create new version git tag


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

`Picasso` component rendered at root level is required for library theme configuration and theme to work properly. 
