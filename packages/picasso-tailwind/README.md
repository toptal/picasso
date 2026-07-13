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
baseline, never an override. The reset establishes a **border-box** page box
model (`html { box-sizing: border-box }` with universal inheritance).

Opting out: omit the import. This replaces the former
`<Picasso reset={false} />` provider prop, which no longer exists.
