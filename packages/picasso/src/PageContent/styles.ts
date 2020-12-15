import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ layout }: Theme) =>
  createStyles({
    root: {
      flex: 1,
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    content: {
      height: '100%',
      flexGrow: 1,
      maxWidth: layout.contentWidth
    },
    wide: {
      maxWidth: layout.contentWidthWide
    },
    fullWidth: {
      maxWidth: '100%'
    },
    flex: {
      display: 'flex'
    }
  })
