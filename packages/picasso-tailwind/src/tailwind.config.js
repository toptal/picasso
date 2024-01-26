/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.{ts,tsx}',
    '{libs,namespaces}/**/src/**/*.{ts,tsx}',
    '{hosts}/**/*.{ts,tsx}',
    '!**.{test,cy,pact}.{ts,tsx}',
    'node_modules/@toptal/picasso/**/*.{js}',
    'node_modules/@toptal/picasso-*/**/*.{js}',
  ],
  presets: [require('./index')],
  plugins: [],
}
