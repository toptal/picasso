import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {},
    disabled: {
      borderColor: palette.grey.lighter,
      color: palette.grey.main,
      pointerEvents: 'none'
    }
  })
