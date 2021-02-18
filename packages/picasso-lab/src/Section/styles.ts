import { Theme, createStyles } from '@material-ui/core'

export default ({ layout }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'baseline',
      padding: `0 ${layout.contentPaddingHorizontal}`
    }
  })
