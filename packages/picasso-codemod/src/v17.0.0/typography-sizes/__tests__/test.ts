import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'typography-sizes', {}, 'basic', { parser: 'tsx' })
