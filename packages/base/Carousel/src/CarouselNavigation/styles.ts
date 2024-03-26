import { rem } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette, transitions }: Theme) =>
  createStyles({
    arrowPrev: {
      transform: 'rotate(180deg)',
    },
    dots: {
      '& .glider-dot': {
        width: 10,
        height: 10,
        backgroundColor: palette.blue.main,
        opacity: 0.2,
        '&.active': {
          backgroundColor: palette.blue.main,
          opacity: 1,
        },
        '&:hover:not(.active)': {
          transition: `box-shadow, opacity ${transitions.duration.standard}ms ${transitions.easing.easeOut}`,
          opacity: 1,
          boxShadow: '0 0 0 2px rgba(32, 78, 207, 0.2)',
        },
      },
    },
    navigation: {
      padding: `${rem('14px')} 1.5rem 0`,
    },
  })
