import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ layout }: Theme) =>
  createStyles({
    fullWidth: {
      maxWidth: '100%'
    },
    root: {
      flex: 1,
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    content: {
      height: '100%',
      flexGrow: 1,
      maxWidth: layout.contentWidth,
      padding: '0 1rem'
    }
  })
