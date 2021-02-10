import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(() => ({
  MuiLink: {
    root: {
      cursor: 'pointer'
    }
  }
}))

export default ({ typography, palette }: Theme) =>
  createStyles({
    root: {
      '&:focus': {
        outline: `1px dotted ${palette.blue.main}`
      }
    },
    action: {
      fontWeight: typography.fontWeights.semibold
    },
    black: {
      color: palette.common.black
    },
    white: {
      color: palette.common.white
    }
  })
