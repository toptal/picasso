import { createStyles } from '@material-ui/core/styles'

import { styleFromHeaderHeight } from '../PageHeader/styles'

export default () =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',

      '& > footer, & > header': {
        flex: 0
      },
      '& > header + *': styleFromHeaderHeight('marginTop')
    }
  })
