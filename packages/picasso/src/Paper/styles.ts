import createStyles from '@mui/styles/createStyles';
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiPaper: {
    root: {
      color: 'unset',
    },
  },
}))

export default () => createStyles({})
