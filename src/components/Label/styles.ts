import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {},
    icon: {},
    deleteIcon: {},
    disabled: {
      borderColor: palette.grey.lighter,
      color: palette.grey.main,
      pointerEvents: 'none'
    },
    white: {
      background: 'none',
      color: palette.common.white
    },
    innerLabel: {
      fontSize: '0.75em',
      fontWeight: 600
    }
  })
