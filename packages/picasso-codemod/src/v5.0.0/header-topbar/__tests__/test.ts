import { defineTest } from 'jscodeshift/src/testUtils'

const testTypes = ['basic']

testTypes.forEach(testType => {
  defineTest(__dirname, 'header-topbar', {}, testType, { parser: 'tsx' })
})
