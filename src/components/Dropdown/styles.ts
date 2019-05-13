import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    anchor: {
      display: 'inline-flex',
      alignItems: 'center'
    },
    content: {
      fontSize: 'inherit'
    }
  })
