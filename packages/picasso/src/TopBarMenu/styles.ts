import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ screens }: Theme) =>
  createStyles({
    root: {
      display: 'flex',

      [screens('small', 'medium')]: {
        display: 'block',
      },
    },
  })
