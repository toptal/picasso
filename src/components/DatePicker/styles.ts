import { Theme, createStyles } from '@material-ui/core/styles'

import { alpha, rem } from '../styles'

export default ({ palette }: Theme) => createStyles({
  root: {
    padding: '30px',
    color: '#303030',
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '328px',
    maxWidth: '328px',
    boxShadow: `0px 0px 4px 0px ${alpha(palette.common.black, 0.24)},
                0px 0px 32px 0px ${alpha(palette.common.black, 0.12)}`
  },
  month: {},
  week: {
    display: 'flex'
  },
  day: {
    height: rem('40px'),
    width: rem('40px'),
    verticalAlign: 'middle',
    fontSize: '12px',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffffff',
    position: 'relative',
    margin: 0,
    padding: 0,
    border: 'none',
    outline: 0,

    '&$selected': {
      background: alpha(palette.blue.main, 0.48),
      color: palette.common.white,
      position: 'relative',
      zIndex: 1
    },

    '&$selectable': {
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

      '&:hover:not($today):not($startSelection):not($endSelection)': {
        zIndex: 1,
        backgroundColor: palette.grey.lighter
      }
    },

    '&$today': {
      border: `1px solid ${palette.blue.main}`,
      color: palette.blue.main
    },

    '&$grayed': {
      color: palette.grey.main2
    },

    '&$startSelection, &$endSelection': {
      backgroundColor: palette.blue.main,
      color: palette.common.white
    }
  },
  weekDays: {
    display: 'flex',
    textAlign: 'center',
    fontSize: '12px',
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
    marginBottom: '1.5em'
  },

  startSelection: {},
  endSelection: {},

  // nested
  selected: {},
  selectable: {},
  today: {}, // maybe better highlighted?,
  grayed: {}
})
