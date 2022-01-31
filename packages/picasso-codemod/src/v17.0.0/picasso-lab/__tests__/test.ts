import { defineTest } from 'jscodeshift/src/testUtils'

defineTest(__dirname, 'picasso-lab', {}, 'basic', { parser: 'tsx' })
