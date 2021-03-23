import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider, alpha } from '@toptal/picasso-shared'

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
