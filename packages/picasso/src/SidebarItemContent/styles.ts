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
    iconWrapper: {
      width: '1rem',
      height: '1rem'
    },
    staticBadge: {
      marginLeft: '0.5em'
    }
  })
