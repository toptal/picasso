// Ignore missing imports as packages are definitely present in the project
// eslint-disable import/no-extraneous-dependencies
const basePreset = require('@toptal/base-tailwind')
const picassoPreset = require('@toptal/picasso-tailwind')

console.log('@@@', basePreset.plugins)
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['packages/**/*.{ts,tsx}'],
  plugins: [
    ...(basePreset.plugins || []),
    ...(picassoPreset.plugins || []),
  ],
  theme: {
    ...basePreset.theme,
    ...picassoPreset.theme,
  },
  extend: {
    ...basePreset.extend,
    ...picassoPreset.extend,
  },
  corePlugins: {
    preflight: false,
  },
}
