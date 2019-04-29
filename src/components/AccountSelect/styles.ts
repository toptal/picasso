import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    accountItem: {
      padding: '1.5em',
      display: 'flex',
      alignItems: 'center',

      '&+&': {
        borderTop: `1px solid ${palette.grey[50]}`
      }
    }
  })
