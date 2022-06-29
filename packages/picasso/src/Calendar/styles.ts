import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha, rem } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      display: 'none',
    },
    month: {},
    week: {
      display: 'flex',
    },
    day: {
      height: '2rem',
      width: '2rem',
      minWidth: '2rem',
      verticalAlign: 'middle',
      fontSize: '0.75rem',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: palette.common.white,
      position: 'relative',
      padding: 0,
      border: 'none',
      outline: 0,
      flexDirection: 'column',
      margin: '0 0 0.3rem 0.3rem',
      '&:first-child': {
        marginLeft: 0,
      },
    },
    weekDays: {
      display: 'flex',
      textAlign: 'center',
      fontSize: rem('12px'),
      lineHeight: rem('18px'),
      textTransform: 'uppercase',
      color: palette.grey.main2,
      paddingTop: rem('3px'),
      paddingBottom: rem('11px'),
    },
    weekDay: {
      flexBasis: '15%',
    },

    actions: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1.5rem',
    },
    selected: {
      background: palette.blue.lighter,
    },
    selectable: {
      cursor: 'pointer',

      '&:hover, &:focus': {
        backgroundColor: alpha(palette.blue.main, 0.24),
        borderRadius: '10%',
      },

      '&$startSelection:hover, &$endSelection:hover': {
        backgroundColor: palette.blue.main,
      },
    },
    startSelection: {
      backgroundColor: palette.blue.main,
      color: palette.common.white,

      '&$today:after': {
        backgroundColor: palette.common.white,
      },
    },
    endSelection: {
      backgroundColor: palette.blue.main,
      color: palette.common.white,

      '&$today:after': {
        backgroundColor: palette.common.white,
      },
    },
    indicators: {
      display: 'flex',
      flexDirection: 'row',
    },
    today: {
      content: '""',
      height: '0.25rem',
      width: '0.25rem',
      borderRadius: '50%',
      background: palette.blue.main,
      marginRight: '0.375rem',
      marginTop: '0.175rem',
    },
    grayed: {
      color: palette.grey.main2,
    },
    disabled: {
      color: palette.grey.main,
    },
  })
