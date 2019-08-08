import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      height: '3em',
      padding: '0 1.5em',
      color: palette.grey.main,

      '&:hover': {
        color: palette.common.white,
        backgroundColor: 'initial'
      },

      '&:focus': {
        backgroundColor: 'initial'
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
      fontSize: '0.6em',
      color: palette.grey.main
    },
    noWrap: {
      flex: 1,
      minWidth: 0
    }
  })
