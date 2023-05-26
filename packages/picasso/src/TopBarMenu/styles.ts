import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      display: 'block',
      '@media (min-width: 1280px)': {
        display: 'flex',
      },
    },
  })
