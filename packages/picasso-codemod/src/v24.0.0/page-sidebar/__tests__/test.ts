import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'page-sidebar', {}, 'basic', { parser: 'tsx' })
defineTest(__dirname, 'page-sidebar', {}, 'with-import', { parser: 'tsx' })
defineTest(__dirname, 'page-sidebar', {}, 'aliased', { parser: 'tsx' })
