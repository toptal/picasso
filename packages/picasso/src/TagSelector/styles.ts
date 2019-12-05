import { createStyles } from '@material-ui/core/styles'

import { TAG_SELECTOR_INPUT_GUTTER_SIZE } from '../TagSelectorInput'

export default () =>
  createStyles({
    label: {
      marginRight: TAG_SELECTOR_INPUT_GUTTER_SIZE,
      marginBottom: TAG_SELECTOR_INPUT_GUTTER_SIZE
    }
  })
