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
    rootMedium: {
      fontSize: '0.625rem',
      width: '1rem',
      height: '1rem'
    },
    rootLarge: {
      fontSize: '0.75rem',
      width: '1.5rem',
      height: '1.5rem'
    },
    rootDisabled: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      color: alpha(palette.grey.dark!, 0.48)
    }
  })
