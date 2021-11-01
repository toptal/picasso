import { rem } from '@toptal/picasso-shared'
import { createStyles, Theme } from '@material-ui/core/styles'

import { Props } from './ImageAvatar'
import getClipPathCornerMask from '../utils/getClipPathCornerMask'
import getDimensions from '../utils/getDimensions'

export default ({ palette }: Theme) =>
  createStyles({
    image: {
      objectFit: 'cover',
      backgroundColor: palette.grey.main,
      clipPath: (props: Props) => getClipPathCornerMask(props.size),
      // we can remove this prefix as soon as this issue will
      // be resolved - https://github.com/cssinjs/css-vendor/issues/74
      '-webkit-clip-path': (props: Props) => getClipPathCornerMask(props.size),
      width: (props: Props) => getDimensions(props.variant).width,
      height: (props: Props) => getDimensions(props.variant).height
    },
    logoContainer: {
      display: 'flex',
      position: 'absolute',
      bottom: `1rem`,
      left: `1rem`
    },
    logo: {
      width: rem('17px'),
      height: rem('24px')
    }
  })
