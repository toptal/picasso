import { Theme, createStyles } from '@material-ui/core/styles'

const shadowColor = 'rgba(0, 0, 0, 0.8)'
const ARROW_SIZE = '1.5em'
const HORIZONTAL_POSITION = {
  top: '50%',
  transform: 'translateY(-50%)'
}
const VERTICAL_POSITION = {
  left: '50%',
  transform: 'translateX(-50%)'
}

function arrowGenerator(color: string) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: `-${ARROW_SIZE}`,

      '&::before': {
        borderWidth: `0 ${ARROW_SIZE} ${ARROW_SIZE} ${ARROW_SIZE}`,
        borderColor: `transparent transparent ${shadowColor} transparent`,
        ...VERTICAL_POSITION
      },
      '&::after': {
        borderWidth: `0 ${ARROW_SIZE} ${ARROW_SIZE} ${ARROW_SIZE}`,
        borderColor: `transparent transparent ${color} transparent`,
        ...VERTICAL_POSITION
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,

      '&::before': {
        borderWidth: `${ARROW_SIZE} ${ARROW_SIZE} 0 ${ARROW_SIZE}`,
        borderColor: `${shadowColor} transparent transparent transparent`,
        ...VERTICAL_POSITION
      },
      '&::after': {
        borderWidth: `${ARROW_SIZE} ${ARROW_SIZE} 0 ${ARROW_SIZE}`,
        borderColor: `${color} transparent transparent transparent`,
        ...VERTICAL_POSITION
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: `-${ARROW_SIZE}`,

      '&::before': {
        borderWidth: `${ARROW_SIZE} ${ARROW_SIZE} ${ARROW_SIZE} 0`,
        borderColor: `transparent ${shadowColor} transparent transparent`,
        ...HORIZONTAL_POSITION
      },
      '&::after': {
        borderWidth: `${ARROW_SIZE} ${ARROW_SIZE} ${ARROW_SIZE} 0`,
        borderColor: `transparent ${color} transparent transparent`,
        ...HORIZONTAL_POSITION
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,

      '&::before': {
        borderWidth: `${ARROW_SIZE} 0 ${ARROW_SIZE} ${ARROW_SIZE}`,
        borderColor: `transparent transparent transparent ${shadowColor}`,
        ...HORIZONTAL_POSITION
      },
      '&::after': {
        borderWidth: `${ARROW_SIZE} 0 ${ARROW_SIZE} ${ARROW_SIZE}`,
        borderColor: `transparent transparent transparent ${color}`,
        ...HORIZONTAL_POSITION
      }
    }
  }
}

export default ({ palette }: Theme) =>
  createStyles({
    tooltip: {
      backgroundColor: palette.grey[500],
      color: palette.common.white,
      boxShadow: '0 0 4px 0 rgba(0,0,0, 0.24), 0 0px 32px 0 rgba(0,0,0, 0.12)',
      fontSize: '0.875rem',
      lineHeight: '1.5em',
      padding: '1rem',
      borderRadius: 0
    },
    arrowPopper: arrowGenerator(palette.grey[500]),
    arrowPopperLight: arrowGenerator(palette.common.white),
    arrow: {
      position: 'absolute',
      fontSize: '0.4rem',

      '&:before, &:after': {
        position: 'absolute',
        content: '""',
        margin: 'auto',
        display: 'block',
        borderStyle: 'solid'
      }
    },
    light: {
      color: palette.grey[500],
      backgroundColor: palette.common.white
    }
  })
