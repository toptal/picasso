import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    accountItem: {
      height: 'auto',
      padding: '1.5em',

      '&+&': {
        borderTop: `1px solid ${palette.grey[50]}`
      }
    },
    accountLink: {
      display: 'flex',
      flex: 1,
      alignItems: 'center'
    }
  })
