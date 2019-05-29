import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    anchor: { flexWrap: 'nowrap' },
    avatar: {
      fontSize: '0.9rem'
    },
    content: {
      width: '15rem'
    },
    name: {
      fontWeight: 400,
      display: 'block'
    },
    truncateText: {
      maxWidth: '12rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  })
