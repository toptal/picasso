# @toptal/picasso

[![Picasso NPM package](https://img.shields.io/npm/v/@toptal/picasso?color=green&logo=toptal)](https://www.npmjs.com/package/@toptal/picasso)

![Picasso](https://user-images.githubusercontent.com/437214/54037817-b4da1800-41c7-11e9-81f5-59ed43e38500.png)

Picasso is Toptal's component library, based on Toptal's design system - BASE. UI designs and documentation can be found for most components at [picasso.toptal.net](https://picasso.toptal.net/).

## Installation instructions

```js
yarn add @toptal/picasso @toptal/picasso-provider @toptal/picasso-tailwind tailwindcss @tailwindcss/postcss postcss autoprefixer
```

## Create `tailwind.config.js` in the root of the project

Please note that Picasso Tailwind preset has to be used along with `@toptal/base-tailwind` preset.

```js
const path = require('path')

const projectRoot = __dirname

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(projectRoot, 'node_modules/@toptal/picasso/**/*.js'),
    path.join(projectRoot, 'node_modules/@toptal/picasso-*/**/*.js'),
    // if your project is also using topkit
    path.join(projectRoot, 'node_modules/@topkit/**/*.js'),
    // adjust for your project infrastructure
    path.join(projectRoot, '{hosts,libs,namespaces}/**/src/**/*.{ts,tsx}'),
  ],
  presets: [
    require('@toptal/base-tailwind'),
    require('@toptal/picasso-tailwind'),
  ],
  corePlugins: {
    preflight: false,
  },
}
```

## Add Tailwind CSS directives to your CSS source files

```css
/* index.css */
@layer theme, base, components;
@import 'tailwindcss/theme.css' layer(theme);
@import '@toptal/picasso-tailwind/base';
@import 'tailwindcss/utilities.css';
@config "./tailwind.config.js";
```

### Global reset (`@toptal/picasso-tailwind/base`)

The `@toptal/picasso-tailwind/base` import ships Picasso's global reset (page
box model, body/root layout, font smoothing) inside `@layer base`. Because it
is cascade-layered, all Tailwind utilities and any unlayered application CSS
win over it — the reset is a baseline, never an override.

The reset establishes a **border-box** page box model
(`html { box-sizing: border-box }` with universal inheritance).

To opt out of the reset, omit the import (this replaces the former
`<Picasso reset={false} />` prop, which no longer exists).

## Setup webpack to use PostCSS loader with tailwindcss plugin

> If you are reusing webpack configuration from `@toptal/davinci-engine` you can skip this step as it is setup automatically if `tailwind.config.js` is in the repository.
>
> Make sure to check all webpack configuration, Application (start/build), Storybook, Cypress

```js
// webpack.config.js

...
{
  test: /\.css$/i,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: false,
          plugins: {
            '@tailwindcss/postcss': {},
          },
        },
      },
    },
  ],
},

...
```

When using **Vite** or **NextJS**, adding tailwind config with correct `content` should be sufficient in most cases, depending on your configuration.

For more info, you can check out the official Tailwind docs:

[Install Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)

[Install Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs)

## Start using the library

```jsx
import Picasso from '@toptal/picasso-provider'
import { Button } from '@toptal/picasso'
...

render () {
  return (
    <Picasso>
      <Button>Hello world!</Button>
    </Picasso>
  )
}
```

**_A [`Picasso`](/?path=/story/components-picasso--picasso) component rendered at root level is required for the library's global services — fonts, favicon, notifications, and the responsive breakpoint context — to work properly._**

## Merging classes

When working with TailwindCSS merging classes is vital. Read our [Merging classes](?path=/story/tutorials-merging-classes--merging-classes) tutorial to make it right.

## Documentation

Documentation and demos are available at [picasso.toptal.net](https://picasso.toptal.net/).

### Decisions

Our decisons are documented at [GitHub](https://github.com/toptal/picasso/tree/master/docs)

---
