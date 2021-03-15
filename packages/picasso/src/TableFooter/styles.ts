import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ sizes, palette }: Theme) =>
  createStyles({
    root: {
      borderTop: `${sizes.borderWidth} solid ${palette.grey.lighter2}`
    }
  })
