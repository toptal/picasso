import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiMenuItem: {
    root: {
      boxSizing: 'border-box',
      height: '2.25em',
      lineHeight: '1em',
      padding: 0,
      fontSize: 'inherit'
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
      fontSize: '0.8125em'
    }
  })
