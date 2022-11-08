import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

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
      padding: rem('2px'),
    },
    inputMultiline: {
      // 1rem line + top and bottom 0.375rem padding
      minHeight: '1.75rem',
      padding: '0.375rem',

      '&$inputLarge': {
        // 1rem line + top and bottom 0.625rem
        minHeight: '2.25rem',
        padding: '0.625rem',
      },

      // after manually lowering height of the textarea,
      // the input receives inline overflow:hidden and
      // it is very hard to navigate inside the textarea
      // showing scrollbar is much better experience
      overflow: 'auto !important',
    },
    inputMultilineWithAdornment: {
      // 1rem line + top 0.375rem + bottom 1.5rem padding
      minHeight: '2.875rem',
      paddingBottom: '1.5rem',

      '&$inputLarge': {
        // 1rem line + top 0.625rem + bottom 2.125rem padding
        minHeight: '3.75rem',
        paddingBottom: '2.125rem',
      },
    },
    inputMultilineResizable: {
      resize: 'vertical',
    },
    inputLarge: {},
  })
