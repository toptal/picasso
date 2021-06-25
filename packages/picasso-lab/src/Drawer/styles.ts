import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

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
      flex: 1
    },
    content: {
      flex: 1
    },
    closeButton: {
      position: 'absolute',
      right: '1.5rem',
      top: '1rem'
    },
    narrow: {
      width: '27.5rem'
    },
    regular: {
      width: '35rem'
    },
    medium: {
      width: '40rem'
    },
    wide: {
      width: '60rem'
    },
    'ultra-wide': {
      width: '73.75rem'
    }
  })
