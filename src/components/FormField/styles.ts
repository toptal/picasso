import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      '& + &': {
        marginTop: '1em'
      }
    }
  })
