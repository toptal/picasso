import { Theme } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiOutlinedInput: {
    root: {
      '& $notchedOutline': {
        borderColor: palette.grey[50],
        borderRadius: 0
      },

      '&$focused': {
        '& $notchedOutline': {
          borderWidth: '1px'
        }
      },

      '&:hover': {
        '&:not($disabled)&:not($focused)&:not($error)': {
          '& $notchedOutline': {
            borderColor: palette.primary.main
          }
        }
      }
    },
    input: {
      border: 'solid 1px transparent'
    },
    multiline: {
      padding: 0
    },
    error: {
      '$root& $notchedOutline': {
        borderColor: palette.error.light
      }
    },
    notchedOutline: {},
    adornedEnd: {
      paddingRight: 0
    }
  }
}))

export default {
  input: {}
}
