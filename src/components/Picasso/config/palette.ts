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
    green: SimplePaletteColorOptions
    yellow: SimplePaletteColorOptions
    red: SimplePaletteColorOptions
  }
}

declare module '@material-ui/core' {
  interface Color {
    lighter?: string
    light?: string
    main?: string
    dark?: string
    darker?: string
  }
}

export const colors = {
  grey: {
    lighter: '#ebeced',
    light: '#d8d9dc',
    main: '#c4c6ca',
    dark: '#455065',
    darker: '#262d3d'
  },
  blue: {
    lighter: '#eef1fc',
    light: '#25a9ef',
    main: '#204ecf',
    dark: '#183a9e',
    darker: '#0f256e'
  },
  yellow: {
    lighter: '#fdf5e8',
    main: '#e59c01'
  },
  red: {
    lighter: '#fbedf1',
    main: '#d42551'
  },
  green: {
    lighter: '#edfbf5',
    main: '#00cc83',
    dark: '#03b080',
    darker: '#05947c'
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
  primary: JSON.parse(JSON.stringify(colors.blue)),
  error: JSON.parse(JSON.stringify(colors.red)),
  grey: {
    100: colors.grey.lighter,
    200: colors.grey.light,
    300: colors.grey.main,
    400: colors.grey.dark,
    500: colors.grey.darker,
    ...colors.grey
  },
  text: {
    primary: colors.grey.dark
  },
  background: {
    default: colors.common.white
  }
}

export default palette
