import { SizeType } from '@toptal/picasso-shared'
import { createStyles, Theme } from '@material-ui/core/styles'

const getHypotenuseOfEqualSides = (sideLength: number) => {
  return sideLength * Math.sqrt(2)
}

const smallCornerSize = 1
const largeCornerSize = 1.5

// bold corners are used for focused state
const focusedCornerCorrection = 0.0575

const SETTINGS = {
  small: {
    dimensions: 5,
    cornerSize: smallCornerSize,
    cornerCoordinate: 0.65,
    hypotenuse: getHypotenuseOfEqualSides(smallCornerSize),
  },
  large: {
    dimensions: 10,
    cornerSize: largeCornerSize,
    cornerCoordinate: 1,
    hypotenuse: getHypotenuseOfEqualSides(largeCornerSize),
  },
} as const

interface Props {
  size?: SizeType<'small' | 'large'>
  src?: string
  error?: boolean
  focused?: boolean
}

export default ({ palette, sizes, transitions }: Theme) =>
  createStyles({
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
      borderWidth: sizes.borderWidth,
      borderColor: palette.blue.main,
      color: palette.blue.main,
      borderStyle: 'dashed',
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      transitionProperty: 'border, background-color',
      cursor: 'pointer',
      '&$dragActive': {
        background:
          'linear-gradient(0deg, rgba(32, 78, 207, 0.16), rgba(32, 78, 207, 0.16))',
      },
      '&$reupload:not($dragActive)': {
        background:
          'linear-gradient(0deg, rgba(38, 45, 61, 0.7), rgba(38, 45, 61, 0.7))',
        color: palette.common.white,
        borderStyle: 'none',
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

    leftBottomCorner: ({ size = 'small', error, focused }: Props) => {
      const { cornerCoordinate, hypotenuse } = SETTINGS[size]
      let coordinate = cornerCoordinate

      const borderAttributes = {
        borderStyle: 'dashed',
        borderColor: error ? palette.red.main : palette.blue.main,
        borderWidth: sizes.borderWidth,
      }

      if (focused) {
        borderAttributes.borderStyle = 'solid'
        borderAttributes.borderWidth = '3px'

        coordinate -= focusedCornerCorrection
      }

      return {
        position: 'absolute',
        left: `-${coordinate}em`,
        bottom: `-${coordinate}em`,
        width: `${hypotenuse}em`,
        height: `${hypotenuse}em`,
        ...borderAttributes,
        zIndex: 1,
        transform: 'rotate(45deg)',
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
