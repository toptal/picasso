import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiMenuItem: {
    root: {
      boxSizing: 'border-box',
      height: '2.25em',
      lineHeight: '1em',
      padding: 0,
      fontSize: 'inherit',

      '&:hover': {
        backgroundColor: palette.blue.lighter,

        '&$selected': {
          backgroundColor: palette.blue.lighter,
          color: palette.primary.main
        }
      },

      '&$selected': {
        backgroundColor: palette.blue.lighter,
        color: palette.primary.main
      },

      '&:focus': {
        backgroundColor: palette.blue.lighter,
        color: palette.primary.main
      }
    },
    selected: {},
    gutters: {
      padding: '0.625em',
      // to override MUI paddingLeft and paddingRight default values
      paddingLeft: '0.625em',
      paddingRight: '0.625em'
    }
  }
}))

export default () =>
  createStyles({
    stringContent: {
      fontSize: '0.8125em'
    }
  })
