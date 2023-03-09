import { Theme, createStyles } from '@material-ui/core/styles'

import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'
import '../InputAdornment/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      backgroundColor: palette.common.white,
      cursor: 'text',
    },
    rootMultiline: {
      height: 'auto',
    },
    highlightAutofill: {
      // palette.yellow.lighter
      backgroundColor: 'rgba(255, 245, 227, 0.6)',
    },
    inputMultilineResizable: {
      resize: 'vertical',
    },
  })
