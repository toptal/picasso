import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha, rem } from '@toptal/picasso-shared'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    root: {
      display: 'none',
    },
    month: {},
    week: {
      display: 'flex',
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
      outline: 0,
      borderRadius: sizes.borderRadius.small,
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
        bottom: '0.375rem',
      },
    },
    grayed: {
      color: palette.grey.main2,
    },
    disabled: {
      color: palette.grey.main,
    },
  })
