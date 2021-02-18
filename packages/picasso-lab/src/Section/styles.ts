import { Theme, createStyles } from '@material-ui/core'

export default ({ layout }: Theme) =>
  createStyles({
    root: {
      padding: `0 ${layout.contentPaddingHorizontal}`
    }
  })
