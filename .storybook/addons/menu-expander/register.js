import { SET_STORIES, SELECT_STORY } from '@storybook/core-events'
import addons from '@storybook/addons'

import { scheduleWork } from './index'

const ADDON_ID = 'menu-expand'

addons.register(ADDON_ID, api => {
  api.once(SET_STORIES, scheduleWork(api))
})
