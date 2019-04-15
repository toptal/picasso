import { Color } from '@material-ui/core'
import { CommonColors } from '@material-ui/core/colors/common'

declare module '@material-ui/core/styles/createPalette' {
  interface SimplePaletteColorOptions {
    lighter?: string
    light?: string
    main: string
    dark?: string
    darker?: string
  }

  interface PaletteColor {
    lighter?: string
    light: string
    main: string
    dark: string
    contrastText: string
  }

  interface Palette {
    primary: PaletteColor
    text: TypeText
    grey: Color
    blue: SimplePaletteColorOptions
    error: PaletteColor
    success: SimplePaletteColorOptions
    common: CommonColors
    background: TypeBackground
  }
}

const palette = {
  primary: {
    light: '#cad5f4',
    main: '#204ecf',
    dark: '#1542c1'
  },
  text: {
    primary: '#455065'
  },
  grey: {
    50: '#dfe3e9',
    100: '#e8e8e8',
    200: '#C4C6CA',
    300: '#686869',
    500: '#262D3D'
  },
  blue: {
    lighter: 'rgba(32,78,207,.05)',
    light: '#dbe3f9'
  },
  error: {
    lighter: '#fff6f6',
    light: '#f8b1b4',
    main: '#f05359',
    dark: '#9f3a38'
  },
  success: {
    light: '#b3ffe4',
    main: '#00cc83'
  },
  common: {
    black: '#000',
    white: '#fff'
  },
  background: {
    default: 'white'
  }
}

export default palette
