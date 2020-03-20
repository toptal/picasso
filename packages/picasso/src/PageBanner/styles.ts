import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ layout }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      justifyContent: 'center'
    },
    content: {
      fontSize: '0.875em',
      width: '100%',
      paddingLeft: layout.contentPaddingHorizontal,
      paddingRight: layout.contentPaddingHorizontal,
      maxWidth: layout.contentWidth
    },
    iconWrapper: {
      flexBasis: '1.5rem',
      marginRight: '1.5rem',
      minWidth: '1.5rem',
      height: '1.3125rem'
    },
    wide: {
      maxWidth: layout.contentWidthWide
    },
    fullWidth: {
      maxWidth: '100%'
    }
  })
