import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'replace-error', {}, 'basic', { parser: 'tsx' })
defineTest(__dirname, 'replace-error', {}, 'import-as', { parser: 'tsx' })
defineTest(__dirname, 'replace-error', {}, 'as-variable', { parser: 'tsx' })
