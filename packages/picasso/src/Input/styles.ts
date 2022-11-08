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
      // 1rem line + top and bottom 0.5rem padding
      minHeight: '2rem',
      padding: '0.5rem',

      // after manually lowering height of the textarea,
      // the input receives inline overflow:hidden and
      // it is very hard to navigate inside the textarea
      // showing scrollbar is much better experience
      overflow: 'auto !important',
    },
    inputMultilineWithAdornment: {
      // 1rem line + top 0.5rem + bottom 1.25rem padding
      minHeight: '2.75rem',
      paddingBottom: '1.25rem',
    },
    inputMultilineResizable: {
      resize: 'vertical',
    },
  })
