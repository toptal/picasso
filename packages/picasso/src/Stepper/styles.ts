import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiStepper: {
    root: {
      padding: 0
    }
  }
}))

export default () =>
  createStyles({
    root: {
      fontSize: '1rem'
    },
    fullWidth: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  })
