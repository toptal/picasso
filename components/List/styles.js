import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }) => ({
  MuiList: {
    root: {
      border: `solid 1px ${palette.primary.main}`
    }
  }
}))

export default {
  List: {}
}
