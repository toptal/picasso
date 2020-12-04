import { Theme, createStyles } from '@material-ui/core/styles'

export const headerHeight = { default: '3.5rem', smallAndMedium: '3rem' }

export default ({ palette, layout, zIndex, screens }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: zIndex.appBar
    },
    light: {
      backgroundColor: palette.common.white,
      boxShadow: `0 1px 0 0 ${palette.grey.lighter2}`
    },
    dark: {
      backgroundColor: palette.blue.darker
    },
    content: {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto',
      justifyContent: 'space-between',
      maxWidth: layout.contentWidth,
      padding: `0 ${layout.contentPaddingHorizontal}`,
      height: headerHeight.default,
      [screens('small', 'medium')]: {
        height: headerHeight.smallAndMedium
      }
    },
    wrapper: {
      height: headerHeight.default,
      [screens('small', 'medium')]: {
        height: headerHeight.smallAndMedium
      }
    },
    wide: {
      maxWidth: layout.contentWidthWide
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
      height: '1.5em',
      backgroundColor: palette.common.white,
      opacity: 0.8
    },
    dividerBlue: {
      backgroundColor: palette.blue.darker
    },
    logoContainer: {
      [screens('small', 'medium')]: {
        lineHeight: '1em',
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, 0%)'
      }
    },
    logo: {
      [screens('small', 'medium')]: {
        fontSize: '1.5em'
      }
    }
  })
