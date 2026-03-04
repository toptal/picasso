import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'

const ROOT = resolve(import.meta.dirname, '../..')

/**
 * Resolve and read an example file's source code.
 *
 * @param {string} exampleSource - The example path from addExample, e.g. 'Button/story/Default.example.tsx'
 * @param {string|undefined} moduleArg - The module arg, e.g. 'base/Button'
 * @param {string} storyFilePath - Absolute path to the story file
 * @returns {{ source: string, filePath: string } | null}
 */
export function readExample(exampleSource, moduleArg, storyFilePath) {
  const candidates = []

  // 1. Module-based resolution: packages/<module>/src/<exampleSource>
  if (moduleArg) {
    candidates.push(resolve(ROOT, 'packages', moduleArg, 'src', exampleSource))
  }

  // 2. Infer package from story file location
  //    e.g., packages/base/Button/src/Button/story/index.jsx -> packages/base/Button/src/
  const storyDir = dirname(storyFilePath)
  let srcDir = storyDir
  while (srcDir !== ROOT && srcDir !== '/') {
    if (srcDir.endsWith('/src')) {
      candidates.push(resolve(srcDir, exampleSource))
      break
    }
    srcDir = dirname(srcDir)
  }

  // 3. Storybook stories directory (for tutorials)
  candidates.push(resolve(ROOT, '.storybook/stories', exampleSource))

  // 4. Direct from root (unlikely but safe fallback)
  candidates.push(resolve(ROOT, exampleSource))

  for (const filePath of candidates) {
    if (existsSync(filePath)) {
      try {
        const source = readFileSync(filePath, 'utf-8')
        return { source, filePath }
      } catch {
        continue
      }
    }
  }

  return null
}
