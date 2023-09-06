import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'spacing-values', {}, 'default', { parser: 'tsx' })
