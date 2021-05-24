import { createStyles } from '@material-ui/core/styles'
import { outline, PicassoProvider } from '@toptal/picasso-shared'

const CONTROL_WIDTH = '1em'
const LABEL_LEFT_MARGIN = '0.5em'
const LABEL_TOP_MARGIN = '0.25em'

const THUMB_SIZE = 22
const TRACK_HEIGHT = THUMB_SIZE + 2
const TRACK_WIDTH = 40

PicassoProvider.override(({ palette, transitions }) => ({
  MuiSwitch: {
    root: {
      width: TRACK_WIDTH,
      height: TRACK_HEIGHT,
      padding: 0,
      overflow: 'visible'
    },
    switchBase: {
      top: 1,
      left: 1,
      padding: 0,
      color: palette.common.white,
      '&$checked': {
        transform: 'translateX(16px)',
        color: palette.common.white,
        '& + $track': {
          backgroundColor: palette.primary.main,
          borderColor: palette.primary.main,
          opacity: 1
        },
        '&$disabled + $track': {
          opacity: 0.4,
          backgroundColor: palette.primary.main,
          borderColor: palette.primary.main
        }
      },
      '&:hover, &.Mui-focusVisible': {
        ...outline(palette.primary.main, 4)
      },
      '&$disabled': {
        '& + $track': {
          opacity: 0.4,
          backgroundColor: palette.grey.main2,
          borderColor: palette.grey.main2
        }
      }
    },
    thumb: {
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      color: palette.common.white,
      // fix for bad subpixel rendering on 150% displays
      '@media (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 1.5)': {
        transform: 'translate(-0.2px, -0.3px)'
      }
    },
    track: {
      borderRadius: TRACK_HEIGHT / 2,
      border: `1px solid ${palette.grey.main2}`,
      backgroundColor: palette.grey.main2,
      borderColor: palette.grey.main2,
      opacity: 1,
      transition: transitions.create(['background-color', 'border'])
    },
    disabled: {
      '& + $track': {
        opacity: 0.4
      }
    }
  }
}))

export default () =>
  createStyles({
    root: { alignItems: 'flex-start', fontSize: '1rem' },
    label: {
      marginLeft: LABEL_LEFT_MARGIN,
      marginTop: LABEL_TOP_MARGIN,
      // 1px is needed for safari
      maxWidth: `calc(100% - ${CONTROL_WIDTH} - ${LABEL_LEFT_MARGIN} + 1px)`
    }
  })
