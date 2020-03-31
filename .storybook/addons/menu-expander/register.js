import { STORY_RENDERED } from '@storybook/core-events'
import addons from '@storybook/addons'

import { scheduleWork } from './index'

const ADDON_ID = 'menu-expand'

addons.register(ADDON_ID, api => {
  api.on(STORY_RENDERED, scheduleWork(api))
})
