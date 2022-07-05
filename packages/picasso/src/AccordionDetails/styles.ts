import createStyles from '@mui/styles/createStyles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        padding: '0 0 0.625em',
      },
    },
  },
}))

export default () =>
  createStyles({
    root: {},
  })
