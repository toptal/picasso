import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    connectorIcon: {
      color: palette.grey.light2,
      fontSize: '0.5em',
      margin: '0 0.5em'
    }
  })
