import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {},
    rootDisabled: {
      borderColor: palette.grey.lighter,
      color: palette.grey.main
    },
    deleteIconDisabled: {
      cursor: 'default'
    }
  })
