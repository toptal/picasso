import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      flex: 1,
      boxShadow: 'none',
      order: 1
    },
    bottom: {
      order: 99
    }
  })
