import { createStyles } from '@material-ui/core/styles'
import { spacingToEm } from '@toptal/picasso-shared'

export default () =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      '& > *': {
        flex: '1 0'
      },
      '& > * + *': {
        marginLeft: spacingToEm('xsmall')
      }
    }
  })
