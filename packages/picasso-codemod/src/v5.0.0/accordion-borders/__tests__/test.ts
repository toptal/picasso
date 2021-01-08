import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'accordion-borders', {}, 'basic', { parser: 'tsx' })
