import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      width: '100%',
      boxShadow: 'none',
      order: 1
    },
    bottom: {
      order: 99
    }
  })
