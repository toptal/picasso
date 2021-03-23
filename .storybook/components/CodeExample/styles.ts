import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%'
    },
    component: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    componentRenderer: {
      flex: 1,
      position: 'relative'
    },
    buttons: {
      top: '-.75rem',
      right: '-1rem',
      position: 'absolute'
    },
    editor: {
      width: '100%',
      backgroundColor: '#141414',
      padding: '1rem 0'
    }
  })
