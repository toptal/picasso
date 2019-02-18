import React from 'react'
import { configure, setAddon, addDecorator } from '@storybook/react'
import chaptersAddon from 'react-storybook-addon-chapters'
import { withOptions } from '@storybook/addon-options'
import { themes } from '@storybook/components'

import Picasso from '../components'
import PicassoBook from './components/PicasoBook'

const loadFonts = TEST_ENV !== 'visual'
const withPicasso = story => <Picasso loadFonts={loadFonts}>{story()}</Picasso>

const DECORATORS = [
  withOptions({
    name: 'Picasso',
    theme: themes.light,
    showAddonPanel: false
  }),
  withPicasso
]

const ADDONS = [chaptersAddon]

DECORATORS.forEach(decorator => addDecorator(decorator))
ADDONS.forEach(addon => setAddon(addon))

const req = require.context('../components', true, /\.example\.(tsx|jsx)$/)
const reqInnerStories = require.context(
  '../components',
  true,
  /story\/index.jsx$/
)

const loadStories = () => {
  require('./stories/Picasso'), req.keys().forEach(filename => req(filename))
  reqInnerStories.keys().forEach(filename => reqInnerStories(filename))

  PicassoBook.generate()
}

configure(loadStories, module)
