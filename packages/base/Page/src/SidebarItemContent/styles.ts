import { createStyles } from '@material-ui/core'
import { rem } from '@toptal/picasso-shared'

export default () =>
  createStyles({
    noWrap: {
      flex: 1,
      minWidth: 0,
    },
    withIcon: {
      marginLeft: rem('6px'),
    },
    hiddenContent: {
      visibility: 'hidden',
    },
    iconWrapper: {
      width: '1em',
      height: '1em',
      position: 'relative',
    },
    compactIndicator: {
      position: 'absolute',
      top: 0,
      right: 0,
      transform: 'translate(50%, -50%)',
    },
    expandedIndicator: {
      marginRight: rem('6px'),
    },
  })
