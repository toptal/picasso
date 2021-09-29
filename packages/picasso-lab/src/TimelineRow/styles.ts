import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      // No bottom spacing for the last Container
      '&:last-child $content': {
        marginBottom: 0
      }
    },
    content: {},
    icon: {
      margin: '4px 0'
    },
    date: {
      flex: '0 0 auto'
    },
    connector: {
      flex: 1
    }
  })
