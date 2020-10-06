import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      border: 'none',
      minWidth: 'unset',
      paddingLeft: '0',
      paddingRight: '0',
      '&:active, &$active, &:hover, &$hovered': {
        backgroundColor: 'transparent',
        color: palette.blue.main,
        textDecoration: 'underline'
      },
      '&$loading': {
        textDecoration: 'none',
        cursor: 'default'
      },
      '&$disabled': {
        opacity: 0.48
      }
    },
    content: {
      fontSize: '0.875rem',
      lineHeight: '1.375em',
      fontWeight: 'normal',
      color: palette.blue.main
    },
    icon: {
      color: palette.grey.dark
    },
    active: {},
    disabled: {},
    hovered: {},
    focused: {},
    loading: {}
  })
