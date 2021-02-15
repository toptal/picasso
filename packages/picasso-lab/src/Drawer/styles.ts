import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(() => ({
  MuiDrawer: {
    paper: {
      maxWidth: '100%'
    }
  }
}))

export default () =>
  createStyles({
    container: {
      maxWidth: '100%',
      position: 'relative',
      flex: 1,
    },
    content: {
      flex: 1
    },
    closeButton: {
      position: 'absolute',
      right: '1.5rem',
      top: '1rem'
    },
    regular: {
      width: '27.5rem'
    },
    wide: {
      width: '34.5rem'
    }
  })
