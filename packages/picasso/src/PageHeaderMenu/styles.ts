import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ screens }: Theme) =>
  createStyles({
    avatar: {
      fontSize: '0.9rem'
    },
    contentUserBadge: {
      [screens('small', 'medium')]: {
        padding: '1em',
        zIndex: 1,
        backgroundColor: 'white',
        position: 'relative'
      }
    },
    xsmall: {
      [screens('small', 'medium')]: {
        height: '1.5em',
        width: '1.5em'
      }
    },
    content: {
      width: '15em',
      maxHeight: 'calc(100vh - 4.5rem)', // viewport minus header height

      [screens('small', 'medium')]: {
        width: '100vw',
        maxHeight: 'calc(100vh - 3rem)' // viewport minus header height
      },

      // override existing media-query because we have full height
      '@media screen and (max-height: 585px)': {
        maxHeight: 'calc(100vh - 4.5rem)', // viewport minus header height

        [screens('small', 'medium')]: {
          maxHeight: 'calc(100vh - 3rem)' // viewport minus header height
        }
      }
    },
    name: {
      fontWeight: 400,
      display: 'block'
    },
    truncateText: {
      maxWidth: '11.5rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    arrow: {
      color: 'white',

      [screens('small', 'medium')]: {
        marginLeft: '0.5rem'
      }
    },
    paper: {
      [screens('small', 'medium')]: {
        top: '2.5em !important'
      }
    }
  })
