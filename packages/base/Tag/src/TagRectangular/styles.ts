import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      transition: 'none',
      fontSize: '1rem',
      borderRadius: '0.25rem',
      height: '1rem',
      border: '0',
    },
    red: {
      backgroundColor: palette.red.main,
    },
    yellow: {
      backgroundColor: palette.yellow.main,
    },
    'dark-grey': {
      backgroundColor: palette.grey.darker,
    },
    'light-grey': {
      backgroundColor: palette.grey.lighter2,
    },
    'light-blue': {
      backgroundColor: palette.blue.light,
    },
    'blue-main': {
      backgroundColor: palette.blue.main,
    },
    'blue-darker': {
      backgroundColor: palette.blue.darker,
    },
    green: {
      backgroundColor: palette.green.dark,
    },
    label: {
      padding: '0 0.25em',
    },
    innerLabel: {
      fontSize: '11px',
      lineHeight: '0.75rem',
      fontWeight: 600,
      color: palette.common.white,
    },
    innerLabelDarkText: {
      color: palette.grey.darker,
    },
    icon: {
      marginLeft: '0.25rem',
      marginRight: '0',
    },
  })
