import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'remove-asterisks', {}, 'basic', { parser: 'tsx' })
