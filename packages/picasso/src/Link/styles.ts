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
      },
      textDecoration: 'none',
      '&:hover, &$disabled': {
        textDecoration: 'underline'
      }
    },
    noUnderline: {
      '&:hover': {
        textDecoration: 'none'
      },
      '&$disabled': {
        textDecoration: 'underline'
      }
    },
    action: {
      fontWeight: typography.fontWeights.semibold,
      textDecoration: 'none',
      '&$disabled': {
        textDecoration: 'none',
        opacity: '48%',
        color: palette.blue.main
      }
    },
    visited: {},
    blue: {
      '&:visited, &$visited': {
        color: palette.blue.darker
      }
    },
    white: {
      '&:visited, &$visited': {
        color: palette.grey.main
      },
      color: palette.common.white,
      textDecoration: 'underline',
      '&$noUnderline': {
        textDecoration: 'none'
      }
    },
    disabled: {
      cursor: 'not-allowed',
      color: palette.grey.main2
    },
    container: {
      textDecoration: 'none',
      display: 'block'
    }
  })
