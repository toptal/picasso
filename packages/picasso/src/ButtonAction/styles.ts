import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      border: 'none',
      '&:active, &$active, &:hover, &$hovered': {
        backgroundColor: 'transparent',
        color: palette.blue.main,
        textDecoration: 'underline'
      },
      '&$disabled': {
        opacity: 0.48
      }
    },
    content: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 'normal',
      color: palette.blue.main
    },
    icon: {
      color: palette.grey.dark
    },
    active: {},
    disabled: {},
    hovered: {},
    focused: {}
  })
