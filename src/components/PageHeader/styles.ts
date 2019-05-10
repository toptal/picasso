import { Theme, createStyles } from '@material-ui/core/styles'

export const headerHeight = '3.75em'

export default ({ palette, layout }: Theme) =>
  createStyles({
    root: {
      backgroundColor: palette.primary.main,
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1
    },
    content: {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto',
      justifyContent: 'space-between',
      maxWidth: layout.contentWidth,
      height: headerHeight,
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
