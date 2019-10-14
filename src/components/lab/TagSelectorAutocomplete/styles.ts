import { Theme, createStyles } from '@material-ui/core/styles'
import zIndex from '@material-ui/core/styles/zIndex'

export default ({ sizes: { input, borderWidth }, palette }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: input.width
    },
    rootFull: {
      width: '100%'
    },
    rootShrink: {
      width: 'auto'
    },
    rootAuto: {},
    otherOption: {
      borderTop: `${borderWidth} solid ${palette.grey.light}`
    },
    stringContent: {
      fontSize: '0.8125em'
    },
    popper: { zIndex: zIndex.modal }
  })
