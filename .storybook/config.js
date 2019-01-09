import React from 'react'
import { configure, setAddon, addDecorator } from '@storybook/react'
import chaptersAddon from 'react-storybook-addon-chapters'
import { withOptions } from '@storybook/addon-options'
import { themes } from '@storybook/components'
import { withKnobs } from '@storybook/addon-knobs'

import Picasso from '../components'

const withPicasso = story => <Picasso>{story()}</Picasso>

const DECORATORS = [
  withOptions({
    name: 'Toptal',
    theme: themes.light
  }),
  withKnobs,
  withPicasso
]

const ADDONS = [chaptersAddon]

DECORATORS.forEach((decorator) => addDecorator(decorator))
ADDONS.forEach((addon) => setAddon(addon))

function loadStories() {
  require('./stories/index.js')
}

configure(loadStories, module)
