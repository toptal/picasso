import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    icon: {
      flex: '1 1 0%', // fix for IE11
    },
  })
