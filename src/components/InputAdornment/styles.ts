import { Theme, createStyles } from '@material-ui/core'

import { PicassoProvider } from '../Picasso'
import { alpha } from '../styles'

PicassoProvider.override(({ palette }) => ({
  MuiInputAdornment: {
    root: {
      color: palette.grey.dark
    },
    positionStart: {},
    positionEnd: {
      justifyContent: 'flex-end',
      flexGrow: 1
    }
  }
}))

export default ({ palette }: Theme) =>
  createStyles({
    root: {},
    rootDisabled: {
      color: alpha(palette.grey.dark!, 0.48)
    }
  })
