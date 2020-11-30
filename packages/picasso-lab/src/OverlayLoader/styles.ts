import { createStyles, Theme } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

import { Props } from './OverlayLoader'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: ({ position }: Props) =>
        position === 'top' ? 'flex-start' : 'center',
      backgroundColor: alpha(palette.common.white, 0.7)
    }
  })
