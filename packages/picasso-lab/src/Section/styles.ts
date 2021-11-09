import { createStyles, Theme } from '@material-ui/core'

const defaultHeader = {
  display: 'flex',
  paddingBottom: '1.5rem'
}

const defaultCollapsedHeader = {
  paddingBottom: '0'
}

export default ({ sizes, palette }: Theme) =>
  createStyles({
    root: {
      paddingTop: '2rem'
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

    collapsed: {
      paddingBottom: '2rem'
    },
    default: {},
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
    defaultHeader,
    borderedHeader: defaultHeader,
    withHeaderBarHeader: {
      display: 'flex',
      padding: '0.75rem 1rem',
      borderRadius: `${sizes.borderRadius.medium} ${sizes.borderRadius.medium} 0 0`,
      borderBottom: `solid ${sizes.borderWidth} ${palette.grey.light2}`,
      backgroundColor: palette.grey.lighter
    },

    defaultCollapsedHeader,
    borderedCollapsedHeader: defaultCollapsedHeader,
    withHeaderBarCollapsedHeader: {
      borderBottom: 'none',
      borderRadius: sizes.borderRadius.medium
    }
  })
