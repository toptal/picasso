import { Theme } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ typography, palette }: Theme) => ({
  MuiInputBase: {
    root: {
      fontSize: 'unset'
    },
    input: {
      fontSize: typography.inputSize,
      lineHeight: '1.2em'
    },
    error: {
      color: palette.red.dark,
      backgroundColor: palette.red.lighter
    }
  }
}))
