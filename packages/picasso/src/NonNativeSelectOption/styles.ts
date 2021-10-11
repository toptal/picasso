import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    disabled: {
      opacity: '1 !important',
      color: palette.grey.main2
    }
  })
