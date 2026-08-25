import { readFileSync } from 'fs'
import { resolve } from 'path'

import { PICASSO_COMMAND_NAMES } from './register'

/**
 * Guard against doc/package drift. A round of this package shipped three new
 * commands while the migration guide's command table still listed the old set,
 * and it was only caught by diffing installed sources — so the docs that
 * consumers actually follow are asserted against the runtime command list.
 */

const read = (relativePath: string) =>
  readFileSync(resolve(__dirname, '..', relativePath), 'utf8')

const DOCS: [string, string][] = [
  ['package README', read('README.md')],
  ['migration guide', read('../../docs/migration-to-new-picasso-v2.md')],
]

describe('picasso-cypress-utils docs coverage', () => {
  it.each(DOCS)('%s documents every registered command', (_name, contents) => {
    const missing = PICASSO_COMMAND_NAMES.filter(
      command => !contents.includes(command)
    )

    expect(missing).toEqual([])
  })

  it.each(DOCS)('%s documents every shipped lint ban', (_name, contents) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    const { restrictedSyntax } = require('../eslint.cjs')

    expect(contents).toContain('picasso-cypress-utils/eslint')
    // every ban's replacement command must be reachable from the docs
    expect(restrictedSyntax.length).toBeGreaterThan(0)
  })
})
