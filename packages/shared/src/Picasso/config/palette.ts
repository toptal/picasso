import { Palette } from '@material-ui/core/styles/createPalette'

import { light, dark } from './colors'

interface ColorSample {
  lighter?: string
  lighter2?: string
  light?: string
  light2?: string
  main?: string
  main2?: string
  dark?: string
  darker?: string
  secondary: {
    main: string
    contrastText: string
  }
}

declare module '@material-ui/core/styles/createPalette' {
  export interface SimplePaletteColorOptions extends ColorSample {}

  interface Palette {
    blue: SimplePaletteColorOptions
    green: SimplePaletteColorOptions
    yellow: SimplePaletteColorOptions
    red: SimplePaletteColorOptions
  }
}

declare module '@material-ui/core' {
  export interface Color extends ColorSample {}
}

export const colors = dark

export const paletteLight: Palette = {
  // MUI adds additional colors, like `contrastText` to the
  // palette. So to prevent changing colors object we should
  // deep copy it.
  ...JSON.parse(JSON.stringify(light)),
  primary: JSON.parse(JSON.stringify(light.blue)),
  error: JSON.parse(JSON.stringify(light.red)),
  grey: {
    100: light.grey.lighter2,
    200: light.grey.light2,
    300: light.grey.main,
    400: light.grey.dark,
    500: light.grey.darker,
    ...light.grey
  },
  text: {
    primary: light.grey.dark
  },
  background: {
    default: light.common.white
  },
  type: 'light'
}

const paletteDark: Palette = {
  // MUI adds additional colors, like `contrastText` to the
  // palette. So to prevent changing colors object we should
  // deep copy it.
  ...JSON.parse(JSON.stringify(dark)),
  primary: JSON.parse(JSON.stringify(dark.blue)),
  error: JSON.parse(JSON.stringify(dark.red)),
  grey: {
    100: dark.grey.lighter2,
    200: dark.grey.light2,
    300: dark.grey.main,
    400: dark.grey.dark,
    500: dark.grey.darker,
    ...dark.grey
  },
  text: {
    primary: dark.common.white,
    secondary: dark.grey.lighter
  },
  background: {
    default: dark.grey.dark,
    paper: dark.common.white
  },
  type: 'dark'
}

export default paletteDark
