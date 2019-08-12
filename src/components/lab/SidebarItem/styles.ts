import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      height: '3em',
      padding: '0 1.5em',

      '&:hover': {
        backgroundColor: 'initial'
      },

      '&:focus': {
        backgroundColor: 'initial'
      }
    },
    light: {
      color: palette.grey.dark,

      '&:hover': {
        color: palette.blue.main
      }
    },
    dark: {
      color: palette.grey.main,

      '&:hover': {
        color: palette.common.white
      }
    },
    selected: {},
    label: {
      marginLeft: '1.875em'
    },
    withIcon: {
      marginLeft: '0.875em'
    },
    summary: {
      padding: 0
    },
    details: {
      fontSize: 'inherit',
      marginBottom: '0'
    },
    content: {
      fontSize: 'inherit'
    },
    expandIcon: {
      margin: '0.8em',
      fontSize: '0.6em'
    },
    lightExpandIcon: {
      color: palette.grey.dark
    },
    darkExpandIcon: {
      color: palette.grey.main
    },
    expandIconDisabled: {
      color: palette.grey.main
    },
    noWrap: {
      flex: 1,
      minWidth: 0
    }
  })
