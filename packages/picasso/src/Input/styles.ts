import { Theme, createStyles } from '@material-ui/core/styles'

import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'
import '../InputAdornment/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1em',
      backgroundColor: palette.common.white,
      cursor: 'text',
    },
    rootMultiline: {
      height: 'auto',
      padding: '0.15em',
    },
    inputMultiline: {
      minHeight: '4em',
      paddingBottom: '1.25em',
      padding: '0.5em',
    },
    inputMultilineResizable: {
      resize: 'vertical',
    },
  })
