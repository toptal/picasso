import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

const BANNER_HEIGHT = '0.25rem'

export default ({ palette, zIndex, typography }: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      textAlign: 'center',
      top: 0,
      width: '100%',
      zIndex: zIndex.snackbar,
      fontSize: '0.75rem',
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

      fontWeight: typography.fontWeights.semibold,
      lineHeight: '1.5em',
      color: palette.common.white,
      cursor: 'pointer',
      display: 'inline-block',
      letterSpacing: '.01em',
      padding: `${rem('3px')} 0.5rem`,
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
