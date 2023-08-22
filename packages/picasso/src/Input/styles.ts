import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

import highlightAutofillStyles from '../InputBase/highlight-styles'
import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'
import '../InputAdornment/styles'

export default (theme: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      backgroundColor: theme.palette.common.white,
      cursor: 'text',
    },
    rootMultiline: {
      height: 'auto',
    },
    inputMultilineResizable: {
      resize: 'vertical',
    },
    horizontalLayout: {
      width: '100%',
    },
    ...highlightAutofillStyles(theme),
  })
