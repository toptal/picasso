import { Theme, createStyles } from '@material-ui/core/styles'

const getClipPathCornerMask = (cornerWidth: string) =>
  `polygon(0 0, 100% 0, 100% 100%, ${cornerWidth} 100%, 0 calc(100% - ${cornerWidth}))`

const CLIPPED_CORNER_SIZE = '0.5em'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      position: 'relative'
    },
    image: {
      objectFit: 'cover'
    },
    square: {
      width: '2.5em',
      height: '2.5em'
    },
    portrait: {
      width: '1.666em',
      height: '2.5em'
    },
    landscape: {
      width: '2.5em',
      height: '1.666em'
    },
    xsmall: {
      fontSize: '1rem'
    },
    small: {
      fontSize: '2rem'
    },
    medium: {
      fontSize: '3rem'
    },
    large: {
      fontSize: '4.5rem'
    },
    clippedCorner: {
      clipPath: getClipPathCornerMask(CLIPPED_CORNER_SIZE),
      // we can remove this prefix as soon as this issue will
      // be resolved - https://github.com/cssinjs/css-vendor/issues/74
      '-webkit-clip-path': getClipPathCornerMask(CLIPPED_CORNER_SIZE)
    },
    textContainer: {
      backgroundColor: palette.grey[200]
    },
    text: {
      fontSize: '1em',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: palette.common.white,
      textTransform: 'uppercase'
    },
    logo: {
      position: 'absolute',
      height: '0.45712em',
      width: '0.4em',
      bottom: CLIPPED_CORNER_SIZE,
      left: CLIPPED_CORNER_SIZE
    }
  })
