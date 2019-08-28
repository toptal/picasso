import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'
import { alpha, rem } from '../styles'

const TAG_SELECTOR_GUTTER_SIZE = rem('6px')

PicassoProvider.override(({ palette, sizes: { input } }: Theme) => ({
  MuiOutlinedInput: {
    root: {
      height: input.height,
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
      fontSize: '1em',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      height: '100%',
      padding: input.padding,
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
      backgroundColor: palette.common.white
    },
    notchedOutline: {}
  }
}))

export default ({ sizes: { input } }: Theme) =>
  createStyles({
    root: {},
    rootFull: {
      width: '100%'
    },
    rootShrink: {
      width: 'auto'
    },
    rootAuto: {},
    rootVariantTagSelector: {
      display: 'flex',
      flexWrap: 'wrap',
      height: 'auto',
      padding: TAG_SELECTOR_GUTTER_SIZE,
      marginRight: `-${TAG_SELECTOR_GUTTER_SIZE}`,
      marginBottom: `-${TAG_SELECTOR_GUTTER_SIZE}`,
      '& > *': {
        marginRight: TAG_SELECTOR_GUTTER_SIZE,
        marginBottom: TAG_SELECTOR_GUTTER_SIZE
      },
      // Loading indicator
      '& > div:last-child': {
        marginRight: input.padding
      }
    },
    input: {},
    inputVariantTagSelector: {
      width: 'auto',
      height: rem('24px'),
      paddingLeft: rem('4px'),
      paddingRight: '0',
      fontSize: '0.8125em'
    },
    inputMultiline: {}
  })
