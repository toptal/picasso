import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default () =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: '0.5rem 1rem',
      minWidth: rem('150px')
    }
  })
