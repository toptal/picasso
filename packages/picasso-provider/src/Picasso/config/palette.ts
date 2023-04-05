interface ColorSample {
  lightest?: string
  lighter?: string
  lighter2?: string
  light?: string
  light2?: string
  main?: string
  main2?: string
  dark?: string
  darker?: string
}

declare module '@material-ui/core/styles/createPalette' {
  export interface SimplePaletteColorOptions extends ColorSample {}

  interface Palette {
    blue: SimplePaletteColorOptions
    green: SimplePaletteColorOptions
    yellow: SimplePaletteColorOptions
    red: SimplePaletteColorOptions
    purple: SimplePaletteColorOptions
    gradients: {
      blue: string
      darkerBlue: string
      lightGrey: string
      grey: string
      darkerGrey: string
    }
  }
}

declare module '@material-ui/core' {
  export interface Color extends ColorSample {}
}

export const colors = {
  grey: {
    lightest: '#fcfcfc',
    lighter: '#f3f4f6',
    lighter2: '#ebeced',
    light: '#e5e7ea',
    light2: '#d8d9dc',
    main: '#c4c6ca',
    main2: '#84888e',
    dark: '#455065',
    darker: '#262d3d',
  },
  blue: {
    lighter: '#edf1fd',
    light: '#25a9ef',
    main: '#204ecf',
    dark: '#183a9e',
    darker: '#0f256e',
  },
  yellow: {
    lighter: '#fff5e3',
    main: '#e59c01',
  },
  red: {
    lighter: '#fbedf1',
    main: '#d42551',
  },
  green: {
    lighter: '#eafbf5',
    main: '#00cc83',
    dark: '#03b080',
    darker: '#05947c',
  },
  purple: {
    main: '#6727cf',
  },
  common: {
    black: '#000',
    white: '#fff',
  },
}

export const gradients = {
  blue: `linear-gradient(to right bottom, ${colors.blue.darker}, ${colors.blue.main})`,
  darkerBlue: `linear-gradient(to right bottom, #071237, ${colors.blue.darker})`,
  lightGrey: `linear-gradient(to right bottom, ${colors.grey.light}, ${colors.common.white})`,
  grey: `linear-gradient(to right bottom, ${colors.grey.darker}, ${colors.grey.dark})`,
  darkerGrey: `linear-gradient(to right bottom, ${colors.common.black}, ${colors.grey.darker})`,
}

const palette = {
  // MUI adds additional colors, like `contrastText` to the
  // palette. So to prevent changing colors object we should
  // deep copy it.
  ...JSON.parse(JSON.stringify(colors)),
  primary: JSON.parse(JSON.stringify(colors.blue)),
  error: JSON.parse(JSON.stringify(colors.red)),
  grey: {
    100: colors.grey.lighter2,
    200: colors.grey.light2,
    300: colors.grey.main,
    400: colors.grey.dark,
    500: colors.grey.darker,
    ...colors.grey,
  },
  text: {
    primary: colors.grey.dark,
  },
  background: {
    default: colors.common.white,
  },
  gradients,
}

export default palette
