import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiBreadcrumbs: {
    root: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: palette.text.primary
    },
    separator: {
      margin: '0 0.25rem'
    },
    li: {
      padding: 0,
      margin: 0
    }
  }
}))

export default () =>
  createStyles({
    root: {},
    breadcrumbs: {
      display: 'flex',
      alignItems: 'center',
      padding: 0,
      margin: 0
    },
    item: {
      display: 'inline-flex',
      alignItems: 'center',
      listStyleType: 'none',
      fontSize: '14px',
      fontWeight: 'bold'
    },
    splitter: {
      padding: '0 0.25rem'
    }
  })
