import createStyles from '@mui/styles/createStyles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiStep: {
    styleOverrides: {
      horizontal: {
        paddingLeft: 0,
        paddingRight: 0
      }
    }
  }
}))

export default () => createStyles({})
