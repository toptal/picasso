// const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  // plugins: [
  //   plugin(function ({ addBase }) {
  //     // Place for core semantic tokens
  //     addBase({
  //       ':root': {
  //         '--color-green-light-100': '#EAFBF5',
  //         '--color-green-light-150': '#D7F3E9',
  //         '--color-green-light-500': '#00CC83',
  //         '--color-green-light-600': '#03B080',
  //         '--color-green-light-700': '#05947C',
  //       },
  //     })
  //   }),
  // ],
  // Place for base semantic tokens
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      blue: {
        100: '#EDF1FD',
        150: '#D5DEFA',
      },
    },
    blur: {
      4: '4px',
      8: '8px',
      12: '12px',
      32: '32px',
    },
    borderWidth: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
    },
    borderRadius: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      25: '100px',
      999: '999px',
    },
  },
}
