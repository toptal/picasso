import { createStyles, Theme } from '@material-ui/core'

export default ({ typography }: Theme) =>
  createStyles({
    root: {
      flex: 1,
      // fix for long text inside flexbox containers
      // so content grows width of the child's flexbox element
      maxWidth: '100%',
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
