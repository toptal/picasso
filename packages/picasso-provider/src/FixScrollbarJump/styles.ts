import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ screens }: Theme) =>
  createStyles({
    '@global': {
      [screens('xl')]: {
        html: {
          width: '100%',
          overflowX: 'hidden',
        },
        body: {
          width: '100vw',
        },
      },
    },
  })
