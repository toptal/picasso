import { Theme, createStyles } from '@material-ui/core/styles'

import '../Chip/styles'

export default ({ palette, transitions }: Theme) =>
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
      color: palette.green.dark,
      borderColor: palette.green.dark
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
    },
    clickable: {
      '&:hover, &$hovered': {
        borderColor: palette.grey.dark,
        backgroundColor: palette.common.white,
        transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`
      },
      '&:focus': {
        backgroundColor: palette.common.white
      },
      '&$green': {
        '&:hover, &$hovered': {
          borderColor: palette.red.main,
          color: palette.red.main
        }
      }
    },
    label: {
      gap: '0.5rem'
    },
    hovered: {},

    // TagConnection styles
    connection: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      color: palette.grey.main2,
      '[aria-disabled="true"] &': {
        color: 'inherit'
      }
    }
  })
