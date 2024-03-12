/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['packages/**/*.{ts,tsx}'],
  // Ignore missing "@toptal/picasso-tailwind" import as the package
  // is definetely present in the project
  // eslint-disable-next-line import/no-extraneous-dependencies
  presets: [require('@toptal/picasso-tailwind')],
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  safelist: [
    {
      // Needed for dynamic box shadow classes in the Paper component
      pattern: /shadow-(12|13|14)/,
    }
  ],
}
