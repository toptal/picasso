import addons from '@storybook/addons'
import { STORY_RENDERED } from '@storybook/core-events'

import disableScalingOnNonPicassoMetaTags from './index'

addons.register('Viewport', api => {
  api.on(STORY_RENDERED, () => disableScalingOnNonPicassoMetaTags())
})
