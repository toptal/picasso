import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      borderTop: `1px solid ${palette.grey.lighter2}`
    }
  })
