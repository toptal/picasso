import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      width: '0.5rem',
      height: '0.5rem',
      borderRadius: '50%'
    },
    negative: {
      background: palette.red.main
    },
    warning: {
      background: palette.yellow.main
    },
    primary: {
      background: palette.blue.main
    },
    positive: {
      background: palette.green.dark
    },
    light: {
      background: palette.grey.light2
    }
  })
