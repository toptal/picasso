import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiListItem: {
    root: {
      '&$focusVisible': {
        backgroundColor: 'unset !important'
      }
    }
  }
}))

export default () =>
  createStyles({
    iconContainer: {
      minWidth: '1rem'
    }
  })
