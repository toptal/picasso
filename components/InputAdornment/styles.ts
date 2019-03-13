import { createStyles } from '@material-ui/core'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiInputAdornment: {
    positionStart: {
      marginLeft: 0,
      marginRight: 0
    },
    positionEnd: {
      marginLeft: 0,
      marginRight: 0
    }
  }
}))

export default () => createStyles({})
