import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'rich-text-editor-replacement', {}, 'imports', {
  parser: 'tsx',
})
