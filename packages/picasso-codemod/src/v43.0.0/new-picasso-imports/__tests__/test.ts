import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'new-picasso-imports', {}, 'basic', { parser: 'tsx' })
defineTest(__dirname, 'new-picasso-imports', {}, 'aliased', { parser: 'tsx' })
