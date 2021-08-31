import { createStyles, Theme } from '@material-ui/core'

export default ({ sizes, palette }: Theme) =>
  createStyles({
    root: {
      paddingTop: '2rem'
    },
    header: {
      display: 'flex',
      paddingBottom: '1.5rem'
    },
    title: {
      marginRight: '1rem'
    },
    subtitle: {
      alignSelf: 'center',
      marginRight: '1rem'
    },
    actions: {
      display: 'flex',
      marginLeft: 'auto'
    },
    bordered: {
      borderRadius: sizes.borderRadius.medium,
      border: `solid ${sizes.borderWidth} ${palette.grey.light}`,
      padding: '2rem',
      '& > :last-child': {
        paddingBottom: '0'
      }
    },
    collapsedHeader: {
      paddingBottom: '0'
    },
    collapsed: {
      paddingBottom: '2rem'
    }
  })
