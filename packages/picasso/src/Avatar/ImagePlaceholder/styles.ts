import { createStyles, Theme } from '@material-ui/core/styles'

import { Props } from './ImagePlaceholder'
import getClipPathCornerMask from '../utils/getClipPathCornerMask'
import getDimensions from '../utils/getDimensions'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      clipPath: (props: Props) => getClipPathCornerMask(props.size),
      // we can remove this prefix as soon as this issue will
      // be resolved - https://github.com/cssinjs/css-vendor/issues/74
      '-webkit-clip-path': (props: Props) => getClipPathCornerMask(props.size),
      backgroundColor: palette.grey.main,
      width: (props: Props) => getDimensions(props.variant).width,
      height: (props: Props) => getDimensions(props.variant).height
    }
  })
