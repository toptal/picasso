import { Theme } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'
import { alpha } from '../styles'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiOutlinedInput: {
    root: {
      color: palette.common.black,

      '& $notchedOutline': {
        borderColor: palette.grey[100],
        borderRadius: 0,
        top: 0,
        '& legend': {
          height: 0
        }
      },

      '&$focused': {
        '& $notchedOutline': {
          borderWidth: '1px'
        }
      },

      '&$disabled': {
        '& $notchedOutline': {
          borderColor: alpha(palette.grey[100], 0.48)
        },
        color: alpha(palette.common.black, 0.48)
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
      border: 'solid 1px transparent',

      '&::placeholder': {
        color: palette.text.primary,
        opacity: 1
      },

      '&$disabled': {
        '&::placeholder': {
          opacity: 0.48
        }
      }
    },
    multiline: {
      padding: 0
    },
    error: {
      backgroundColor: palette.common.white
    },
    notchedOutline: {},
    adornedStart: {
      paddingRight: 0
    },
    adornedEnd: {
      paddingRight: 0
    }
  }
}))

export default {
  input: {}
}
