import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import { rem } from '@toptal/picasso-shared'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(({ shadows }: Theme) => ({
  MuiMenu: {
    styleOverrides: {
      paper: {
        boxShadow: shadows[2]
      }
    }
  },
  MuiList: {
    styleOverrides: {
      root: {
        boxShadow: shadows[1]
      }
    }
  }
}))

export default () =>
  createStyles({
    root: {
      outline: 0
    },
    backButtonIcon: {
      verticalAlign: 'middle',
      marginTop: rem('-1px'),
      marginRight: rem('4px'),
      marginLeft: rem('-5px')
    }
  })
