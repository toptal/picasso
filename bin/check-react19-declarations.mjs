#!/usr/bin/env node
/**
 * Type-checks the published declarations the way a consumer on `@types/react`
 * 19 with `skipLibCheck: false` compiles them (tsconfig.react19.declarations.json).
 * TypeScript then checks every declaration file in the program, other
 * packages' included, so only errors in Picasso's own declarations fail it.
 *
 * Run it after `pnpm build:package`, on a clean build: `tsc -b` leaves behind
 * the output of a source file that was deleted.
 *
 * Run: node bin/check-react19-declarations.mjs
 */
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
)
const tsc = createRequire(import.meta.url).resolve('typescript/bin/tsc')

const { stdout, stderr, status } = spawnSync(
  process.execPath,
  [tsc, '-p', 'tsconfig.react19.declarations.json', '--pretty', 'false'],
  { cwd: repoRoot, encoding: 'utf8' }
)

const output = `${stdout}${stderr}`
const errors = output.split('\n').filter(line => / error TS\d+:/.test(line))
const isPicasso = line => /^packages\/.+\/dist-package\//.test(line)
const picassoErrors = errors.filter(isPicasso)
const otherErrors = errors.filter(line => !isPicasso(line))

if (status !== 0 && errors.length === 0) {
  console.error(output)
  process.exit(1)
}

if (otherErrors.length > 0) {
  console.log(
    `Not Picasso's, so ignored: ${
      otherErrors.length
    } error(s) in other packages' declarations\n${otherErrors.join('\n')}\n`
  )
}

if (picassoErrors.length > 0) {
  console.error(
    `${
      picassoErrors.length
    } error(s) in Picasso's published declarations\n${picassoErrors.join('\n')}`
  )
  process.exit(1)
}

console.log(
  "Picasso's published declarations compile against @types/react 19 with skipLibCheck: false"
)
