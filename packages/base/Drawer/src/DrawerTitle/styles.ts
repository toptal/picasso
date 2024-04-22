import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    header: {
      borderBottom: `1px solid ${palette.grey.lighter}`,
      padding: '1rem 4rem 1rem 1.5rem',
    },
  })
