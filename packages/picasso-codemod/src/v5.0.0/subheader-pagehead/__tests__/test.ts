import { defineTest } from 'jscodeshift/src/testUtils'

const testTypes = ['basic', 'import-as']

testTypes.forEach(testType => {
  defineTest(__dirname, 'subheader-pagehead', {}, testType, { parser: 'tsx' })
})
