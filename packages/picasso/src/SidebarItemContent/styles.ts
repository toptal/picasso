import { createStyles } from '@material-ui/core'

export default () =>
  createStyles({
    noWrap: {
      flex: 1,
      minWidth: 0
    },
    withIcon: {
      marginLeft: '0.875em'
    },
    hiddenContent: {
      visibility: 'hidden'
    },
    staticBadge: {
      marginLeft: '0.5em'
    }
  })
