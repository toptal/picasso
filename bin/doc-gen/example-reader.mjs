/* eslint-disable import/no-extraneous-dependencies */
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'

const ROOT = resolve(import.meta.dirname, '../..')

const findSrcDir = (storyFilePath) => {
  let dir = dirname(storyFilePath)

  while (dir !== ROOT && dir !== '/') {
    if (dir.endsWith('/src')) {
      return dir
    }

    dir = dirname(dir)
  }

  return null
}

const buildCandidates = (exampleSource, moduleArg, storyFilePath) => {
  const candidates = []

  if (moduleArg) {
    candidates.push(resolve(ROOT, 'packages', moduleArg, 'src', exampleSource))
  }

  const srcDir = findSrcDir(storyFilePath)

  if (srcDir) {
    candidates.push(resolve(srcDir, exampleSource))
  }

  candidates.push(resolve(ROOT, '.storybook/stories', exampleSource))
  candidates.push(resolve(ROOT, exampleSource))

  return candidates
}

/**
 * Resolve and read an example file's source code.
 */
export const readExample = (exampleSource, moduleArg, storyFilePath) => {
  const candidates = buildCandidates(exampleSource, moduleArg, storyFilePath)

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
