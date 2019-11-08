import { Theme, createStyles } from '@material-ui/core/styles'

import { screens } from '../Picasso/config'

export const headerHeight = { default: '4.5em', smallAndMedium: '3em' }

export const styleFromHeaderHeight = (prop: string) => {
  return {
    [prop]: headerHeight.default,
    [screens('small', 'medium')]: {
      [prop]: headerHeight.smallAndMedium
    }
  }
}

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
      padding: `0 ${layout.contentPaddingHorizontal}`,

      ...styleFromHeaderHeight('height')
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
