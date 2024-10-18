/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'packages/base/*/src/**/*.{ts,tsx}',
    'packages/*/src/**/*.{ts,tsx}',
  ],
  presets: [
    require('@toptal/base-tailwind'),
    require('@toptal/picasso-tailwind'),
    require('@toptal/caliber-tailwind'),
  ],
  corePlugins: {
    preflight: false,
  },
}
