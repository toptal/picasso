import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    '@global': {
      body: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      },
      '#root': {
        display: 'flex',
        flex: 1
      }
    }
  })
