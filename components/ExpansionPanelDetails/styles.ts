import { createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiExpansionPanelDetails: {
    root: {
      padding: 0
    }
  }
}))

export default () =>
  createStyles({
    root: {}
  })
