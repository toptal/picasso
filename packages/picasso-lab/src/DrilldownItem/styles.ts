import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette, shadows }: Theme) =>
  createStyles({
    popper: {
      boxShadow: shadows[2]
    },
    content: {
      background: palette.common.white,
      maxHeight: '14.75rem', // 6.5 lines to show
      overflowY: 'auto',
      boxShadow: shadows[0]
    }
  })
