import addons from '@storybook/addons'
import { STORY_RENDERED } from '@storybook/core-events'

import { updateDocumentTitle } from './index'

addons.register('TitleAddon', api => {
  api.on(STORY_RENDERED, updateDocumentTitle(api))
})
