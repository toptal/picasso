import { createStyles, Theme } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(() => ({
  MuiDrawer: {
    paper: {
      maxWidth: '100%'
    }
  }
}))

export default ({ palette }: Theme) =>
  createStyles({
    container: {
      maxWidth: '100%',
      flex: 1
    },
    header: {
      position: 'absolute',
      left: 0,
      right: 0,
      borderBottom: `1px solid ${palette.grey.lighter}`,
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem'
    },
    title: {
      flexGrow: 1
    },
    content: {
      paddingTop: '4.3125rem',
      flex: 1
    },
    regular: {
      width: '27.5rem'
    },
    wide: {
      width: '34.5rem'
    }
  })
