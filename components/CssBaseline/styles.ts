import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    '@global': {
      body: {
        height: '100vh'
      },
      '#root': {
        height: '100%'
      }
    }
  })
