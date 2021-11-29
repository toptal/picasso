import { Theme, createStyles } from '@material-ui/core/styles'

import '../Chip/styles'

export default ({ palette, transitions }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      maxWidth: '100%'
    },
    primary: {
      color: palette.blue.main,
      borderColor: palette.blue.main
    },
    positive: {
      color: palette.green.dark,
      borderColor: palette.green.dark
    },
    warning: {
      color: palette.yellow.main,
      borderColor: palette.yellow.main
    },
    negative: {
      color: palette.red.main,
      borderColor: palette.red.main
    },
    disabled: {
      borderColor: palette.grey.lighter2,
      color: palette.grey.main,
      pointerEvents: 'none'
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
      cursor: 'default',
      '&:hover, &:focus': {
        backgroundColor: palette.common.white,
        cursor: 'default'
      },
      '&$checkable:not($disabled)': {
        cursor: 'pointer',
        '&:hover, &$hovered': {
          borderColor: palette.grey.dark,
          backgroundColor: palette.common.white,
          transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`
        },
        '&:focus': {
          backgroundColor: palette.common.white
        },
        '&$positive': {
          '&:hover, &$hovered': {
            borderColor: palette.red.main,
            color: palette.red.main
          }
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
    },

    // TagCheckable
    checkable: {}
  })
