import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'overlay-badge', {}, 'basic', { parser: 'tsx' })
defineTest(__dirname, 'overlay-badge', {}, 'size-default', { parser: 'tsx' })
