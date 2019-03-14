import { createStyles } from '@material-ui/core'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiInput: {}
}))

export default () =>
  createStyles({
    input: {}
  })
