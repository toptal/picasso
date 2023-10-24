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
    validator: validateMock2,
  },
]

const query = (field2value = 'should be this'): RuleGroupTypeAny => ({
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
      value: field2value,
      operator: 'equal',
    },
  ],
})

const groupedQuery = (field3value = 'should be this'): RuleGroupTypeAny => ({
  id: 'group1',
  combinator: 'and',
  rules: [
    {
      field: 'field1',
      id: 'rule1',
      value: 'some value',
      operator: 'equal',
    },
    {
      field: 'field2',
      id: 'rule2',
      value: 'should be this',
      operator: 'equal',
    },
    {
      id: 'group2',
      rules: [
        {
          field: 'field3',
          id: 'rule3',
          value: field3value,
          operator: 'equal',
        },
      ],
      combinator: 'or',
    },
  ],
})

const onValidChangeMock = jest.fn()
const onValidationResultChangeMock = jest.fn()

describe('useQueryBuilderValidator', () => {
  describe('when query has only a single group of rule', () => {
    describe('when query does not contain an invalid rule', () => {
      it('returns true', () => {
        const { result } = renderHook(() =>
          useQueryBuilderValidator({
            fields,
            onValidChange: onValidChangeMock,
            onValidationResultChange: onValidationResultChangeMock,
          })
        )

        const { validator } = result.current

        expect(validator(query())).toBe(true)

        expect(onValidChangeMock).toHaveBeenCalledWith(true)
        expect(onValidationResultChangeMock).toHaveBeenCalledWith({
          rule1: true,
          rule2: true,
          rule3: true,
        })
      })
    })

    describe('when query contains an invalid rule', () => {
      it('returns false', () => {
        const { result } = renderHook(() =>
          useQueryBuilderValidator({
            fields,
            onValidChange: onValidChangeMock,
            onValidationResultChange: onValidationResultChangeMock,
          })
        )

        const { validator } = result.current

        const isValid = validator(query('invalid value for field2'))

        expect(isValid).toBe(false)

        expect(onValidChangeMock).toHaveBeenCalledWith(false)
        expect(onValidationResultChangeMock).toHaveBeenCalledWith({
          rule1: true,
          rule2: true,
          rule3: {
            valid: false,
            reasons: ['reason1'],
          },
        })
      })
    })
  })

  describe('when query has multiple group of rules', () => {
    describe('when query does not contain invalid rule', () => {
      it('returns true', () => {
        const { result } = renderHook(() =>
          useQueryBuilderValidator({
            fields,
            onValidChange: onValidChangeMock,
            onValidationResultChange: onValidationResultChangeMock,
          })
        )

        const { validator } = result.current

        expect(validator(groupedQuery())).toBe(true)
        expect(onValidChangeMock).toHaveBeenCalledWith(true)
        expect(onValidationResultChangeMock).toHaveBeenCalledWith({
          group1: true,
          group2: true,
          rule1: true,
          rule2: true,
          rule3: true,
        })
      })
    })

    describe('when query contains invalid rule', () => {
      it('returns false', () => {
        const { result } = renderHook(() =>
          useQueryBuilderValidator({
            fields,
            onValidChange: onValidChangeMock,
            onValidationResultChange: onValidationResultChangeMock,
          })
        )

        const { validator } = result.current

        expect(validator(groupedQuery('invalid rule'))).toBe(false)
        expect(onValidChangeMock).toHaveBeenCalledWith(false)
        expect(onValidationResultChangeMock).toHaveBeenCalledWith({
          group1: true,
          group2: true,
          rule1: true,
          rule2: true,
          rule3: {
            valid: false,
            reasons: ['reason1'],
          },
        })
      })
    })
  })
})
