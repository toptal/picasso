import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(() => ({
  MuiListItem: {
    focusVisible: {
      backgroundColor: 'unset !important'
    }
  }
}))

export default () =>
  createStyles({
    iconContainer: {
      minWidth: '1rem'
    }
  })
