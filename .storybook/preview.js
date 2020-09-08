import React from 'react'
import {
  configure,
  setAddon,
  addDecorator,
  addParameters
} from '@storybook/react'
import chaptersAddon from 'react-storybook-addon-chapters'
import { create } from '@storybook/theming'

import Picasso from '@toptal/picasso-shared'
import PicassoBook from './components/PicassoBook'

const loadFonts = TEST_ENV !== 'visual'
const withPicasso = story => (
  <Picasso loadFonts={loadFonts} fixViewport={false} loadFavicon={false}>
    {story()}
  </Picasso>
)

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'Picasso',
      brandImage:
        'https://user-images.githubusercontent.com/437214/54037817-b4da1800-41c7-11e9-81f5-59ed43e38500.png'
    }),
    showPanel: false
  }
})

const DECORATORS = [withPicasso]

const ADDONS = [chaptersAddon]

DECORATORS.forEach(decorator => addDecorator(decorator))
ADDONS.forEach(addon => setAddon(addon))

/** Tutorials */
const reqStorybook = require.context(
  '~/.storybook/stories',
  true,
  /story\/index.(jsx|tsx)$/
)
/** Stories from packages */
const reqPackagesComponents = require.context(
  '~/packages',
  true,
  /\/*\/story\/index.(js|ts)x?$/
)

const loadStories = () => {
  PicassoBook.addSections([
    'Tutorials',
    'Components',
    'Layout',
    'Overlays',
    'Utils',
    'Forms',
    'Picasso Forms',
    'Charts',
    'Widgets',
    'Lab'
  ])

  require('./stories/Picasso') // markdown pages for README & CHANGELOG
  require('./stories/Contributing') // markdown pages for contribution guide
  reqStorybook.keys().forEach(filename => reqStorybook(filename))
  reqPackagesComponents
    .keys()
    .forEach(filename => reqPackagesComponents(filename))

  PicassoBook.generate()
}

configure(loadStories, module)
