// Ignore missing imports as packages are definitely present in the project
/* eslint-disable import/no-extraneous-dependencies */
const picassoPreset = require('@toptal/picasso-tailwind')
const caliberPreset = require('@toptal/caliber-tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['packages/**/*.{ts,tsx}'],
  presets: [
    require('@toptal/base-tailwind'),
    require('@toptal/picasso-tailwind'),
  ],
  theme: {
    opacity: {
      0: caliberPreset.theme.opacity['0'],
      1: caliberPreset.theme.opacity['1'],
      2: caliberPreset.theme.opacity['2'],
      10: picassoPreset.theme.opacity['10'],
      20: picassoPreset.theme.opacity['20'],
    }
  },
  corePlugins: {
    preflight: false,
  },
}
