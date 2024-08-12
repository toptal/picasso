# `picasso-tailwind`

Picasso-specific Tailwind preset that contains Picasso-specific design tokens from BASE and support for Picasso usage.

The configuration has to be used with `@toptal/base-tailwind` preset like in the example below.

```javascript
const basePreset = require('@toptal/base-tailwind')
const picassoPreset = require('@toptal/picasso-tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
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
  // ...
}
```
