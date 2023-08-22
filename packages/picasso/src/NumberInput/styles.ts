import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

import highlightAutofillStyles from '../InputBase/highlight-styles'

export default (theme: Theme) =>
  createStyles({
    root: {
      paddingRight: 0,
      cursor: 'text',
    },
    input: {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        appearance: 'none',
        margin: 0,
      },
      '-moz-appearance': 'textfield',
    },
    horizontalLayout: {
      width: '100%',
    },
    ...highlightAutofillStyles(theme),
  })
