import { Theme } from '@mui/material/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(({ typography, palette }: Theme) => ({
  MuiInputBase: {
    styleOverrides: {
      root: {
        fontSize: 'unset',
        backgroundColor: palette.common.white
      },
      input: {
        fontSize: typography.inputSize,
        lineHeight: '1.2em'
      },
      error: {
        color: palette.red.main,
        backgroundColor: palette.red.lighter
      }
    }
  }
}))
