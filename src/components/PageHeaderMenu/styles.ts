import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    avatar: {
      fontSize: '0.9rem'
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
    }
  })
