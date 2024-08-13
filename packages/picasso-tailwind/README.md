# `picasso-tailwind`

Picasso-specific Tailwind preset that contains Picasso-specific design tokens from BASE and support for Picasso usage.

The configuration has to be used with `@toptal/base-tailwind` preset like in the example below.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@toptal/base-tailwind'),
    require('@toptal/picasso-tailwind'),
  ],
  // ...
}
```
