import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(() => ({
  MuiExpansionPanelDetails: {
    root: {
      padding: '0 0 0.625em'
    }
  }
}))

export default () =>
  createStyles({
    root: {}
  })
