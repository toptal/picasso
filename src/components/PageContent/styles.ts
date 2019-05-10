import { Theme, createStyles } from '@material-ui/core/styles'

import { headerHeight } from '../PageHeader/styles'

export default ({ layout }: Theme) =>
  createStyles({
    root: {
      flex: 1,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: headerHeight
    },
    content: {
      height: '100%',
      flexGrow: 1,
      maxWidth: layout.contentWidth,
      padding: '0 1rem'
    },
    fullWidth: {
      maxWidth: '100%'
    }
  })
