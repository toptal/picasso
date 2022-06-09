import { rem } from '@toptal/picasso-shared'
import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    image: {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      /* Required to prevent image blur on downscale */
      imageRendering: '-webkit-optimize-contrast',
    },
    logoContainer: {
      display: 'flex',
      position: 'absolute',
      bottom: '1rem',
      left: '1rem',
    },
    logo: {
      width: rem('17px'),
      height: rem('24px'),
    },
  })
