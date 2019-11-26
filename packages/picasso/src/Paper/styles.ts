import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(() => ({
  MuiPaper: {
    root: {
      color: 'unset'
    }
  }
}))

export default () => createStyles({})
