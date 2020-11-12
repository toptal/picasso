import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette, zIndex }: Theme) =>
  createStyles({
    root: {
      fontSize: '0.7rem',
      lineHeight: '1em',
      position: 'fixed',
      textAlign: 'center',
      top: 0,
      width: '100%',
      zIndex: zIndex.snackbar,
      pointerEvents: 'none'
    },
    rootDevelopment: {
      borderTop: `0.4rem solid ${palette.green.main}`
    },
    rootStaging: {
      borderTop: `0.4rem solid ${palette.red.main}`
    },
    rootTemploy: {
      borderTop: `0.4rem solid ${palette.yellow.main}`
    },
    label: {
      borderRadius: '0 0 0.3rem 0.3rem',
      color: palette.common.white,
      cursor: 'pointer',
      display: 'inline-block',
      letterSpacing: '.01em',
      padding: '0.25rem 0.7rem 0.5rem',
      textTransform: 'uppercase',
      userSelect: 'none',
      pointerEvents: 'initial'
    },
    labelDevelopment: {
      backgroundColor: palette.green.main
    },
    labelStaging: {
      backgroundColor: palette.red.main
    },
    labelTemploy: {
      backgroundColor: palette.yellow.main
    }
  })
