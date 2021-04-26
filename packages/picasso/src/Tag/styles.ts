import { Theme, createStyles } from '@material-ui/core/styles'

import '../Chip/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      maxWidth: '100%'
    },
    disabled: {
      borderColor: palette.grey.lighter2,
      color: palette.grey.main,
      pointerEvents: 'none'
    },
    blue: {
      color: palette.blue.main,
      borderColor: palette.blue.main
    },
    green: {
      color: palette.green.main,
      borderColor: palette.green.main
    },
    yellow: {
      color: palette.yellow.main,
      borderColor: palette.yellow.main
    },
    red: {
      color: palette.red.main,
      borderColor: palette.red.main
    },
    innerLabel: {
      fontSize: '0.75rem',
      fontWeight: 600,
      minWidth: 0
    },
    deleteIcon: {
      width: 'auto',
      height: 'auto'
    }
  })
