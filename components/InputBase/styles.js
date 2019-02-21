import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ typography, palette }) => ({
  MuiInputBase: {
    root: {
      fontSize: 'unset'
    },
    input: {
      fontSize: typography.inputSize,
      lineHeight: '1.2em'
    },
    error: {
      color: palette.error.dark,
      backgroundColor: palette.error.lighter
    }
  }
}))

export default {
  InputBase: {}
}
