import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    menu: {
      top: 0,
      left: 0,
      right: 0,
      position: 'absolute',
      backgroundColor: palette.common.white
    },
    scrollView: {
      maxHeight: '10.125em', // 4.5 lines of menu to show
      overflowY: 'auto'
    }
  })
