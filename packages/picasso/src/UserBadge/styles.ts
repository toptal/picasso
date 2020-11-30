import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default () =>
  createStyles({
    root: {
      fontSize: '1rem'
    },
    infoContainer: {
      minWidth: 0,
      marginLeft: rem('12px')
    },
    title: {
      marginLeft: '0.5em'
    },
    avatar: {},
    name: {}
  })
