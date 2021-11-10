import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ transitions }: Theme) =>
  createStyles({
    clickableIcon: {
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      '&:hover, &$hovered': {
        transform: 'scale(1.5)'
      }
    },
    hovered: {}
  })
