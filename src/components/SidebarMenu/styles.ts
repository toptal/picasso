import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
      order: 1
    },
    bottom: {
      order: 99
    }
  })
