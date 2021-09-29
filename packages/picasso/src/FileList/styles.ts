import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      borderTop: `1px solid ${palette.grey.lighter2}`
    }
  })
