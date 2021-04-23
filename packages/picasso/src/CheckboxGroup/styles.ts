import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      marginRight: '-0.5em',
      marginBottom: '-0.5em',

      '& .picasso-checkbox': {
        marginBottom: '0.5em'
      }
    },

    grid: {
      marginTop: 0,
      marginBottom: 0
    },

    gridItem: {
      lineHeight: 1,
      paddingTop: '0 !important',
      paddingBottom: '0 !important'
    }
  })
