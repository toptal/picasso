import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default () =>
  createStyles({
    backButtonIcon: {
      verticalAlign: 'middle',
      marginTop: rem('-1px'),
      marginRight: rem('4px'),
      marginLeft: rem('-5px')
    },
    hideMenu: {
      display: 'none'
    }
  })
