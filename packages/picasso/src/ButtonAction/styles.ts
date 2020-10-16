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
      fontSize: '0.875rem !important',
      lineHeight: '1.375rem !important',
      fontWeight: 'normal',
      color: palette.blue.main
    },
    icon: {
      width: '1rem',
      height: '1rem',
      color: palette.grey.dark
    },
    iconLeft: {
      marginLeft: '0 !important',
      marginRight: '0.5rem'
    },
    iconRight: {
      marginRight: '0 !important',
      marginLeft: '0.5rem'
    },
    active: {},
    disabled: {},
    hovered: {},
    focused: {},
    loading: {}
  })
