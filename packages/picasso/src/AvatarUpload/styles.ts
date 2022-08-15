import { SizeType } from '@toptal/picasso-shared'
import { createStyles, Theme } from '@material-ui/core/styles'

const SETTINGS = {
  small: {
    dimensions: 5,
    cornerSize: 1,
    hipotenusa: Math.sqrt(2) * 1,
    cornerCoordinate: 0.65,
  },
  large: {
    dimensions: 10,
    cornerSize: 1.5,
    hipotenusa: Math.sqrt(2) * 1.5,
    cornerCoordinate: 1,
  },
} as const

interface Props {
  size?: SizeType<'small' | 'large'>
  src?: string
  error?: boolean
}

export default ({ palette, sizes, transitions }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    dropzone: {
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

    leftBottomCorner: ({ size = 'small', error }: Props) => {
      const { cornerCoordinate, hipotenusa } = SETTINGS[size]

      return {
        position: 'absolute',
        left: `-${cornerCoordinate}em`,
        bottom: `-${cornerCoordinate}em`,
        width: `${hipotenusa}em`,
        height: `${hipotenusa}em`,
        borderColor: error ? palette.red.main : palette.blue.main,
        borderWidth: sizes.borderWidth,
        borderStyle: 'dashed',
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
