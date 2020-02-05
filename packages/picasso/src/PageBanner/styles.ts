import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ layout }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      justifyContent: 'center'
    },
    content: {
      alignItems: 'center',
      fontSize: '0.875em',
      width: '100%',
      paddingLeft: layout.contentPaddingHorizontal,
      paddingRight: layout.contentPaddingHorizontal,
      maxWidth: layout.contentWidth
    },
    iconWrapper: {
      flexBasis: '1.5em',
      marginRight: '1.5em',
      minWidth: '1.5em',
      height: '1.3125em'
    },
    wide: {
      maxWidth: layout.contentWidthWide
    },
    fullWidth: {
      maxWidth: '100%'
    }
  })
