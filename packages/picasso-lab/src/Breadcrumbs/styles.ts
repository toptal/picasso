import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(() => ({
  MuiBreadcrumbs: {
    separator: {
      marginLeft: '0.25rem',
      marginRight: '0.25rem'
    },
    li: {
      padding: 0,
      margin: 0
    }
  }
}))

export default () =>
  createStyles({
    root: {}
  })
