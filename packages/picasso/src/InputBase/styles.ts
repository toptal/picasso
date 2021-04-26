import { Theme } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(({ typography, palette }: Theme) => ({
  MuiInputBase: {
    root: {
      fontSize: 'unset',
      backgroundColor: palette.primary.main
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
