import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'overlay-badge', {}, 'basic', { parser: 'tsx' })
