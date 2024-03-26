/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      xs: '0px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    // https://toptal-core.atlassian.net/wiki/spaces/Base/pages/3217031216/Spacing
    spacing: {
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
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
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
    fontWeight: {
      thin: '100',
      light: '300',
      regular: '400',
      semibold: '600',
    },
    fontSize: {
      '2xs': ['0.75rem', { lineHeight: '1.125rem' }],
      xxs: ['0.75rem', { lineHeight: '1.125rem' }],
      sm: ['0.8125rem', { lineHeight: '1.25rem' }],
      md: ['0.875rem', { lineHeight: '1.375rem' }],
      lg: ['1rem', { lineHeight: '1.5rem' }],
      xl: ['1.25rem', { lineHeight: '1.875rem' }],
      '2xl': ['1.75rem', { lineHeight: '2.625rem' }],
      xxl: ['1.75rem', { lineHeight: '2.625rem' }],
    },
    // TODO: [FX-5003] Deprecate legacy shadow classes
    // Shadows 0-5 correspond to BASE design https://www.figma.com/file/9xnyixadrhlHe9UuXBMRlT/Foundations?type=design&node-id=22%3A21&mode=design&t=8d8TKUUuHKWosUtX-1
    // Shadows 6-24 correspond to Material UI v4 shadows @material-ui/core/styles/shadows.js
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

      /** elevations for paper */
      6: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
      7: '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
      8: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
      9: '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
      10: '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
      11: '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
      12: '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
      13: '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
      14: '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
      15: '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
      16: '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
      17: '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
      18: '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
      19: '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
      20: '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
      21: '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
      22: '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
      23: '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
      24: '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
      button: '0 0 0 3px rgba(32, 78, 207, 0.48)',
      'button-transparent': '0 0 0 3px rgba(255, 255, 255, 0.48)',
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
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
    extend: {
      zIndex: {
        drawer: 1200,
        modal: 1300,
      },
      transitionDuration: {
        350: '350ms',
      },
      boxShadow: {
        outline: '0 0 0 3px rgba(0, 0, 0, 0.48)',
      },
      minWidth: ({ theme }) => ({
        ...theme('spacing'),
        14: '3.5rem',
        16: '4rem',
        24: '6rem',
      }),
      maxWidth: ({ theme }) => ({
        ...theme('spacing'),
      }),
      minHeight: ({ theme }) => ({
        ...theme('spacing'),
      }),
      maxHeight: ({ theme }) => ({
        ...theme('spacing'),
      }),
      fontSize: {
        'button-small': ['12px', { lineHeight: '15px' }],
        'button-medium': ['13px', { lineHeight: '16px' }],
        'button-large': ['15px', { lineHeight: '18px' }],
      },
    },
  },
}
