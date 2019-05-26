import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'
import { em } from '../styles'

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
          backgroundColor: palette.blue.lighter
        }
      },

      '&$selected': {
        backgroundColor: palette.blue.lighter
      },

      '&:focus': {
        backgroundColor: palette.blue.lighter
      }
    },
    selected: {},
    gutters: {
      padding: em('10px'), // '0.625em'
      // to override MUI paddingLeft and paddingRight default values
      paddingLeft: em('10px'), // '0.625em'
      paddingRight: em('10px') // '0.625em'
    }
  }
}))

export default () =>
  createStyles({
    stringContent: {
      fontSize: em('13px') // '0.8125em'
    }
  })
