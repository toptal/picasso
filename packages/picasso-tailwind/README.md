# `picasso-tailwind`

Picasso's Tailwind definitions. Design tokens from BASE and support for Picasso usage.

Please additionally use the `@toptal/base-tailwind` preset as a base for your Tailwind configuration.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@toptal/base-tailwind'), require('@toptal/picasso-tailwind')],
  // ...
}
```
