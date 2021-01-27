import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ transitions }: Theme) =>
  createStyles({
    radio: {
      display: 'none'
    },
    label: {
      marginRight: '.125rem'
    },
    clickableLabel: {
      cursor: 'pointer'
    },
    clickableIcon: {
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      '&:hover': {
        transform: 'scale(1.5)'
      }
    }
  })
