import { Theme, createStyles } from '@material-ui/core'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fill: palette.primary.main
    }
  })
