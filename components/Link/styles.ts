import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiLink: {
    root: {
      cursor: 'pointer'
    }
  }
}))
