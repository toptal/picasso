import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider, rem } from '@toptal/picasso-shared'

PicassoProvider.override(() => ({
  MuiMenuItem: {
    root: {
      boxSizing: 'border-box',
      lineHeight: '1rem',
      padding: 0,
      // to override MUI paddingTop and paddingBottom default values
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: '1rem',
      minHeight: 'unset',
      whiteSpace: 'normal'
    },
    gutters: {
      padding: '0.625rem',
      // to override MUI paddingLeft and paddingRight default values
      paddingLeft: '0.625rem',
      paddingRight: '0.625rem'
    }
  }
}))

export default ({ typography, palette }: Theme) =>
  createStyles({
    light: {
      color: palette.common.black,

      '&:hover': {
        backgroundColor: palette.blue.lighter,

        '&$selected': {
          color: palette.blue.main,
          backgroundColor: palette.blue.lighter
        }
      },

      '&$selected': {
        color: palette.blue.main,
        backgroundColor: palette.blue.lighter
      },

      '&:focus': {
        color: palette.blue.main,
        backgroundColor: palette.blue.lighter,

        '&$selected': {
          color: palette.blue.main,
          backgroundColor: palette.blue.lighter
        }
      }
    },
    dark: {
      color: palette.grey.main,

      '&:hover': {
        backgroundColor: palette.grey.dark,

        '&$selected': {
          color: palette.common.white,
          backgroundColor: palette.grey.dark
        }
      },

      '&$selected': {
        color: palette.common.white,
        backgroundColor: palette.grey.dark
      },

      '&:focus': {
        color: palette.common.white,
        backgroundColor: palette.grey.dark,

        '&$selected': {
          color: palette.common.white,
          backgroundColor: palette.grey.dark
        }
      }
    },
    selected: {},
    stringContent: {
      flex: 1,
      fontSize: '0.8125em'
    },
    stringContentSmall: {
      fontSize: '0.75rem'
    },
    stringContentMedium: {
      fontSize: '0.8125rem'
    },
    stringContentSemibold: {
      fontWeight: typography.fontWeights.semibold
    },
    guttersSmall: {
      padding: `0.1875rem 0.5rem`
    },
    guttersMedium: {
      padding: '0.375rem 0.5rem'
    },
    iconContainer: {
      width: '1rem'
    },
    content: {
      height: '1.25rem'
    },
    description: {
      fontSize: rem('11px'),
      color: palette.text.primary
    }
  })
