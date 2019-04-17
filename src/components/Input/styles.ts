import { createStyles } from '@material-ui/core'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({}))

export default () =>
  createStyles({
    input: {}
  })
