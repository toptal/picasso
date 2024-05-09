import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      marginRight: '-0.5em',
      marginBottom: '-0.5em',

      '& .picasso-checkbox': {
        marginBottom: '0.5em',
      },
    },
  })
