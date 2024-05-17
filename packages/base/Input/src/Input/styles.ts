import { createStyles } from '@material-ui/core/styles'
import '@toptal/picasso-outlined-input/styles'
import '@toptal/picasso-input-adornment/styles'

import '../InputBase/styles'

export default () =>
  createStyles({
    root: {
      cursor: 'text',
    },
    rootMultiline: {
      height: 'auto',
    },
    inputMultilineResizable: {
      resize: 'vertical',
    },
  })
