# `base-tailwind`

Base Tailwind configuration that contains global design token. This preset have to be reused by any project-specific Tailwind configuration (Picasso, Caliber, etc.).


```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@toptal/base-tailwind'),
    require('@toptal/picasso-tailwind'),
    require('@toptal/caliber-tailwind'),
    // ...
  ],
  // ...
}
```
