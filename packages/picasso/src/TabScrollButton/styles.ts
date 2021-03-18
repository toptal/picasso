import { createStyles } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

export default ({ palette }: Theme) => {
  const color = palette.common.white
  const colorStops = `${color} 0%, ${color} 50%, ${alpha(color, 0)} 100%`

  return createStyles({
    root: {
      position: 'relative'
    },
    gradient: {
      position: 'absolute',
      width: '2.5rem',
      height: '100%',
      zIndex: 2,
      '&$left': {
        background: `linear-gradient(90deg, ${colorStops})`
      },
      '&$right': {
        background: `linear-gradient(270deg, ${colorStops})`
      }
    },
    button: {
      position: 'absolute',
      width: '1rem',
      height: '100%'
    },
    left: {
      left: 0
    },
    right: {
      right: 0
    }
  })
}
