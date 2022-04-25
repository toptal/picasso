import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'

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
