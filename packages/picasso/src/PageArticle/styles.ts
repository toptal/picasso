import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ layout }: Theme) =>
  createStyles({
    root: {
      flex: 1,
      margin: `0 ${layout.contentPaddingHorizontal}`
    }
  })
