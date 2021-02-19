import { createStyles, Theme } from '@material-ui/core'

export default ({ layout }: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      padding: `0 ${layout.contentPaddingHorizontal}`
    }
  })
