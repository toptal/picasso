import React, { useState } from 'react'
import type { RuleType, ValidationResult } from '@toptal/picasso-query-builder'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { Typography } from '@toptal/picasso'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'name',
      operator: '=',
      valueSource: 'value',
      value: '',
    },
    {
      field: 'age',
      operator: '=',
      valueSource: 'value',
      value: '12',
    },
  ],
  combinator: 'and',
}

const checkRequired = (rule: RuleType): ValidationResult | boolean => {
  return (
    !!rule.value || {
      reasons: ['Name is required'],
      valid: false,
    }
  )
}

const checkAge = (rule: RuleType): ValidationResult | boolean => {
  return (
    rule.value >= 18 || {
      reasons: ['Age should be greater or equal to 18'],
      valid: false,
    }
  )
}

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    validator: checkRequired,
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    validator: checkAge,
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)
  const [isValid, setIsValid] = useState<boolean>(true)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  const handleValidationChange = (valid: boolean) => {
    setIsValid(valid)
  }

  return (
    <>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={handleQueryChange}
        onValidationChange={handleValidationChange}
      />
      <Typography>Is query valid: {isValid.toString()}</Typography>
    </>
  )
}

export default Example
