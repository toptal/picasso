import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    horizontal: {
      flexDirection: 'row',
      '& > * + *': {
        marginLeft: '0.5em'
      }
    },
    vertical: {
      flexDirection: 'column',
      '& > * + *': {
        marginTop: '0.5em'
      }
    }
  })
