import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'remove-tooltip-variant', {}, 'basic', { parser: 'tsx' })
defineTest(__dirname, 'remove-tooltip-variant', {}, 'children-with-variant', {
  parser: 'tsx',
})
