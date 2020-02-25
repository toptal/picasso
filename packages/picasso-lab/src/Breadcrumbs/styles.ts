import { createStyles } from '@material-ui/core/styles'

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
