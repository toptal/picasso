import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    button: {
      '&+&': {
        marginLeft: '0.5em'
      }
    },
    ellipsis: {
      padding: '0 0.5em',
      cursor: 'default'
    }
  })
