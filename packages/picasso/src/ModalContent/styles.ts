import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    modalContent: {
      padding: '2em',
      overflow: 'auto',
      flex: '1 1 auto'
    },
    shadedWrapper: {
      display: 'flex',
      position: 'relative',
      flex: '1 1 auto',
      overflowY: 'hidden'
    },
    shadedWrapperEffect: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      position: 'absolute',
      pointerEvents: 'none'
    },
    topShade: {
      background: 'linear-gradient(180deg, white 0%, rgba(255,255,255,0) 5rem)'
    },
    bottomShade: {
      background: 'linear-gradient(0deg, white 0%, rgba(255,255,255,0) 5rem)'
    },
    topBottomShades: {
      background: `linear-gradient(0deg, white 0%, rgba(255,255,255,0) 5rem, rgba(255,255,255,0) calc(100% - 5rem), white 100%)`
    }
  })
