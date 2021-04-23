import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ layout, palette }: Theme) =>
  createStyles({
    root: {
      flex: 1,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      // hasSidebar fix
      background: `linear-gradient(90deg, ${palette.background.default} 50%, ${palette.secondary.main} 50%)`
    },
    content: {
      height: '100%',
      flexGrow: 1,
      maxWidth: layout.contentWidth,
      backgroundColor: palette.secondary.main,
      backgroundClip: 'content-box'
    },
    hasSidebar: {
      background: `linear-gradient(90deg, ${palette.background.default} 50%, ${palette.secondary.main} 50%)`
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
