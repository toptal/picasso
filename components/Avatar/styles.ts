import { Theme, createStyles } from '@material-ui/core/styles'

const getClipPathCornerMask = (cornerWidth: string) =>
  `polygon(0 0, 100% 0, 100% 100%, ${cornerWidth} 100%, 0 calc(100% - ${cornerWidth}))`

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
      clipPath: getClipPathCornerMask('0.3em'),
      '-webkit-clip-path': getClipPathCornerMask('0.3em')
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
      bottom: '0.3em',
      left: '0.3em'
    }
  })
