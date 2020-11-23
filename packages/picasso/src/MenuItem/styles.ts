import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

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

      '&$hover:hover': {
        color: palette.common.black,
        backgroundColor: palette.blue.lighter,

        '&$selected': {
          color: palette.common.black,
          backgroundColor: palette.blue.lighter
        }
      },

      '&:not($hover):hover, &:not($hover):focus': {
        backgroundColor: 'initial'
      },

      '&$selected': {
        color: palette.common.black,
        backgroundColor: palette.blue.lighter
      },

      '&:focus': {
        color: palette.common.black,
        backgroundColor: palette.blue.lighter,

        '&$selected': {
          color: palette.common.black,
          backgroundColor: palette.blue.lighter
        }
      }
    },
    dark: {
      color: palette.grey.main,

      '&$hover:hover': {
        backgroundColor: palette.grey.dark,

        '&$selected': {
          color: palette.common.white,
          backgroundColor: palette.grey.dark
        }
      },

      '&:not($hover):hover, &:not($hover):focus': {
        backgroundColor: 'initial'
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
    focusVisible: {
      // MUI has a default focus background for focusable items. This rule disables it.
      backgroundColor: 'unset !important'
    },
    selected: {},
    hover: {},
    stringContent: {
      flex: 1,
      fontSize: '0.8125em'
    },
    stringContentSmall: {
      fontSize: '0.75rem',
      lineHeight: '1.125rem'
    },
    stringContentMedium: {
      fontSize: '0.8125rem',
      lineHeight: '1.25rem'
    },
    stringContentSemibold: {
      fontWeight: typography.fontWeights.semibold
    },
    guttersSmall: {
      padding: '0.1875rem 0.5rem'
    },
    guttersMedium: {
      padding: '0.375rem 0.5rem'
    },
    iconContainer: {
      width: '1rem'
    },
    content: {
      flex: 1,
      minWidth: '0px'
    },
    description: {
      fontSize: '0.6875em',
      color: palette.text.primary
    }
  })
