# `base-tailwind`

BASE design Tailwind preset that contains global design token. The preset has to be reused by any project-specific Tailwind configuration (Picasso, Caliber, etc.).


```javascript
const basePreset = require('@toptal/base-tailwind')
const picassoPreset = require('@toptal/picasso-tailwind')
const caliberPreset = require('@toptal/caliber-tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    ...(basePreset.plugins || []),
    ...(picassoPreset.plugins || []),
    ...(caliberPreset.plugins || []),
  ],
  theme: {
    ...basePreset.theme,
    ...picassoPreset.theme,
    ...caliberPreset.theme,
  },
  extend: {
    ...basePreset.extend,
    ...picassoPreset.extend,
    ...caliberPreset.extend,
  },
  // ...
}
```
