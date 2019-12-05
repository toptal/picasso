import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

const TAG_SELECTOR_GUTTER_SIZE = rem('6px')

export default () =>
  createStyles({
    label: {
      marginRight: TAG_SELECTOR_GUTTER_SIZE,
      marginBottom: TAG_SELECTOR_GUTTER_SIZE
    }
  })
