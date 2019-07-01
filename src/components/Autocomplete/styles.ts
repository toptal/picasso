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
      backgroundColor: palette.common.white
    }
  })
