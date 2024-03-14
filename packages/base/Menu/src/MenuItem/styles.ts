import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'
import { rem } from '@toptal/picasso-shared'

// Test comment
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
      whiteSpace: 'normal',
    },
    gutters: {
      padding: '0.625rem',
      // to override MUI paddingLeft and paddingRight default values
      paddingLeft: '0.625rem',
      paddingRight: '0.625rem',
    },
  },
}))

export default ({ typography, palette, shadows }: Theme) =>
  createStyles({
    root: {
      minWidth: rem('144'),
      '&$nonSelectable:hover, &$nonSelectable:focus': {
        backgroundColor: 'unset',
      },

      '&$disabled': {
        color: palette.grey.main2,
        pointerEvents: 'none',
        opacity: 1,
      },
    },
    light: {
      color: palette.common.black,

      '&:hover': {
        color: palette.common.black,
        backgroundColor: palette.blue.lighter,

        '&$selected': {
          color: palette.common.black,
          backgroundColor: palette.blue.lighter,
        },
      },

      '&$selected': {
        color: palette.common.black,
        backgroundColor: palette.blue.lighter,
      },

      '&:focus': {
        color: palette.common.black,
        backgroundColor: palette.blue.lighter,

        '&$selected': {
          color: palette.common.black,
          backgroundColor: palette.blue.lighter,
        },
      },
    },
    dark: {
      color: palette.grey.main,

      '&:hover': {
        backgroundColor: palette.grey.dark,

        '&$selected': {
          color: palette.common.white,
          backgroundColor: palette.grey.dark,
        },
      },

      '&$selected': {
        color: palette.common.white,
        backgroundColor: palette.grey.dark,
      },

      '&:focus': {
        color: palette.common.white,
        backgroundColor: palette.grey.dark,

        '&$selected': {
          color: palette.common.white,
          backgroundColor: palette.grey.dark,
        },
      },
    },
    selected: {},
    nonSelectable: {},
    stringContent: {
      flex: 1,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
    stringContentSemibold: {
      fontWeight: typography.fontWeights.semibold,
    },
    gutters: {
      padding: '0.375rem 1rem',
    },
    iconContainer: {
      width: '1rem',
    },
    itemWrapper: {
      flex: 1,
      maxWidth: '100%',
    },
    content: {
      flex: 1,
      minWidth: '0px',
    },
    description: {
      fontSize: '0.6875em',
      color: palette.text.primary,
    },
    descriptionDisabled: {
      color: 'inherit',
    },
    paper: {
      background: palette.common.white,
      maxHeight: '14.75rem', // 6.5 lines to show
      overflowY: 'auto',
      boxShadow: shadows[2],
    },
    disabled: {},
  })
