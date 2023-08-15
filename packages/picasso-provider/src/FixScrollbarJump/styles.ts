import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    '@global': {
      html: {
        width: '100%',
        overflowX: 'hidden',
      },
      body: {
        width: '100vw',
      },
    },
  })
