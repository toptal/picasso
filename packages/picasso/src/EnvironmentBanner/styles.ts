import { Theme, createStyles } from '@material-ui/core/styles'

const BANNER_HEIGHT = '0.25rem'

export default ({ palette, zIndex }: Theme) =>
  createStyles({
    root: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: '1em',
      position: 'fixed',
      textAlign: 'center',
      top: 0,
      width: '100%',
      zIndex: zIndex.snackbar,
      pointerEvents: 'none'
    },
    rootDevelopment: {
      borderTop: `${BANNER_HEIGHT} solid ${palette.green.dark}`
    },
    rootStaging: {
      borderTop: `${BANNER_HEIGHT} solid ${palette.red.main}`
    },
    rootTemploy: {
      borderTop: `${BANNER_HEIGHT} solid ${palette.yellow.main}`
    },
    label: {
      borderRadius: '0 0 0.3rem 0.3rem',
      color: palette.common.white,
      cursor: 'pointer',
      display: 'inline-block',
      letterSpacing: '.01em',
      padding: '0.25rem 0.5rem 0.5rem',
      textTransform: 'uppercase',
      userSelect: 'none',
      pointerEvents: 'initial'
    },
    labelDevelopment: {
      backgroundColor: palette.green.dark
    },
    labelStaging: {
      backgroundColor: palette.red.main
    },
    labelTemploy: {
      backgroundColor: palette.yellow.main
    }
  })
