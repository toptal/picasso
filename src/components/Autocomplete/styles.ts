import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ spacing: { input }, palette }: Theme) =>
  createStyles({
    root: {
      position: 'relative'
    },
    rootFixedWidth: {
      width: input.width
    },
    rootFullWidth: {
      width: '100%'
    },
    menu: {
      left: 0,
      right: 0,
      zIndex: 1,
      position: 'absolute',
      backgroundColor: palette.common.white,
      maxHeight: '10.125em', // 4.5 lines of menu to show
      overflowY: 'scroll'
    }
  })
