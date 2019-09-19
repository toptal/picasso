import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiMenuItem: {
    root: {
      boxSizing: 'border-box',
      lineHeight: '1em',
      padding: 0,
      // to override MUI paddingTop and paddingBottom default values
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 'inherit',
      minHeight: 'unset'
    },
    gutters: {
      padding: '0.625em',
      // to override MUI paddingLeft and paddingRight default values
      paddingLeft: '0.625em',
      paddingRight: '0.625em'
    }
  }
}))

export default ({ palette }: Theme) =>
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
    chevron: {
      marginLeft: '1.5em'
    }
  })
