import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ pallete }) => ({
  MuiList: {
    root: {
      border: `solid 1px ${pallete.primary.main}`
    }
  }
}))

export default {
  List: {}
}
