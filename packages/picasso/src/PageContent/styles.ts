import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'

export default ({ layout, palette }: Theme) =>
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
      maxWidth: layout.contentWidth,
      backgroundColor: palette.common.white,
      backgroundClip: 'content-box'
    },
    hasSidebar: {
      background: `linear-gradient(90deg, ${palette.grey.lighter} 50%, ${palette.common.white} 50%)`
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
