import { Theme, createStyles } from '@material-ui/core/styles'

export const headerHeight = '4.5em'

export default ({ palette, layout, zIndex, screens }: Theme) =>
  createStyles({
    root: {
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: zIndex.appBar
    },
    light: {
      backgroundColor: palette.blue.dark
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
      height: headerHeight,
      padding: `0 ${layout.contentPaddingHorizontal}`,

      [screens('small', 'medium')]: {
        height: '2.5em',
        justifyContent: 'center'
      }
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
    },
    logo: {
      [screens('small', 'medium')]: {
        fontSize: '1.5em'
      }
    }
  })
