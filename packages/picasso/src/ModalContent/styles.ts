import { createStyles, Theme } from '@material-ui/core'

const WRAPPER_PADDING = '2em'
const SHADE_HEIGHT = '80px'

const shadeStyles = {
  zIndex: 1,
  position: 'absolute' as const,
  pointerEvents: 'none' as const,
  right: WRAPPER_PADDING,
  left: WRAPPER_PADDING,
  height: `calc(${SHADE_HEIGHT} + ${WRAPPER_PADDING})`
}

export default ({ palette }: Theme) => {
  const BACKGROUND_STARTING_COLOR = palette.background.default
  const BACKGROUND_FINISHING_COLOR = 'transparent'

  return createStyles({
    modalContent: {
      padding: WRAPPER_PADDING,
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
      background: `linear-gradient(180deg, ${BACKGROUND_STARTING_COLOR} 0%, ${BACKGROUND_STARTING_COLOR} ${WRAPPER_PADDING}, ${BACKGROUND_FINISHING_COLOR} 100%)`
    },
    bottomShade: {
      ...shadeStyles,
      bottom: 0,
      background: `linear-gradient(0deg, ${BACKGROUND_STARTING_COLOR} 0%, ${BACKGROUND_STARTING_COLOR} ${WRAPPER_PADDING}, ${BACKGROUND_FINISHING_COLOR} 100%)`
    }
  })
}
