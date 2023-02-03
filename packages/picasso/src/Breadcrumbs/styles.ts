import createStyles from '@mui/styles/createStyles';
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiBreadcrumbs: {
    separator: {
      marginLeft: '0.25rem',
      marginRight: '0.25rem',
    },
    li: {
      padding: 0,
      margin: 0,
    },
  },
}))

export default () =>
  createStyles({
    root: {},
  })
