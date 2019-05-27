import { createStyles } from '@material-ui/core'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }) => ({
  MuiInputLabel: {
    root: {
      fontSize: 'unset'
    },
    error: {
      color: palette.red.main
    }
  }
}))

export default () =>
  createStyles({
    root: {}
  })
