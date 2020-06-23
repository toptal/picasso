import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      fontSize: '1rem',

      '& + &': {
        marginTop: '1.5em'
      },
      '& $error + $hint': {
        marginTop: 0
      }
    },

    hint: {},

    error: {}
  })
