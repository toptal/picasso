import { SET_STORIES } from '@storybook/core-events'
import addons from '@storybook/addons'

import { scheduleWork } from './index'

const ADDON_ID = 'menu-expand'

addons.register(ADDON_ID, api => {
  const channel = addons.getChannel()
  channel.once(STORY_RENDERED, scheduleWork(api))
})
