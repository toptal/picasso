import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiCircularProgress: {
    colorPrimary: {
      color: palette.grey.darker
    }
  }
}))

export default () =>
  createStyles({
    root: {}
  })
