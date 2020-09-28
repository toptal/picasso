import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider, darken, focusRing } from '@toptal/picasso-shared'

PicassoProvider.override(
  ({ palette, sizes: { input, borderRadius } }: Theme) => ({
    MuiOutlinedInput: {
      root: {
        width: input.width,
        color: palette.common.black,
        fontSize: '1rem',

        '& $notchedOutline': {
          borderColor: palette.grey.light,
          borderRadius: borderRadius.small,
          top: 0,
          '& legend': {
            height: 0
          }
        },

        '&$focused': {
          '& $notchedOutline': {
            borderWidth: '1px',
            borderColor: palette.blue.main,
            ...focusRing(palette.primary.main)
          }
        },

        '&$disabled': {
          '& $notchedOutline': {
            borderColor: palette.grey.lighter2
          },
          backgroundColor: palette.grey.lighter,
          color: palette.grey.main
        },

        '&:hover:not($disabled)': {
          '& $notchedOutline': {
            ...focusRing(palette.primary.main)
          },
          '&:not($error)&:not($focused) $notchedOutline': {
            borderColor: palette.grey.light2
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
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            color: palette.grey.main,
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
      }
    }
  })
)

export default ({ palette, sizes: { input } }: Theme) =>
  createStyles({
    root: {
      '&:hover': {
        '& $resetButtonDirty': {
          visibility: 'visible'
        },
        '& $notchedOutline$notchedOutlineDark': {
          ...focusRing(palette.common.white)
        }
      },
      '&$focused': {
        '& $notchedOutline$notchedOutlineDark': {
          ...focusRing(palette.common.white)
        }
      }
    },
    hidden: {
      display: 'none'
    },
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
    focused: {},
    input: {
      '&:focus + $resetButtonDirty': {
        visibility: 'visible'
      }
    },
    inputSmall: {
      fontSize: '0.75rem'
    },
    inputMedium: {
      fontSize: '0.875rem'
    },
    inputMultiline: {},
    resetButton: {
      visibility: 'hidden'
    },
    resetButtonDirty: {},
    rootDark: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      backgroundColor: `${darken(palette.blue.darker!, 0.5)} !important`
    },
    notchedOutline: {},
    notchedOutlineDark: {
      border: 'none'
    },
    inputDark: {
      color: palette.common.white,
      '&::placeholder': {
        color: palette.common.white,
        opacity: 0.64
      }
    }
  })
