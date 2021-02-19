import { createStyles, Theme } from '@material-ui/core'

export default ({ layout }: Theme) =>
  createStyles({
    root: {
      padding: `0 ${layout.contentPaddingHorizontal}`
    },
    header: {
      display: 'flex',
      paddingBottom: '1rem'
    },
    title: {
      marginRight: '1rem'
    },
    subtitle: {
      alignSelf: 'center',
      marginRight: '1rem'
    },
    actions: {
      marginLeft: 'auto'
    }
  })
