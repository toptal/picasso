import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiButtonBase: {
    root: {
      color: 'inherit',
      fontSize: 'inherit'
    }
  }
}))
