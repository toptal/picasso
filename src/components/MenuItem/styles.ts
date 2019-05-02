import { Theme } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiMenuItem: {
    root: {
      boxSizing: 'border-box',
      height: '2.25rem',
      lineHeight: '1rem',
      padding: '0.625rem',
      fontSize: '0.8125em',

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
      paddingLeft: '0.625rem',
      paddingRight: '0.625rem'
    }
  }
}))
