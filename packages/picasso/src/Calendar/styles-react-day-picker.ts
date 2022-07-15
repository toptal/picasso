import {createStyles, Theme} from "@material-ui/core/styles";
import {alpha, rem} from "~/packages/shared/src";

export default ({ palette, shadows, sizes }: Theme) =>
  createStyles({
    root: {
      padding: rem('24px'),
      color: palette.grey.darker,
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '20.5rem',
      maxWidth: '20.5rem',
      boxShadow: shadows[5],
      borderRadius: sizes.borderRadius.small,
      backgroundColor: palette.common.white,
    },
    table: {
      display: 'block',
    },
    head: {
      display: 'block',
    },
    head_row: {
      display: 'flex',
      textAlign: 'center',
      fontSize: rem('12px'),
      lineHeight: rem('18px'),
      textTransform: 'uppercase',
      color: palette.grey.main2,
      paddingTop: rem('3px'),
      paddingBottom: rem('11px'),
    },
    head_cell: {
      flexBasis: '15%',
    },
    row: {
      display: 'flex'
    },
    cell: {
      height: '2.5rem',
      width: '2.5rem',
    },
    button: {
      '&:hover:not([aria-disabled="true"])': {
        backgroundColor: alpha(palette.blue.main, 0.24),
      }
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
    vhidden: {
      boxSizing: 'border-box',
      padding: 0,
      margin: 0,
      background: 'transparent',
      border: 0,
      appearance: 'none',
      position: 'absolute',
      top: 0,
      width: '1px',
      height: '1px',
      overflow: 'hidden',
      clip: 'rect(1px, 1px, 1px, 1px)',
    }
  })
