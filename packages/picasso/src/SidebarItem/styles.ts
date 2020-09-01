import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      height: '3em',
      padding: '0 1rem',

      '&:hover': {
        backgroundColor: 'initial'
      },

      '&:focus': {
        backgroundColor: 'initial'
      },
      '$nonCollapsibleMenu &': {
        paddingLeft: '2rem'
      },
      '$details &': {
        paddingLeft: '2rem'
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
    label: {},
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
      margin: '0.8em 1em 0.8em 0.8em',
      fontSize: '1em'
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
    },
    nonCollapsibleMenu: {}
  })
