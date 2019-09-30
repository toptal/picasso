import { createStyles } from '@material-ui/core/styles'
import zIndex from '@material-ui/core/styles/zIndex'
import '../Popover/styles'

export default () =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    anchor: {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    content: {
      fontSize: 'inherit',
      background: 'white'
    },
    popper: {
      zIndex: zIndex.modal
    }
  })
