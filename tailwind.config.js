/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['packages/**/*.{ts,tsx}'],
  presets: [
    require('@toptal/base-tailwind'),
    require('@toptal/picasso-tailwind'),
    require('@toptal/caliber-tailwind'),
  ],
  corePlugins: {
    preflight: false,
  },
}
