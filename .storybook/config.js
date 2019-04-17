import React from 'react'
import {
  configure,
  setAddon,
  addDecorator,
  addParameters
} from '@storybook/react'
import chaptersAddon from 'react-storybook-addon-chapters'
import { create } from '@storybook/theming'

import Picasso from 'components'

import PicassoBook from './components/PicassoBook'

const loadFonts = TEST_ENV !== 'visual'
const withPicasso = story => <Picasso loadFonts={loadFonts}>{story()}</Picasso>

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

const req = require.context('../src/components', true, /story\/index.jsx$/)

const loadStories = () => {
  require('./stories/Picasso') // markdown pages for README & CHANGELOG
  req.keys().forEach(filename => req(filename))
  PicassoBook.generate()
}

configure(loadStories, module)
