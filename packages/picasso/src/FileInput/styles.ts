import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default () =>
  createStyles({
    root: {
      maxWidth: '300px'
    },
    hint: {
      '& > *': {
        lineHeight: rem('16px')
      }
    },
    nativeInput: {
      display: 'none'
    }
  })
