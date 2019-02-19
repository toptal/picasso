import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiFormControl: {
    root: {
      fontSize: '18px',
      width: '14em'
    }
  }
}))

export default () => ({})
