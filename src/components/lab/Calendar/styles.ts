import { Theme, createStyles } from '@material-ui/core/styles'

import { alpha, rem } from '../../styles'

export default ({ palette, shadows }: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      padding: '1.875em',
      color: palette.grey.darker,
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '20.5rem',
      maxWidth: '20.5rem',
      boxShadow: shadows[4],
      backgroundColor: palette.common.white,

      '&:before': {
        content: '""',
        border: `0.5rem solid ${palette.common.white}`,
        borderColor: `transparent transparent ${palette.common.white} ${
          palette.common.white
        }`,
        background: palette.common.white,
        position: 'absolute',
        top: '-0.5rem',
        transform: 'rotate(45deg)',
        boxShadow: `-${rem('2px')} -${rem('2px')} ${rem('2px')} 0 ${alpha(
          palette.common.black,
          0.15
        )}`
      }
    },
    month: {},
    week: {
      display: 'flex'
    },
    day: {
      height: '2.5rem',
      width: '2.5rem',
      minWidth: '2.5rem',
      verticalAlign: 'middle',
      fontSize: '0.75rem',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: palette.common.white,
      position: 'relative',
      margin: 0,
      padding: 0,
      border: 'none',
      outline: 0
    },
    weekDays: {
      display: 'flex',
      textAlign: 'center',
      fontSize: '0.75em',
      textTransform: 'uppercase',
      color: palette.grey.main2,
      paddingBottom: rem('11px')
    },
    weekDay: {
      flexBasis: '15%'
    },

    actions: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1.5rem'
    },
    selected: {
      background: alpha(palette.blue.main, 0.48),
      color: palette.common.white,
      position: 'relative',

      '&$today:after': {
        backgroundColor: palette.common.white
      }
    },
    selectable: {
      cursor: 'pointer',
      position: 'relative',

      '&:hover': {
        backgroundColor: palette.grey.lighter
      },

      '&$selected:hover, &$startSelection:hover, &$endSelection:hover': {
        backgroundColor: alpha(palette.blue.main, 0.64)
      }
    },
    startSelection: {
      backgroundColor: palette.blue.main,
      color: palette.common.white
    },
    endSelection: {
      backgroundColor: palette.blue.main,
      color: palette.common.white
    },
    today: {
      display: 'flex',
      flexDirection: 'column',

      '&:after': {
        content: '""',
        height: '0.25rem',
        width: '0.25rem',
        borderRadius: '50%',
        background: palette.blue.main,
        position: 'absolute',
        bottom: '0.375rem'
      }
    },
    grayed: {
      color: palette.grey.main2
    }
  })
