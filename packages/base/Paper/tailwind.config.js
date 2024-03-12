/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    {
      pattern: /shadow-(12|13|14)/,
      optional: () => {
        throw new Error('This is a test')
      },
    },
  ],
}
