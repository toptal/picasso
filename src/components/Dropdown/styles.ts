import { createStyles, Theme } from '@material-ui/core/styles'
import zIndex from '@material-ui/core/styles/zIndex'
import '../Popover/styles'

export default ({ screens }: Theme) =>
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
      zIndex: zIndex.modal,
      [screens('small')]: {
        width: '100vw',
        maxWidth: '100vw',
        left: '0 !important',
        // screen height - header height
        maxHeight: 'calc(100vh - 2.5em)',
        padding: 0
      }
    }
  })
