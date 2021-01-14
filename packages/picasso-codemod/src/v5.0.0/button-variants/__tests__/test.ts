import { defineTest } from 'jscodeshift/src/testUtils'

const testTypes = ['basic']

testTypes.forEach(testType => {
  defineTest(__dirname, 'button-variants', {}, testType, { parser: 'tsx' })
})
