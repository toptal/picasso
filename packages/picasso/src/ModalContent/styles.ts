import { createStyles } from '@material-ui/core'

const WRAPPER_PADDING = '2em'

const shadeStyles = {
  left: 0,
  right: 0,
  zIndex: 1,
  position: 'absolute' as const,
  pointerEvents: 'none' as const,
  height: 80
}

export default () =>
  createStyles({
    modalContent: {
      overflow: 'auto',
      flex: '1 1 auto'
    },
    wrapper: {
      padding: WRAPPER_PADDING,
      display: 'flex',
      position: 'relative',
      flex: '1 1 auto',
      overflowY: 'hidden'
    },
    topShade: {
      ...shadeStyles,
      top: WRAPPER_PADDING,
      background: `linear-gradient(180deg, white 0%, rgba(255,255,255,0) 5rem)`
    },
    bottomShade: {
      ...shadeStyles,
      bottom: WRAPPER_PADDING,
      background: `linear-gradient(0deg, white 0%, rgba(255,255,255,0) 5rem)`
    }
  })
