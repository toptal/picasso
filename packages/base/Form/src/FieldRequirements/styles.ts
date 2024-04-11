import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette, sizes: { input } }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: input.width,
    },
    fieldRequirementItem: {
      display: 'flex',
      alignItems: 'center',
      color: palette.grey.main2,
    },
  })
