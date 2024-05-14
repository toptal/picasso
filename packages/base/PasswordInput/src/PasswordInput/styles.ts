import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { highlightStyles as highlightAutofillStyles } from '@toptal/picasso-input'

export default (theme: Theme) => {
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
  })
}
