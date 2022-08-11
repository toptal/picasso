import { alpha, SizeType } from '@toptal/picasso-shared'
import { createStyles, Theme } from '@material-ui/core/styles'

import { Status } from '../OutlinedInput'

const getHypotenuseOfEqualSides = (sideLength: number) => {
  return sideLength * Math.sqrt(2)
}

const smallCornerSize = 1
const largeCornerSize = 1.5

const SETTINGS = {
  small: {
    dimensions: 5,
    cornerSize: smallCornerSize,
    hypotenuse: getHypotenuseOfEqualSides(smallCornerSize),
  },
  large: {
    dimensions: 10,
    cornerSize: largeCornerSize,
    hypotenuse: getHypotenuseOfEqualSides(largeCornerSize),
  },
} as const

interface Props {
  size?: SizeType<'small' | 'large'>
  src?: string
  status?: Extract<Status, 'error' | 'default'>
  focused?: boolean
}

export default ({ palette, sizes, transitions }: Theme) => {
  const dragActiveColor = alpha(palette.blue.main, 0.16)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const hoverColor = alpha(palette.grey.darker!, 0.7)

  return createStyles({
    root: {
      position: 'relative',
    },
    dropzone: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: palette.blue.lighter,
      fontSize: '1rem',
      flexShrink: 0,
      flexGrow: 0,
      zIndex: 1,
      outline: 'none',
      borderWidth: sizes.borderWidth,
      borderColor: palette.blue.main,
      color: palette.blue.main,
      borderStyle: 'dashed',
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      transitionProperty: 'background-color',
      cursor: 'pointer',
      '&$dragActive': {
        background: `linear-gradient(0deg, ${dragActiveColor}, ${dragActiveColor}), ${palette.blue.lighter}`,
      },
      '&$reupload:not($dragActive)': {
        borderStyle: 'none',
        background: 'none',

        '&$hovered': {
          backgroundColor: hoverColor,
          color: palette.common.white,
        },
      },
      '&$disabled': {
        backgroundColor: palette.grey.lighter,
        '&:hover': {
          cursor: 'no-drop',
          borderColor: palette.grey.light2,
        },
      },
      '&$error': {
        borderColor: palette.red.main,
        color: palette.red.main,
      },
      '&$focused': {
        borderStyle: 'solid',
        borderWidth: 3,
      },
    },
    dragActive: {},
    disabled: {},
    error: {},
    reupload: {},
    focused: {},
    hovered: {},

    imageAvatar: {
      zIndex: 0,
    },

    size: ({ size = 'small' }: Props) => {
      const { dimensions } = SETTINGS[size]

      return {
        width: `${dimensions}em`,
        height: `${dimensions}em`,
        maxWidth: `${dimensions}em`,
        maxHeight: `${dimensions}em`,
      }
    },

    corner: ({ size = 'small' }: Props) => {
      const { cornerSize } = SETTINGS[size]
      const clipPath = `polygon(0 0, 100% 0, 100% 100%, ${cornerSize} 100%, 0 calc(100% - ${cornerSize}))`

      return {
        clipPath,
        // we can remove this prefix as soon as this issue will
        // be resolved - https://github.com/cssinjs/css-vendor/issues/74
        '-webkit-clip-path': clipPath,
      }
    },

    leftBottomCorner: ({ size = 'small', status, focused }: Props) => {
      const { hypotenuse } = SETTINGS[size]
      const error = status === 'error'

      const borderAttributes = {
        borderStyle: 'dashed',
        borderColor: error ? palette.red.main : palette.blue.main,
        borderWidth: sizes.borderWidth,
      }

      let borderCorrection = '0.5px'

      if (focused) {
        borderAttributes.borderStyle = 'solid'
        borderAttributes.borderWidth = '3px'

        borderCorrection = '2px'
      }

      return {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: `${hypotenuse}em`,
        height: `${hypotenuse}em`,
        ...borderAttributes,
        zIndex: 1,
        transform: `translate(calc(-50% + ${borderCorrection}), calc(50% - ${borderCorrection})) rotate(45deg)`,
      }
    },

    warningIcon: {
      position: 'absolute',
      top: '-0.75em',
      right: '-0.75em',
      backgroundColor: palette.common.white,
      borderRadius: '50%',
      width: '1.5em',
      height: '1.5em',
      color: palette.yellow.main,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}
