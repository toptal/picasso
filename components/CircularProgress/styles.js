import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }) => ({
  MuiCircularProgress: {
    colorPrimary: {
      color: palette.grey[500]
    }
  }
}))

export default {
  root: {}
}
