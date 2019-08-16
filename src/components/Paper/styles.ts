import { createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiPaper: {
    root: {
      color: 'unset'
    }
  }
}))

export default () => createStyles({})
