import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    header: {
      borderBottom: `1px solid ${palette.grey.lighter}`,
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingBottom: '1rem',
      paddingTop: '1rem'
    },
    title: {
      flexGrow: 1
    }
  })
