import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ typography }: Theme) =>
  createStyles({
    root: {
      flex: 1,
      boxSizing: 'border-box',

      '& *': {
        fontFamily: typography.fontFamily
      },

      // https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/
      '& *, & *::before, & *::after': {
        boxSizing: 'inherit'
      }
    }
  })
