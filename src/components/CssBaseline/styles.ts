import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    '@global': {
      html: {
        boxSizing: 'initial'
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      },
      '#root': {
        display: 'flex',
        flex: 1
      },
      '#picasso-portal-root': {
        boxSizing: 'border-box',
        fontFamily: 'proxima-nova,Arial,sans-serif',
        position: 'fixed'
      }
    }
  })
