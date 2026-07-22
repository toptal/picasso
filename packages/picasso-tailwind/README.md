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

## Scanning Picasso's classes — Tailwind `content` / `@source`

Picasso components ship their Tailwind classes as string literals in their
compiled output, so your Tailwind build **must** scan `@toptal/picasso*` for
them — otherwise those utilities are never generated. This is required, not
optional: a missing glob silently drops Picasso styling, including the
`PicassoRootNode` border-box island (its descendants would fall back to the
page's content-box) and the responsive spacing classes.

Add the packages to your Tailwind `content` (config-based setup):

```js
const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@toptal/base-tailwind'),
    require('@toptal/picasso-tailwind'),
  ],
  content: [
    path.join(__dirname, 'node_modules/@toptal/picasso/**/*.js'),
    path.join(__dirname, 'node_modules/@toptal/picasso-*/**/*.js'),
    // ...your own sources
  ],
}
```

…or declare them with `@source` in your entry CSS (Tailwind v4):

```css
@source '../node_modules/@toptal/picasso/**/*.js';
@source '../node_modules/@toptal/picasso-*/**/*.js';
```

Adjust the path to wherever your bundler resolves `@toptal/picasso*` (a hoisted
vs. nested `node_modules` layout).

## Global reset — `@toptal/picasso-tailwind/base`

The package also ships Picasso's global CSS reset as an opt-in entry, emitted
inside `@layer base`. Import it in your Tailwind entry CSS, after the theme
import:

```css
@layer theme, base, components;
@import 'tailwindcss/theme.css' layer(theme);
@import '@toptal/picasso-tailwind/base';
@import 'tailwindcss/utilities.css';
@config "./tailwind.config.js";
```

Cascade contract: because the reset is cascade-layered, all Tailwind
utilities and any unlayered application CSS win over it — the reset is a
baseline, never an override. The reset establishes a **content-box** page box
model (`html { box-sizing: initial }` with universal inheritance); Picasso
components stay border-box via the PicassoRootNode island.

Opting out: omit the import. This replaces the former
`<Picasso reset={false} />` provider prop, which no longer exists.
