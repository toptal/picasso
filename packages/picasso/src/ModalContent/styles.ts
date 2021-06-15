import { createStyles } from '@material-ui/core'

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
      padding: '2em',
      overflow: 'auto',
      flex: '1 1 auto'
    },
    wrapper: {
      display: 'flex',
      position: 'relative',
      flex: '1 1 auto',
      overflowY: 'hidden'
    },
    topShade: {
      ...shadeStyles,
      top: 0,
      background: `linear-gradient(180deg, white 0%, rgba(255,255,255,0) 5rem)`
    },
    bottomShade: {
      ...shadeStyles,
      bottom: 0,
      background: `linear-gradient(0deg, white 0%, rgba(255,255,255,0) 5rem)`
    }
  })
