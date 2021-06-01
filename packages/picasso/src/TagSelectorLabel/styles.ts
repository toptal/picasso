import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

import { TAG_SELECTOR_INPUT_GUTTER_SIZE } from '../TagSelectorInput'

export default () =>
  createStyles({
    label: {
      marginRight: rem('8px'),
      marginBottom: TAG_SELECTOR_INPUT_GUTTER_SIZE
    }
  })
