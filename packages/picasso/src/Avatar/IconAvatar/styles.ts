import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default () =>
  createStyles({
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    xxsmalLIcon: { fontSize: '1rem' },
    xsmallIcon: { fontSize: '1rem' },
    smallIcon: { fontSize: rem('24px') },
    mediumIcon: { fontSize: rem('30px') },
    largeIcon: { fontSize: rem('48px') }
  })
