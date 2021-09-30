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
    date: {
      flex: '0 0 auto'
    },
    connector: {
      flex: 1,
      margin: '4px 0'
    }
  })
