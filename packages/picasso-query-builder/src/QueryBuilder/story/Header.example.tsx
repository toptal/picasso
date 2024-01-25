import React, { useState } from 'react'
import {
  QueryBuilder,
  type RuleGroupTypeAny,
} from '@toptal/picasso-query-builder'
import { Button, Container } from '@toptal/picasso'

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
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
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
      header={
        <Container flex justifyContent='flex-end' gap='small'>
          <Button variant='positive'>Option 1</Button>
          <Button variant='secondary'>Option 2</Button>
        </Container>
      }
    />
  )
}

export default Example
