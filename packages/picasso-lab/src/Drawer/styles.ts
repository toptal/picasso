import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    header: {
      position: 'absolute',
      left: 0,
      right: 0,
      borderBottom: `1px solid ${palette.grey.lighter}`
    },
    title: {
      flexGrow: 1
    },
    closeButton: {
      paddingRight: 0
    },
    content: {
      paddingTop: '4.3125rem'
    },
    regular: {
      width: '27.5rem'
    },
    wide: {
      width: '34.5rem'
    }
  })
