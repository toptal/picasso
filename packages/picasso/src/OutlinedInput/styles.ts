import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider, alpha } from '@toptal/picasso-shared'

PicassoProvider.override(({ palette, sizes: { input } }: Theme) => ({
  MuiOutlinedInput: {
    root: {
      width: input.width,
      color: palette.common.black,

      '& $notchedOutline': {
        borderColor: palette.grey.light,
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
          borderColor: alpha(palette.grey.light!, 0.48)
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
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      height: '100%',
      padding: 0,
      border: 'none',

      '&::placeholder': {
        color: palette.grey.main2,
        opacity: 1
      },

      '&$disabled': {
        '&::placeholder': {
          color: alpha(palette.grey.main2!, 0.48),
          opacity: 1
        }
      }
    },
    inputMultiline: {
      padding: 0
    },
    multiline: {
      padding: 0
    },
    error: {
      backgroundColor: 'transparent'
    },
    notchedOutline: {}
  }
}))

export default ({ sizes: { input } }: Theme) =>
  createStyles({
    root: {},
    rootSmall: {
      padding: '0.25rem 0.625rem',
      height: '1.5rem'
    },
    rootMedium: {
      padding: input.padding,
      height: input.height
    },
    rootFull: {
      width: '100%'
    },
    rootShrink: {
      width: 'auto'
    },
    rootAuto: {},
    input: {},
    inputSmall: {
      fontSize: '0.75rem'
    },
    inputMedium: {
      fontSize: '0.8125rem'
    },
    inputMultiline: {}
  })
