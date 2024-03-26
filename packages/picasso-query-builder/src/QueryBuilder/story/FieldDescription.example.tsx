import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'

const initialQuery: RuleGroupTypeAny = {
  rules: [
    {
      field: 'name',
      operator: '=',
      valueSource: 'value',
      value: 'John',
    },
    {
      field: 'age',
      operator: '=',
      valueSource: 'value',
      value: '21',
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
  {
    name: 'field3',
    label: 'City',
  },
  {
    name: 'field4',
    label: 'Country',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'field5',
    label: 'Zip code',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'field6',
    label: 'Region',
  },
  {
    name: 'field7',
    label: 'Social security number',
  },
  {
    name: 'field8',
    label: 'Registration date',
  },
  {
    name: 'field9',
    label: 'Last login date',
  },
  {
    name: 'field10',
    label: 'Role',
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
