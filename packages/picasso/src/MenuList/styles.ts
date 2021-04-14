import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

import '../List/styles'

PicassoProvider.override(({ shadows }: Theme) => ({
  MuiMenu: {
    paper: {
      boxShadow: shadows[2]
    }
  }
}))

export default () =>
  createStyles({
    root: {
      outline: 0
    }
  })
