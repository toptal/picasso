import { Theme, createStyles } from '@material-ui/core/styles'

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
