import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ transitions }: Theme) =>
  createStyles({
    clickableIcon: {
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      '&:hover': {
        transform: 'scale(1.5)'
      }
    }
  })
