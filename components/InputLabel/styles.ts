import { createStyles } from '@material-ui/core'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }) => ({
  MuiInputLabel: {
    root: {
      fontSize: 'unset'
    },
    error: {
      color: palette.error.main
    }
  }
}))

export default () =>
  createStyles({
    root: {}
  })
