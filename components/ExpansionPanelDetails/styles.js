import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiExpansionPanelDetails: {
    root: {
      padding: 0
    }
  }
}))

export default {
  root: {}
}
