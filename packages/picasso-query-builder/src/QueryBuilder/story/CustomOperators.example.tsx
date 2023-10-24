import React, { useState } from 'react'
import type { Field } from '@toptal/picasso-query-builder'
import {
  QueryBuilder,
  defaultOperators,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import type { DefaultOperator, RuleType } from 'react-querybuilder'
import { Typography } from '@toptal/picasso'

const initialQuery = {
  rules: [],
  combinator: 'and',
}

const fields = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
    inputType: 'text',
  },
  { name: 'age', label: 'Age', inputType: 'number' },
  { name: 'height', label: 'Height', inputType: 'number' },
  { name: 'job', label: 'Job' },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const getOperators = (fieldsList: Field[], fieldName: string) => {
    const field = fieldsList.find((item: Field) => item.name === fieldName)

    if (!field) {
      return defaultOperators
    }

    let textOperators: DefaultOperator[] = []

    if (field.inputType === 'number') {
      textOperators.push({ name: '=', label: 'equals' })
    } else if (field.inputType === 'text') {
      textOperators = [
        { name: 'contains', label: 'contains' },
        { name: 'beginsWith', label: 'begins with' },
        { name: 'endsWith', label: 'ends with' },
      ]
    } else {
      return defaultOperators
    }

    return textOperators
  }

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  const operatorsString = (input: RuleGroupTypeAny): string[] => {
    return input.rules.flatMap(item => {
      if ((item as RuleGroupTypeAny).rules) {
        return operatorsString(item as RuleGroupTypeAny)
      }

      return [(item as RuleType).operator]
    })
  }

  return (
    <>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={handleQueryChange}
        getOperators={getOperators}
      />
      {operatorsString(query).map((item, index) => (
        <Typography>
          Field {index} operator: {item}
        </Typography>
      ))}
    </>
  )
}

export default Example
