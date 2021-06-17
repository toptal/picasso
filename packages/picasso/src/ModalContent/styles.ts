import { createStyles, hexToRgb, Theme } from '@material-ui/core'

const WRAPPER_PADDING = '2em'
const SHADE_HEIGHT = '80px'

const shadeCommonStyles = {
  zIndex: 1,
  position: 'absolute' as const,
  pointerEvents: 'none' as const
}

const shadeStyles = {
  ...shadeCommonStyles,
  right: WRAPPER_PADDING,
  left: WRAPPER_PADDING,
  height: SHADE_HEIGHT
}

const shadePseudoStyles = {
  ...shadeCommonStyles,
  right: 0,
  left: 0,
  content: '""',
  height: WRAPPER_PADDING
}

export default ({ palette }: Theme) => {
  const BACKGROUND_STARTING_COLOR = palette.background.default
  const BACKGROUND_FINISHING_COLOR = hexToRgb(`${palette.common.black}0`)

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
      top: WRAPPER_PADDING,
      background: `linear-gradient(180deg, ${BACKGROUND_STARTING_COLOR} 0%, ${BACKGROUND_FINISHING_COLOR} 5rem)`,
      '&:before': {
        ...shadePseudoStyles,
        backgroundColor: BACKGROUND_STARTING_COLOR,
        top: `-${WRAPPER_PADDING}`
      }
    },
    bottomShade: {
      ...shadeStyles,
      bottom: WRAPPER_PADDING,
      background: `linear-gradient(0deg, ${BACKGROUND_STARTING_COLOR} 0%, ${BACKGROUND_FINISHING_COLOR} 5rem)`,
      '&:before': {
        ...shadePseudoStyles,
        backgroundColor: BACKGROUND_STARTING_COLOR,
        bottom: `-${WRAPPER_PADDING}`
      }
    }
  })
}
