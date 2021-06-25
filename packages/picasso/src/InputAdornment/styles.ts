import { Theme, createStyles } from '@material-ui/core'
import { alpha } from '@toptal/picasso-shared'
import { PicassoProvider } from '@toptal/picasso-provider'

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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      color: alpha(palette.grey.dark!, 0.48)
    }
  })
