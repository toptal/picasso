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
  }

  interface Palette {
    blue: SimplePaletteColorOptions
    green: SimplePaletteColorOptions
    yellow: SimplePaletteColorOptions
    red: SimplePaletteColorOptions
  }
}

export const colors = {
  grey: {
    100: '#d8d9dc',
    200: '#c4c6ca',
    300: '#686869',
    400: '#455065',
    500: '#262d3d'
  },
  blue: {
    lighter: '#eef1fc',
    light: '#cad5f4',
    main: '#204ecf',
    dark: '#1542c1'
  },
  yellow: {
    light: '#fdf5e8',
    main: '#edad2a'
  },
  red: {
    lighter: '#fbedf1',
    light: '#f8b1b4',
    main: '#d42551',
    dark: '#9f3a38'
  },
  green: {
    lighter: '#edfbf5',
    light: '#b3ffe4',
    main: '#00cc83'
  },
  common: {
    black: '#000',
    white: '#fff'
  }
}

const palette = {
  // MUI adds additional colors, like `contrastText` to the
  // palette. So to prevent changing colors object we should
  // deep copy it.
  ...JSON.parse(JSON.stringify(colors)),
  primary: colors.blue,
  text: {
    primary: '#455065'
  },
  background: {
    default: colors.common.white
  }
}

export default palette
