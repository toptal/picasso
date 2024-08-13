# `base-tailwind`

BASE design Tailwind preset that contains global design token. The preset has to be reused by any project-specific Tailwind configuration (Picasso, Caliber, etc.) and has to be mentioned before any other presets.

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
