import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ layout }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',

      '& > footer, & > header': {
        flex: 0
      }
    },

    pageContentRoot: {
      flex: 1,
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },

    pageContentInner: {
      height: '100%',
      flexGrow: 1,
      maxWidth: layout.contentWidth,
      padding: '0 1rem'
    },

    fullWidth: {
      maxWidth: '100%'
    }
  })
