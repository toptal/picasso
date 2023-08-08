import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

import highlightAutofillStyles from '../InputBase/highlight-styles'

export default (theme: Theme) => {
  const { spacing } = theme

  return createStyles({
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
    },

    ...highlightAutofillStyles(theme),

    toggle: {
      marginRight: spacing(1),
    },
  })
}
