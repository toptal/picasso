import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    anchor: { maxWidth: '16rem', flexWrap: 'nowrap' },
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
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    typographyItem: {
      flex: 1,
      minWidth: 0
    }
  })
