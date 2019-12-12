import { createStyles } from '@material-ui/core/styles'
import { spacingToRem } from '@toptal/picasso-shared'

export default () =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      '& > *': {
        flex: '1 0'
      },
      '& > * + *': {
        marginLeft: spacingToRem('xsmall')
      }
    }
  })
