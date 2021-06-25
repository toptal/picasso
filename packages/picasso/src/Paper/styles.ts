import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiPaper: {
    root: {
      color: 'unset'
    }
  }
}))

export default () => createStyles({})
