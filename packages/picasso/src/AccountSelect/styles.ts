import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'

export default ({ palette }: Theme) =>
  createStyles({
    accountItem: {
      height: 'auto',

      '&+&': {
        borderTop: `1px solid ${palette.grey.light2}`
      }
    },
    accountLink: {
      flex: 1
    }
  })
