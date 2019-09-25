import { createStyles } from '@material-ui/core/styles'

import '../Popover/styles'

export default () =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    anchor: {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    content: {
      fontSize: 'inherit'
    },
    paper: {}
  })
