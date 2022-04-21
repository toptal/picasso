import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiTabs: {
    styleOverrides: {
      root: {
        position: 'relative',
        minHeight: 0,

        '&::after': {
          position: 'absolute',
          content: '""',
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: palette.grey.main,
          zIndex: 0
        }
      },
      indicator: {
        backgroundColor: palette.blue.main,
        zIndex: 1
      }
    }
  }
}))

export default () => createStyles({})
