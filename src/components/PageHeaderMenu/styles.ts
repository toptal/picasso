import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ screens }: Theme) =>
  createStyles({
    avatar: {
      fontSize: '0.9rem',

      [screens('small')]: {
        // fontSize: '0.5rem'
      }
    },
    xsmall: {
      [screens('small')]: {
        height: '1.5em',
        width: '1.5em'
      }
    },
    content: {
      width: '15em'
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

      [screens('small')]: {
        marginLeft: '0.5rem'
      }
    }
  })
