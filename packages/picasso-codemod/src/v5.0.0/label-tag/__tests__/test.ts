import { defineTest } from 'jscodeshift/src/testUtils'

const testTypes = ['basic', 'group', 'import-as']

testTypes.forEach(testType => {
  defineTest(__dirname, 'label-tag', {}, testType, { parser: 'tsx' })
})
