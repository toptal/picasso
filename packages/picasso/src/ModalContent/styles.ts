import { createStyles } from '@material-ui/core'

export default () =>
  createStyles({
    modalContent: {
      padding: '2rem',
      overflow: 'auto',
      flex: '1 1 auto'
    },
    fadedWrapper: {
      display: 'flex',
      position: 'relative',
      flex: '1 1 auto',
      overflow: 'scroll'
    },
    fadedWrapperEffect: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
      pointerEvents: 'none',
      background: `linear-gradient( 0deg,white 0%,rgba(255,255,255,0) 2rem,rgba(255,255,255,0) calc(100% - 2rem),white 100% )`
    }
  })
