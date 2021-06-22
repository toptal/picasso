import { Theme } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(({ typography, palette }: Theme) => ({
  MuiInputBase: {
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
}))
