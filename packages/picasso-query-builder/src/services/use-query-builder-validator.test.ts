import { renderHook } from '@testing-library/react-hooks'
import type { RuleGroupTypeAny, RuleType } from 'react-querybuilder'

import type { Field } from '../types/query-builder'
import useQueryBuilderValidator from './use-query-builder-validator'

const validateMock1 = (rule: RuleType) => {
  if (!rule.value) {
    return {
      valid: false,
      reasons: ['some message'],
    }
  }

  return true
}
const validateMock2 = (rule: RuleType) => {
  if (rule.value !== 'should be this') {
    return {
      valid: false,
      reasons: ['reason1'],
    }
  }

  return true
}

const fields: Field[] = [
  {
    name: 'field1',
    label: 'Name',
    valueEditorType: 'text',
    validator: validateMock1,
  },
  {
    name: 'field2',
    label: 'Name',
    valueEditorType: 'text',
    validator: validateMock2,
  },
  {
    name: 'field3',
    label: 'Name',
    valueEditorType: 'text',
  },
]

const validQuery: RuleGroupTypeAny = {
  id: 'rule1',
  combinator: 'and',
  rules: [
    {
      field: 'field1',
      id: 'rule2',
      value: 'some value',
      operator: 'equal',
    },
    {
      field: 'field2',
      id: 'rule3',
      value: 'should be this',
      operator: 'equal',
    },
  ],
}
const invalidQuery: RuleGroupTypeAny = {
  id: 'rule1',
  combinator: 'and',
  rules: [
    {
      field: 'field1',
      id: 'rule2',
      value: 'some value',
      operator: 'equal',
    },
    {
      field: 'field2',
      id: 'rule3',
      value: 'should not be this',
      operator: 'equal',
    },
    {
      field: 'field3',
      id: 'rule4',
      value: 'some value',
      operator: 'equal',
    },
  ],
}

const onValidChangeMock = jest.fn()
const onValidationResultChangeMock = jest.fn()

describe('useQueryBuilderValidator', () => {
  describe('when query is valid', () => {
    it('returns true', () => {
      const { result } = renderHook(() =>
        useQueryBuilderValidator({
          fields,
          onValidChange: onValidChangeMock,
          onValidationResultChange: onValidationResultChangeMock,
        })
      )

      const validate = result.current

      expect(validate(validQuery)).toBe(true)
      expect(onValidChangeMock).toHaveBeenCalledWith(true)
      expect(onValidationResultChangeMock).toHaveBeenCalledWith({
        rule1: true,
        rule2: true,
        rule3: true,
      })
    })
  })

  describe('when query is invalid', () => {
    it('returns false', () => {
      const { result } = renderHook(() =>
        useQueryBuilderValidator({
          fields,
          onValidChange: onValidChangeMock,
          onValidationResultChange: onValidationResultChangeMock,
        })
      )

      const validate = result.current

      expect(validate(invalidQuery)).toBe(false)
      expect(onValidChangeMock).toHaveBeenCalledWith(false)
      expect(onValidationResultChangeMock).toHaveBeenCalledWith({
        rule1: true,
        rule2: true,
        rule3: {
          valid: false,
          reasons: ['reason1'],
        },
        rule4: true,
      })
    })
  })
})
