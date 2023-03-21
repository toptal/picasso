import { createStyles, Theme } from '@material-ui/core/styles'

import highlightAutofillStyles from '../InputBase/highlightAutofillStyles'

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
    ...highlightAutofillStyles(theme),
  })
