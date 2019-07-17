import { createStyles } from '@material-ui/core'

export default ({ typography }: { typography: any }) =>
  createStyles({
    root: {
      flex: 1,

      '& *': {
        fontFamily: typography.fontFamily
      },

      boxSizing: 'border-box'
    }
  })
