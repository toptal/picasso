import { Theme } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontSize: 'unset'
      },
      error: {
        color: palette.red.main
      }
    }
  }
}))

export default () =>
  createStyles({
    root: {}
  })
