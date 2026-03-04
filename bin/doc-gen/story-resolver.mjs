import { readFileSync } from 'fs'
import { resolve, relative, dirname, basename } from 'path'
import glob from 'glob'
const { sync: globSync } = glob

const ROOT = resolve(import.meta.dirname, '../..')

/**
 * Classify a story file by scanning its source text for key API calls.
 * Returns: 'parent' | 'child' | 'docs-only' | 'doc-page'
 */
function classifyStory(source) {
  if (/\.createDocPage\s*\(/.test(source)) return 'doc-page'
  if (/\.createPage\s*\(/.test(source)) return 'parent'
  if (/connectToPage\s*\(/.test(source)) return 'child'
  if (/createComponentDocs\s*\(/.test(source)) return 'docs-only'
  return 'unknown'
}

/**
 * Discover all story files and classify them.
 * Returns an array of { filePath, relativePath, type, source }
 */
export function discoverStories() {
  const patterns = [
    'packages/**/story/index.jsx',
    '.storybook/stories/**/story/index.jsx',
    '.storybook/stories/**/story/index.tsx',
  ]

  const files = patterns.flatMap(pattern =>
    globSync(pattern, { cwd: ROOT, absolute: true })
  )

  // Deduplicate
  const unique = [...new Set(files)]

  return unique.map(filePath => {
    const source = readFileSync(filePath, 'utf-8')
    const type = classifyStory(source)
    const relativePath = relative(ROOT, filePath)

    return { filePath, relativePath, type, source }
  })
}

/**
 * Given a module arg like 'base/Button' and an example source path like
 * 'Button/story/Default.example.tsx', resolve to an absolute file path.
 *
 * The module maps to packages/<module>/src/ and example paths are relative
 * to that src directory.
 */
export function resolveExamplePath(exampleSource, moduleArg, storyFilePath) {
  if (moduleArg) {
    const srcDir = resolve(ROOT, 'packages', moduleArg, 'src')
    const candidate = resolve(srcDir, exampleSource)
    try {
      readFileSync(candidate)
      return candidate
    } catch {}
  }

  // If no module or resolution failed, try relative to story file's package src
  if (storyFilePath) {
    // Walk up from story file to find src directory
    let dir = dirname(storyFilePath)
    while (dir !== ROOT && dir !== '/') {
      if (basename(dir) === 'src') {
        const candidate = resolve(dir, exampleSource)
        try {
          readFileSync(candidate)
          return candidate
        } catch {}
        break
      }
      dir = dirname(dir)
    }

    // Try from storybook stories directory
    if (storyFilePath.includes('.storybook/stories')) {
      const candidate = resolve(ROOT, '.storybook/stories', exampleSource)
      try {
        readFileSync(candidate)
        return candidate
      } catch {}
    }
  }

  return null
}

/**
 * Resolve a component import path from a story file to an actual .tsx file.
 * e.g., import { Button } from '../Button' in a story at
 * packages/base/Button/src/Button/story/index.jsx
 * -> packages/base/Button/src/Button/Button.tsx
 */
export function resolveComponentPath(importSource, storyFilePath) {
  const storyDir = dirname(storyFilePath)

  // Handle relative imports
  if (importSource.startsWith('.')) {
    const importDir = resolve(storyDir, importSource)

    // Try <dir>/<basename>.tsx
    const dirName = basename(importDir)
    const candidates = [
      resolve(importDir, `${dirName}.tsx`),
      resolve(importDir, 'index.tsx'),
      resolve(importDir, `${dirName}.ts`),
      resolve(importDir, 'index.ts'),
      `${importDir}.tsx`,
      `${importDir}.ts`,
    ]

    for (const c of candidates) {
      try {
        readFileSync(c)
        return c
      } catch {}
    }
  }

  // Handle package imports like @toptal/picasso or @toptal/picasso-form-label
  if (importSource.startsWith('@toptal/picasso')) {
    const parts = importSource.replace('@toptal/', '').split('/')
    const pkgName = parts[0] // e.g., 'picasso', 'picasso-form-label'

    // Map package names to directories
    const pkgPatterns = globSync(`packages/*/${pkgName}`, { cwd: ROOT })
    if (pkgPatterns.length === 0 && pkgName === 'picasso') {
      // @toptal/picasso exports from packages/picasso
      const picassoSrc = resolve(ROOT, 'packages/picasso/src')
      return picassoSrc // caller will need to resolve further
    }
  }

  return null
}

/**
 * Build a map from story file path to its relative path for cross-reference.
 */
export function buildStoryMap(stories) {
  const map = new Map()
  for (const story of stories) {
    // Key by directory containing the story
    const dir = dirname(story.filePath)
    map.set(dir, story)

    // Also key by relative path without /story/index.jsx
    const shortPath = story.relativePath
      .replace(/\/story\/index\.(jsx|tsx)$/, '')
    map.set(shortPath, story)
  }
  return map
}
