import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    header: {
      borderBottom: `1px solid ${palette.grey.lighter}`,
      padding: '1rem 1.5rem'
    },
    title: {
      flexGrow: 1
    }
  })
