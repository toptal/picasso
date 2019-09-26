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
    display: 'flex',
    marginBottom: '8px'
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
    // flexBasis: '15%',
    background: '#ffffff',
    position: 'relative',
    margin: 0,
    padding: 0,
    border: 'none',
    outline: 0,

    '&$selected': {
      background: palette.blue.main,
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

      '&:hover:not($today)': {
        zIndex: 1,
        backgroundColor: palette.grey.lighter
      }
    },

    '&$today': {
      backgroundColor: palette.blue.main,
      color: palette.common.white
    },

    '&$grayed': {
      color: alpha('#acb3bb', 0.85)
    }
  },

  // nested
  selected: {},
  selectable: {},
  today: {}, // maybe better highlighted?,
  grayed: {}
})
