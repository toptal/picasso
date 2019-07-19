import { createStyles } from '@material-ui/core'

export default ({ typography }: { typography: any }) =>
  createStyles({
    root: {
      flex: 1,
      boxSizing: 'border-box',

      '& *': {
        fontFamily: typography.fontFamily
      },

      '& *, & *::before, & *::after': {
        boxSizing: 'inherit'
      }
    }
  })
