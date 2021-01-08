import { defineTest } from 'jscodeshift/src/testUtils'

const testTypes = ['basic', 'as']

testTypes.forEach(testType => {
  defineTest(__dirname, 'subheader-pagehead', {}, testType, { parser: 'tsx' })
})
