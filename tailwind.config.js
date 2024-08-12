/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['packages/**/*.{ts,tsx}'],
  // Ignore missing imports as packages are definitely present in the project
  // eslint-disable-next-line import/no-extraneous-dependencies
  presets: [
    require('@toptal/base-tailwind'),
    require('@toptal/picasso-tailwind'),
  ],
  corePlugins: {
    preflight: false,
  },
}
