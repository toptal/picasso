import { rem } from '@toptal/picasso-shared'
import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, transitions }: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      padding: `1rem 0 1.5rem`,
      '& .glider-contain': {
        padding: 0,
      },

      '& .glider-slide': {
        minWidth: '100px',
      },
    },
    gradient: {
      '& .glider-contain': {
        position: 'relative',

        '&:after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          width: '20%',
          height: '100%',
          top: 0,
          right: 0,
          background:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, white 90%)',
        },
      },
    },

    arrowPrev: {
      transform: 'rotate(180deg)',
    },
    arrowNext: {},
    arrows: {
      alignSelf: 'flex-end',
    },
    dots: {
      alignSelf: 'flex-start',
      margin: 0,
      '& .glider-dot': {
        width: 10,
        height: 10,
        backgroundColor: palette.blue.main,
        opacity: 0.2,
        transition: `all ${transitions.duration.standard}ms ${transitions.easing.easeOut}`,
        '&.active': {
          opacity: 1,
        },
        '&:hover:not(.active)': {
          opacity: 1,
          boxShadow: '0 0 0 2px rgba(32, 78, 207, 0.2)',
        },
      },
    },
    navigation: {
      padding: `${rem('14px')} 1.5rem 0`,
    },
    header: {
      paddingBottom: '1.5rem',
    },
    footer: {
      paddingTop: '1.5rem',
    },
  })
