import { Theme, createStyles } from '@material-ui/core/styles'
import { darken, outline } from '@toptal/picasso-shared'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(
  ({ palette, sizes: { input, borderRadius } }: Theme) => ({
    MuiOutlinedInput: {
      root: {
        width: input.width,
        color: palette.common.black,

        '& $notchedOutline': {
          borderColor: palette.grey.light2,
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
            ...outline(palette.primary.main)
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
          '&:not($error)&:not($focused) $notchedOutline': {
            borderColor: palette.grey.main2
          }
        }
      },
      input: {
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
          color: palette.grey.main2,
          // On Safari the text gets a bit lighter as if it had some transparency applied to it
          // We need this webkit-specific property to achieve the exact font color
          '-webkit-text-fill-color': palette.grey.main2,
          '&::placeholder': {
            color: palette.grey.main2,
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
      cursor: 'inherit',

      '&:hover': {
        '& $resetButtonDirty': {
          visibility: 'visible'
        },
        '& $notchedOutline$notchedOutlineDark': {
          ...outline(palette.common.white)
        }
      },
      '&$focused': {
        '& $notchedOutline$notchedOutlineDark': {
          ...outline(palette.common.white)
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
      cursor: 'inherit',

      '&:focus + $resetButtonDirty': {
        visibility: 'visible'
      }
    },
    inputSmall: {
      fontSize: '0.75rem',
      lineHeight: '1rem'
    },
    inputMedium: {
      fontSize: '0.875rem',
      lineHeight: '1rem'
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
