import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      width: '0.5rem',
      height: '0.5rem',
      borderRadius: '50%',
    },
    red: {
      background: palette.red.main,
    },
    yellow: {
      background: palette.yellow.main,
    },
    blue: {
      background: palette.blue.main,
    },
    green: {
      background: palette.green.dark,
    },
    'light-grey': {
      background: palette.grey.light2,
    },
    'light-blue': {
      background: palette.blue.light,
    },
  })
