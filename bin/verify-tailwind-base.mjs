#!/usr/bin/env node
/**
 * Verifies the `@toptal/picasso-tailwind/base` reset resolves through the
 * package subpath export and lands in `@layer base` (ahead of `utilities`, so
 * utilities win) under both consumer Tailwind setups: v3-compat with unlayered
 * utilities and standard v4 `@import 'tailwindcss'`.
 *
 * Run: node bin/verify-tailwind-base.mjs
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
)

// `source(none)` disables content auto-detection — the assertions only need
// the layer structure and the imported reset, not generated utilities.
const FIXTURES = [
  {
    name: 'A: v3-compat entry (unlayered utilities)',
    css: [
      '@layer theme, base, components;',
      "@import 'tailwindcss/theme.css' layer(theme) source(none);",
      "@import '@toptal/picasso-tailwind/base';",
      "@import 'tailwindcss/utilities.css' source(none);",
    ].join('\n'),
    assertLayerOrder: false,
  },
  {
    name: 'B: standard v4 entry (layered utilities)',
    css: [
      "@import 'tailwindcss' source(none);",
      "@import '@toptal/picasso-tailwind/base';",
    ].join('\n'),
    assertLayerOrder: true,
  },
]

// Value-agnostic markers of the Picasso reset (stable across the box-sizing
// model change), all of which must appear inside the emitted `@layer base`.
const RESET_MARKERS = ['-webkit-font-smoothing', 'min-height: 100vh', '#root']

const findBlockEnd = (output, openBraceIndex) => {
  let depth = 0

  for (let i = openBraceIndex; i < output.length; i++) {
    if (output[i] === '{') {
      depth += 1
    } else if (output[i] === '}') {
      depth -= 1

      if (depth === 0) {
        return i
      }
    }
  }

  return output.length - 1
}

// The standard v4 entry emits Tailwind's own preflight as a separate
// `@layer base { … }` block, so the Picasso reset may live in a SECOND base
// block — collect them all before asserting.
const collectBaseLayers = output => {
  const blocks = []
  const pattern = /@layer base\s*{/g
  let match

  while ((match = pattern.exec(output)) !== null) {
    const end = findBlockEnd(output, output.indexOf('{', match.index))

    blocks.push(output.slice(match.index, end + 1))
    pattern.lastIndex = end + 1
  }

  return blocks.join('\n')
}

const verifyFixture = async ({ name, css, assertLayerOrder }) => {
  const errors = []
  const result = await postcss([tailwindcss()]).process(css, {
    // `from` only anchors import resolution — the file itself never exists.
    from: path.join(repoRoot, 'verify-tailwind-base.fixture.css'),
    map: false,
  })
  const output = result.css
  const baseLayer = collectBaseLayers(output)

  if (!baseLayer) {
    errors.push('no `@layer base { … }` block in the compiled output')
  } else {
    for (const marker of RESET_MARKERS) {
      if (!baseLayer.includes(marker)) {
        errors.push(`reset marker "${marker}" missing from @layer base`)
      }
    }
  }

  if (assertLayerOrder) {
    const orderMatch = output.match(/@layer\s+([^;{]+);/)
    const order = orderMatch
      ? orderMatch[1].split(',').map(layer => layer.trim())
      : []

    if (order.indexOf('base') === -1 || order.indexOf('utilities') === -1) {
      errors.push(
        `layer order declaration missing base/utilities (${order.join(', ')})`
      )
    } else if (order.indexOf('base') > order.indexOf('utilities')) {
      errors.push(
        `layer order declares base AFTER utilities (${order.join(', ')})`
      )
    }
  }

  return { name, errors }
}

const results = await Promise.all(FIXTURES.map(verifyFixture))
let failed = false

for (const { name, errors } of results) {
  if (errors.length === 0) {
    console.log(`PASS  ${name}`)
  } else {
    failed = true
    console.error(`FAIL  ${name}`)

    for (const error of errors) {
      console.error(`      - ${error}`)
    }
  }
}

process.exit(failed ? 1 : 0)
