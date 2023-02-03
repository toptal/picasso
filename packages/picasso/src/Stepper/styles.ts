import createStyles from '@mui/styles/createStyles';
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiStepper: {
    root: {
      padding: 0,
    },
  },
}))

export default () =>
  createStyles({
    root: {
      fontSize: '1rem',
      background: 'inherit',
    },
    fullWidth: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  })
