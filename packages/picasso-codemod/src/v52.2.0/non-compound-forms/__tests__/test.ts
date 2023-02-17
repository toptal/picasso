import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'non-compound-forms', {}, 'basic', { parser: 'tsx' })
defineTest(__dirname, 'non-compound-forms', {}, 'aliased', { parser: 'tsx' })
