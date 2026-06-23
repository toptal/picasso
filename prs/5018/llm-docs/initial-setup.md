# @toptal/picasso

[![Picasso NPM package](https://img.shields.io/npm/v/@toptal/picasso?color=green&logo=toptal)](https://www.npmjs.com/package/@toptal/picasso)

![Picasso](https://user-images.githubusercontent.com/437214/54037817-b4da1800-41c7-11e9-81f5-59ed43e38500.png)

Picasso is Toptal's component library, based on Toptal's design system - BASE. UI designs and documentation can be found for most components at [picasso.toptal.net](https://picasso.toptal.net/).

## Using Picasso with AI coding agents

Picasso ships machine-readable docs optimized for LLMs so AI tools (Cursor, Claude Code, …) generate correct Picasso code. Wire your agent to them once per repo.

**Add a reference to your AI tool config** — `CLAUDE.md`, `AGENTS.md`, or a `.cursor/rules/` file:

```md
This project uses Toptal's Picasso design system (`@toptal/picasso`).

Before writing UI, consult the Picasso LLM docs (fetch on demand — do not vendor):

1. Index of all components: https://toptal.github.io/picasso/llm-docs/llms.txt
2. Then fetch the specific component page you need, e.g.
   https://toptal.github.io/picasso/llm-docs/components/button.md

Rules: use Picasso components (never raw HTML for UI), import from
`@toptal/picasso` and `@toptal/picasso-forms`, and merge classes with `twMerge`
from `@toptal/picasso-tailwind-merge` (put the consumer `className` last).
```

The full, current ruleset lives in [`.picasso/rules.md`](https://github.com/toptal/picasso/blob/master/.picasso/rules.md).

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
@import 'tailwindcss/utilities.css';
@config "./tailwind.config.js";
```

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
    <Picasso injectFirst>
      <Button>Hello world!</Button>
    </Picasso>
  )
}
```

**_A [`Picasso`](/?path=/story/components-picasso--picasso) component rendered at root level is required for the library theme configuration and theme to work properly._**

## Merging classes

When working with TailwindCSS merging classes is vital. Read our [Merging classes](?path=/story/tutorials-merging-classes--merging-classes) tutorial to make it right.

## Documentation

Documentation and demos are available at [picasso.toptal.net](https://picasso.toptal.net/).

### Decisions

Our decisons are documented at [GitHub](https://github.com/toptal/picasso/tree/master/docs)

---
