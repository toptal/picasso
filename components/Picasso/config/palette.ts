declare module '@material-ui/core/styles/createPalette' {
  interface SimplePaletteColorOptions {
    lighter?: string
    light?: string
    main: string
    dark?: string
    darker?: string
  }

  interface Palette {
    blue: SimplePaletteColorOptions
    positive: SimplePaletteColorOptions
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
    200: '#686869',
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
  positive: {
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
