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
        maxHeight: calculateMaxHeight(),
        padding: 0
      }
    }
  })

function calculateMaxHeight() {
  const screenHeight = '100vh'
  const headerHeight = '2.5em'

  return `calc(${screenHeight} - ${headerHeight})`
}
