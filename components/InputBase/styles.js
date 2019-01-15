import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ typography }) => ({
  MuiInputBase: {
    input: {
      fontSize: typography.inputSize,
      lineHeight: '1.2em'
    }
  }
}))

export default {
  InputBase: {}
}
