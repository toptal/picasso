import { createStyles } from '@material-ui/core'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }) => ({
  MuiInputAdornment: {
    root: {
      //color: palette.grey.dark
    },
    positionStart: {},
    positionEnd: {
      justifyContent: 'flex-end',
      flexGrow: 1
    }
  }
}))

export default () => createStyles({})
