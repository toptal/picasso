import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    horizontal: {
      flexDirection: 'row',
      '& > .picasso-checkbox + .picasso-checkbox': {
        marginLeft: '0.5em'
      }
    },
    vertical: {
      flexDirection: 'column',
      '& > .picasso-checkbox + .picasso-checkbox': {
        marginTop: '0.5em'
      }
    }
  })
