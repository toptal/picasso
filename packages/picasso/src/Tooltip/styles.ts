import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

const shadowColor = 'rgba(0, 0, 0, 0.8)'
const ARROW_SIZE = '1.25em'
const HORIZONTAL_POSITION = {
  top: '50%',
  transform: 'translateY(-50%)'
}
const VERTICAL_POSITION = {
  left: '50%',
  transform: 'translateX(-50%)'
}

const arrowGenerator = (color: string) => {
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

export default ({ palette, shadows, sizes: { borderRadius } }: Theme) =>
  createStyles({
    arrowPopper: arrowGenerator(palette.grey.darker!),
    tooltip: {
      backgroundColor: palette.grey.darker,
      color: palette.common.white,
      boxShadow: shadows[4],
      fontSize: rem('13px'),
      lineHeight: '1.5em',
      padding: '1rem',
      borderRadius: borderRadius.small,
      position: 'relative'
    },
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
      color: palette.grey.darker,
      backgroundColor: palette.common.white
    },
    compact: {
      lineHeight: '1em',
      padding: '0.25rem 0.5rem',
      margin: '0.5rem'
    },
    noMaxWidth: {
      maxWidth: 'none'
    }
  })
