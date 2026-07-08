// Ignore missing imports as packages are definitely present in the project
/* eslint-disable import/no-extraneous-dependencies */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // PicassoBook docs-UI (Storybook infra) is styled with Tailwind too.
    '.storybook/**/*.{ts,tsx,jsx}',
    'packages/base/*/src/**/*.{ts,tsx}',
    'packages/*/src/**/*.{ts,tsx}',
  ],
  presets: [
    require('@toptal/base-tailwind'),
    require('@toptal/picasso-tailwind'),
  ],
}
