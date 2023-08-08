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
    borderRadius: {
      sm: '4px',
      md: '8px',
    },
    borderWidth: {
      DEFAULT: '1px',
    },
    fontFamily: {
      sans: ['proxima-nova', 'Arial', 'sans-serif'],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    fontWeight: {
      thin: 100,
      light: 300,
      regular: 400,
      semibold: 600,
    },
    fontSize: {
      '2xs': ['0.75rem', { lineHeight: '1.125rem' }],
      sm: ['0.8125rem', { lineHeight: '1.25rem' }],
      md: ['0.875rem', { lineHeight: '1.375rem' }],
      lg: ['1rem', { lineHeight: '1.5rem' }],
      xl: ['1.25rem', { lineHeight: '1.875rem' }],
      '2xl': ['1.75rem', { lineHeight: '2.625rem' }],
    },
    boxShadow: {
      0: 'none',
      /** notification center, paper */
      1: '0 0 8px 0 rgba(0,0,0, 0.08)',
      /** modal */
      2: '0 4px 8px 0 rgba(0,0,0, 0.08)',

      /** nofication growl */
      3: '0 0 0 1px rgba(0, 0, 0, 0.04), 0 0 8px 0 rgba(0, 0, 0, 0.16)',

      /** tooltip */
      4: '0 0 4px 0 rgba(0,0,0, 0.24), 0 0 32px 0 rgba(0,0,0, 0.12)',

      /** scroll menu */
      5: '0 0 0 1px rgba(0, 0, 0, 0.04), 0 8px 12px -3px rgba(0, 0, 0, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.04)',
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
