import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'rename-rating-stars', {}, 'basic', { parser: 'tsx' })
defineTest(__dirname, 'rename-rating-stars', {}, 'forms', { parser: 'tsx' })
