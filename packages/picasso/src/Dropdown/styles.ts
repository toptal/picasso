import { createStyles, Theme } from '@material-ui/core/styles'
import zIndex from '@material-ui/core/styles/zIndex'
import '../Popover/styles'

export default ({ screens, shadows }: Theme) =>
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
      background: 'white',
      maxHeight: `240px`, //`calc(100vh - 4.8125rem)`, //`calc(50vh - 4.8125rem)`, //
      overflowY: 'auto',
      boxShadow: shadows[0],
      [screens('small')]: {
        maxHeight: '240px' // `calc(100vh - 3rem)`
      },

      '@media screen and (max-height: 585px)': {
        maxHeight: `calc(50vh - 4.8125rem)` //`calc(100vh - 4.8125rem)`, //`calc(50vh - 4.8125rem)`, //
      }
    },
    popper: {
      zIndex: zIndex.modal, // zIndex.speedDial
      boxShadow: shadows[2],
      [screens('small')]: {
        width: '100vw',
        maxWidth: '100vw',
        padding: 0,
        margin: 0
      },
      '&[x-out-of-boundaries]': {
        display: 'none'
      }
    }
  })
