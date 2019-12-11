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
      maxHeight: `calc(100vh - 4.8125rem)`,
      overflowY: 'auto',
      [screens('small')]: {
        width: '100vw',
        maxWidth: '100vw',
        maxHeight: `calc(100vh - 3rem)`,
        overflowY: 'auto',
        padding: 0
      }
    }
  })
