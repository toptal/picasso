import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'field1',
      operator: '=',
      valueSource: 'value',
      value: 'John',
    },
    {
      field: 'field2',
      operator: '=',
      valueSource: 'value',
      value: 'John',
    },
  ],
  combinator: 'and',
}

const fields = [
  {
    name: 'field1',
    label: 'First name',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'field2',
    label: 'Last name',
  },
]

const Example = () => {
  const [query, setQuery] = useState<RuleGroupTypeAny>(initialQuery)

  const handleQueryChange = (newQuery: RuleGroupTypeAny) => {
    setQuery(newQuery)
  }

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={handleQueryChange}
    />
  )
}

export default Example
