import { createStyles } from '@material-ui/core'
import { rotate180 } from '@toptal/picasso-shared'

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
    },
    collapse: {
      ...rotate180(false)
    },
    collapseActive: {
      ...rotate180(true)
    }
  })
