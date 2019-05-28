import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    connectorIcon: {
      color: palette.grey[200]
    }
  })
