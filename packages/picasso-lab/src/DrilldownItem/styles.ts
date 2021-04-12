import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ shadows }: Theme) =>
  createStyles({
    popper: {
      boxShadow: shadows[2]
    }
  })
