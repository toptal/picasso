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
    withHeaderBar: {
      padding: 0,
      '& > :last-child:not(:first-child)': {
        padding: '1.5rem'
      },
      borderRadius: sizes.borderRadius.medium,
      border: `solid ${sizes.borderWidth} ${palette.grey.light2}`
    },
    headerBar: {
      display: 'flex',
      padding: '0.75rem 1rem',
      borderRadius: `${sizes.borderRadius.medium} ${sizes.borderRadius.medium} 0 0`,
      borderBottom: `solid ${sizes.borderWidth} ${palette.grey.light2}`,
      backgroundColor: palette.grey.lighter
    },
    collapsedHeader: {
      paddingBottom: '0'
    },
    collapsedHeaderBar: {
      borderBottom: 'none',
      borderRadius: sizes.borderRadius.medium
    },
    collapsed: {
      paddingBottom: '2rem'
    }
  })
