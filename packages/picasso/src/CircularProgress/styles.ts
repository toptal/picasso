import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiCircularProgress: {
    styleOverrides: {
      colorPrimary: {
        color: palette.grey.darker,
      },
    },
  },
}))

export default () =>
  createStyles({
    root: {},
  })
