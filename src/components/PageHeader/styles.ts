import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, layout }: Theme) =>
  createStyles({
    root: {
      backgroundColor: palette.primary.main,
      width: '100%'
    },
    content: {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto',
      justifyContent: 'space-between',
      maxWidth: layout.contentWidth,
      height: '3.75em',
      padding: `0 ${layout.contentPaddingHorizontal}`
    },
    fullWidth: {
      maxWidth: '100%'
    },
    left: {
      display: 'flex',
      alignItems: 'center'
    },
    right: {
      display: 'flex',
      alignItems: 'center'
    },
    divider: {
      width: '1px',
      height: '1.75em',
      backgroundColor: palette.common.white,
      opacity: 0.8
    }
  })
