import { Theme } from '@mui/material'
import createStyles from '@mui/styles/createStyles'

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
