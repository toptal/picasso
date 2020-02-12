import addons from '@storybook/addons'
import { STORY_RENDERED } from '@storybook/core-events'

import disableScalingOnNonHelmetMetaTags from './index'

addons.register('Viewport', api => {
  api.on(STORY_RENDERED, () => disableScalingOnNonHelmetMetaTags())
})
