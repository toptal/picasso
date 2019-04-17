import { createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({}))

export default () =>
  createStyles({
    fullWidth: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  })
