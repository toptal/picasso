/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['packages/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      'xl-header': '1280px',
      xl: '1440px',
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      blue: {
        100: '#EDF1FD',
        400: '#25A9EF',
        500: '#204ECF',
        600: '#183A9E',
        700: '#0F256E',
      },
      green: {
        100: '#EAFBF5',
        500: '#00CC83',
        600: '#03B080',
        700: '#05947C',
      },
      gray: {
        50: '#FCFCFC',
        100: '#F3F4F6',
        200: '#EBECED',
        300: '#E5E7EA',
        400: '#D8D9DC',
        500: '#C4C6CA',
        600: '#84888E',
      },
      graphite: {
        700: '#455065',
        800: '#262D3D',
        900: '#191E28',
      },
      red: {
        100: '#FBEDF1',
        500: '#D42551',
      },
      yellow: {
        100: '#FFF5E3',
        500: '#E59C01',
      },
      purple: {
        500: '#6727CF',
      },
    },
    extend: {},
  },
  plugins: [],
}
