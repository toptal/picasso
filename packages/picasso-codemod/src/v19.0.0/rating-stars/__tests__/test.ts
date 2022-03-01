import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'rating-stars', {}, 'basic', { parser: 'tsx' })
