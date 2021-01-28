import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, typography }: Theme) =>
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
      fontWeight: 'normal',
      color: palette.blue.main
    },
    small: {
      '& $content': {
        fontSize: '0.875rem',
        lineHeight: '1.375rem'
      },
      '& $iconLeft': {
        marginLeft: 0
      },
      '& $iconRight': {
        marginRight: 0
      }
    },
    iconless: {
      '&:not($loading) $content': {
        fontWeight: typography.fontWeights.semibold
      }
    },
    icon: {
      width: '1rem',
      height: '1rem',
      color: palette.grey.dark
    },
    iconLeft: {
      marginRight: '0.5rem'
    },
    iconRight: {
      marginLeft: '0.5rem'
    },
    active: {},
    disabled: {},
    hovered: {},
    focused: {},
    loading: {}
  })
