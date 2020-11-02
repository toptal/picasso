import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      marginRight: '-0.5em',
      marginBottom: '-0.5em',

      '& > .picasso-checkbox': {
        marginRight: '1em',
        marginBottom: '0.5em'
      }
    },

    horizontal: {
      flexDirection: 'row'
    },

    vertical: {
      flexDirection: 'column'
    }
  })
