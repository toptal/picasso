import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }) => ({
  MuiInputLabel: {
    error: {
      color: palette.error.main
    }
  }
}))

export default {
  root: {},
  shrink: {}
}
