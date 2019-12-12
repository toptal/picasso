import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1.875rem',
      verticalAlign: 'baseline'
    },
    rootEmblem: {
      fontSize: '1.875rem',
      verticalAlign: 'baseline'
    },
    blue: {
      color: palette.primary.main
    },
    white: {
      color: palette.common.white
    },
    black: {
      color: palette.common.black
    }
  })
