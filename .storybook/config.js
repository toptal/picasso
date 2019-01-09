import { configure, setAddon, addDecorator } from '@storybook/react'
import chaptersAddon from 'react-storybook-addon-chapters'
import { withOptions } from '@storybook/addon-options'
import { themes } from '@storybook/components'
import { withKnobs } from '@storybook/addon-knobs'

const DECORATORS = [
  withOptions({
    name: 'Toptal',
    theme: themes.light
  }),
  withKnobs
]

const ADDONS = [chaptersAddon]

DECORATORS.forEach(decorator => addDecorator(decorator))
ADDONS.forEach(addon => setAddon(addon))

function loadStories() {
  require('./stories/index.js')
  // You can require as many stories as you need.
}

configure(loadStories, module)
