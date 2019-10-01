import { Theme, createStyles } from '@material-ui/core/styles'

import { alpha, rem } from '../../styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      padding: rem('30px'),
      color: palette.grey.darker,
      marginTop: rem('5px'),
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '20.5rem',
      maxWidth: '20.5rem',
      boxShadow: `0 0 ${rem('4px')} 0 ${alpha(palette.common.black, 0.24)},
                0 0 2em 0 ${alpha(palette.common.black, 0.12)}`,
      backgroundColor: palette.common.white
    },
    month: {},
    week: {
      display: 'flex'
    },
    day: {
      height: '2.5rem',
      width: '2.5rem',
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
      position: 'relative'
    },
    selectable: {
      cursor: 'pointer',
      position: 'relative',

      '&:before': {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'block',
        width: '100%',
        height: '100%',
        position: 'absolute'
      },

      '&:hover': {
        backgroundColor: palette.grey.lighter
      },

      '&$startSelection:hover, &$endSelection:hover': {
        backgroundColor: palette.blue.main
      },

      '&$today:hover': {
        backgroundColor: palette.common.white
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
      border: `${sizes.borderWidth} solid ${palette.blue.main}`,
      color: palette.blue.main
    },
    grayed: {
      color: palette.grey.main2
    }
  })
