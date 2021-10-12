import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiLink: {
    root: {
      cursor: 'pointer'
    }
  }
}))

export default ({ typography, palette }: Theme) =>
  createStyles({
    root: {
      '&:focus': {
        outline: 'none'
      },
      '&[role="button"]': {
        fontSize: '1rem'
      }
    },
    textDecorationNone: {
      textDecoration: 'none'
    },
    textDecorationUnderline: {
      textDecoration: 'underline',
      '&:hover': {
        '&:not($disabled)': {
          textDecoration: 'none'
        }
      }
    },
    action: {
      fontWeight: typography.fontWeights.semibold,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'none'
      }
    },
    black: {
      color: palette.common.black
    },
    white: {
      color: palette.common.white
    },
    disabled: {
      cursor: 'not-allowed',
      color: palette.grey.main2
    },
    container: {
      textDecoration: 'none',
      dispaly: 'block'
    },
    fontSizeInherit: {
      fontSize: 'inherit'
    },
    fontSizeInitial: {
      fontSize: '0.875rem'
    }
  })
