import { createStyles } from '@material-ui/core'

export default () =>
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
    }
  })
