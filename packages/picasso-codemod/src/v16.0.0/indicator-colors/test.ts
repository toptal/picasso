import fs from 'fs'
import path from 'path'
import { defineInlineTest } from 'jscodeshift/src/testUtils'

import transform from './indicator-colors'

const read = (fileName: string) => {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString()
}

describe('indicator-colors', () => {
  defineInlineTest(
    transform,
    {},
    read('./__testfixtures__/actual.tsx'),
    read('./__testfixtures__/expected.tsx')
  )
})
