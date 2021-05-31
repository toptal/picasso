import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

import { TAG_SELECTOR_INPUT_GUTTER_SIZE } from '../TagSelectorInput'
export const TAG_SELECTOR_HORIZONTAL_GUTTER_SIZE = rem('8px')

export default () =>
  createStyles({
    label: {
      marginRight: TAG_SELECTOR_HORIZONTAL_GUTTER_SIZE,
      marginBottom: TAG_SELECTOR_INPUT_GUTTER_SIZE
    }
  })
