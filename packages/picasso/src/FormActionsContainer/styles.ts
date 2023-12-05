import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ forms }: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplate: `"label input" "hint error" / ${forms.horizontalColumnWidthRem}rem 1fr`,
      gap: '0px 32px',
    },
  })
