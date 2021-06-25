import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiStep: {
    horizontal: {
      paddingLeft: 0,
      paddingRight: 0
    }
  }
}))

export default () => createStyles({})
