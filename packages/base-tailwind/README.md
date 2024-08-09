# `base-tailwind`

Base Tailwind definitions. This preset has to be reused by any product-specific Tailwind configuration (Picasso, Caliber, etc.).


```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@toptal/base-tailwind'),
    require('@toptal/picasso-tailwind'),
    require('@toptal/picasso-tailwind'),
    // ...
  ],
  // ...
}
```
