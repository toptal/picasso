import { Theme, createStyles } from '@material-ui/core/styles'

import '../Chip/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem'
    },
    disabled: {
      borderColor: palette.grey.lighter,
      color: palette.grey.main,
      pointerEvents: 'none'
    },
    white: {
      background: 'none',
      color: palette.common.white
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
      fontSize: '0.75em',
      fontWeight: 600
    },
    deleteIcon: {
      width: 'auto',
      height: 'auto'
    }
  })
